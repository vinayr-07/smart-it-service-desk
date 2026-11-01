// Mock data corresponding exactly with database/seed.sql and database/graph_schema.cypher

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  role: 'Admin' | 'Agent' | 'Employee';
  dept_id: number;
  phone: string;
}

export interface Department {
  dept_id: number;
  dept_name: string;
  manager_name: string;
  building_location: string;
}

export interface Asset {
  asset_id: number;
  asset_tag: string;
  asset_name: string;
  asset_type: 'Server' | 'Database' | 'Network Switch' | 'Laptop' | 'Cloud Service' | 'Storage';
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE' | 'MAINTENANCE';
  ip_address: string;
  location: string;
  owner_id?: number;
  criticality: 'LOW' | 'MEDIUM' | 'HIGH' | 'MISSION_CRITICAL';
  purchase_date: string;
}

export interface Ticket {
  ticket_id: number;
  ticket_code: string;
  title: string;
  description: string;
  category: 'Hardware' | 'Software' | 'Network' | 'Security' | 'Access' | 'Database';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  asset_id?: number;
  created_by: number;
  assigned_to?: number;
  due_date: string;
  resolved_at?: string;
  sla_breached: boolean;
  resolution_summary?: string;
  created_at: string;
}

export interface KnowledgeArticle {
  id: number;
  title: string;
  category: string;
  keywords: string[];
  summary: string;
  resolution: string;
  applicable_asset?: string;
  tags: string[];
  vector_sample?: number[];
}

export interface GraphNode {
  id: string;
  name: string;
  type: 'Application' | 'Microservice' | 'Database' | 'Server' | 'NetworkDevice' | 'Storage';
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE' | 'MAINTENANCE';
  details?: Record<string, any>;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: 'DEPENDS_ON' | 'HOSTED_ON' | 'CONNECTED_TO' | 'MOUNTED_ON';
  label?: string;
}

export const initialDepartments: Department[] = [
  { dept_id: 1, dept_name: 'IT Infrastructure & Cloud', manager_name: 'Suresh Kumar', building_location: 'PESU Tech Block 4F' },
  { dept_id: 2, dept_name: 'Software Engineering', manager_name: 'Ananya Sharma', building_location: 'PESU CS Block 3F' },
  { dept_id: 3, dept_name: 'Human Resources', manager_name: 'Pooja Hegde', building_location: 'PESU Admin Block 2F' },
  { dept_id: 4, dept_name: 'Finance & Accounts', manager_name: 'Ramesh Rao', building_location: 'PESU Admin Block 1F' },
  { dept_id: 5, dept_name: 'Campus Network Operations', manager_name: 'Dr. Venkatesh M', building_location: 'PESU Server Room B1' },
];

export const initialUsers: User[] = [
  { user_id: 1, full_name: 'Vinay R', email: 'vinay.admin@pes.edu', role: 'Admin', dept_id: 1, phone: '+91-9880011221' },
  { user_id: 2, full_name: 'Dr. Nagasundari S', email: 'nagasundari@pes.edu', role: 'Admin', dept_id: 1, phone: '+91-9880011222' },
  { user_id: 3, full_name: 'Prateek Hachadad', email: 'prateek.agent@pes.edu', role: 'Agent', dept_id: 1, phone: '+91-9880011223' },
  { user_id: 4, full_name: 'Sneha Patel', email: 'sneha.agent@pes.edu', role: 'Agent', dept_id: 1, phone: '+91-9880011224' },
  { user_id: 5, full_name: 'Mohammed Zaid', email: 'zaid.agent@pes.edu', role: 'Agent', dept_id: 5, phone: '+91-9880011225' },
  { user_id: 6, full_name: 'Deepa Mohan', email: 'deepa.agent@pes.edu', role: 'Agent', dept_id: 1, phone: '+91-9880011226' },
  { user_id: 7, full_name: 'Aditya Verma', email: 'aditya.v@pes.edu', role: 'Employee', dept_id: 2, phone: '+91-9880011227' },
  { user_id: 8, full_name: 'Meera Nair', email: 'meera.n@pes.edu', role: 'Employee', dept_id: 2, phone: '+91-9880011228' },
  { user_id: 9, full_name: 'Rahul Joshi', email: 'rahul.j@pes.edu', role: 'Employee', dept_id: 3, phone: '+91-9880011229' },
  { user_id: 10, full_name: 'Priya Kulkarni', email: 'priya.k@pes.edu', role: 'Employee', dept_id: 4, phone: '+91-9880011230' },
  { user_id: 11, full_name: 'Vikram Sen', email: 'vikram.s@pes.edu', role: 'Employee', dept_id: 2, phone: '+91-9880011231' },
  { user_id: 12, full_name: 'Suresh Kumar', email: 'suresh.k@pes.edu', role: 'Admin', dept_id: 1, phone: '+91-9880011232' },
  { user_id: 13, full_name: 'Ananya Sharma', email: 'ananya.s@pes.edu', role: 'Admin', dept_id: 2, phone: '+91-9880011233' },
  { user_id: 14, full_name: 'Executive Governance Board', email: 'governance@pes.edu', role: 'Admin', dept_id: 1, phone: '+91-9880011234' },
];

