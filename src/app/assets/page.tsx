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
  Layers,
  Flame,
  ArrowRight
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner - 9-Color Editorial Treatment */}
      <div className="glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.96) 0%, rgba(6, 17, 12, 0.94) 55%, rgba(91, 70, 50, 0.35) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.32)',
        padding: '36px 40px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '20px' 
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              background: 'rgba(166, 107, 255, 0.14)', 
              border: '1px solid rgba(166, 107, 255, 0.45)',
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              color: 'var(--c-lavender)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              <Radio size={13} /> NoSQL Graph CMDB • Neo4j Engine
            </span>
            <span style={{ 
              fontSize: '0.7rem', 
              padding: '3px 10px', 
              background: 'rgba(244, 217, 160, 0.1)', 
              border: '1px solid rgba(244, 217, 160, 0.35)', 
              borderRadius: 'var(--radius-full)', 
              color: 'var(--c-gold)', 
              fontWeight: 800,
              letterSpacing: '0.06em'
            }}>
              CYPHER RECURSIVE TRAVERSAL
            </span>
          </div>

          <h1 className="font-editorial" style={{ 
            fontSize: '2.1rem', 
            fontWeight: 700, 
            color: 'var(--c-gold)', 
            letterSpacing: '0.03em', 
            marginBottom: '10px',
            textShadow: '0 2px 20px rgba(244, 217, 160, 0.15)'
          }}>
            Configuration Items &amp; Blast Radius Topology
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.6 }}>
            Traverses directed property graph edges (<code style={{ color: 'var(--c-lemon)', fontFamily: 'var(--font-mono)' }}>:DEPENDS_ON</code>, <code style={{ color: 'var(--c-lavender)', fontFamily: 'var(--font-mono)' }}>:HOSTED_ON</code>) 
            to simulate physical hardware outages, mapping propagation across services and business SLA obligations.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(11, 14, 13, 0.9)', 
          padding: '5px', 
          borderRadius: 'var(--radius-sm)', 
          border: '1px solid var(--c-mocha)',
          gap: '6px'
        }}>
          <button 
            className={`btn btn-sm ${activeTab === 'topology' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onClick={() => setActiveTab('topology')}
          >
            <Network size={14} /> Dependency Graph
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onClick={() => setActiveTab('table')}
          >
            <Layers size={14} /> Asset Inventory Table
          </button>
        </div>
      </div>

      {/* Blast Radius Interactive Simulator Ribbon - Sourced Crimson Red (#A31C1B) & Burnt Amber */}
      <div className="glass-card" style={{ 
        border: '1px solid rgba(163, 28, 27, 0.5)', 
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(163, 28, 27, 0.12) 100%)',
        padding: '24px 28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FDA4AF', fontWeight: 700, fontSize: '0.94rem' }}>
              <ShieldAlert size={20} color="var(--c-crimson)" /> 
              <span className="font-editorial" style={{ letterSpacing: '0.04em', color: '#FFFFFF' }}>Simulate Infrastructure Failure:</span>
            </div>

            <select
              className="form-select"
              style={{ 
                width: '320px', 
                background: 'rgba(11, 14, 13, 0.85)',
                borderColor: 'var(--c-mocha)',
                color: '#FFFFFF',
                fontSize: '0.88rem'
              }}
              value={selectedFailedCi}
              onChange={(e) => setSelectedFailedCi(e.target.value)}
            >
              <option value="SW-EDGE-02">SW-EDGE-02 (CS Edge Switch - Critical Outage)</option>
              <option value="SRV-ALPHA">SRV-ALPHA (App Host Node Alpha)</option>
              <option value="SRV-BETA">SRV-BETA (ERP Host Server)</option>
              <option value="DB-MYSQL">DB-MYSQL (MySQL Database Node 1)</option>
              <option value="SAN-ARRAY-01">SAN-ARRAY-01 (NetApp SAN Array)</option>
            </select>
          </div>

          <button 
            onClick={handleRunBlastRadius}
            className="btn btn-danger"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '10px 22px',
              fontSize: '0.88rem'
            }}
            disabled={loadingBlast}
          >
            <Activity size={16} /> {loadingBlast ? 'Traversing Cypher...' : 'Calculate Blast Radius'}
          </button>
        </div>

        {/* Blast Radius Result Drawer */}
        {blastResult && (
          <div style={{ marginTop: '22px', borderTop: '1px solid rgba(163, 28, 27, 0.35)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Failure Simulation Origin: </span>
                <span style={{ fontWeight: 800, color: 'var(--c-lemon)', fontFamily: 'var(--font-mono)' }}>
                  {blastResult.failedNodeName} ({blastResult.failedNodeId})
                </span>
              </div>
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Impacted Dependencies: <b style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>{blastResult.totalImpactedCount}</b></span>
                <span style={{ color: '#FDA4AF' }}>Tier-1 Mission Critical Outages: <b style={{ color: 'var(--c-lemon)', fontFamily: 'var(--font-mono)' }}>{blastResult.criticalServicesImpacted}</b></span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px' }}>
              {blastResult.impactedNodes.map((item: any) => (
                <div key={item.id} style={{ 
                  background: 'rgba(11, 14, 13, 0.9)', 
                  border: '1px solid rgba(163, 28, 27, 0.45)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '14px 16px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-gold)' }}>{item.name}</span>
                    <span className="badge badge-critical" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>{item.hops} Hop(s)</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Type: {item.type} | ID: {item.id}</div>
                  <div style={{ 
                    fontSize: '0.74rem', 
                    color: 'var(--c-lavender)', 
                    marginTop: '8px', 
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0,0,0,0.4)',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    Chain: {item.failurePath.join(' ➔ ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TOPOLOGY GRAPH VIEW - 9-Color Visual Architecture */}
      {activeTab === 'topology' && (
        <div className="glass-card" style={{ padding: '28px', overflowX: 'auto', border: '1px solid rgba(244, 217, 160, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h2 className="font-editorial" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-gold)', letterSpacing: '0.04em' }}>
                IT Infrastructure Dependency Topology
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Directed graph edges represent recursive relationships: <code style={{ color: 'var(--c-lavender)' }}>[:DEPENDS_ON]</code>, <code style={{ color: 'var(--c-amber)' }}>[:HOSTED_ON]</code>, and <code style={{ color: 'var(--c-lemon)' }}>[:CONNECTED_TO]</code>
              </p>
            </div>
            {/* Color Legend using 9-Color Palette */}
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.76rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: 'var(--c-lavender)', borderRadius: '50%' }}></span> Application
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: 'var(--c-gold)', borderRadius: '50%' }}></span> Microservice
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: 'var(--c-amber)', borderRadius: '50%' }}></span> Database
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: 'var(--c-lemon)', borderRadius: '50%' }}></span> Server
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: 'var(--c-crimson)', borderRadius: '50%' }}></span> Switch / Storage
              </span>
            </div>
          </div>

          {/* SVG Graph Canvas with Deep Forest Black (#06110C) Canvas */}
          <div style={{ 
            background: 'radial-gradient(ellipse at center, #0F1612 0%, #06110C 100%)', 
            border: '1px solid var(--c-mocha)', 
            borderRadius: 'var(--radius-md)', 
            minWidth: '1150px', 
            height: '620px', 
            position: 'relative',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
          }}>
            <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(244, 217, 160, 0.35)" />
                </marker>
                <marker id="arrow-impact" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-crimson)" />
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
                      stroke={isEdgeInBlast ? 'var(--c-crimson)' : 'rgba(244, 217, 160, 0.18)'}
                      strokeWidth={isEdgeInBlast ? 2.5 : 1.2}
                      strokeDasharray={isEdgeInBlast ? '4,4' : undefined}
                      markerEnd={isEdgeInBlast ? 'url(#arrow-impact)' : 'url(#arrow)'}
                    />
                    <text
                      x={(srcNode.x! + tgtNode.x!) / 2}
                      y={(srcNode.y! + tgtNode.y!) / 2 - 6}
                      fill={isEdgeInBlast ? '#FDA4AF' : 'rgba(244, 217, 160, 0.45)'}
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="var(--font-mono)"
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

                let nodeColor = 'var(--c-lavender)';
                if (node.type === 'Microservice') nodeColor = 'var(--c-gold)';
                if (node.type === 'Database') nodeColor = 'var(--c-amber)';
                if (node.type === 'Server') nodeColor = 'var(--c-lemon)';
                if (node.type === 'NetworkDevice' || node.type === 'Storage') nodeColor = 'var(--c-crimson)';

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedFailedCi(node.id)}
                  >
                    {/* Pulsing ring if failed or impacted */}
                    {isFailed && (
                      <circle r="30" fill="none" stroke="var(--c-crimson)" strokeWidth="2.5" className="status-dot pulse" />
                    )}
                    {isImpacted && (
                      <circle r="26" fill="none" stroke="#FDA4AF" strokeWidth="1.5" strokeDasharray="3,3" />
                    )}

                    {/* Node Core Circle */}
                    <circle 
                      r="18" 
                      fill={isFailed ? 'var(--c-crimson)' : isImpacted ? 'rgba(163, 28, 27, 0.6)' : 'var(--c-charcoal)'} 
                      stroke={isFailed ? 'var(--c-lemon)' : nodeColor} 
                      strokeWidth="2.2" 
                    />

                    {/* Node Text Label */}
                    <text
                      y="32"
                      textAnchor="middle"
                      fill={isFailed ? 'var(--c-lemon)' : isImpacted ? '#FECDD3' : '#F8FAFC'}
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
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
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-lavender)' }}>
                      {a.asset_tag}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{a.asset_name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Purchase: {a.purchase_date}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{a.asset_type}</span>
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
                      style={{ borderColor: 'var(--c-mocha)', fontSize: '0.76rem' }}
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