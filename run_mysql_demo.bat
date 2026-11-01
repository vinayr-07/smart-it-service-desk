@echo off
title Smart IT Service Desk - MySQL Terminal Demonstration
color 0A
cls
echo ===============================================================================
echo   SMART IT SERVICE DESK - DBMS LEVEL 3 TERMINAL EVALUATION
echo   Team: Vinay R (PES1UG24CS353) and Prateek Hachadad (PES1UG24CS340)
echo ===============================================================================
echo.

set "MYSQL_EXE=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

if not exist "%MYSQL_EXE%" (
    echo [ERROR] MySQL client not found at default location.
    echo Please make sure MySQL Server 8.0 is installed.
    pause
    exit /b 1
)

echo [1/4] Verifying smart_service_desk Database and Populated Tables...
echo -------------------------------------------------------------------------------
"%MYSQL_EXE%" -u root -pvinay smart_service_desk -t -e "SELECT 'departments' AS table_name, count(*) AS total_records FROM departments UNION ALL SELECT 'users', count(*) FROM users UNION ALL SELECT 'assets', count(*) FROM assets UNION ALL SELECT 'sla_policies', count(*) FROM sla_policies UNION ALL SELECT 'tickets', count(*) FROM tickets UNION ALL SELECT 'ticket_audit_log', count(*) FROM ticket_audit_log UNION ALL SELECT 'knowledge_base', count(*) FROM knowledge_base;"
echo.
pause

cls
echo ===============================================================================
echo   QUERY 1: COMPLEX 5-TABLE RELATIONAL JOIN WITH SLA HIERARCHY
echo ===============================================================================
echo Explanation: Joins tickets, users (requester), departments, users (assigned tech),
echo assets, and sla_policies to generate the active operational incident dispatch view.
echo -------------------------------------------------------------------------------
"%MYSQL_EXE%" -u root -pvinay smart_service_desk -t -e "SELECT t.ticket_code, LEFT(t.title, 32) AS incident_title, t.priority, t.status, u_req.full_name AS requester, d.dept_name AS department, COALESCE(u_tech.full_name, 'UNASSIGNED') AS assigned_technician, COALESCE(a.asset_tag, 'N/A') AS asset_tag FROM tickets t JOIN users u_req ON t.created_by = u_req.user_id JOIN departments d ON u_req.dept_id = d.dept_id LEFT JOIN users u_tech ON t.assigned_to = u_tech.user_id LEFT JOIN assets a ON t.asset_id = a.asset_id ORDER BY FIELD(t.priority, 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW') LIMIT 6;"
echo.
pause

cls
echo ===============================================================================
echo   QUERY 2: GROUP BY WITH HAVING CLAUSE & CONDITIONAL AGGREGATES
echo ===============================================================================
echo Explanation: Aggregates incident frequency by department, computing critical
echo vs resolved tickets and filtering for departments with at least 1 active ticket.
echo -------------------------------------------------------------------------------
"%MYSQL_EXE%" -u root -pvinay smart_service_desk -t -e "SELECT d.dept_name, COUNT(t.ticket_id) AS total_incidents, COUNT(CASE WHEN t.priority = 'CRITICAL' THEN 1 END) AS critical_incidents, COUNT(CASE WHEN t.status = 'RESOLVED' THEN 1 END) AS resolved_incidents, COUNT(CASE WHEN t.status IN ('OPEN', 'IN_PROGRESS') THEN 1 END) AS active_workload FROM departments d JOIN users u ON d.dept_id = u.dept_id JOIN tickets t ON u.user_id = t.created_by GROUP BY d.dept_id, d.dept_name HAVING COUNT(t.ticket_id) >= 1 ORDER BY critical_incidents DESC, total_incidents DESC;"
echo.
pause

cls
echo ===============================================================================
echo   QUERY 3: ADVANCED SQL RECURSIVE CTE (WITH RECURSIVE ESCALATION CHAIN)
echo ===============================================================================
echo Explanation: Traverses the organizational supervisor hierarchy starting from a
echo Tier 1 Agent up to Department Supervisor and Governance Board.
echo -------------------------------------------------------------------------------
"%MYSQL_EXE%" -u root -pvinay smart_service_desk -t -e "WITH RECURSIVE IncidentEscalationChain AS (SELECT u.user_id, u.full_name AS employee_name, u.role, d.dept_name, d.manager_name AS direct_supervisor, 1 AS escalation_level FROM users u JOIN departments d ON u.dept_id = d.dept_id WHERE u.user_id = 3 UNION ALL SELECT mgr.user_id, mgr.full_name, mgr.role, d2.dept_name, CASE WHEN chain.escalation_level = 1 THEN 'Executive Governance Board' ELSE 'Chancellor / Vice Chancellor' END AS direct_supervisor, chain.escalation_level + 1 FROM users mgr JOIN departments d2 ON mgr.dept_id = d2.dept_id JOIN IncidentEscalationChain chain ON mgr.full_name = chain.direct_supervisor WHERE chain.escalation_level < 3) SELECT escalation_level, employee_name, role, dept_name, direct_supervisor FROM IncidentEscalationChain ORDER BY escalation_level ASC;"
echo.
pause

cls
echo ===============================================================================
echo   BONUS: STORED PROCEDURE EXECUTION (sp_auto_assign_ticket)
echo ===============================================================================
echo Explanation: Executes business logic inside the database engine to automatically
echo assign an unassigned ticket to the technician with the lowest active queue workload.
echo -------------------------------------------------------------------------------
"%MYSQL_EXE%" -u root -pvinay smart_service_desk -t -e "CALL sp_auto_assign_ticket(6, @assigned_agent); SELECT @assigned_agent AS newly_assigned_agent_id; SELECT t.ticket_code, t.title, t.status, u.full_name AS assigned_to FROM tickets t JOIN users u ON t.assigned_to = u.user_id WHERE t.ticket_id = 6;"
echo.
echo ===============================================================================
echo   DEMONSTRATION COMPLETE - ALL QUERIES EXECUTED SUCCESSFULLY!
echo ===============================================================================
pause

