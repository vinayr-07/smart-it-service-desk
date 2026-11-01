-- ============================================================================
-- DBMS Level 3 Project: Seed Data for Smart IT Service Desk
-- Comprehensive realistic dataset for departments, users, SLAs, assets,
-- tickets, audit logs, and knowledge base.
-- ============================================================================

USE smart_service_desk;

-- Clear previous data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE ticket_audit_log;
TRUNCATE TABLE tickets;
TRUNCATE TABLE knowledge_base;
TRUNCATE TABLE assets;
TRUNCATE TABLE sla_policies;
TRUNCATE TABLE users;
TRUNCATE TABLE departments;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. DEPARTMENTS
INSERT INTO departments (dept_id, dept_name, manager_name, building_location) VALUES
(1, 'IT Infrastructure & Cloud', 'Suresh Kumar', 'PESU Tech Block 4F'),
(2, 'Software Engineering', 'Ananya Sharma', 'PESU CS Block 3F'),
(3, 'Human Resources', 'Pooja Hegde', 'PESU Admin Block 2F'),
(4, 'Finance & Accounts', 'Ramesh Rao', 'PESU Admin Block 1F'),
(5, 'Campus Network Operations', 'Dr. Venkatesh M', 'PESU Server Room B1');

-- 2. USERS (Roles: Admin, Agent, Employee)
-- Admin
INSERT INTO users (user_id, full_name, email, password_hash, role, dept_id, phone, is_active) VALUES
(1, 'Vinay R', 'vinay.admin@pes.edu', 'hash_admin_123', 'Admin', 1, '+91-9880011221', TRUE),
(2, 'Dr. Nagasundari S', 'nagasundari@pes.edu', 'hash_eval_456', 'Admin', 1, '+91-9880011222', TRUE);

-- Agents (IT Support Technicians)
INSERT INTO users (user_id, full_name, email, password_hash, role, dept_id, phone, is_active) VALUES
(3, 'Prateek Hachadad', 'prateek.agent@pes.edu', 'hash_agent_01', 'Agent', 1, '+91-9880011223', TRUE),
(4, 'Sneha Patel', 'sneha.agent@pes.edu', 'hash_agent_02', 'Agent', 1, '+91-9880011224', TRUE),
(5, 'Mohammed Zaid', 'zaid.agent@pes.edu', 'hash_agent_03', 'Agent', 5, '+91-9880011225', TRUE),
(6, 'Deepa Mohan', 'deepa.agent@pes.edu', 'hash_agent_04', 'Agent', 1, '+91-9880011226', TRUE);

-- Employees (End-Users raising tickets)
INSERT INTO users (user_id, full_name, email, password_hash, role, dept_id, phone, is_active) VALUES
(7, 'Aditya Verma', 'aditya.v@pes.edu', 'hash_emp_01', 'Employee', 2, '+91-9880011227', TRUE),
(8, 'Meera Nair', 'meera.n@pes.edu', 'hash_emp_02', 'Employee', 2, '+91-9880011228', TRUE),
(9, 'Rahul Joshi', 'rahul.j@pes.edu', 'hash_emp_03', 'Employee', 3, '+91-9880011229', TRUE),
(10, 'Priya Kulkarni', 'priya.k@pes.edu', 'hash_emp_04', 'Employee', 4, '+91-9880011230', TRUE),
(11, 'Vikram Sen', 'vikram.s@pes.edu', 'hash_emp_05', 'Employee', 2, '+91-9880011231', TRUE);

-- Management & Governance (For Escalation Hierarchy)
INSERT INTO users (user_id, full_name, email, password_hash, role, dept_id, phone, is_active) VALUES
(12, 'Suresh Kumar', 'suresh.k@pes.edu', 'hash_mgr_01', 'Admin', 1, '+91-9880011232', TRUE),
(13, 'Ananya Sharma', 'ananya.s@pes.edu', 'hash_mgr_02', 'Admin', 2, '+91-9880011233', TRUE),
(14, 'Executive Governance Board', 'governance@pes.edu', 'hash_gov_01', 'Admin', 1, '+91-9880011234', TRUE);

