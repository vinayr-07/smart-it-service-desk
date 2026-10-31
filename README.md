# Smart IT Service Desk with Asset Management & AI Knowledge Search

> **DBMS Experiential Learning – Level 3 Project**  
> Department of Computer Science and Engineering, PES University  
> **Authors / Project Team:**  
> - **Vinay R** (`PES1UG24CS353`) — Team Lead  
> - **Prateek Hachadad** (`PES1UG24CS340`) — Co-Lead  
> **Multi-Model Database System:** SQL (MySQL 8.0) + NoSQL Graph (Neo4j) + Vector Search  

---

## 🌟 Executive Summary

Modern enterprise IT service desks manage thousands of incidents, complex infrastructure dependencies, and vast technical documentation. A simple relational CRUD system is insufficient for modeling failure propagation across interconnected IT topology or matching user issues against unstructured troubleshooting runbooks.

This project delivers a **Multi-Model Database Architecture** integrated with a **Next.js Web Application**:
1. **Relational Database (MySQL 8.0 / PostgreSQL):** Incident lifecycle, RBAC (Admin, Agent, Employee), SLA deadlines, automated triggers, stored procedures, audit logging, and ACID transactions.
2. **Graph Database (Neo4j):** Configuration Management Database (CMDB) mapping microservices, servers, switches, and databases with Cypher-driven **Blast Radius** and **Root Cause Analysis**.
3. **Vector Database / Semantic Search:** High-dimensional vector embeddings and Cosine Similarity to semantically retrieve diagnostic steps from IT runbooks.

---

## 🛠️ Technology Stack

- **Frontend & App Interface:** Next.js 14 / React 18, Vanilla CSS Design System with dark-mode glassmorphic aesthetics.
- **Backend & API Layer:** Next.js Route Handlers (`src/app/api/*`).
- **Primary Relational DB:** MySQL 8.0 (with complete schema, views, triggers, and stored routines in `database/schema.sql`).
- **NoSQL Graph DB:** Neo4j 5.x (with Cypher topology and impact analysis queries in `database/graph_schema.cypher`).
- **Vector Search Engine:** On-device Vector Embeddings with Cosine Similarity ranking (`database/vector_knowledge.json`).
- **Data Access:** Flexible driver layer supporting MySQL (`mysql2`), Neo4j (`neo4j-driver`), and integrated offline evaluation engine.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24 tested)
- **MySQL 8.0**: Local server running on port `3306` (or PostgreSQL)
- **Neo4j Sandbox / AuraDB / Desktop**: Running on Bolt port `7687` (Optional for live graph, app includes interactive topology viewer)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/smart-it-service-desk.git
cd mini-project
npm install
```

### 3. Database Initialization

#### A. MySQL Relational Database
Log in to MySQL and load the schema and seed scripts:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

#### B. Neo4j Graph Database
1. Open Neo4j Browser (or Neo4j Sandbox at [sandbox.neo4j.com](https://sandbox.neo4j.com)).
2. Copy and execute the contents of `database/graph_schema.cypher`.

### 4. Environment Configuration
Create a `.env.local` file in the root directory:
```env
# Relational Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_service_desk

# Neo4j Graph Database Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_neo4j_password

# Application Settings
NEXT_PUBLIC_APP_NAME="Smart IT Service Desk"
```

### 5. Running the Application
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 6. Linking and Pushing to GitHub
Link your local repository to your team's GitHub repository:
```bash
# Add your GitHub remote repository
git remote add origin https://github.com/<your-username>/smart-it-service-desk.git

