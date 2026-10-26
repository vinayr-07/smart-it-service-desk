# Entity-Relationship (ER) Diagram & Schema Mapping

## 1. Architectural Overview
The relational component of the **Smart IT Service Desk** models the entities and relationships required for enterprise ITIL service operations:
- **Departments & Users:** Organization structure with hierarchical user roles (Admin, Agent, Employee).
- **SLA Policies:** Contractual turnaround times based on incident severity.
- **Assets (Configuration Items):** Physical and virtual assets linked to owners and incidents.
- **Tickets & Audit Trails:** The central operational entity capturing symptoms, state transitions, assignments, and resolutions.
- **Knowledge Base:** Curated problem-solution pairs linked to asset categories.

---

## 2. Mermaid Entity-Relationship Diagram

```mermaid
erDiagram
    DEPARTMENTS ||--o{ USERS : "employs"
    USERS ||--o{ ASSETS : "owns"
    USERS ||--o{ TICKETS : "creates (requester)"
    USERS ||--o{ TICKETS : "assigned_to (agent)"
    USERS ||--o{ TICKET_AUDIT_LOG : "records_change_by"
    SLA_POLICIES ||--o{ TICKETS : "governs"
    ASSETS ||--o{ TICKETS : "affected_in"
    TICKETS ||--o{ TICKET_AUDIT_LOG : "generates"
    ASSETS ||--o{ KNOWLEDGE_BASE : "relates_to"

    DEPARTMENTS {
        int dept_id PK
        string dept_name UK
        string manager_name
        string building_location
        timestamp created_at
    }

    USERS {
        int user_id PK
        string full_name
        string email UK
        string password_hash
        string role "Admin | Agent | Employee"
        int dept_id FK
        string phone
        boolean is_active
        timestamp created_at
    }

    SLA_POLICIES {
        int sla_id PK
        string priority_level UK "LOW | MEDIUM | HIGH | CRITICAL"
        decimal response_time_hrs
        decimal resolution_time_hrs
        decimal escalation_threshold_hrs
    }

    ASSETS {
        int asset_id PK
        string asset_tag UK
        string asset_name
        string asset_type "Server | Database | Network Switch | Laptop | Cloud Service | Storage"
        string status "OPERATIONAL | DEGRADED | OUTAGE | MAINTENANCE"
        string ip_address
        string location
        int owner_id FK
        string criticality "LOW | MEDIUM | HIGH | MISSION_CRITICAL"
        date purchase_date
        timestamp created_at
    }

    TICKETS {
        int ticket_id PK
        string ticket_code UK
        string title
        text description
        string category "Hardware | Software | Network | Security | Access"
        string priority "LOW | MEDIUM | HIGH | CRITICAL"
        string status "OPEN | IN_PROGRESS | RESOLVED | CLOSED"
        int asset_id FK
        int created_by FK
        int assigned_to FK
        timestamp due_date
        timestamp resolved_at
        boolean sla_breached
        text resolution_summary
        timestamp created_at
        timestamp updated_at
    }

    TICKET_AUDIT_LOG {
        int log_id PK
        int ticket_id FK
        string action_type
        string old_status
        string new_status
        text comment
        int changed_by FK
        timestamp logged_at
    }

    KNOWLEDGE_BASE {
        int kb_id PK
        string title
        string category
        string keywords
        text problem_summary
        text resolution_steps
        string applicable_asset_type
        int view_count
        int helpful_votes
        timestamp created_at
        timestamp updated_at
    }
```

---

## 3. Relational Schema Mapping & Integrity Constraints

1. **Primary Keys:**
   - Every table possesses an unambiguous primary key (`dept_id`, `user_id`, `sla_id`, `asset_id`, `ticket_id`, `log_id`, `kb_id`).
2. **Foreign Keys & Referential Actions:**
   - `users.dept_id` $\rightarrow$ `departments.dept_id` (`ON DELETE RESTRICT ON UPDATE CASCADE`)
   - `assets.owner_id` $\rightarrow$ `users.user_id` (`ON DELETE SET NULL ON UPDATE CASCADE`)
   - `tickets.created_by` $\rightarrow$ `users.user_id` (`ON DELETE RESTRICT ON UPDATE CASCADE`)
   - `tickets.assigned_to` $\rightarrow$ `users.user_id` (`ON DELETE SET NULL ON UPDATE CASCADE`)
   - `tickets.asset_id` $\rightarrow$ `assets.asset_id` (`ON DELETE SET NULL ON UPDATE CASCADE`)
   - `ticket_audit_log.ticket_id` $\rightarrow$ `tickets.ticket_id` (`ON DELETE CASCADE ON UPDATE CASCADE`)
3. **Domain & Check Constraints:**
   - `chk_sla_positive_times`: `response_time_hrs > 0 AND resolution_time_hrs >= response_time_hrs`
   - Role Domain: `'Admin'`, `'Agent'`, `'Employee'`
   - Ticket Priority: `'LOW'`, `'MEDIUM'`, `'HIGH'`, `'CRITICAL'`
   - Ticket Status: `'OPEN'`, `'IN_PROGRESS'`, `'RESOLVED'`, `'CLOSED'`
   - Asset Status: `'OPERATIONAL'`, `'DEGRADED'`, `'OUTAGE'`, `'MAINTENANCE'`
