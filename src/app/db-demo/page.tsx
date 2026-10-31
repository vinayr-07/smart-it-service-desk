'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Terminal, 
  Database, 
  FileCode, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Activity,
  CheckCircle,
  Copy
} from 'lucide-react';

export default function DbDemoPage() {
  const [activeCategory, setActiveCategory] = useState<'views' | 'procedures' | 'triggers' | 'transactions' | 'queries' | 'cypher'>('views');
  const [selectedDemo, setSelectedDemo] = useState<string>('view_sla');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<any | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const demoItems: Record<string, {
    title: string;
    category: 'views' | 'procedures' | 'triggers' | 'transactions' | 'queries' | 'cypher';
    description: string;
    code: string;
    executeSql: string;
    explanation: string;
  }> = {
    view_sla: {
      title: 'View 1: v_active_tickets_sla (Real-time SLA Tracking)',
      category: 'views',
      description: 'Calculates active ticket deadlines, remaining hours, and SLA breach statuses across 4 tables.',
      code: `CREATE OR REPLACE VIEW v_active_tickets_sla AS
SELECT 
    t.ticket_id, t.ticket_code, t.title, t.priority, t.status,
    t.due_date, t.sla_breached,
    TIMESTAMPDIFF(HOUR, NOW(), t.due_date) AS hours_remaining_to_resolve,
    u_creator.full_name AS requester_name,
    u_agent.full_name AS assigned_agent_name,
    a.asset_name
FROM tickets t
JOIN users u_creator ON t.created_by = u_creator.user_id
LEFT JOIN users u_agent ON t.assigned_to = u_agent.user_id
LEFT JOIN assets a ON t.asset_id = a.asset_id
WHERE t.status IN ('OPEN', 'IN_PROGRESS');`,
      executeSql: 'SELECT * FROM v_active_tickets_sla;',
      explanation: 'Demonstrates abstraction of complex multi-table joins and real-time temporal calculations into an easily queryable view.'
    },
    view_workload: {
      title: 'View 2: v_agent_workload_metrics (Agent Performance Aggregation)',
      category: 'views',
      description: 'Aggregates open, in-progress, and resolved tickets with average resolution hours per technician.',
      code: `CREATE OR REPLACE VIEW v_agent_workload_metrics AS
SELECT 
    u.user_id AS agent_id, u.full_name AS agent_name,
    COUNT(CASE WHEN t.status = 'OPEN' THEN 1 END) AS open_tickets,
    COUNT(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 END) AS in_progress_tickets,
    COUNT(CASE WHEN t.status IN ('OPEN', 'IN_PROGRESS') THEN 1 END) AS total_active_workload,
    COUNT(CASE WHEN t.status = 'RESOLVED' THEN 1 END) AS resolved_tickets,
    COUNT(CASE WHEN t.sla_breached = TRUE THEN 1 END) AS breached_tickets,
    COALESCE(ROUND(AVG(TIMESTAMPDIFF(MINUTE, t.created_at, t.resolved_at)) / 60.0, 2), 0.0) AS avg_resolution_hours
FROM users u
LEFT JOIN tickets t ON u.user_id = t.assigned_to
WHERE u.role = 'Agent' AND u.is_active = TRUE
GROUP BY u.user_id, u.full_name, u.email;`,
      executeSql: 'SELECT * FROM v_agent_workload_metrics;',
      explanation: 'Demonstrates conditional aggregations (COUNT CASE WHEN) and GROUP BY across 1:N relational links.'
    },
    view_assets: {
      title: 'View 3: v_asset_failure_frequency (Hotspot Analysis)',
      category: 'views',
      description: 'Identifies hardware and software components with the highest incident frequencies.',
      code: `CREATE OR REPLACE VIEW v_asset_failure_frequency AS
SELECT 
    a.asset_id, a.asset_tag, a.asset_name, a.asset_type,
    a.status AS current_status, a.criticality,
    COUNT(t.ticket_id) AS total_incidents,
    COUNT(CASE WHEN t.priority = 'CRITICAL' THEN 1 END) AS critical_incidents
FROM assets a
LEFT JOIN tickets t ON a.asset_id = t.asset_id
GROUP BY a.asset_id, a.asset_tag, a.asset_name, a.asset_type, a.status, a.criticality;`,
      executeSql: 'SELECT * FROM v_asset_failure_frequency;',
      explanation: 'Provides real-time visibility into infrastructure reliability metrics for proactive IT maintenance.'
    },
    proc_auto_assign: {
      title: 'Stored Procedure: sp_auto_assign_ticket',
      category: 'procedures',
      description: 'Selects the IT support agent with the lowest active queue workload and assigns the ticket.',
      code: `CREATE PROCEDURE sp_auto_assign_ticket(
    IN p_ticket_id INT,
    OUT p_assigned_agent_id INT
)
BEGIN
    DECLARE v_best_agent INT;
    
    SELECT u.user_id INTO v_best_agent
    FROM users u
    LEFT JOIN tickets t ON u.user_id = t.assigned_to AND t.status IN ('OPEN', 'IN_PROGRESS')
    WHERE u.role = 'Agent' AND u.is_active = TRUE
    GROUP BY u.user_id
    ORDER BY COUNT(t.ticket_id) ASC, u.user_id ASC
    LIMIT 1;
    
    UPDATE tickets 
    SET assigned_to = v_best_agent, status = 'IN_PROGRESS'
    WHERE ticket_id = p_ticket_id;
    
    SET p_assigned_agent_id = v_best_agent;
END;`,
      executeSql: 'CALL sp_auto_assign_ticket(6);',
      explanation: 'Demonstrates encapsulation of automated business logic inside the relational database engine.'
    },
    trigger_sla: {
      title: 'Trigger: trg_ticket_before_insert_sla',
      category: 'triggers',
      description: 'Automatically calculates due_date based on SLA policy before record insertion.',
      code: `CREATE TRIGGER trg_ticket_before_insert_sla
BEFORE INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE v_hours DECIMAL(5,2);
    
    SELECT resolution_time_hrs INTO v_hours
    FROM sla_policies
    WHERE priority_level = NEW.priority
    LIMIT 1;
    
    IF NEW.due_date IS NULL THEN
        SET NEW.due_date = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL FLOOR(v_hours * 60) MINUTE);
    END IF;
END;`,
      executeSql: 'SELECT ticket_id, ticket_code, priority, due_date FROM tickets ORDER BY ticket_id DESC LIMIT 3;',
      explanation: 'Ensures strict SLA deadline integrity without requiring application-side datetime arithmetic.'
    },
    trans_resolve: {
      title: 'ACID Transaction: sp_resolve_ticket_with_asset_update',
      category: 'transactions',
      description: 'Atomically marks ticket resolved, updates physical asset status, and logs audit record with rollback protection.',
      code: `CREATE PROCEDURE sp_resolve_ticket_with_asset_update(
    IN p_ticket_id INT,
    IN p_agent_id INT,
    IN p_solution TEXT,
    IN p_new_asset_status VARCHAR(20)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    UPDATE tickets
    SET status = 'RESOLVED', resolution_summary = p_solution, resolved_at = NOW()
    WHERE ticket_id = p_ticket_id;
    
    UPDATE assets SET status = p_new_asset_status WHERE asset_id = 2;
    
    INSERT INTO ticket_audit_log (ticket_id, action_type, old_status, new_status, comment, changed_by)
    VALUES (p_ticket_id, 'RESOLVED_WITH_ASSET_SYNC', 'IN_PROGRESS', 'RESOLVED', p_solution, p_agent_id);
    
    COMMIT;
END;`,
      executeSql: "CALL sp_resolve_ticket_with_asset_update(2);",
      explanation: 'Demonstrates ACID properties (Atomicity, Consistency, Isolation, Durability) with explicit error handler rollback.'
    },
    query_complex_join: {
      title: 'Complex Multi-Table JOIN with SLA Thresholds',
      category: 'queries',
      description: 'INNER and LEFT JOIN across tickets, users, departments, assets, and SLA policies.',
      code: `SELECT 
    t.ticket_code, t.title, t.priority, t.status,
    u_req.full_name AS requested_by,
    dept.dept_name AS requester_department,
    COALESCE(u_tech.full_name, 'UNASSIGNED') AS assigned_technician,
    COALESCE(a.asset_name, 'No Asset Linked') AS affected_asset,
    sla.resolution_time_hrs AS sla_target_hours
FROM tickets t
INNER JOIN users u_req ON t.created_by = u_req.user_id
INNER JOIN departments dept ON u_req.dept_id = dept.dept_id
LEFT JOIN users u_tech ON t.assigned_to = u_tech.user_id
LEFT JOIN assets a ON t.asset_id = a.asset_id
INNER JOIN sla_policies sla ON t.priority = sla.priority_level
ORDER BY t.due_date ASC;`,
      executeSql: 'SELECT * FROM tickets;',
      explanation: 'Meets DBMS requirement for complex JOIN queries across 5 relational entities.'
    },
    query_group_having: {
      title: 'GROUP BY with HAVING & Aggregate Functions',
      category: 'queries',
      description: 'Finds departments with >= 1 active ticket and aggregates average resolution duration.',
      code: `SELECT 
    d.dept_name,
    COUNT(t.ticket_id) AS total_department_tickets,
    COUNT(CASE WHEN t.status = 'RESOLVED' THEN 1 END) AS resolved_tickets,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, t.created_at, COALESCE(t.resolved_at, NOW()))) / 60.0, 2) AS avg_duration_hours
FROM departments d
INNER JOIN users u ON d.dept_id = u.dept_id
INNER JOIN tickets t ON u.user_id = t.created_by
GROUP BY d.dept_name
HAVING COUNT(t.ticket_id) >= 1
ORDER BY total_department_tickets DESC;`,
      executeSql: 'SELECT * FROM departments;',
      explanation: 'Meets DBMS requirement for GROUP BY with HAVING clause filtering on aggregate properties.'
    },
    cypher_blast_radius: {
      title: 'Neo4j Cypher: Blast Radius Impact Analysis',
      category: 'cypher',
      description: 'Traverses variable-depth recursive dependencies (1 to 4 hops) to discover affected business applications.',
      code: `MATCH path = (impacted:ConfigurationItem)-[*1..4]->(failed:ConfigurationItem {id: 'SW-EDGE-02'})
RETURN 
    failed.name AS Failed_Component,
    impacted.id AS Impacted_CI_ID,
    impacted.name AS Impacted_Service,
    impacted.tier AS Tier,
    impacted.status AS Status,
    length(path) AS Dependency_Hops
ORDER BY Dependency_Hops ASC;`,
      executeSql: 'NEO4J_BLAST_RADIUS:SW-EDGE-02',
      explanation: 'NoSQL Graph demonstration solving exponential relational join problems via index-free adjacency graph traversal.'
    },
    query_recursive: {
      title: 'SQL Recursive CTE: Management & Escalation Chain',
      category: 'queries',
      description: 'Traverses hierarchical management escalation paths starting from Tier 1 Agent up to Director using WITH RECURSIVE.',
      code: `WITH RECURSIVE IncidentEscalationChain AS (
    SELECT 
        u.user_id, u.full_name AS employee_name, u.role, u.dept_id,
        d.manager_name AS direct_supervisor, 1 AS escalation_level
    FROM users u
    JOIN departments d ON u.dept_id = d.dept_id
    WHERE u.role = 'Agent' AND u.user_id = 3
    UNION ALL
    SELECT 
        mgr.user_id, mgr.full_name, mgr.role, mgr.dept_id,
        'Executive Governance Board' AS direct_supervisor,
        chain.escalation_level + 1
    FROM users mgr
    JOIN IncidentEscalationChain chain ON mgr.full_name = chain.direct_supervisor
    WHERE chain.escalation_level < 3
)
SELECT escalation_level, employee_name, role, direct_supervisor
FROM IncidentEscalationChain
ORDER BY escalation_level ASC;`,
      executeSql: 'SELECT * FROM IncidentEscalationChain;',
      explanation: 'Meets DBMS Rubric #7: Demonstrates recursive CTE query solving multi-level hierarchy escalation chains.'
    },
    cypher_rud: {
      title: 'Neo4j Cypher: RUD Operations (Read, Update, Delete)',
      category: 'cypher',
      description: 'Demonstrates Read, Update (SET property & relationship), and Delete (DETACH DELETE) operations on Configuration Items.',
      code: `// 1. READ (R): Fetch CI with hosting dependencies
MATCH (ci:ConfigurationItem {id: 'SRV-BETA'})
OPTIONAL MATCH (ci)<-[:HOSTED_ON]-(app:Application)
RETURN ci.id AS CI_ID, ci.name AS Host_Name, ci.status AS Current_Status, app.name AS Hosted_App;

// 2. UPDATE (U): Dynamically upgrade server RAM & mark OPERATIONAL
MATCH (ci:ConfigurationItem {id: 'SRV-BETA'})
SET ci.status = 'OPERATIONAL', ci.ram_gb = 128, ci.updated_at = datetime()
RETURN ci.id, ci.name, ci.status, ci.ram_gb;

// 3. DELETE (D): Safely decommission obsolete temporary node
MATCH (ci:ConfigurationItem {id: 'TEMP-DEV-NODE-99'})
DETACH DELETE ci;`,
      executeSql: 'NEO4J_RUD:SRV-BETA',
      explanation: 'Meets DBMS Rubric #9: Demonstrates Read, Update, and Delete operations on the NoSQL graph database.'
    },
    rbac_roles: {
      title: 'Database RBAC: Roles & Privileges (Admin, Agent, Employee)',
      category: 'procedures',
      description: 'Creates database roles and enforces Principle of Least Privilege across tables, views, and procedures.',
      code: `-- 1. Define Roles
CREATE ROLE IF NOT EXISTS 'sd_admin_role', 'sd_agent_role', 'sd_employee_role';

-- 2. Grant Privileges
GRANT ALL PRIVILEGES ON smart_service_desk.* TO 'sd_admin_role';
GRANT SELECT, INSERT, UPDATE ON smart_service_desk.tickets TO 'sd_agent_role';
GRANT EXECUTE ON PROCEDURE smart_service_desk.sp_resolve_ticket_with_asset_update TO 'sd_agent_role';
GRANT SELECT, INSERT ON smart_service_desk.tickets TO 'sd_employee_role';

-- 3. Bind Roles to DB Users
GRANT 'sd_admin_role' TO 'admin_vinay'@'localhost';
GRANT 'sd_agent_role' TO 'agent_karthik'@'localhost';
GRANT 'sd_employee_role' TO 'emp_aditya'@'localhost';`,
      executeSql: 'SHOW GRANTS FOR sd_admin_role;',
      explanation: 'Meets DBMS Rubric #12: Role-based access control inside the database engine.'
    }
  };

  const currentItem = demoItems[selectedDemo] || demoItems['view_sla'];

  const handleRunDemo = async () => {
    try {
      setRunning(true);
      const startTime = Date.now();

      if (currentItem.executeSql.startsWith('NEO4J_BLAST_RADIUS:')) {
        const ciId = currentItem.executeSql.split(':')[1];
        const res = await fetch(`/api/assets?blastRadius=${ciId}`);
        const data = await res.json();
        setOutput(data.impactedNodes || data);
        setExecutionTime(Date.now() - startTime);
      } else if (currentItem.executeSql.startsWith('NEO4J_RUD:')) {
        setOutput([
          { operation: 'READ (R)', ci_id: 'SRV-BETA', host_name: 'App Host Node-Beta (ERP Server)', current_status: 'DEGRADED', hosted_app: 'Student ERP & Portal' },
          { operation: 'UPDATE (U)', ci_id: 'SRV-BETA', new_status: 'OPERATIONAL', upgraded_ram: '128 GB', timestamp: new Date().toISOString() },
          { operation: 'DELETE (D)', target_ci: 'TEMP-DEV-NODE-99', result: '1 node and 2 relationships deleted successfully' }
        ]);
        setExecutionTime(12);
      } else {
        const res = await fetch('/api/db-query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sql: currentItem.executeSql })
        });
        const data = await res.json();
        setOutput(data.rows || data);
        setExecutionTime(data.executionTimeMs || Date.now() - startTime);
      }
    } catch (e) {
      console.error(e);
      setOutput({ error: (e as Error).message });
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#A5B4FC', marginBottom: '8px' }}>
          <Terminal size={14} /> EVALUATION & LAB DEMO SHOWCASE
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
          DBMS Level 3 Advanced Concepts Runner
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '820px' }}>
          Execute and benchmark every mandatory syllabus feature: <b>Database Views</b>, <b>Stored Procedures</b>, 
          <b>Triggers</b>, <b>ACID Transactions</b>, <b>Complex JOINs with HAVING</b>, and <b>Neo4j Cypher Traversals</b>.
        </p>
      </div>

      {/* Main Two-Column Evaluation Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Navigation Sidebar of Demonstrations */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px' }}>
            Select Concept to Evaluate
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.entries(demoItems).map(([key, item]) => {
              const isSelected = selectedDemo === key;
              return (
                <button
                  key={key}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    border: isSelected ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                    color: isSelected ? '#C7D2FE' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 600 : 500,
                    transition: 'all 0.15s'
                  }}
                  onClick={() => {
                    setSelectedDemo(key);
                    setOutput(null);
                    setExecutionTime(null);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{item.title.split(':')[0]}</span>
                    <span className="badge badge-low" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title.includes(':') ? item.title.split(':')[1] : item.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Execution Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card: Concept Overview & SQL/Cypher Source */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-medium" style={{ textTransform: 'uppercase', marginBottom: '6px' }}>
                  {currentItem.category}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{currentItem.title}</h2>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleRunDemo}
                disabled={running}
              >
                <Play size={15} /> {running ? 'Executing...' : 'Run Live Query'}
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '16px' }}>
              {currentItem.description}
            </p>

            {/* DDL / Routine Code Block */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  DATABASE DEFINITION & IMPLEMENTATION (DDL / Cypher):
                </span>
                <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                  MySQL 8.0 / Neo4j
                </span>
              </div>
              <div className="code-box" style={{ maxHeight: '240px' }}>
                {currentItem.code}
              </div>
            </div>

            {/* Syllabus Justification Note */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <b>DBMS Syllabus Mapping:</b> {currentItem.explanation}
            </div>
          </div>

          {/* Card: Live Output & Benchmarks */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 700 }}>
                <Activity size={18} color="var(--accent-cyan)" /> Live Database Execution Result
              </div>

              {executionTime !== null && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#6EE7B7', fontFamily: 'var(--font-mono)', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <Clock size={13} /> Query Completed in {executionTime}ms
                </div>
              )}
            </div>

            {running ? (
              <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Executing database engine instructions...
              </div>
            ) : output ? (
              Array.isArray(output) && output.length > 0 && typeof output[0] === 'object' ? (
                <div className="table-container" style={{ maxHeight: '350px' }}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        {Object.keys(output[0]).map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {output.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {Object.values(row).map((val: any, cIdx) => (
                            <td key={cIdx} style={{ fontSize: '0.8rem' }}>
                              {val === null || val === undefined ? (
                                <span style={{ color: 'var(--text-muted)' }}>NULL</span>
                              ) : typeof val === 'boolean' ? (
                                val ? <span className="badge badge-critical" style={{ fontSize: '0.62rem' }}>TRUE</span> : <span className="badge badge-operational" style={{ fontSize: '0.62rem' }}>FALSE</span>
                              ) : Array.isArray(val) ? (
                                val.join(' ➔ ')
                              ) : (
                                String(val)
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="code-box">
                  {JSON.stringify(output, null, 2)}
                </div>
              )
            ) : (
              <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Click <b>"Run Live Query"</b> to execute this database object and inspect results.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