# Set branch to main and push
git branch -M main
git push -u origin main
```
Alternatively, run the interactive helper script:
```powershell
.\scripts\push_to_github.ps1 -RepoUrl "https://github.com/<your-username>/smart-it-service-desk.git"
```

---

## 📁 Repository Directory Structure

```text
mini-project/
├── database/
│   ├── schema.sql              # MySQL DDL (Tables, Constraints, Indexes, Views, Triggers, Procedures, Transactions)
│   ├── seed.sql                # Comprehensive realistic dataset
│   ├── queries.sql             # Complex JOINs, GROUP BY HAVING, CTEs, and Routine executions
│   ├── graph_schema.cypher     # Neo4j topology CIs and Blast Radius impact analysis queries
│   └── vector_knowledge.json   # Knowledge Base articles with pre-computed vector embeddings
├── docs/
│   ├── PROJECT_DOCUMENTATION.md# Soft-copy documentation fulfilling all 12 syllabus requirements
│   ├── ER_DIAGRAM.md           # Entity-Relationship diagram and 3NF relational mapping
│   ├── TEST_CASES.md           # Comprehensive test cases and verification results
│   ├── screenshots/            # High-resolution screenshots of all app pages
│   └── diagrams/               # High-definition vector SVGs (ER, Schema, Architecture, CMDB)
├── scripts/
│   ├── capture_screenshots.py  # Automated UI screenshot capture script
│   └── push_to_github.ps1      # GitHub remote setup and push utility
├── src/
│   ├── app/
│   │   ├── api/                # Next.js backend API Route Handlers
│   │   │   ├── tickets/        # Ticket CRUD, Auto-assign, ACID Resolve
│   │   │   ├── assets/         # CMDB Asset inventory & Blast Radius API
│   │   │   ├── knowledge/      # AI Semantic Search API
│   │   │   ├── db-query/       # Interactive SQL query execution API
│   │   │   └── graph/          # Neo4j Cypher execution API
│   │   ├── tickets/page.tsx    # Incident management interface
│   │   ├── assets/page.tsx     # Interactive CMDB Topology & Impact Graph
│   │   ├── knowledge/page.tsx  # AI Knowledge Search interface
│   │   ├── db-demo/page.tsx    # Live DBMS Level 3 Evaluation Showcase
│   │   ├── layout.tsx          # App shell with role switcher (Admin / Agent / Employee)
│   │   ├── page.tsx            # Executive Operations Dashboard
│   │   └── globals.css         # Glassmorphic dark theme CSS design system
│   └── lib/
│       ├── db.ts               # Database connection layer (MySQL + resilient engine)
│       ├── neo4j.ts            # Neo4j Cypher execution client
│       └── vectorSearch.ts     # Cosine similarity vector search implementation
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🏆 DBMS Level 3 Rubric Checklist & Deliverables

| Requirement | Implementation Details | Status |
| :--- | :--- | :--- |
| **Option 1: SQL + NoSQL** | MySQL 8.0 (Relational) + Neo4j (Graph CMDB) | ✅ Implemented |
| **Option 2: Vector Search** | Cosine similarity semantic search over IT KB runbooks | ✅ Implemented |
| **ER Diagram & Schema** | 7 normalized tables in 3NF with PK, FK, CHECK constraints | ✅ Implemented |
| **DDL Operations** | `CREATE`, `ALTER`, `DROP`, Indexes, and Full-Text Search | ✅ Implemented |
| **DML Operations** | `INSERT`, `UPDATE`, `DELETE`, `SELECT` with multi-table `JOIN` | ✅ Implemented |
| **Advanced SQL Concept 1: Triggers** | `trg_ticket_before_insert_sla`, `trg_ticket_after_update_audit`, `trg_ticket_before_update_resolved` | ✅ Implemented |
| **Advanced SQL Concept 2: Procedures** | `sp_auto_assign_ticket`, `sp_escalate_breached_tickets`, `fn_is_sla_breached` | ✅ Implemented |
| **Advanced SQL Concept 3: Views** | `v_active_tickets_sla`, `v_agent_workload_metrics`, `v_asset_failure_frequency` | ✅ Implemented |
| **Advanced SQL Concept 4: Transactions** | `sp_resolve_ticket_with_asset_update` with `START TRANSACTION`, `COMMIT`, `ROLLBACK` | ✅ Implemented |
| **Advanced NoSQL Concept** | Cypher Blast Radius impact analysis & Shortest Dependency Path | ✅ Implemented |
| **Next.js Interface** | Modern UI with Dashboards, Ticket Manager, CMDB Topology, AI Search, and DB Evaluator | ✅ Implemented |
| **Soft Copy Documentation** | 12 required sections in `docs/PROJECT_DOCUMENTATION.md` | ✅ Implemented |

---

## 👥 Team Member Contributions

| Team Member | Roll / SRN | Responsibilities |
| :--- | :--- | :--- |
| **Team Member 1 (Lead)** | PES1UG24CS353 (Vinay R) | Relational Database Design (DDL, Triggers, Stored Procedures, ACID Transactions), Next.js Backend API integration, Neo4j Graph CMDB topology modeling. |
| **Team Member 2** | PES1UG24CS340 (Prateek Hachadad) | Vector Database Semantic Search implementation, Next.js Frontend Dashboard and UI components, Test Case validation and documentation. |

---

## 📜 License
Developed for academic purposes under the DBMS Experiential Learning curriculum at PES University.
