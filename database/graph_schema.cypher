// ============================================================================
// DBMS Level 3 Project: IT Asset CMDB Topology & Impact Analysis
// Graph Database Paradigm: Neo4j (Cypher Query Language)
// NoSQL Component for Asset Management & Blast Radius Dependency Traversal
// ============================================================================

// ----------------------------------------------------------------------------
// 1. CONSTRAINTS & INDEXES (Data Integrity & Fast Traversal)
// ----------------------------------------------------------------------------
CREATE CONSTRAINT unique_ci_id IF NOT EXISTS
FOR (c:ConfigurationItem) REQUIRE c.id IS UNIQUE;

CREATE INDEX idx_ci_type IF NOT EXISTS
FOR (c:ConfigurationItem) ON (c.type);

CREATE INDEX idx_ci_status IF NOT EXISTS
FOR (c:ConfigurationItem) ON (c.status);

// ----------------------------------------------------------------------------
// 2. CLEANUP PREVIOUS TOPOLOGY
// ----------------------------------------------------------------------------
MATCH (n:ConfigurationItem) DETACH DELETE n;

// ----------------------------------------------------------------------------
// 3. CREATE CONFIGURATION ITEM (CI) NODES
// Nodes represent IT Infrastructure, Cloud Services, and Business Applications
// ----------------------------------------------------------------------------

// Business Applications (Tier 1 & Tier 2)
CREATE (app_erp:ConfigurationItem:Application {
    id: 'APP-ERP', name: 'Student ERP & Portal', tier: 'Tier-1',
    business_criticality: 'CRITICAL', status: 'DEGRADED', owner: 'Academic Ops'
})
CREATE (app_pay:ConfigurationItem:Application {
    id: 'APP-PAY', name: 'Fee Payment Gateway', tier: 'Tier-1',
    business_criticality: 'CRITICAL', status: 'OPERATIONAL', owner: 'Finance'
})
CREATE (app_lms:ConfigurationItem:Application {
    id: 'APP-LMS', name: 'PESU Academy LMS', tier: 'Tier-2',
    business_criticality: 'HIGH', status: 'OPERATIONAL', owner: 'Academics'
})

// Microservices & APIs
CREATE (svc_auth:ConfigurationItem:Microservice {
    id: 'SVC-AUTH', name: 'Azure SSO Auth Service', port: 8443,
    status: 'OPERATIONAL', tech_stack: 'Node.js / Express'
})
CREATE (svc_api:ConfigurationItem:Microservice {
    id: 'SVC-API', name: 'Core Enterprise API Gateway', port: 443,
    status: 'OPERATIONAL', tech_stack: 'Go / Envoy'
})

// Databases
CREATE (db_mysql:ConfigurationItem:Database {
    id: 'DB-MYSQL', name: 'MySQL Cluster Node 1 (ERP DB)', port: 3306,
    status: 'OPERATIONAL', engine: 'MySQL 8.0 InnoDB'
})
CREATE (db_graph:ConfigurationItem:Database {
    id: 'DB-NEO4J', name: 'Neo4j CMDB Graph Cluster', port: 7687,
    status: 'OPERATIONAL', engine: 'Neo4j 5.x Enterprise'
})
CREATE (db_redis:ConfigurationItem:Database {
    id: 'DB-REDIS', name: 'Session Cache Redis Cluster', port: 6379,
    status: 'OPERATIONAL', engine: 'Redis 7.2'
})

// Physical / Virtual Servers
CREATE (srv_alpha:ConfigurationItem:Server {
    id: 'SRV-ALPHA', name: 'App Host Node-Alpha', ip: '192.168.10.11',
    os: 'Ubuntu 22.04 LTS', cpu_cores: 32, ram_gb: 128, status: 'OPERATIONAL'
})
CREATE (srv_beta:ConfigurationItem:Server {
    id: 'SRV-BETA', name: 'App Host Node-Beta (ERP Server)', ip: '192.168.10.12',
    os: 'Ubuntu 22.04 LTS', cpu_cores: 16, ram_gb: 64, status: 'DEGRADED'
})
CREATE (srv_db01:ConfigurationItem:Server {
    id: 'SRV-DB01', name: 'Database Host DB-Server-01', ip: '192.168.20.15',
    os: 'RHEL 9.1', cpu_cores: 64, ram_gb: 256, status: 'OPERATIONAL'
})

