-- ============================================================================
-- DBMS Level 3 Project: Smart IT Service Desk with Asset Management & AI Knowledge Search
-- Relational Database Schema (MySQL 8.0 / PostgreSQL Compatible)
-- Includes: DDL (CREATE, ALTER, DROP), Constraints, Indexes, Views,
--           Triggers, Stored Procedures, Functions, and ACID Transactions
-- ============================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS smart_service_desk;
USE smart_service_desk;

-- ============================================================================
-- 1. CLEANUP / DROP EXISTING OBJECTS (Demonstrating DROP)
-- ============================================================================
DROP TRIGGER IF EXISTS trg_ticket_before_insert_sla;
DROP TRIGGER IF EXISTS trg_ticket_after_update_audit;
DROP TRIGGER IF EXISTS trg_ticket_before_update_resolved;

DROP PROCEDURE IF EXISTS sp_auto_assign_ticket;
DROP PROCEDURE IF EXISTS sp_escalate_breached_tickets;
DROP PROCEDURE IF EXISTS sp_resolve_ticket_with_asset_update;

DROP FUNCTION IF EXISTS fn_is_sla_breached;
DROP FUNCTION IF EXISTS fn_agent_open_ticket_count;

DROP VIEW IF EXISTS v_active_tickets_sla;
DROP VIEW IF EXISTS v_agent_workload_metrics;
DROP VIEW IF EXISTS v_asset_failure_frequency;

DROP TABLE IF EXISTS ticket_audit_log;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS knowledge_base;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS sla_policies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

-- ============================================================================
-- 2. DDL: TABLE DEFINITIONS & CONSTRAINTS
-- ============================================================================

