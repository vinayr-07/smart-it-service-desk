'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Server, 
  ShieldAlert, 
  ArrowUpRight, 
  UserCheck, 
  Sparkles,
  Network,
  Zap,
  Activity,
  Layers
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    criticalIncidents: 0,
    slaBreached: 0,
    healthyAssets: 0,
    degradedAssets: 0
  });
  const [activeSlaTickets, setActiveSlaTickets] = useState<any[]>([]);
  const [agentWorkloads, setAgentWorkloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [ticketsRes, assetsRes, viewsRes] = await Promise.all([
          fetch('/api/tickets'),
          fetch('/api/assets'),
          fetch('/api/views')
        ]);
        
        const ticketsData = await ticketsRes.json();
        const assetsData = await assetsRes.json();
        const viewsData = await viewsRes.json();

        const tickets = ticketsData.tickets || [];
        const assets = assetsData.assets || [];

        setStats({
          totalTickets: tickets.length,
          openTickets: tickets.filter((t: any) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length,
          criticalIncidents: tickets.filter((t: any) => t.priority === 'CRITICAL' && t.status !== 'RESOLVED').length,
          slaBreached: tickets.filter((t: any) => t.sla_breached && t.status !== 'RESOLVED').length,
          healthyAssets: assets.filter((a: any) => a.status === 'OPERATIONAL').length,
          degradedAssets: assets.filter((a: any) => a.status === 'DEGRADED' || a.status === 'OUTAGE').length
        });

        setActiveSlaTickets(viewsData.activeSla || []);
        setAgentWorkloads(viewsData.agentWorkload || []);
      } catch (e) {
        console.error('Failed to load dashboard metrics', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Hero Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.16) 0%, rgba(6, 182, 212, 0.12) 50%, rgba(139, 92, 246, 0.08) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        padding: '32px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              background: 'rgba(99, 102, 241, 0.25)', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.74rem', 
              fontWeight: 700, 
              color: '#C7D2FE',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={13} /> DBMS EXPERIENTIAL LEARNING — LEVEL 3
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'rgba(16, 185, 129, 0.18)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#6EE7B7'
            }}>
              <span className="status-dot pulse" style={{ backgroundColor: '#10B981' }}></span>
              3-PARADIGM ENGINE LIVE
            </span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '10px' }}>
            Operations & CMDB Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', maxWidth: '780px', lineHeight: 1.65 }}>
            Enterprise IT incident operations powered by <b>MySQL 8.0</b> for ACID transactions, triggers, and SLA deadlines; 
            <b> Neo4j Graph Database</b> for multi-hop blast-radius dependency traversal; and <b>Vector Embeddings</b> with Cosine Similarity for AI runbook search.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/tickets" className="btn btn-primary" style={{ padding: '12px 22px' }}>
            <Activity size={16} /> Manage Incidents <ArrowUpRight size={15} />
          </Link>
          <Link href="/assets" className="btn btn-secondary" style={{ padding: '12px 22px' }}>
            <Network size={16} /> Topology Graph
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card critical">
          <div className="stat-header">
            <span>Critical Incidents</span>
            <div style={{ padding: '8px', background: 'rgba(244, 63, 94, 0.15)', borderRadius: 'var(--radius-sm)' }}>
              <ShieldAlert size={20} color="var(--accent-rose)" />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-rose)' }}>{stats.criticalIncidents}</div>
          <div className="stat-desc">
            <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>Priority 1</span> · Immediate engineering dispatch
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-header">
            <span>Active Open Tickets</span>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: 'var(--radius-sm)' }}>
              <Clock size={20} color="var(--accent-amber)" />
            </div>
          </div>
          <div className="stat-value">{stats.openTickets}</div>
          <div className="stat-desc">
            <span>Trigger governed:</span> <code style={{ color: '#FCD34D' }}>trg_ticket_before_insert_sla</code>
          </div>
        </div>

        <div className="stat-card critical">
          <div className="stat-header">
            <span>SLA Breaches</span>
            <div style={{ padding: '8px', background: 'rgba(244, 63, 94, 0.15)', borderRadius: 'var(--radius-sm)' }}>
              <AlertTriangle size={20} color="var(--accent-rose)" />
            </div>
          </div>
          <div className="stat-value">{stats.slaBreached}</div>
          <div className="stat-desc">
            <span>Function evaluated:</span> <code style={{ color: '#FDA4AF' }}>fn_is_sla_breached()</code>
          </div>
        </div>

        <div className="stat-card cyan">
          <div className="stat-header">
            <span>Degraded Assets / CIs</span>
            <div style={{ padding: '8px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: 'var(--radius-sm)' }}>
              <Server size={20} color="var(--accent-cyan)" />
            </div>
          </div>
          <div className="stat-value">{stats.degradedAssets}</div>
          <div className="stat-desc">
            <span>Neo4j Cypher Traversal:</span> <code style={{ color: '#67E8F9' }}>[*1..4]</code>
          </div>
        </div>
      </div>

      {/* Main Two-Column Analytics Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))', gap: '28px' }}>
        
        {/* Real-time SLA Tracking (Database View v_active_tickets_sla) */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Real-Time SLA Watchlist</h2>
                <span className="badge badge-medium">Active View</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Sourced from SQL View <code>v_active_tickets_sla</code> with remaining time computations
              </p>
            </div>
            <Link href="/tickets" className="btn btn-secondary btn-sm">
              View all queue <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="table-container" style={{ flex: 1 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Priority</th>
                  <th>Assigned Agent</th>
                  <th>Time Left</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeSlaTickets.slice(0, 5).map((row: any) => (
                  <tr key={row.ticket_id}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#A5B4FC' }}>
                        {row.ticket_code}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.title}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${row.priority.toLowerCase()}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.84rem', fontWeight: 500 }}>{row.assigned_agent}</td>
                    <td>
                      <span style={{ 
                        fontWeight: 800, 
                        fontFamily: 'var(--font-mono)',
                        color: row.sla_breached ? 'var(--accent-rose)' : row.hours_remaining < 4 ? 'var(--accent-amber)' : 'var(--accent-emerald)' 
                      }}>
                        {row.hours_remaining !== undefined ? `${row.hours_remaining} hrs` : 'N/A'}
                      </span>
                    </td>
                    <td>
                      {row.sla_breached ? (
                        <span className="badge badge-critical">BREACHED</span>
                      ) : (
                        <span className="badge badge-operational">ON TRACK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technician Workload & Performance (Database View v_agent_workload_metrics) */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Technician Queue Load</h2>
                <span className="badge badge-operational">Auto-Balance</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Powered by SQL View <code>v_agent_workload_metrics</code> for least-load auto-assignment
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              <UserCheck size={16} /> Balanced
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            {agentWorkloads.map((agent: any) => {
              const maxLoad = 6;
              const loadPercent = Math.min(100, Math.round((agent.total_active_workload / maxLoad) * 100));

              return (
                <div key={agent.agent_id} style={{ 
                  background: 'linear-gradient(180deg, rgba(16, 23, 38, 0.8) 0%, rgba(10, 14, 23, 0.9) 100%)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                        {agent.agent_name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{agent.email}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        fontWeight: 800, 
                        fontSize: '1.05rem', 
                        fontFamily: 'var(--font-mono)',
                        color: agent.total_active_workload > 3 ? 'var(--accent-rose)' : 'var(--accent-cyan)' 
                      }}>
                        {agent.total_active_workload} Active
                      </span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {agent.resolved_tickets} Resolved · Avg: {agent.avg_resolution_hours || '0.8'}h
                      </div>
                    </div>
                  </div>

                  {/* Workload Progress Bar */}
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${loadPercent}%`, 
                      height: '100%', 
                      background: agent.total_active_workload > 3 ? 'var(--gradient-critical)' : 'var(--gradient-brand)',
                      borderRadius: '4px',
                      transition: 'width 0.4s var(--ease-spring)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Quick Interactive DBMS Level 3 Feature Ribbon */}
      <div className="glass-card" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(16, 23, 38, 0.9) 0%, rgba(99, 102, 241, 0.12) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        padding: '24px 30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-btn-glow)' }}>
            <Zap size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px' }}>
              Evaluation Ready: Interactive DBMS Routine Benchmark
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              Execute live Stored Procedures, Views, Triggers, Recursive CTEs, and Neo4j Cypher blast-radius traversals.
            </div>
          </div>
        </div>

        <Link href="/db-demo" className="btn btn-primary" style={{ padding: '12px 24px' }}>
          Launch Evaluation Console <ArrowUpRight size={16} />
        </Link>
      </div>

    </div>
  );
}