export const initialAssets: Asset[] = [
  { asset_id: 1, asset_tag: 'AST-SRV-01', asset_name: 'Core Production API Server (Node-Alpha)', asset_type: 'Server', status: 'OPERATIONAL', ip_address: '192.168.10.11', location: 'Server Room Rack A1', owner_id: 1, criticality: 'MISSION_CRITICAL', purchase_date: '2023-01-15' },
  { asset_id: 2, asset_tag: 'AST-SRV-02', asset_name: 'Student ERP Web Server', asset_type: 'Server', status: 'DEGRADED', ip_address: '192.168.10.12', location: 'Server Room Rack A2', owner_id: 1, criticality: 'HIGH', purchase_date: '2023-03-20' },
  { asset_id: 3, asset_tag: 'AST-DB-01', asset_name: 'MySQL Primary Cluster Node 1', asset_type: 'Database', status: 'OPERATIONAL', ip_address: '192.168.20.15', location: 'Server Room Rack B1', owner_id: 1, criticality: 'MISSION_CRITICAL', purchase_date: '2023-02-10' },
  { asset_id: 4, asset_tag: 'AST-DB-02', asset_name: 'Neo4j Knowledge Graph Server', asset_type: 'Database', status: 'OPERATIONAL', ip_address: '192.168.20.18', location: 'Server Room Rack B2', owner_id: 1, criticality: 'HIGH', purchase_date: '2023-06-01' },
  { asset_id: 5, asset_tag: 'AST-SW-01', asset_name: 'Cisco Core Backbone Switch 10G', asset_type: 'Network Switch', status: 'OPERATIONAL', ip_address: '192.168.1.1', location: 'NOC Room Rack N1', owner_id: 5, criticality: 'MISSION_CRITICAL', purchase_date: '2022-11-05' },
  { asset_id: 6, asset_tag: 'AST-SW-02', asset_name: 'CS Block Edge Access Switch', asset_type: 'Network Switch', status: 'OUTAGE', ip_address: '192.168.1.25', location: 'CS Block 2F Junction', owner_id: 5, criticality: 'HIGH', purchase_date: '2023-08-12' },
  { asset_id: 7, asset_tag: 'AST-CLD-01', asset_name: 'AWS S3 Asset Backup Bucket', asset_type: 'Cloud Service', status: 'OPERATIONAL', ip_address: '54.210.11.90', location: 'AWS us-east-1', owner_id: 1, criticality: 'MEDIUM', purchase_date: '2024-01-10' },
  { asset_id: 8, asset_tag: 'AST-CLD-02', asset_name: 'Azure Active Directory SSO Gateway', asset_type: 'Cloud Service', status: 'OPERATIONAL', ip_address: '40.112.50.14', location: 'Azure Central India', owner_id: 1, criticality: 'HIGH', purchase_date: '2023-09-15' },
  { asset_id: 9, asset_tag: 'AST-DEV-01', asset_name: 'MacBook Pro M2 - Aditya Verma', asset_type: 'Laptop', status: 'OPERATIONAL', ip_address: '10.50.4.101', location: 'CS Block 3F Dev Lab', owner_id: 7, criticality: 'MEDIUM', purchase_date: '2023-07-22' },
  { asset_id: 10, asset_tag: 'AST-DEV-02', asset_name: 'Dell XPS 15 - Meera Nair', asset_type: 'Laptop', status: 'DEGRADED', ip_address: '10.50.4.102', location: 'CS Block 3F Dev Lab', owner_id: 8, criticality: 'MEDIUM', purchase_date: '2023-09-05' },
  { asset_id: 11, asset_tag: 'AST-STG-01', asset_name: 'NetApp SAN Enterprise Storage Array', asset_type: 'Storage', status: 'OPERATIONAL', ip_address: '192.168.30.5', location: 'Server Room Rack C1', owner_id: 1, criticality: 'MISSION_CRITICAL', purchase_date: '2022-05-18' },
  { asset_id: 12, asset_tag: 'AST-DEV-03', asset_name: 'ThinkPad T14 - Rahul Joshi', asset_type: 'Laptop', status: 'OPERATIONAL', ip_address: '10.50.4.103', location: 'Admin Block 2F HR', owner_id: 9, criticality: 'LOW', purchase_date: '2024-02-14' }
];

