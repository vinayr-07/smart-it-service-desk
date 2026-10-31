-- ============================================================================
-- DBMS Level 3 Project: Smart IT Service Desk
-- Role-Based Access Control (RBAC) in MySQL Database Engine
-- Meets PDF Rubric #12: Role-based access control in database (4 Marks)
-- ============================================================================

USE smart_service_desk;

-- ----------------------------------------------------------------------------
-- 1. DEFINE SYSTEM ROLES
-- Minimum three operational tiers: Admin, Agent (Technician), Employee (End-User)
-- ----------------------------------------------------------------------------
CREATE ROLE IF NOT EXISTS 'sd_admin_role';
CREATE ROLE IF NOT EXISTS 'sd_agent_role';
CREATE ROLE IF NOT EXISTS 'sd_employee_role';

-- ----------------------------------------------------------------------------
-- 2. PRIVILEGE ASSIGNMENT TO ROLES (Principle of Least Privilege)
-- ----------------------------------------------------------------------------

-- A. ADMIN ROLE: Unrestricted administrative and DDL/DML access
GRANT ALL PRIVILEGES ON smart_service_desk.* TO 'sd_admin_role' WITH GRANT OPTION;

-- B. AGENT (TECHNICIAN) ROLE: Incident handling, asset updates, routine execution
GRANT SELECT, INSERT, UPDATE ON smart_service_desk.tickets TO 'sd_agent_role';
GRANT SELECT, UPDATE ON smart_service_desk.assets TO 'sd_agent_role';
GRANT SELECT, INSERT ON smart_service_desk.ticket_audit_log TO 'sd_agent_role';
GRANT SELECT ON smart_service_desk.knowledge_base TO 'sd_agent_role';
GRANT SELECT ON smart_service_desk.v_active_tickets_sla TO 'sd_agent_role';
GRANT SELECT ON smart_service_desk.v_agent_workload_metrics TO 'sd_agent_role';
GRANT SELECT ON smart_service_desk.v_asset_failure_frequency TO 'sd_agent_role';
GRANT EXECUTE ON PROCEDURE smart_service_desk.sp_auto_assign_ticket TO 'sd_agent_role';
GRANT EXECUTE ON PROCEDURE smart_service_desk.sp_resolve_ticket_with_asset_update TO 'sd_agent_role';
GRANT EXECUTE ON FUNCTION smart_service_desk.fn_is_sla_breached TO 'sd_agent_role';
GRANT EXECUTE ON FUNCTION smart_service_desk.fn_agent_open_ticket_count TO 'sd_agent_role';

-- C. EMPLOYEE (END-USER) ROLE: Raise tickets, read assets, view knowledge base
GRANT SELECT, INSERT ON smart_service_desk.tickets TO 'sd_employee_role';
GRANT SELECT ON smart_service_desk.assets TO 'sd_employee_role';
GRANT SELECT ON smart_service_desk.knowledge_base TO 'sd_employee_role';
GRANT SELECT ON smart_service_desk.departments TO 'sd_employee_role';

-- ----------------------------------------------------------------------------
-- 3. CREATE DATABASE USER ACCOUNTS AND BIND ROLES
-- ----------------------------------------------------------------------------
CREATE USER IF NOT EXISTS 'admin_vinay'@'localhost' IDENTIFIED BY 'AdminPass@2026';
CREATE USER IF NOT EXISTS 'agent_prateek'@'localhost' IDENTIFIED BY 'AgentPass@2026';
CREATE USER IF NOT EXISTS 'emp_aditya'@'localhost' IDENTIFIED BY 'EmpPass@2026';

-- Grant roles to users
GRANT 'sd_admin_role' TO 'admin_vinay'@'localhost';
GRANT 'sd_agent_role' TO 'agent_prateek'@'localhost';
GRANT 'sd_employee_role' TO 'emp_aditya'@'localhost';

-- Activate roles as default
SET DEFAULT ROLE 'sd_admin_role' TO 'admin_vinay'@'localhost';
SET DEFAULT ROLE 'sd_agent_role' TO 'agent_prateek'@'localhost';
SET DEFAULT ROLE 'sd_employee_role' TO 'emp_aditya'@'localhost';

-- ----------------------------------------------------------------------------
-- 4. VERIFICATION / AUDIT QUERIES
-- ----------------------------------------------------------------------------
-- View active role assignments
-- SHOW GRANTS FOR 'admin_vinay'@'localhost';
-- SHOW GRANTS FOR 'agent_karthik'@'localhost';
-- SHOW GRANTS FOR 'emp_aditya'@'localhost';

FLUSH PRIVILEGES;