-- 3. SLA POLICIES
INSERT INTO sla_policies (sla_id, priority_level, response_time_hrs, resolution_time_hrs, escalation_threshold_hrs) VALUES
(1, 'CRITICAL', 0.50, 2.00, 1.50),
(2, 'HIGH',     2.00, 8.00, 6.00),
(3, 'MEDIUM',   4.00, 24.00, 18.00),
(4, 'LOW',      8.00, 72.00, 48.00);

-- 4. IT ASSETS (Configuration Items)
INSERT INTO assets (asset_id, asset_tag, asset_name, asset_type, status, ip_address, location, owner_id, criticality, purchase_date) VALUES
(1, 'AST-SRV-01', 'Core Production API Server (Node-Alpha)', 'Server', 'OPERATIONAL', '192.168.10.11', 'Server Room Rack A1', 1, 'MISSION_CRITICAL', '2023-01-15'),
(2, 'AST-SRV-02', 'Student ERP Web Server', 'Server', 'DEGRADED', '192.168.10.12', 'Server Room Rack A2', 1, 'HIGH', '2023-03-20'),
(3, 'AST-DB-01',  'MySQL Primary Cluster Node 1', 'Database', 'OPERATIONAL', '192.168.20.15', 'Server Room Rack B1', 1, 'MISSION_CRITICAL', '2023-02-10'),
(4, 'AST-DB-02',  'Neo4j Knowledge Graph Server', 'Database', 'OPERATIONAL', '192.168.20.18', 'Server Room Rack B2', 1, 'HIGH', '2023-06-01'),
(5, 'AST-SW-01',  'Cisco Core Backbone Switch 10G', 'Network Switch', 'OPERATIONAL', '192.168.1.1', 'NOC Room Rack N1', 5, 'MISSION_CRITICAL', '2022-11-05'),
(6, 'AST-SW-02',  'CS Block Edge Access Switch', 'Network Switch', 'OUTAGE', '192.168.1.25', 'CS Block 2F Junction', 5, 'HIGH', '2023-08-12'),
(7, 'AST-CLD-01', 'AWS S3 Asset Backup Bucket', 'Cloud Service', 'OPERATIONAL', '54.210.11.90', 'AWS us-east-1', 1, 'MEDIUM', '2024-01-10'),
(8, 'AST-CLD-02', 'Azure Active Directory SSO Gateway', 'Cloud Service', 'OPERATIONAL', '40.112.50.14', 'Azure Central India', 1, 'HIGH', '2023-09-15'),
(9, 'AST-DEV-01', 'MacBook Pro M2 - Aditya Verma', 'Laptop', 'OPERATIONAL', '10.50.4.101', 'CS Block 3F Dev Lab', 7, 'MEDIUM', '2023-07-22'),
(10, 'AST-DEV-02', 'Dell XPS 15 - Meera Nair', 'Laptop', 'DEGRADED', '10.50.4.102', 'CS Block 3F Dev Lab', 8, 'MEDIUM', '2023-09-05'),
(11, 'AST-STG-01', 'NetApp SAN Enterprise Storage Array', 'Storage', 'OPERATIONAL', '192.168.30.5', 'Server Room Rack C1', 1, 'MISSION_CRITICAL', '2022-05-18'),
(12, 'AST-DEV-03', 'ThinkPad T14 - Rahul Joshi', 'Laptop', 'OPERATIONAL', '10.50.4.103', 'Admin Block 2F HR', 9, 'LOW', '2024-02-14');