export const initialTickets: Ticket[] = [
  {
    ticket_id: 1,
    ticket_code: 'TKT-1001',
    title: 'CS Block Access Switch Port Flapping & Outage',
    description: 'CS Block 2F Switch has dropped packets and currently unreachable. Lab users unable to connect to LAN.',
    category: 'Network',
    priority: 'CRITICAL',
    status: 'OPEN',
    asset_id: 6,
    created_by: 7,
    assigned_to: 5,
    due_date: '2026-10-25 10:30:00',
    sla_breached: true,
    created_at: '2026-10-25 08:30:00'
  },
  {
    ticket_id: 2,
    ticket_code: 'TKT-1002',
    title: 'ERP Web Server High CPU Utilization > 95%',
    description: 'Student ERP portal returning HTTP 504 Gateway Timeout during registration period.',
    category: 'Software',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    asset_id: 2,
    created_by: 8,
    assigned_to: 3,
    due_date: '2026-10-26 17:15:00',
    sla_breached: false,
    created_at: '2026-10-26 09:15:00'
  },
  {
    ticket_id: 3,
    ticket_code: 'TKT-1003',
    title: 'MySQL Connection Pool Exhaustion on Node 1',
    description: 'App backend threw Too many connections error. Max connection limit reached.',
    category: 'Database',
    priority: 'CRITICAL',
    status: 'RESOLVED',
    asset_id: 3,
    created_by: 1,
    assigned_to: 3,
    due_date: '2026-10-24 16:00:00',
    resolved_at: '2026-10-24 15:20:00',
    sla_breached: false,
    resolution_summary: 'Increased max_connections to 500 and terminated stale idle client threads.',
    created_at: '2026-10-24 14:00:00'
  },
  {
    ticket_id: 4,
    ticket_code: 'TKT-1004',
    title: 'Developer Laptop Battery Swelling & Thermal Throttling',
    description: 'Dell XPS 15 chassis bulging near trackpad. High temperature shutdown.',
    category: 'Hardware',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    asset_id: 10,
    created_by: 8,
    assigned_to: 4,
    due_date: '2026-10-26 18:00:00',
    sla_breached: false,
    created_at: '2026-10-26 10:00:00'
  },
  {
    ticket_id: 5,
    ticket_code: 'TKT-1005',
    title: 'Azure AD SSO Login Loop on HR Portal',
    description: 'Employees trying to login to HR portal are redirected indefinitely between login.microsoftonline and portal.',
    category: 'Security',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    asset_id: 8,
    created_by: 9,
    assigned_to: 4,
    due_date: '2026-10-24 11:00:00',
    resolved_at: '2026-10-23 16:30:00',
    sla_breached: false,
    resolution_summary: 'Fixed reply URL redirect mismatch in Azure Active Directory app registration.',
    created_at: '2026-10-23 11:00:00'
  },
  {
    ticket_id: 6,
    ticket_code: 'TKT-1006',
    title: 'VPN Access Request for Remote Research Project',
    description: 'Need Cisco AnyConnect VPN access to reach campus GPU clusters for deep learning tasks.',
    category: 'Access',
    priority: 'LOW',
    status: 'OPEN',
    created_by: 7,
    assigned_to: undefined,
    due_date: '2026-10-29 11:30:00',
    sla_breached: false,
    created_at: '2026-10-26 11:30:00'
  },
  {
    ticket_id: 7,
    ticket_code: 'TKT-1007',
    title: 'SAN Storage LUN Volume 90% Capacity Warning',
    description: 'Storage volume /dev/mapper/san_vol1 is reaching full capacity. Purge or expand required.',
    category: 'Hardware',
    priority: 'HIGH',
    status: 'OPEN',
    asset_id: 11,
    created_by: 1,
    assigned_to: 3,
    due_date: '2026-10-26 20:00:00',
    sla_breached: false,
    created_at: '2026-10-26 12:00:00'
  },
  {
    ticket_id: 8,
    ticket_code: 'TKT-1008',
    title: 'SSL Certificate Expiration in 48 Hours',
    description: 'Wildcard SSL certificate *.pes.edu expires on 28th October. Renewal needed immediately.',
    category: 'Security',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    asset_id: 1,
    created_by: 1,
    assigned_to: 6,
    due_date: '2026-10-26 09:00:00',
    sla_breached: true,
    created_at: '2026-10-26 07:00:00'
  },
  {
    ticket_id: 9,
    ticket_code: 'TKT-1009',
    title: 'Finance ERP Printer Driver Incompatibility on Windows 11',
    description: 'Cheque printer not responding after Windows update KB5034441.',
    category: 'Hardware',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    asset_id: undefined,
    created_by: 10,
    assigned_to: 4,
    due_date: '2026-10-23 14:00:00',
    resolved_at: '2026-10-22 18:00:00',
    sla_breached: false,
    resolution_summary: 'Reinstalled Type-4 PCL6 OEM drivers and disabled auto-driver update.',
    created_at: '2026-10-22 14:00:00'
  },
  {
    ticket_id: 10,
    ticket_code: 'TKT-1010',
    title: 'Neo4j Graph Database Out-Of-Memory Error during Traversal',
    description: 'Graph analytics query with 5 hops caused Heap exhaustion on AST-DB-02.',
    category: 'Database',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    asset_id: 4,
    created_by: 1,
    assigned_to: 3,
    due_date: '2026-10-22 09:00:00',
    resolved_at: '2026-10-21 13:45:00',
    sla_breached: false,
    resolution_summary: 'Tuned neo4j.conf dbms.memory.heap.max_size=8G and added index on CI labels.',
    created_at: '2026-10-21 09:00:00'
  }
];

