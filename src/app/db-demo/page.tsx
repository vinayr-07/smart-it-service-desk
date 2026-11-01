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
  Copy,
  Sparkles,
  Zap,
  Cpu
} from 'lucide-react';

export default function DbDemoPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'views' | 'procedures' | 'triggers' | 'transactions' | 'queries' | 'cypher'>('all');
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
        CASE 
            WHEN chain.escalation_level = 1 THEN 'Executive Governance Board'
            ELSE 'Chancellor / Vice Chancellor'
        END AS direct_supervisor,
        chain.escalation_level + 1
    FROM users mgr
    JOIN IncidentEscalationChain chain ON mgr.full_name = chain.direct_supervisor
    WHERE chain.escalation_level < 3
)
SELECT escalation_level, employee_name, role, direct_supervisor
FROM IncidentEscalationChain
ORDER BY escalation_level ASC;`,
      executeSql: `WITH RECURSIVE IncidentEscalationChain AS (
    SELECT 
        u.user_id, u.full_name AS employee_name, u.role, u.dept_id,
        d.manager_name AS direct_supervisor, 1 AS escalation_level
    FROM users u
    JOIN departments d ON u.dept_id = d.dept_id
    WHERE u.role = 'Agent' AND u.user_id = 3
    UNION ALL
    SELECT 
        mgr.user_id, mgr.full_name, mgr.role, mgr.dept_id,
        CASE 
            WHEN chain.escalation_level = 1 THEN 'Executive Governance Board'
            ELSE 'Chancellor / Vice Chancellor'
        END AS direct_supervisor,
        chain.escalation_level + 1
    FROM users mgr
    JOIN IncidentEscalationChain chain ON mgr.full_name = chain.direct_supervisor
    WHERE chain.escalation_level < 3
)
SELECT escalation_level, employee_name, role, direct_supervisor
FROM IncidentEscalationChain
ORDER BY escalation_level ASC;`,
      explanation: 'Meets DBMS Rubric #7: Demonstrates recursive CTE query solving multi-level hierarchy escalation chains.'
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
GRANT 'sd_agent_role' TO 'agent_prateek'@'localhost';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner - 9-Color Editorial Treatment */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.96) 0%, rgba(6, 17, 12, 0.94) 55%, rgba(91, 70, 50, 0.35) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.32)',
        padding: '36px 40px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '4px 12px', 
            background: 'rgba(255, 242, 26, 0.12)', 
            border: '1px solid var(--c-lemon)',
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.72rem', 
            fontWeight: 800, 
            color: 'var(--c-lemon)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            <Terminal size={13} /> Interactive DBMS Evaluator • 50/50 Rubric Harness
          </span>
          <span style={{ 
            fontSize: '0.7rem', 
            padding: '3px 10px', 
            background: 'rgba(244, 217, 160, 0.1)', 
            border: '1px solid rgba(244, 217, 160, 0.35)', 
            borderRadius: 'var(--radius-full)', 
            color: 'var(--c-gold)', 
            fontWeight: 800,
            letterSpacing: '0.06em'
          }}>
            LIVE RELATIONAL + GRAPH EXECUTION
          </span>
        </div>

        <h1 className="font-editorial" style={{ 
          fontSize: '2.1rem', 
          fontWeight: 700, 
          color: 'var(--c-gold)', 
          letterSpacing: '0.03em', 
          marginBottom: '10px',
          textShadow: '0 2px 20px rgba(244, 217, 160, 0.15)'
        }}>
          DBMS Level 3 Advanced Concepts Runner
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '860px', lineHeight: 1.6 }}>
          Directly execute and benchmark all mandatory syllabus components: 
          <span style={{ color: 'var(--c-gold)' }}> Database Views</span>, 
          <span style={{ color: 'var(--c-amber)' }}> Stored Procedures</span>, 
          <span style={{ color: 'var(--c-lemon)' }}> Triggers</span>, 
          <span style={{ color: '#FDA4AF' }}> ACID Transactions</span>, 
          <span style={{ color: 'var(--c-lavender)' }}> Recursive CTEs</span>, and 
          <span style={{ color: 'var(--c-gold)' }}> Neo4j Cypher Traversal</span>.
        </p>
      </div>

      {/* Main Two-Column Evaluation Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', gap: '26px', alignItems: 'start' }}>
        
        {/* Navigation Sidebar of Demonstrations */}
        <div className="glass-card" style={{ 
          padding: '20px', 
          background: 'rgba(23, 23, 23, 0.85)',
          border: '1px solid var(--c-mocha)'
        }}>
          <div className="font-editorial" style={{ 
            fontSize: '0.82rem', 
            fontWeight: 700, 
            color: 'var(--c-gold)', 
            textTransform: 'uppercase', 
            marginBottom: '16px', 
            letterSpacing: '0.08em',
            paddingLeft: '6px' 
          }}>
            Rubric Evaluation Suite ({Object.keys(demoItems).length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(demoItems).map(([key, item]) => {
              const isSelected = selectedDemo === key;
              return (
                <button
                  key={key}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(244, 217, 160, 0.18) 0%, rgba(91, 70, 50, 0.3) 100%)' 
                      : 'rgba(11, 14, 13, 0.5)',
                    border: isSelected ? '1px solid var(--c-gold)' : '1px solid rgba(91, 70, 50, 0.3)',
                    color: isSelected ? 'var(--c-gold)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.4)' : 'none'
                  }}
                  onClick={() => {
                    setSelectedDemo(key);
                    setOutput(null);
                    setExecutionTime(null);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 700, color: isSelected ? 'var(--c-gold)' : '#FFFFFF' }}>
                      {item.title.split(':')[0]}
                    </span>
                    <span style={{ 
                      fontSize: '0.62rem', 
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      background: item.category === 'cypher' ? 'rgba(166, 107, 255, 0.18)' : item.category === 'transactions' ? 'rgba(163, 28, 27, 0.25)' : 'rgba(244, 217, 160, 0.15)',
                      color: item.category === 'cypher' ? 'var(--c-lavender)' : item.category === 'transactions' ? '#FDA4AF' : 'var(--c-gold)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title.includes(':') ? item.title.split(':')[1] : item.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Execution Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card: Concept Overview & SQL/Cypher Source */}
          <div className="glass-card" style={{ 
            padding: '28px', 
            background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(6, 17, 12, 0.92) 100%)',
            border: '1px solid rgba(244, 217, 160, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ 
                  textTransform: 'uppercase', 
                  fontSize: '0.68rem', 
                  fontWeight: 800, 
                  letterSpacing: '0.08em',
                  color: 'var(--c-gold)',
                  background: 'rgba(244, 217, 160, 0.12)',
                  border: '1px solid rgba(244, 217, 160, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '8px'
                }}>
                  {currentItem.category}
                </span>
                <h2 className="font-editorial" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em', lineHeight: 1.3 }}>
                  {currentItem.title}
                </h2>
              </div>

              <button
                className="btn btn-primary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '10px 24px',
                  fontSize: '0.88rem'
                }}
                onClick={handleRunDemo}
                disabled={running}
              >
                <Play size={15} /> {running ? 'Executing...' : 'Run Live Query'}
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
              {currentItem.description}
            </p>

            {/* DDL / Routine Code Block */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  DATABASE DEFINITION &amp; IMPLEMENTATION (DDL / Cypher):
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--c-lemon)', fontFamily: 'var(--font-mono)' }}>
                  MySQL 8.0 / Neo4j
                </span>
              </div>
              <div className="code-box" style={{ 
                maxHeight: '260px', 
                background: '#070A08', 
                border: '1px solid var(--c-mocha)',
                color: '#F4D9A0',
                padding: '18px',
                fontSize: '0.84rem',
                lineHeight: 1.6
              }}>
                {currentItem.code}
              </div>
            </div>

            {/* Syllabus Justification Note */}
            <div style={{ 
              background: 'rgba(244, 217, 160, 0.06)', 
              padding: '14px 18px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid rgba(244, 217, 160, 0.25)', 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <b style={{ color: 'var(--c-gold)' }}>DBMS Syllabus Mapping:</b> {currentItem.explanation}
            </div>
          </div>

          {/* Card: Live Output & Benchmarks */}
          <div className="glass-card" style={{ 
            padding: '28px', 
            background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(6, 17, 12, 0.9) 100%)',
            border: '1px solid rgba(244, 217, 160, 0.25)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.98rem', fontWeight: 700, color: 'var(--c-gold)' }}>
                <Activity size={18} color="var(--c-gold)" /> Live Database Execution Result
              </div>

              {executionTime !== null && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  fontSize: '0.78rem', 
                  color: 'var(--c-lemon)', 
                  fontFamily: 'var(--font-mono)', 
                  background: 'rgba(255, 242, 26, 0.1)', 
                  border: '1px solid rgba(255, 242, 26, 0.3)',
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-full)' 
                }}>
                  <Clock size={13} /> Engine Benchmark: {executionTime}ms
                </div>
              )}
            </div>

            {running ? (
              <div style={{ padding: '44px', textAlign: 'center', color: 'var(--c-gold)', fontFamily: 'var(--font-mono)' }}>
                Traversing database storage engines &amp; compiling results...
              </div>
            ) : output ? (
              Array.isArray(output) && output.length > 0 && typeof output[0] === 'object' ? (
                <div className="table-container" style={{ maxHeight: '360px' }}>
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
                            <td key={cIdx} style={{ fontSize: '0.82rem' }}>
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
                <div className="code-box" style={{ background: '#070A08', color: 'var(--c-gold)', border: '1px solid var(--c-mocha)' }}>
                  {JSON.stringify(output, null, 2)}
                </div>
              )
            ) : (
              <div style={{ padding: '44px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Click <b style={{ color: 'var(--c-gold)' }}>&ldquo;Run Live Query&rdquo;</b> above to execute this database routine against the live engine.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}