-- 5. TICKETS (Incidents and Service Requests)
INSERT INTO tickets (ticket_id, ticket_code, title, description, category, priority, status, asset_id, created_by, assigned_to, created_at, due_date, resolved_at, sla_breached, resolution_summary) VALUES
(1, 'TKT-1001', 'CS Block Access Switch Port Flapping & Outage', 'CS Block 2F Switch has dropped packets and currently unreachable. Lab users unable to connect to LAN.', 'Network', 'CRITICAL', 'OPEN', 6, 7, 5, '2026-10-25 08:30:00', '2026-10-25 10:30:00', NULL, TRUE, NULL),

(2, 'TKT-1002', 'ERP Web Server High CPU Utilization > 95%', 'Student ERP portal returning HTTP 504 Gateway Timeout during registration period.', 'Software', 'HIGH', 'IN_PROGRESS', 2, 8, 3, '2026-10-26 09:15:00', '2026-10-26 17:15:00', NULL, FALSE, NULL),

(3, 'TKT-1003', 'MySQL Connection Pool Exhaustion on Node 1', 'App backend threw Too many connections error. Max connection limit reached.', 'Database', 'CRITICAL', 'RESOLVED', 3, 1, 3, '2026-10-24 14:00:00', '2026-10-24 16:00:00', '2026-10-24 15:20:00', FALSE, 'Increased max_connections to 500 and terminated stale idle client threads.'),

(4, 'TKT-1004', 'Developer Laptop Battery Swelling & Thermal Throttling', 'Dell XPS 15 chassis bulging near trackpad. High temperature shutdown.', 'Hardware', 'HIGH', 'IN_PROGRESS', 10, 8, 4, '2026-10-26 10:00:00', '2026-10-26 18:00:00', NULL, FALSE, NULL),

(5, 'TKT-1005', 'Azure AD SSO Login Loop on HR Portal', 'Employees trying to login to HR portal are redirected indefinitely between login.microsoftonline and portal.', 'Security', 'MEDIUM', 'RESOLVED', 8, 9, 4, '2026-10-23 11:00:00', '2026-10-24 11:00:00', '2026-10-23 16:30:00', FALSE, 'Fixed reply URL redirect mismatch in Azure Active Directory app registration.'),

(6, 'TKT-1006', 'VPN Access Request for Remote Research Project', 'Need Cisco AnyConnect VPN access to reach campus GPU clusters for deep learning tasks.', 'Access', 'LOW', 'OPEN', NULL, 11, NULL, '2026-10-26 11:30:00', '2026-10-29 11:30:00', NULL, FALSE, NULL),

(7, 'TKT-1007', 'SAN Storage LUN Volume 90% Capacity Warning', 'Storage volume /dev/mapper/san_vol1 is reaching full capacity. Purge or expand required.', 'Hardware', 'HIGH', 'OPEN', 11, 1, 3, '2026-10-26 12:00:00', '2026-10-26 20:00:00', NULL, FALSE, NULL),

(8, 'TKT-1008', 'SSL Certificate Expiration in 48 Hours', 'Wildcard SSL certificate *.pes.edu expires on 28th October. Renewal needed immediately.', 'Security', 'CRITICAL', 'IN_PROGRESS', 1, 1, 6, '2026-10-26 07:00:00', '2026-10-26 09:00:00', NULL, TRUE, NULL),

(9, 'TKT-1009', 'Finance ERP Printer Driver Incompatibility on Windows 11', 'Cheque printer not responding after Windows update KB5034441.', 'Hardware', 'MEDIUM', 'RESOLVED', NULL, 10, 4, '2026-10-22 14:00:00', '2026-10-23 14:00:00', '2026-10-22 18:00:00', FALSE, 'Reinstalled Type-4 PCL6 OEM drivers and disabled auto-driver update.'),

(10, 'TKT-1010', 'Neo4j Graph Database Out-Of-Memory Error during Traversal', 'Graph analytics query with 5 hops caused Heap exhaustion on AST-DB-02.', 'Database', 'MEDIUM', 'RESOLVED', 4, 1, 3, '2026-10-21 09:00:00', '2026-10-22 09:00:00', '2026-10-21 13:45:00', FALSE, 'Tuned neo4j.conf dbms.memory.heap.max_size=8G and added index on CI labels.');