export const topologyNodes: GraphNode[] = [
  { id: 'APP-ERP', name: 'Student ERP & Portal', type: 'Application', status: 'DEGRADED', x: 100, y: 150 },
  { id: 'APP-PAY', name: 'Fee Payment Gateway', type: 'Application', status: 'OPERATIONAL', x: 100, y: 320 },
  { id: 'APP-LMS', name: 'PESU Academy LMS', type: 'Application', status: 'OPERATIONAL', x: 100, y: 490 },
  
  { id: 'SVC-API', name: 'Core Enterprise API Gateway', type: 'Microservice', status: 'OPERATIONAL', x: 340, y: 320 },
  { id: 'SVC-AUTH', name: 'Azure SSO Auth Service', type: 'Microservice', status: 'OPERATIONAL', x: 340, y: 150 },
  
  { id: 'DB-MYSQL', name: 'MySQL Cluster Node 1 (ERP DB)', type: 'Database', status: 'OPERATIONAL', x: 580, y: 220 },
  { id: 'DB-NEO4J', name: 'Neo4j CMDB Graph Cluster', type: 'Database', status: 'OPERATIONAL', x: 580, y: 360 },
  { id: 'DB-REDIS', name: 'Session Cache Redis Cluster', type: 'Database', status: 'OPERATIONAL', x: 580, y: 500 },
  
  { id: 'SRV-ALPHA', name: 'App Host Node-Alpha', type: 'Server', status: 'OPERATIONAL', x: 800, y: 180 },
  { id: 'SRV-BETA', name: 'App Host Node-Beta (ERP Server)', type: 'Server', status: 'DEGRADED', x: 800, y: 320 },
  { id: 'SRV-DB01', name: 'Database Host DB-Server-01', type: 'Server', status: 'OPERATIONAL', x: 800, y: 480 },
  
  { id: 'SW-CORE-01', name: 'Cisco Core Backbone Switch 10G', type: 'NetworkDevice', status: 'OPERATIONAL', x: 1020, y: 240 },
  { id: 'SW-EDGE-02', name: 'CS Block Edge Access Switch', type: 'NetworkDevice', status: 'OUTAGE', x: 1020, y: 400 },
  { id: 'SAN-ARRAY-01', name: 'NetApp Enterprise SAN Array', type: 'Storage', status: 'OPERATIONAL', x: 1020, y: 560 }
];

