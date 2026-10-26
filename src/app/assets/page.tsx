'use client';

import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  AlertTriangle, 
  Activity, 
  ShieldAlert, 
  CheckCircle,
  Radio,
  Layers
} from 'lucide-react';
import { Asset, GraphNode, GraphEdge } from '@/lib/mockData';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [topology, setTopology] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({ nodes: [], edges: [] });
  const [selectedFailedCi, setSelectedFailedCi] = useState<string>('SW-EDGE-02');
  const [blastResult, setBlastResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'topology' | 'table'>('topology');
  const [loadingBlast, setLoadingBlast] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [assetsRes, topRes] = await Promise.all([
          fetch('/api/assets'),
          fetch('/api/assets?mode=topology')
        ]);
        const aData = await assetsRes.json();
        const tData = await topRes.json();
        setAssets(aData.assets || []);
        setTopology(tData);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  const handleRunBlastRadius = async () => {
    if (!selectedFailedCi) return;
    try {
      setLoadingBlast(true);
      const res = await fetch(`/api/assets?blastRadius=${selectedFailedCi}`);
      const data = await res.json();
      setBlastResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingBlast(false);
    }
  };

  const isNodeImpacted = (nodeId: string) => {
    if (!blastResult) return false;
    return blastResult.impactedNodes.some((n: any) => n.id === nodeId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#67E8F9', marginBottom: '6px' }}>
            <Radio size={14} /> NOSQL GRAPH PARADIGM (NEO4J CMDB)
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Configuration Items & Blast Radius Engine</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Traversing recursive IT asset dependency graphs via Cypher to simulate infrastructure outages and upstream business impact.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <button 
            className={`btn btn-sm ${activeTab === 'topology' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('topology')}
          >
            <Network size={14} /> Dependency Graph
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('table')}
          >
            <Layers size={14} /> Asset Inventory Table
          </button>
        </div>
      </div>

      {/* Blast Radius Interactive Simulator Ribbon */}
      <div className="glass-card" style={{ border: '1px solid rgba(244, 63, 94, 0.3)', background: 'rgba(244, 63, 94, 0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-rose)', fontWeight: 700, fontSize: '0.95rem' }}>
              <ShieldAlert size={20} /> Simulate Hardware / Network Failure:
            </div>

            <select
              className="form-select"
              style={{ width: '280px' }}
              value={selectedFailedCi}
              onChange={(e) => setSelectedFailedCi(e.target.value)}
            >
              <option value="SW-EDGE-02">SW-EDGE-02 (CS Edge Switch - OUTAGE)</option>
              <option value="SRV-ALPHA">SRV-ALPHA (App Host Node Alpha)</option>
              <option value="SRV-BETA">SRV-BETA (ERP Host Server)</option>
              <option value="DB-MYSQL">DB-MYSQL (MySQL Database Node 1)</option>
              <option value="SAN-ARRAY-01">SAN-ARRAY-01 (NetApp SAN Array)</option>
            </select>
          </div>

          <button 
            onClick={handleRunBlastRadius}
            className="btn btn-danger"
            disabled={loadingBlast}
          >
            <Activity size={16} /> {loadingBlast ? 'Traversing Cypher...' : 'Calculate Blast Radius'}
          </button>
        </div>

        {/* Blast Radius Result Drawer */}
        {blastResult && (
          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(244, 63, 94, 0.2)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Failure Simulation on: </span>
                <span style={{ fontWeight: 700, color: 'var(--accent-rose)' }}>{blastResult.failedNodeName} ({blastResult.failedNodeId})</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem' }}>
                <span>Impacted Entities: <b>{blastResult.totalImpactedCount}</b></span>
                <span style={{ color: 'var(--accent-rose)' }}>Tier-1 Critical Services: <b>{blastResult.criticalServicesImpacted}</b></span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {blastResult.impactedNodes.map((item: any) => (
                <div key={item.id} style={{ background: 'var(--bg-input)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FDA4AF' }}>{item.name}</span>
                    <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>{item.hops} Hop(s)</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Type: {item.type} | ID: {item.id}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                    Chain: {item.failurePath.join(' ➔ ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TOPOLOGY GRAPH VIEW */}
      {activeTab === 'topology' && (
        <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>IT Infrastructure Dependency Topology</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Directed graph edges represent <code>[:DEPENDS_ON]</code>, <code>[:HOSTED_ON]</code>, and <code>[:CONNECTED_TO]</code>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#6366F1', borderRadius: '50%' }}></span> Application
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#06B6D4', borderRadius: '50%' }}></span> Microservice
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#F59E0B', borderRadius: '50%' }}></span> Database
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%' }}></span> Server
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', background: '#F43F5E', borderRadius: '50%' }}></span> Switch / Storage
              </span>
            </div>
          </div>

          {/* SVG Graph Canvas */}
          <div style={{ 
            background: '#070A12', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-md)', 
            minWidth: '1150px', 
            height: '620px', 
            position: 'relative' 
          }}>
            <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255, 255, 255, 0.25)" />
                </marker>
                <marker id="arrow-impact" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F43F5E" />
                </marker>
              </defs>

              {/* Render Directed Edges */}
              {topology.edges.map((edge, idx) => {
                const srcNode = topology.nodes.find(n => n.id === edge.source);
                const tgtNode = topology.nodes.find(n => n.id === edge.target);
                if (!srcNode || !tgtNode) return null;

                const isEdgeInBlast = blastResult && (
                  (blastResult.failedNodeId === edge.target && isNodeImpacted(edge.source)) ||
                  (isNodeImpacted(edge.source) && isNodeImpacted(edge.target))
                );

                return (
                  <g key={idx}>
                    <line
                      x1={srcNode.x}
                      y1={srcNode.y}
                      x2={tgtNode.x}
                      y2={tgtNode.y}
                      stroke={isEdgeInBlast ? '#F43F5E' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth={isEdgeInBlast ? 2.5 : 1.2}
                      strokeDasharray={isEdgeInBlast ? '4,4' : undefined}
                      markerEnd={isEdgeInBlast ? 'url(#arrow-impact)' : 'url(#arrow)'}
                    />
                    <text
                      x={(srcNode.x! + tgtNode.x!) / 2}
                      y={(srcNode.y! + tgtNode.y!) / 2 - 6}
                      fill={isEdgeInBlast ? '#FDA4AF' : 'rgba(255, 255, 255, 0.35)'}
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {edge.type}
                    </text>
                  </g>
                );
              })}

              {/* Render Node Circles & Labels */}
              {topology.nodes.map((node) => {
                const isFailed = blastResult && blastResult.failedNodeId === node.id;
                const isImpacted = isNodeImpacted(node.id);

                let nodeColor = '#6366F1';
                if (node.type === 'Microservice') nodeColor = '#06B6D4';
                if (node.type === 'Database') nodeColor = '#F59E0B';
                if (node.type === 'Server') nodeColor = '#10B981';
                if (node.type === 'NetworkDevice' || node.type === 'Storage') nodeColor = '#EC4899';

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedFailedCi(node.id)}
                  >
                    {/* Pulsing ring if failed or impacted */}
                    {isFailed && (
                      <circle r="30" fill="none" stroke="#F43F5E" strokeWidth="2.5" className="status-dot pulse" />
                    )}
                    {isImpacted && (
                      <circle r="26" fill="none" stroke="#FB7185" strokeWidth="1.5" strokeDasharray="3,3" />
                    )}

                    {/* Node Core Circle */}
                    <circle 
                      r="18" 
                      fill={isFailed ? '#E11D48' : isImpacted ? '#9F1239' : '#111827'} 
                      stroke={isFailed ? '#F43F5E' : nodeColor} 
                      strokeWidth="2.5" 
                    />

                    {/* Node Text Label */}
                    <text
                      y="32"
                      textAnchor="middle"
                      fill={isFailed ? '#FDA4AF' : isImpacted ? '#FECDD3' : '#F8FAFC'}
                      fontSize="11"
                      fontWeight="600"
                    >
                      {node.id}
                    </text>
                    <text
                      y="44"
                      textAnchor="middle"
                      fill="var(--text-muted)"
                      fontSize="9"
                    >
                      {node.name.length > 22 ? node.name.substring(0, 20) + '...' : node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* ASSET INVENTORY TABLE */}
      {activeTab === 'table' && (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>CI / Asset Name</th>
                <th>Type</th>
                <th>Criticality</th>
                <th>Status</th>
                <th>Location / IP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.asset_id}>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {a.asset_tag}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{a.asset_name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Purchase: {a.purchase_date}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem' }}>{a.asset_type}</span>
                  </td>
                  <td>
                    <span className={`badge ${a.criticality === 'MISSION_CRITICAL' ? 'badge-critical' : a.criticality === 'HIGH' ? 'badge-high' : 'badge-low'}`}>
                      {a.criticality}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                    <div>{a.location}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{a.ip_address}</div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        const topNode = topology.nodes.find(n => a.asset_tag.includes(n.id) || a.asset_name.includes(n.name));
                        if (topNode) {
                          setSelectedFailedCi(topNode.id);
                          setActiveTab('topology');
                          handleRunBlastRadius();
                        } else {
                          setSelectedFailedCi('SW-EDGE-02');
                          setActiveTab('topology');
                          handleRunBlastRadius();
                        }
                      }}
                    >
                      Simulate Impact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