-- 6. TICKET AUDIT LOG
INSERT INTO ticket_audit_log (log_id, ticket_id, action_type, old_status, new_status, comment, changed_by, logged_at) VALUES
(1, 1, 'CREATION', NULL, 'OPEN', 'Ticket logged by Aditya Verma', 7, '2026-10-25 08:30:00'),
(2, 1, 'AUTO_ASSIGN', 'OPEN', 'IN_PROGRESS', 'Assigned to Network Engineer Mohammed Zaid', 5, '2026-10-25 08:35:00'),
(3, 1, 'SLA_BREACH', 'IN_PROGRESS', 'OPEN', 'Resolution deadline exceeded 2.0 hours. Escalated.', 1, '2026-10-25 10:30:00'),
(4, 3, 'CREATION', NULL, 'OPEN', 'Ticket logged by Admin', 1, '2026-10-24 14:00:00'),
(5, 3, 'ASSIGN', 'OPEN', 'IN_PROGRESS', 'Assigned to Prateek Hachadad', 3, '2026-10-24 14:05:00'),
(6, 3, 'STATUS_CHANGE', 'IN_PROGRESS', 'RESOLVED', 'Issue resolved and DB verified.', 3, '2026-10-24 15:20:00');

-- 7. KNOWLEDGE BASE ARTICLES (For AI Knowledge Search)
INSERT INTO knowledge_base (kb_id, title, category, keywords, problem_summary, resolution_steps, applicable_asset_type, view_count, helpful_votes) VALUES
(1, 'Resolving MySQL "Too Many Connections" Error (Error 1040)', 
 'Database', 
 'mysql connection pool max_connections timeout 1040 db exhausted', 
 'Applications fail with MySQL Error 1040: Too many connections when sudden traffic spikes or leaked unclosed connections occur.',
 '1. Connect via administrative socket: mysql -u root -p\n2. Inspect active threads: SHOW PROCESSLIST;\n3. Identify stuck Sleep queries and terminate if necessary.\n4. Temporarily increase dynamic limit: SET GLOBAL max_connections = 500;\n5. Make persistent in /etc/mysql/my.cnf: max_connections = 500 and wait_timeout = 300.\n6. Restart connection pooler in backend application.', 
 'Database', 142, 38),

(2, 'Diagnosing Network Switch Port Flapping & CRC Errors', 
 'Network', 
 'switch port flap packet drop crc cable cisco duplex mismatch vlan', 
 'Network interface continuously cycles up and down, causing packet loss and latency spikes across subnet.',
 '1. SSH into switch: ssh admin@192.168.1.1\n2. View interface error counters: show interfaces gigabitEthernet 0/1\n3. Check for duplex or speed mismatch between host and port.\n4. Inspect physical patch cable or SFP optical module transceiver.\n5. Enable storm control and errdisable recovery if broadcast storm detected.\n6. Replace patch cable or re-seat SFP module.', 
 'Network Switch', 98, 24),

(3, 'Azure Active Directory SSO Infinite Redirect / Loop Resolution', 
 'Security', 
 'azure ad sso single sign on loop redirect 302 oauth saml token', 
 'Users authenticate with Microsoft 365 / Azure AD but get bounced in a loop back to login prompt.',
 '1. Verify Azure Portal App Registrations -> Authentication -> Redirect URIs.\n2. Ensure protocol matches (https vs http) and exact trailing slash is present.\n3. Check system clock synchronization (NTP) on web server; token skew > 5 mins fails validation.\n4. Clear browser session cookies and test in Incognito mode.\n5. Verify ID Token and Access Token checkboxes are enabled in Implicit Grant if using SPA.', 
 'Cloud Service', 215, 62),