export const topologyEdges: GraphEdge[] = [
  { source: 'APP-ERP', target: 'SVC-API', type: 'DEPENDS_ON', label: 'HTTPS / JSON' },
  { source: 'APP-PAY', target: 'SVC-API', type: 'DEPENDS_ON', label: 'HTTPS / JSON' },
  { source: 'APP-LMS', target: 'SVC-API', type: 'DEPENDS_ON', label: 'HTTPS / JSON' },
  
  { source: 'SVC-API', target: 'SVC-AUTH', type: 'DEPENDS_ON', label: 'OAuth2 / Bearer' },
  { source: 'SVC-API', target: 'DB-REDIS', type: 'DEPENDS_ON', label: 'TCP 6379' },
  { source: 'SVC-API', target: 'DB-MYSQL', type: 'DEPENDS_ON', label: 'JDBC Pool' },
  { source: 'SVC-API', target: 'DB-NEO4J', type: 'DEPENDS_ON', label: 'Bolt 7687' },
  
  { source: 'APP-ERP', target: 'SRV-BETA', type: 'HOSTED_ON', label: 'Tomcat' },
  { source: 'SVC-API', target: 'SRV-ALPHA', type: 'HOSTED_ON', label: 'Docker' },
  { source: 'SVC-AUTH', target: 'SRV-ALPHA', type: 'HOSTED_ON', label: 'Docker' },
  { source: 'DB-MYSQL', target: 'SRV-DB01', type: 'HOSTED_ON', label: 'RHEL' },
  { source: 'DB-NEO4J', target: 'SRV-DB01', type: 'HOSTED_ON', label: 'RHEL' },
  
  { source: 'SRV-DB01', target: 'SAN-ARRAY-01', type: 'MOUNTED_ON', label: 'iSCSI LUN' },
  { source: 'SRV-ALPHA', target: 'SW-CORE-01', type: 'CONNECTED_TO', label: '10G Trunk' },
  { source: 'SRV-BETA', target: 'SW-EDGE-02', type: 'CONNECTED_TO', label: '1G Copper' },
  { source: 'SRV-DB01', target: 'SW-CORE-01', type: 'CONNECTED_TO', label: '10G Trunk' },
  { source: 'SW-EDGE-02', target: 'SW-CORE-01', type: 'CONNECTED_TO', label: 'Fiber Uplink' }
];