-- Table: departments
CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    manager_name VARCHAR(100) NOT NULL,
    building_location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: users (Supports Minimum 3 Roles: Admin, Agent, Employee)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL DEFAULT 'pbkdf2:sha256:default_hash',
    role ENUM('Admin', 'Agent', 'Employee') NOT NULL DEFAULT 'Employee',
    dept_id INT NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_dept FOREIGN KEY (dept_id) 
        REFERENCES departments(dept_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table: sla_policies (Defines Service Level Agreement thresholds)
CREATE TABLE sla_policies (
    sla_id INT AUTO_INCREMENT PRIMARY KEY,
    priority_level ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL UNIQUE,
    response_time_hrs DECIMAL(5,2) NOT NULL,
    resolution_time_hrs DECIMAL(5,2) NOT NULL,
    escalation_threshold_hrs DECIMAL(5,2) NOT NULL,
    CONSTRAINT chk_sla_positive_times CHECK (
        response_time_hrs > 0 AND 
        resolution_time_hrs >= response_time_hrs AND 
        escalation_threshold_hrs <= resolution_time_hrs
    )
) ENGINE=InnoDB;

-- Table: assets (IT Asset Inventory & Configuration Items)
CREATE TABLE assets (
    asset_id INT AUTO_INCREMENT PRIMARY KEY,
    asset_tag VARCHAR(50) NOT NULL UNIQUE,
    asset_name VARCHAR(150) NOT NULL,
    asset_type ENUM('Server', 'Database', 'Network Switch', 'Laptop', 'Cloud Service', 'Storage') NOT NULL,
    status ENUM('OPERATIONAL', 'DEGRADED', 'OUTAGE', 'MAINTENANCE') NOT NULL DEFAULT 'OPERATIONAL',
    ip_address VARCHAR(45),
    location VARCHAR(100) NOT NULL,
    owner_id INT,
    criticality ENUM('LOW', 'MEDIUM', 'HIGH', 'MISSION_CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    purchase_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assets_owner FOREIGN KEY (owner_id) 
        REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table: tickets (Service Requests & Incident Management)
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_code VARCHAR(30) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Hardware', 'Software', 'Network', 'Security', 'Access') NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    asset_id INT,
    created_by INT NOT NULL,
    assigned_to INT,
    due_date TIMESTAMP NULL,
    resolved_at TIMESTAMP NULL,
    sla_breached BOOLEAN DEFAULT FALSE,
    resolution_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tickets_asset FOREIGN KEY (asset_id) 
        REFERENCES assets(asset_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_tickets_creator FOREIGN KEY (created_by) 
        REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_tickets_agent FOREIGN KEY (assigned_to) 
        REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table: ticket_audit_log (Tracks status transitions & technician actions)
CREATE TABLE ticket_audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    comment TEXT,
    changed_by INT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_ticket FOREIGN KEY (ticket_id) 
        REFERENCES tickets(ticket_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_audit_user FOREIGN KEY (changed_by) 
        REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Table: knowledge_base (AI searchable technical documentation)
CREATE TABLE knowledge_base (
    kb_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    keywords VARCHAR(255) NOT NULL,
    problem_summary TEXT NOT NULL,
    resolution_steps TEXT NOT NULL,
    applicable_asset_type VARCHAR(50) DEFAULT 'ALL',
    view_count INT DEFAULT 0,
    helpful_votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================================
-- 3. DDL: ALTER TABLE OPERATIONS (Demonstrating Schema Evolution / ALTER)
-- ============================================================================
-- Add fulltext index capability and extra tag column
ALTER TABLE knowledge_base ADD COLUMN tags VARCHAR(150) DEFAULT 'general';
ALTER TABLE tickets ADD COLUMN impact_score INT DEFAULT 1;
ALTER TABLE tickets ADD CONSTRAINT chk_impact_range CHECK (impact_score BETWEEN 1 AND 5);

-- ============================================================================
-- 4. INDEXING (Performance Optimization)
-- ============================================================================
-- B-Tree indexes for frequent filtering & joins
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_priority_status ON tickets(priority, status);
CREATE INDEX idx_assets_type_status ON assets(asset_type, status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_audit_ticket ON ticket_audit_log(ticket_id, logged_at);

-- Full-text index on Knowledge Base for keyword search
CREATE FULLTEXT INDEX idx_ft_kb_search ON knowledge_base(title, problem_summary, resolution_steps);

-- ============================================================================
-- 5. VIEWS (Database Abstraction & Aggregation)
-- ============================================================================

-- View 1: Active tickets with real-time SLA metrics
CREATE OR REPLACE VIEW v_active_tickets_sla AS
SELECT 
    t.ticket_id,
    t.ticket_code,
    t.title,
    t.category,
    t.priority,
    t.status,
    t.created_at,
    t.due_date,
    t.sla_breached,
    TIMESTAMPDIFF(HOUR, NOW(), t.due_date) AS hours_remaining_to_resolve,
    u_creator.full_name AS requester_name,
    u_agent.full_name AS assigned_agent_name,
    a.asset_name,
    a.asset_tag
FROM tickets t
JOIN users u_creator ON t.created_by = u_creator.user_id
LEFT JOIN users u_agent ON t.assigned_to = u_agent.user_id
LEFT JOIN assets a ON t.asset_id = a.asset_id
WHERE t.status IN ('OPEN', 'IN_PROGRESS');

-- View 2: Agent workload and performance metrics
CREATE OR REPLACE VIEW v_agent_workload_metrics AS
SELECT 
    u.user_id AS agent_id,
    u.full_name AS agent_name,
    u.email,
    COUNT(CASE WHEN t.status = 'OPEN' THEN 1 END) AS open_tickets,
    COUNT(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 END) AS in_progress_tickets,
    COUNT(CASE WHEN t.status IN ('OPEN', 'IN_PROGRESS') THEN 1 END) AS total_active_workload,
    COUNT(CASE WHEN t.status = 'RESOLVED' THEN 1 END) AS resolved_tickets,
    COUNT(CASE WHEN t.sla_breached = TRUE THEN 1 END) AS breached_tickets,
    COALESCE(ROUND(AVG(TIMESTAMPDIFF(MINUTE, t.created_at, t.resolved_at)) / 60.0, 2), 0.0) AS avg_resolution_hours
FROM users u
LEFT JOIN tickets t ON u.user_id = t.assigned_to
WHERE u.role = 'Agent' AND u.is_active = TRUE
GROUP BY u.user_id, u.full_name, u.email;

-- View 3: Asset incident frequency and failure hotspot analysis
CREATE OR REPLACE VIEW v_asset_failure_frequency AS
SELECT 
    a.asset_id,
    a.asset_tag,
    a.asset_name,
    a.asset_type,
    a.status AS current_status,
    a.criticality,
    COUNT(t.ticket_id) AS total_incidents,
    COUNT(CASE WHEN t.priority = 'CRITICAL' THEN 1 END) AS critical_incidents,
    MAX(t.created_at) AS last_incident_time
FROM assets a
LEFT JOIN tickets t ON a.asset_id = t.asset_id
GROUP BY a.asset_id, a.asset_tag, a.asset_name, a.asset_type, a.status, a.criticality;

-- ============================================================================
-- 6. TRIGGERS (Automated Data Integrity & Auditing)
-- ============================================================================

-- Trigger 1: Automatically calculate due_date based on SLA policy before insert
DELIMITER $$
CREATE TRIGGER trg_ticket_before_insert_sla
BEFORE INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE v_hours DECIMAL(5,2);
    
    -- Lookup resolution hours from SLA policies
    SELECT resolution_time_hrs INTO v_hours
    FROM sla_policies
    WHERE priority_level = NEW.priority
    LIMIT 1;
    
    -- Default to 24 hours if SLA policy is missing
    IF v_hours IS NULL THEN
        SET v_hours = 24.0;
    END IF;
    
    -- Set due date
    IF NEW.due_date IS NULL THEN
        SET NEW.due_date = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL FLOOR(v_hours * 60) MINUTE);
    END IF;
END$$

-- Trigger 2: Automatically audit status changes into ticket_audit_log
CREATE TRIGGER trg_ticket_after_update_audit
AFTER UPDATE ON tickets
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO ticket_audit_log (
            ticket_id, 
            action_type, 
            old_status, 
            new_status, 
            comment, 
            changed_by, 
            logged_at
        ) VALUES (
            NEW.ticket_id,
            'STATUS_CHANGE',
            OLD.status,
            NEW.status,
            CONCAT('Status transitioned from ', OLD.status, ' to ', NEW.status),
            NEW.assigned_to,
            CURRENT_TIMESTAMP
        );
    END IF;
END$$

-- Trigger 3: Automatically record resolution timestamp when ticket is resolved
CREATE TRIGGER trg_ticket_before_update_resolved
BEFORE UPDATE ON tickets
FOR EACH ROW
BEGIN
    IF NEW.status = 'RESOLVED' AND (OLD.status <> 'RESOLVED' OR NEW.resolved_at IS NULL) THEN
        SET NEW.resolved_at = CURRENT_TIMESTAMP;
        
        -- Check if resolved past due date
        IF NEW.due_date IS NOT NULL AND CURRENT_TIMESTAMP > NEW.due_date THEN
            SET NEW.sla_breached = TRUE;
        END IF;
    END IF;
END$$
DELIMITER ;

-- ============================================================================
-- 7. STORED PROCEDURES & FUNCTIONS (Business Logic in Database)
-- ============================================================================

DELIMITER $$

-- Function 1: Check whether a ticket is currently breached
CREATE FUNCTION fn_is_sla_breached(p_ticket_id INT) 
RETURNS BOOLEAN
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_due TIMESTAMP;
    DECLARE v_status VARCHAR(20);
    DECLARE v_resolved TIMESTAMP;
    
    SELECT due_date, status, resolved_at 
    INTO v_due, v_status, v_resolved
    FROM tickets
    WHERE ticket_id = p_ticket_id;
    
    IF v_due IS NULL THEN
        RETURN FALSE;
    END IF;
    
    IF v_status = 'RESOLVED' AND v_resolved > v_due THEN
        RETURN TRUE;
    ELSEIF v_status IN ('OPEN', 'IN_PROGRESS') AND CURRENT_TIMESTAMP > v_due THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END$$

-- Function 2: Count active open tickets for an agent
CREATE FUNCTION fn_agent_open_ticket_count(p_agent_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_count INT;
    
    SELECT COUNT(*) INTO v_count
    FROM tickets
    WHERE assigned_to = p_agent_id 
      AND status IN ('OPEN', 'IN_PROGRESS');
      
    RETURN v_count;
END$$

-- Procedure 1: Smart Auto-Assign Ticket to Agent with Lowest Workload
CREATE PROCEDURE sp_auto_assign_ticket(
    IN p_ticket_id INT,
    OUT p_assigned_agent_id INT
)
BEGIN
    DECLARE v_best_agent INT;
    
    -- Find available agent with lowest active ticket load
    SELECT u.user_id INTO v_best_agent
    FROM users u
    LEFT JOIN tickets t ON u.user_id = t.assigned_to AND t.status IN ('OPEN', 'IN_PROGRESS')
    WHERE u.role = 'Agent' AND u.is_active = TRUE
    GROUP BY u.user_id
    ORDER BY COUNT(t.ticket_id) ASC, u.user_id ASC
    LIMIT 1;
    
    IF v_best_agent IS NOT NULL THEN
        UPDATE tickets 
        SET assigned_to = v_best_agent,
            status = CASE WHEN status = 'OPEN' THEN 'IN_PROGRESS' ELSE status END
        WHERE ticket_id = p_ticket_id;
        
        INSERT INTO ticket_audit_log (
            ticket_id, action_type, old_status, new_status, comment, changed_by
        ) VALUES (
            p_ticket_id, 'AUTO_ASSIGN', 'OPEN', 'IN_PROGRESS', 
            CONCAT('Auto-assigned to agent ID ', v_best_agent, ' based on minimum queue workload.'),
            v_best_agent
        );
        
        SET p_assigned_agent_id = v_best_agent;
    ELSE
        SET p_assigned_agent_id = NULL;
    END IF;
END$$

-- Procedure 2: Escalate Breached Tickets to CRITICAL Priority
CREATE PROCEDURE sp_escalate_breached_tickets()
BEGIN
    -- Update tickets that have passed due date and are still pending
    UPDATE tickets
    SET sla_breached = TRUE,
        priority = 'CRITICAL'
    WHERE status IN ('OPEN', 'IN_PROGRESS')
      AND due_date IS NOT NULL
      AND CURRENT_TIMESTAMP > due_date;
      
    SELECT ROW_COUNT() AS escalated_tickets_count;
END$$

-- ============================================================================
-- 8. ACID TRANSACTION DEMONSTRATION
-- ============================================================================
-- Atomic Resolution: Resolves ticket, updates related Asset status,
-- records resolution summary, and creates an audit entry within a single transaction.
CREATE PROCEDURE sp_resolve_ticket_with_asset_update(
    IN p_ticket_id INT,
    IN p_agent_id INT,
    IN p_solution TEXT,
    IN p_new_asset_status VARCHAR(20)
)
proc_label: BEGIN
    DECLARE v_asset_id INT;
    DECLARE v_current_status VARCHAR(20);
    
    -- Declare error handler with rollback
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Step 1: Verify ticket exists and is open
    SELECT status, asset_id INTO v_current_status, v_asset_id
    FROM tickets
    WHERE ticket_id = p_ticket_id
    FOR UPDATE;
    
    IF v_current_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ticket not found.';
    END IF;
    
    IF v_current_status = 'RESOLVED' OR v_current_status = 'CLOSED' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ticket is already resolved or closed.';
    END IF;
    
    -- Step 2: Update Ticket status and solution
    UPDATE tickets
    SET status = 'RESOLVED',
        resolution_summary = p_solution,
        resolved_at = CURRENT_TIMESTAMP
    WHERE ticket_id = p_ticket_id;
    
    -- Step 3: Update Asset status if ticket had an associated asset
    IF v_asset_id IS NOT NULL AND p_new_asset_status IS NOT NULL THEN
        UPDATE assets
        SET status = p_new_asset_status
        WHERE asset_id = v_asset_id;
    END IF;
    
    -- Step 4: Record detailed audit log
    INSERT INTO ticket_audit_log (
        ticket_id, action_type, old_status, new_status, comment, changed_by
    ) VALUES (
        p_ticket_id, 'RESOLVED_WITH_ASSET_SYNC', v_current_status, 'RESOLVED',
        CONCAT('Resolution: ', p_solution, ' | Asset status updated to: ', COALESCE(p_new_asset_status, 'N/A')),
        p_agent_id
    );
    
    -- Commit transaction
    COMMIT;
END$$

DELIMITER ;
