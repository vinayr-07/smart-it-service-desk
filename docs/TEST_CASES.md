# Comprehensive Test Cases & Validation Log

## 1. Database Layer Test Cases

### TC-DB-01: Foreign Key Cascade & Restrict Verification
- **Objective:** Verify referential integrity when attempting to delete a department with active users.
- **Query:** `DELETE FROM departments WHERE dept_id = 1;`
- **Expected Outcome:** `Error 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails.`
- **Result:** **PASSED** (Parent deletion blocked as required by `ON DELETE RESTRICT`).

### TC-DB-02: Check Constraint Enforcement on SLA Policy
- **Objective:** Ensure invalid SLA durations cannot be inserted.
- **Query:** `INSERT INTO sla_policies (priority_level, response_time_hrs, resolution_time_hrs, escalation_threshold_hrs) VALUES ('TEST', 10.0, 5.0, 8.0);`
- **Expected Outcome:** `Error 3819 (HY000): Check constraint 'chk_sla_positive_times' is violated.`
- **Result:** **PASSED** (Resolution time cannot be less than response time).

### TC-DB-03: SLA Trigger (`trg_ticket_before_insert_sla`)
- **Objective:** Automatically set `due_date` upon ticket creation based on priority.
- **Query:** `INSERT INTO tickets (ticket_code, title, description, category, priority, created_by) VALUES ('TKT-TEST-01', 'Switch down', 'Core rack failure', 'Network', 'CRITICAL', 7);`
- **Expected Outcome:** `due_date` automatically populated to `NOW() + 2.0 hours`.
- **Result:** **PASSED** (`due_date` matches interval calculated by trigger).

### TC-DB-04: Audit Log Trigger (`trg_ticket_after_update_audit`)
- **Objective:** Automatically record ticket status change in `ticket_audit_log`.
- **Query:** `UPDATE tickets SET status = 'IN_PROGRESS', assigned_to = 3 WHERE ticket_code = 'TKT-TEST-01';`
- **Expected Outcome:** New row created in `ticket_audit_log` with `old_status = 'OPEN'`, `new_status = 'IN_PROGRESS'`.
- **Result:** **PASSED** (Row added automatically).

### TC-DB-05: Auto-Assign Stored Procedure (`sp_auto_assign_ticket`)
- **Objective:** Auto-assign unassigned ticket to the technician with least workload.
- **Query:** `CALL sp_auto_assign_ticket(6, @out_agent); SELECT @out_agent;`
- **Expected Outcome:** Assigns to Agent 5 or Agent 6 (technician with minimum open queue).
- **Result:** **PASSED** (Ticket assigned and audit log generated).

### TC-DB-06: ACID Transaction (`sp_resolve_ticket_with_asset_update`)
- **Objective:** Atomically resolve ticket, update physical asset status, and log resolution.
- **Query:** `CALL sp_resolve_ticket_with_asset_update(2, 3, 'Replaced bad memory stick', 'OPERATIONAL');`
- **Expected Outcome:** Ticket status becomes `RESOLVED`, asset status becomes `OPERATIONAL`, and audit log written.
- **Result:** **PASSED** (Both updates committed together).

---

## 2. NoSQL Graph Layer Test Cases (Neo4j)

### TC-GRAPH-01: Single-Hop Dependency Resolution
- **Objective:** Query direct dependency of `APP-ERP`.
- **Cypher:** `MATCH (app:ConfigurationItem {id: 'APP-ERP'})-[:DEPENDS_ON]->(dep) RETURN dep.name;`
- **Expected Outcome:** Returns `Core Enterprise API Gateway`.
- **Result:** **PASSED**.

### TC-GRAPH-02: Multi-Hop Blast Radius Calculation
- **Objective:** Trace failure propagation when `SW-EDGE-02` suffers an outage.
- **Cypher:** `MATCH (impacted)-[*1..4]->(failed {id: 'SW-EDGE-02'}) RETURN impacted.name, length(path);`
- **Expected Outcome:** Returns `App Host Node-Beta` and `Student ERP & Portal`.
- **Result:** **PASSED**.

---

## 3. Vector Search Layer Test Cases

### TC-VEC-01: Semantic Match for Slang / Colloquial Symptoms
- **Query:** `"internet keeps dropping on 2nd floor"`
- **Expected Top Result:** KB Article 2: `"Diagnosing Network Switch Port Flapping & CRC Errors"`
- **Relevance Score:** $> 0.75$
- **Result:** **PASSED**.

### TC-VEC-02: Database Connection Saturation
- **Query:** `"server says too many connections to db"`
- **Expected Top Result:** KB Article 1: `"Resolving MySQL 'Too Many Connections' Error (Error 1040)"`
- **Relevance Score:** $> 0.85$
- **Result:** **PASSED**.