// Storage & Network Hardware
CREATE (sw_core:ConfigurationItem:NetworkDevice {
    id: 'SW-CORE-01', name: 'Cisco Core Backbone Switch 10G', ip: '192.168.1.1',
    model: 'Nexus 9300', status: 'OPERATIONAL'
})
CREATE (sw_edge:ConfigurationItem:NetworkDevice {
    id: 'SW-EDGE-02', name: 'CS Block Edge Access Switch', ip: '192.168.1.25',
    model: 'Catalyst 3850', status: 'OUTAGE'
})
CREATE (san_array:ConfigurationItem:Storage {
    id: 'SAN-ARRAY-01', name: 'NetApp Enterprise SAN Array', ip: '192.168.30.5',
    capacity_tb: 120, status: 'OPERATIONAL'
});

// ----------------------------------------------------------------------------
// 4. CREATE TOPOLOGY RELATIONSHIPS (EDGES)
// ----------------------------------------------------------------------------

// Application to Microservice / API dependencies
MATCH (app:ConfigurationItem {id: 'APP-ERP'}), (api:ConfigurationItem {id: 'SVC-API'})
CREATE (app)-[:DEPENDS_ON {protocol: 'HTTPS', sla_ms: 200}]->(api);

MATCH (app:ConfigurationItem {id: 'APP-PAY'}), (api:ConfigurationItem {id: 'SVC-API'})
CREATE (app)-[:DEPENDS_ON {protocol: 'HTTPS', sla_ms: 150}]->(api);

MATCH (app:ConfigurationItem {id: 'APP-LMS'}), (api:ConfigurationItem {id: 'SVC-API'})
CREATE (app)-[:DEPENDS_ON {protocol: 'HTTPS', sla_ms: 300}]->(api);

// Microservice to Auth and Cache dependencies
MATCH (api:ConfigurationItem {id: 'SVC-API'}), (auth:ConfigurationItem {id: 'SVC-AUTH'})
CREATE (api)-[:DEPENDS_ON {auth_flow: 'OAuth2_Bearer'}]->(auth);

MATCH (api:ConfigurationItem {id: 'SVC-API'}), (redis:ConfigurationItem {id: 'DB-REDIS'})
CREATE (api)-[:DEPENDS_ON {cache_ttl: '3600s'}]->(redis);

// Microservice to Database dependencies
MATCH (api:ConfigurationItem {id: 'SVC-API'}), (db:ConfigurationItem {id: 'DB-MYSQL'})
CREATE (api)-[:DEPENDS_ON {pool_size: 50, read_write: 'RW'}]->(db);

MATCH (api:ConfigurationItem {id: 'SVC-API'}), (neo:ConfigurationItem {id: 'DB-NEO4J'})
CREATE (api)-[:DEPENDS_ON {bolt_pool: 20}]->(neo);

// Hosting & Compute Infrastructure
MATCH (app:ConfigurationItem {id: 'APP-ERP'}), (srv:ConfigurationItem {id: 'SRV-BETA'})
CREATE (app)-[:HOSTED_ON]->(srv);

MATCH (api:ConfigurationItem {id: 'SVC-API'}), (srv:ConfigurationItem {id: 'SRV-ALPHA'})
CREATE (api)-[:HOSTED_ON]->(srv);

MATCH (auth:ConfigurationItem {id: 'SVC-AUTH'}), (srv:ConfigurationItem {id: 'SRV-ALPHA'})
CREATE (auth)-[:HOSTED_ON]->(srv);

MATCH (db:ConfigurationItem {id: 'DB-MYSQL'}), (srv:ConfigurationItem {id: 'SRV-DB01'})
CREATE (db)-[:HOSTED_ON]->(srv);

MATCH (neo:ConfigurationItem {id: 'DB-NEO4J'}), (srv:ConfigurationItem {id: 'SRV-DB01'})
CREATE (neo)-[:HOSTED_ON]->(srv);

// Storage Mounts
MATCH (srv:ConfigurationItem {id: 'SRV-DB01'}), (san:ConfigurationItem {id: 'SAN-ARRAY-01'})
CREATE (srv)-[:MOUNTED_ON {protocol: 'iSCSI', lun: 'LUN_01'}]->(san);

// Network Topologies
MATCH (srv:ConfigurationItem {id: 'SRV-ALPHA'}), (sw:ConfigurationItem {id: 'SW-CORE-01'})
CREATE (srv)-[:CONNECTED_TO {vlan: 10, speed: '10Gbps'}]->(sw);

MATCH (srv:ConfigurationItem {id: 'SRV-BETA'}), (sw:ConfigurationItem {id: 'SW-EDGE-02'})
CREATE (srv)-[:CONNECTED_TO {vlan: 20, speed: '1Gbps'}]->(sw);

MATCH (srv:ConfigurationItem {id: 'SRV-DB01'}), (sw:ConfigurationItem {id: 'SW-CORE-01'})
CREATE (srv)-[:CONNECTED_TO {vlan: 30, speed: '10Gbps'}]->(sw);

