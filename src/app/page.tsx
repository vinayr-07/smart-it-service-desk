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
  Layers,
  Database,
  Flame,
  Radio
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
      
      {/* Haute Luxe Hero Banner (Image 1, 2, 3 Sourced Aesthetics) */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(6, 17, 12, 0.92) 50%, rgba(91, 70, 50, 0.35) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '26px',
        padding: '36px 40px',
        position: 'relative'
      }}>
        <div>
          {/* Sourced Color Pills Ribbon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              background: 'rgba(244, 217, 160, 0.15)', 
              border: '1px solid var(--c-gold)',
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              color: 'var(--c-gold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={12} color="var(--c-lemon)" /> DBMS LEVEL 3 EXPERIENTIAL LEARNING
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'rgba(166, 107, 255, 0.15)',
              border: '1px solid var(--c-lavender)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--c-lavender)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              <span className="status-dot pulse"></span>
              9-COLOR PALETTE ARCHITECTURE
            </span>
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem', 
            fontWeight: 800, 
            letterSpacing: '0.03em', 
            color: 'var(--c-gold)',
            lineHeight: 1.15,
            marginBottom: '12px' 
          }}>
            Operations &amp; CMDB Command Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '820px', lineHeight: 1.7 }}>
            Multi-model database platform leveraging <b style={{ color: 'var(--c-gold)' }}>MySQL 8.0</b> for relational ACID transactions, SLA triggers, and audit ledgers; 
            <b style={{ color: 'var(--c-lavender)' }}> Neo4j Graph CMDB</b> for recursive blast-radius traversal; and <b style={{ color: 'var(--c-lemon)' }}>Vector Embeddings</b> with Cosine Similarity for AI runbook diagnostics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/tickets" className="btn btn-primary" style={{ padding: '13px 26px' }}>
            <Activity size={17} /> Incident Desk <ArrowUpRight size={16} />
          </Link>
          <Link href="/assets" className="btn btn-lavender" style={{ padding: '13px 26px' }}>
            <Network size={17} /> CMDB Graph
          </Link>
        </div>
      </div>

      {/* 5 Luxury Stat Cards Featuring all 9 Colors */}
      <div className="stats-grid">
        
        {/* Card 1: Crimson Red (Image 2) */}
        <div className="stat-card critical">
          <div className="stat-header">
            <span>Critical P1 Incidents</span>
            <div style={{ padding: '8px', background: 'rgba(163, 28, 27, 0.25)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-crimson)' }}>
              <ShieldAlert size={20} color="#FDA4AF" />
            </div>
          </div>
          <div className="stat-value">{stats.criticalIncidents}</div>
          <div className="stat-desc">
            <span style={{ color: '#FDA4AF', fontWeight: 800 }}>CRIMSON PRIORITY</span> · Immediate dispatch
          </div>
        </div>

        {/* Card 2: Burnt Amber (Image 3) */}
        <div className="stat-card amber">
          <div className="stat-header">
            <span>Active Open Tickets</span>
            <div style={{ padding: '8px', background: 'rgba(200, 121, 44, 0.25)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-amber)' }}>
              <Clock size={20} color="var(--c-gold)" />
            </div>
          </div>
          <div className="stat-value">{stats.openTickets}</div>
          <div className="stat-desc">
            <span style={{ color: 'var(--c-amber)', fontWeight: 800 }}>BURNT AMBER SLA</span> · Active Queue
          </div>
        </div>

        {/* Card 3: Lemon Yellow (Image 1) */}
        <div className="stat-card lemon">
          <div className="stat-header">
            <span>SLA Breaches</span>
            <div style={{ padding: '8px', background: 'rgba(255, 242, 26, 0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-lemon)' }}>
              <AlertTriangle size={20} color="var(--c-lemon)" />
            </div>
          </div>
          <div className="stat-value">{stats.slaBreached}</div>
          <div className="stat-desc">
            <span style={{ color: 'var(--c-lemon)', fontWeight: 800 }}>LEMON ALERT</span> · Evaluated via Function
          </div>
        </div>

        {/* Card 4: Electric Lavender (Image 1) */}
        <div className="stat-card lavender">
          <div className="stat-header">
            <span>CMDB Graph CIs</span>
            <div style={{ padding: '8px', background: 'rgba(166, 107, 255, 0.25)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-lavender)' }}>
              <Radio size={20} color="var(--c-lavender)" />
            </div>
          </div>
          <div className="stat-value">{stats.degradedAssets} Degraded</div>
          <div className="stat-desc">
            <span style={{ color: 'var(--c-lavender)', fontWeight: 800 }}>ELECTRIC LAVENDER</span> · Cypher [*1..4]
          </div>
        </div>

        {/* Card 5: Mocha Brown & Champagne Gold (Image 3) */}
        <div className="stat-card mocha">
          <div className="stat-header">
            <span>Hardware Cluster</span>
            <div style={{ padding: '8px', background: 'rgba(91, 70, 50, 0.35)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-mocha)' }}>
              <Server size={20} color="var(--c-gold)" />
            </div>
          </div>
          <div className="stat-value">{stats.healthyAssets} Active</div>
          <div className="stat-desc">
            <span style={{ color: 'var(--c-gold)', fontWeight: 800 }}>MOCHA &amp; GOLD</span> · 3NF Normalized
          </div>
        </div>

      </div>

      {/* Main Two-Column Analytics Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))', gap: '30px' }}>
        
        {/* Real-time SLA Watchlist (Database View v_active_tickets_sla) */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-gold)' }}>Real-Time SLA Watchlist</h2>
                <span className="badge badge-lemon">v_active_tickets_sla</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Relational view calculating real-time countdown hours across tickets and policies
              </p>
            </div>
            <Link href="/tickets" className="btn btn-secondary btn-sm">
              All Tickets <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="table-container" style={{ flex: 1 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Priority Tier</th>
                  <th>Assigned Agent</th>
                  <th>Remaining</th>
                  <th>SLA Status</th>
                </tr>
              </thead>
              <tbody>
                {activeSlaTickets.slice(0, 5).map((row: any) => (
                  <tr key={row.ticket_id}>
                    <td>
                      <div style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--c-gold)' }}>
                        {row.ticket_code}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.title}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${row.priority === 'CRITICAL' ? 'badge-critical' : row.priority === 'HIGH' ? 'badge-high' : 'badge-medium'}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>{row.assigned_agent}</td>
                    <td>
                      <span style={{ 
                        fontWeight: 800, 
                        fontFamily: 'var(--font-mono)',
                        color: row.sla_breached ? 'var(--c-crimson)' : row.hours_remaining < 4 ? 'var(--c-lemon)' : 'var(--c-gold)' 
                      }}>
                        {row.hours_remaining !== undefined ? `${row.hours_remaining} hrs` : 'N/A'}
                      </span>
                    </td>
                    <td>
                      {row.sla_breached ? (
                        <span className="badge badge-critical">BREACHED</span>
                      ) : (
                        <span className="badge badge-lemon">ON TRACK</span>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c-gold)' }}>Technician Dispatch Queue</h2>
                <span className="badge badge-lavender">Auto-Balance</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Powered by SQL View <code>v_agent_workload_metrics</code> for minimum workload allocation
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--c-gold)', fontWeight: 700 }}>
              <UserCheck size={16} color="var(--c-lemon)" /> Balanced
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
            {agentWorkloads.map((agent: any) => {
              const maxLoad = 6;
              const loadPercent = Math.min(100, Math.round((agent.total_active_workload / maxLoad) * 100));

              return (
                <div key={agent.agent_id} style={{ 
                  background: 'linear-gradient(180deg, #1C1C1C 0%, #111413 100%)', 
                  padding: '16px 20px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid rgba(244, 217, 160, 0.16)',
                  boxShadow: 'var(--shadow-card)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--c-gold)' }}>
                        {agent.agent_name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{agent.email}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        fontWeight: 800, 
                        fontSize: '1.1rem', 
                        fontFamily: 'var(--font-mono)',
                        color: agent.total_active_workload > 3 ? 'var(--c-crimson)' : 'var(--c-lemon)' 
                      }}>
                        {agent.total_active_workload} Active
                      </span>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {agent.resolved_tickets} Resolved · Avg: {agent.avg_resolution_hours || '0.8'}h
                      </div>
                    </div>
                  </div>

                  {/* Gradient Workload Progress Bar */}
                  <div style={{ width: '100%', height: '8px', background: '#0C0F0E', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ 
                      width: `${loadPercent}%`, 
                      height: '100%', 
                      background: agent.total_active_workload > 3 ? 'var(--gradient-crimson)' : 'var(--gradient-gold)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
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
        gap: '22px',
        background: 'linear-gradient(135deg, #1C1C1C 0%, #111413 50%, rgba(91, 70, 50, 0.4) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.35)',
        padding: '26px 36px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-charcoal)', boxShadow: 'var(--shadow-gold-glow)' }}>
            <Zap size={24} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--c-gold)', marginBottom: '4px' }}>
              Evaluation Ready: Interactive DBMS Routine Benchmark
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Execute live Stored Procedures, Views, Triggers, Recursive CTEs, and Neo4j Cypher blast-radius traversals.
            </div>
          </div>
        </div>

        <Link href="/db-demo" className="btn btn-primary" style={{ padding: '13px 28px' }}>
          Open Benchmark Console <ArrowUpRight size={16} />
        </Link>
      </div>

    </div>
  );
}