(4, 'Server CPU Throttling and Node.js High Event Loop Lag', 
 'Server', 
 'cpu load 99% event loop nodejs garbage collection memory leak spike', 
 'Server response time degrades severely with CPU pegged at 95-100% on API gateway nodes.',
 '1. Run top or htop to identify process PID consuming resources.\n2. Capture CPU profile: node --cpu-prof app.js or inspect with clinic.js.\n3. Verify whether intensive sync operations (JSON parsing, regex catastrophic backtracking) are blocking event loop.\n4. Scale horizontally across CPU cores using PM2 cluster mode: pm2 start app.js -i max.\n5. Optimize database queries causing long sync waits.', 
 'Server', 310, 89),

(5, 'Laptop Battery Swelling & Thermal Emergency Response Protocol', 
 'Hardware', 
 'battery swollen bulge dell macbook trackpad overheating fire hazard safety', 
 'Chassis warping, trackpad becoming unresponsive or raised, device running abnormally hot.',
 '1. IMMEDIATELY disconnect charger and power off device.\n2. Do NOT puncture or exert pressure on chassis or battery pack.\n3. Place device in fire-resistant battery containment box or cool ventilated room.\n4. Create high-priority hardware replacement ticket.\n5. IT technician will back up NVMe drive and dispatch laptop to certified battery recycling facility.', 
 'Laptop', 178, 45),

(6, 'SAN Storage Volume Expansion and LVM Online Resizing', 
 'Storage', 
 'storage san lun disk full lvm extend resize2fs xfs_growfs capacity', 
 'Storage volume /dev/mapper/data reaches 95% warning threshold on critical file server.',
 '1. Provision additional storage block from SAN management console.\n2. Rescan SCSI bus: echo 1 > /sys/class/block/sda/device/rescan\n3. Expand physical volume: pvresize /dev/sda\n4. Extend logical volume: lvextend -l +100%FREE /dev/vg01/lv_data\n5. Grow filesystem without unmounting: resize2fs /dev/vg01/lv_data (for ext4) or xfs_growfs /mountpoint (for XFS).\n6. Verify df -h reflects new capacity.', 
 'Storage', 84, 21),

(7, 'Neo4j Graph Database JVM Heap Tuning & Cypher Query Optimization', 
 'Database', 
 'neo4j graph memory heap oom out of memory cypher cartesian index', 
 'Graph database server runs out of heap memory during multi-hop path traversal or community detection.',
 '1. Check neo4j.conf settings: dbms.memory.heap.initial_size and dbms.memory.heap.max_size.\n2. Set heap max to 50% of total RAM (e.g. 8G on a 16GB server) and pagecache to 30%.\n3. In Cypher queries, use PROFILE to check for Eager operators and cartesian products.\n4. Always index label properties used in MATCH predicates: CREATE INDEX FOR (c:CI) ON (c.id);\n5. Use periodic commit / CALL { ... } IN TRANSACTIONS for bulk batch writes.', 
 'Database', 133, 40),

(8, 'Renewing Wildcard SSL/TLS Certificates with Let\'s Encrypt & Nginx', 
 'Security', 
 'ssl tls certbot certificate expire https nginx cert wildcard letsencrypt', 
 'Web servers showing SSL certificate expiration warnings or SEC_ERROR_EXPIRED_CERTIFICATE in browsers.',
 '1. Verify domain DNS TXT record or run certbot: certbot certonly --manual --preferred-challenges dns -d "*.pes.edu"\n2. Confirm DNS challenge propagation using dig TXT _acme-challenge.pes.edu\n3. Copy generated fullchain.pem and privkey.pem to /etc/ssl/certs/\n4. Test Nginx syntax: nginx -t\n5. Reload Nginx configuration smoothly without downtime: nginx -s reload\n6. Verify certificate validity in browser or with openssl s_client -connect pes.edu:443.', 
 'Cloud Service', 254, 78);
