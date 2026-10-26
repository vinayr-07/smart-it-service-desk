// ============================================================================
// Neo4j Graph Database Driver & Topology Analysis Engine
// Meets PDF Section 3 & 7: NoSQL Graph / Blast Radius Impact Analysis
// ============================================================================

import neo4j, { Driver, Session } from 'neo4j-driver';
import { topologyNodes, topologyEdges, GraphNode, GraphEdge } from './mockData';

let driver: Driver | null = null;

function getDriver(): Driver | null {
  if (driver) return driver;
  const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
  const user = process.env.NEO4J_USER || 'neo4j';
  const password = process.env.NEO4J_PASSWORD || 'password';

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      maxConnectionLifetime: 3 * 60 * 60 * 1000,
      maxConnectionPoolSize: 50,
      connectionAcquisitionTimeout: 2000,
    });
    return driver;
  } catch (err) {
    console.warn('Neo4j driver init warning, using local topology engine:', err);
    return null;
  }
}

export interface BlastRadiusResult {
  failedNodeId: string;
  failedNodeName: string;
  impactedNodes: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    tier?: string;
    hops: number;
    failurePath: string[];
  }>;
  totalImpactedCount: number;
  criticalServicesImpacted: number;
}

/**
 * Execute Blast Radius Analysis (Cypher MATCH path = (impacted)-[*1..4]->(failed))
 */
export async function getBlastRadius(failedId: string): Promise<BlastRadiusResult> {
  const d = getDriver();
  
  if (d) {
    let session: Session | null = null;
    try {
      session = d.session();
      const cypherQuery = `
        MATCH path = (impacted:ConfigurationItem)-[*1..4]->(failed:ConfigurationItem {id: $failedId})
        RETURN 
          failed.id AS failed_id,
          failed.name AS failed_name,
          impacted.id AS impacted_id,
          impacted.name AS impacted_name,
          labels(impacted)[1] AS impacted_type,
          impacted.status AS impacted_status,
          impacted.tier AS impacted_tier,
          length(path) AS hops,
          [n IN nodes(path) | n.name] AS failure_path
        ORDER BY hops ASC;
      `;
      const result = await session.run(cypherQuery, { failedId });
      if (result.records.length > 0) {
        const records = result.records;
        const failedName = records[0].get('failed_name');
        const impacted = records.map(r => ({
          id: r.get('impacted_id'),
          name: r.get('impacted_name'),
          type: r.get('impacted_type') || 'CI',
          status: r.get('impacted_status') || 'UNKNOWN',
          tier: r.get('impacted_tier'),
          hops: r.get('hops').toNumber ? r.get('hops').toNumber() : Number(r.get('hops')),
          failurePath: r.get('failure_path')
        }));
        
        return {
          failedNodeId: failedId,
          failedNodeName: failedName,
          impactedNodes: impacted,
          totalImpactedCount: impacted.length,
          criticalServicesImpacted: impacted.filter(i => i.tier === 'Tier-1' || i.type === 'Application').length
        };
      }
    } catch (err) {
      console.warn('Falling back to local graph traversal engine for blast radius:', (err as Error).message);
    } finally {
      if (session) await session.close();
    }
  }

  // Local Graph Traversal Engine (BFS Upstream Traversal simulating Cypher *1..4)
  const failedNode = topologyNodes.find(n => n.id === failedId);
  const failedName = failedNode ? failedNode.name : failedId;

  // Build reverse adjacency list (who points to who)
  const incomingMap: Record<string, Array<{ source: string; label?: string }>> = {};
  topologyEdges.forEach(e => {
    if (!incomingMap[e.target]) incomingMap[e.target] = [];
    incomingMap[e.target].push({ source: e.source, label: e.label });
  });

  const impactedMap: Map<string, { id: string; name: string; type: string; status: string; tier?: string; hops: number; failurePath: string[] }> = new Map();
  
  // BFS Queue: [currentId, currentHop, currentPath]
  const queue: Array<{ id: string; hop: number; path: string[] }> = [{ id: failedId, hop: 0, path: [failedName] }];
  const visited = new Set<string>([failedId]);

  while (queue.length > 0) {
    const { id, hop, path } = queue.shift()!;
    if (hop >= 4) continue;

    const directDependents = incomingMap[id] || [];
    for (const dep of directDependents) {
      const depNode = topologyNodes.find(n => n.id === dep.source);
      if (!depNode) continue;
      
      const newPath = [depNode.name, ...path];
      const newHop = hop + 1;

      if (!visited.has(dep.source)) {
        visited.add(dep.source);
        impactedMap.set(dep.source, {
          id: depNode.id,
          name: depNode.name,
          type: depNode.type,
          status: depNode.status,
          tier: (depNode.details && depNode.details.tier) || (depNode.type === 'Application' ? 'Tier-1' : undefined),
          hops: newHop,
          failurePath: newPath
        });
        queue.push({ id: dep.source, hop: newHop, path: newPath });
      }
    }
  }

  const impactedList = Array.from(impactedMap.values()).sort((a, b) => a.hops - b.hops);
  
  return {
    failedNodeId: failedId,
    failedNodeName: failedName,
    impactedNodes: impactedList,
    totalImpactedCount: impactedList.length,
    criticalServicesImpacted: impactedList.filter(i => i.tier === 'Tier-1' || i.type === 'Application').length
  };
}

/**
 * Return complete CMDB topology graph nodes and edges
 */
export async function getTopologyGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  return {
    nodes: topologyNodes,
    edges: topologyEdges
  };
}