MATCH (sw_edge:ConfigurationItem {id: 'SW-EDGE-02'}), (sw_core:ConfigurationItem {id: 'SW-CORE-01'})
CREATE (sw_edge)-[:CONNECTED_TO {link: 'Trunk Uplink', port: 'Te1/1'}]->(sw_core);

// ============================================================================
// 5. ADVANCED GRAPH QUERIES (Demonstration for DBMS Level 3 Evaluation)
// ============================================================================

// Query 1: BLAST RADIUS / FAILURE IMPACT ANALYSIS
// If CS Block Edge Switch (SW-EDGE-02) goes down, what downstream and upstream
// applications and services are impacted?
MATCH path = (impacted:ConfigurationItem)-[*1..4]->(failed:ConfigurationItem {id: 'SW-EDGE-02'})
RETURN 
    failed.name AS Failed_Component,
    impacted.id AS Impacted_CI_ID,
    impacted.name AS Impacted_Service,
    impacted.tier AS Tier,
    impacted.status AS Status,
    length(path) AS Dependency_Hops
ORDER BY Dependency_Hops ASC;

// Query 2: ROOT CAUSE ANALYSIS FOR DEGRADED APPLICATION
// When Student ERP (APP-ERP) is degraded, traverse its complete dependency tree
// to find any component in OUTAGE or DEGRADED status.
MATCH path = (app:ConfigurationItem {id: 'APP-ERP'})-[*1..5]->(rootCause:ConfigurationItem)
WHERE rootCause.status IN ['OUTAGE', 'DEGRADED'] AND rootCause.id <> 'APP-ERP'
RETURN 
    app.name AS Degraded_Application,
    rootCause.id AS Suspected_Root_Cause_ID,
    rootCause.name AS Component_Name,
    rootCause.status AS Root_Cause_Status,
    [node in nodes(path) | node.name] AS Failure_Chain;

// Query 3: SINGLE POINT OF FAILURE (SPOF) IDENTIFICATION
// Calculate in-degree centrality: which infrastructure components have the highest
// number of dependent applications and services relying upon them?
MATCH (infra:ConfigurationItem)
OPTIONAL MATCH (dependent:ConfigurationItem)-[:DEPENDS_ON|HOSTED_ON|CONNECTED_TO*1..3]->(infra)
WHERE infra.type IN ['Server', 'Database', 'NetworkDevice', 'Storage']
RETURN 
    infra.id AS Infrastructure_ID,
    infra.name AS Infrastructure_Name,
    labels(infra)[1] AS Component_Type,
    COUNT(DISTINCT dependent) AS Total_Dependent_Entities
ORDER BY Total_Dependent_Entities DESC;

// Query 4: SHORTEST DEPENDENCY PATH
// Shortest path from Student ERP to SAN Storage
MATCH (start:ConfigurationItem {id: 'APP-ERP'}), (end:ConfigurationItem {id: 'SAN-ARRAY-01'}),
      p = shortestPath((start)-[*]-(end))
RETURN p;


// ============================================================================
// 6. NOSQL GRAPH RUD OPERATIONS (Read, Update, Delete)
// Meets Evaluation Criteria: NoSQL/Vector feature, RUD (Rubric #9 - 7 Marks)
// ============================================================================

// A. READ (R): Read CI node with incident dependencies
MATCH (ci:ConfigurationItem {id: 'SRV-BETA'})
OPTIONAL MATCH (ci)<-[:HOSTED_ON]-(app:Application)
RETURN ci.id AS CI_ID, ci.name AS Host_Name, ci.status AS Current_Status, app.name AS Impacted_Application;

// B. UPDATE (U): Update CI operational status, hardware capacity, and maintenance timestamp
MATCH (ci:ConfigurationItem {id: 'SRV-BETA'})
SET ci.status = 'OPERATIONAL',
    ci.ram_gb = 128,
    ci.updated_at = datetime()
RETURN ci.id AS CI_ID, ci.name AS Host_Name, ci.status AS New_Status, ci.ram_gb AS Upgraded_RAM;

// C. UPDATE RELATIONSHIP (U): Update dependency link speed/bandwidth
MATCH (srv:ConfigurationItem {id: 'SRV-BETA'})-[rel:CONNECTED_TO]->(sw:ConfigurationItem {id: 'SW-EDGE-02'})
SET rel.speed = '10Gbps', rel.last_tested = datetime()
RETURN srv.name AS Server, rel.speed AS New_Speed, sw.name AS Switch;

// D. DELETE (D): Safe deletion of temporary CI node or decommissioned link
MATCH (ci:ConfigurationItem {id: 'TEMP-DEV-NODE-99'})
DETACH DELETE ci;
