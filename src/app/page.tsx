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
  Network
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Hero Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: 'rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, color: '#C7D2FE', marginBottom: '10px' }}>
            <Sparkles size={14} /> DBMS EXPERIENTIAL LEARNING — LEVEL 3
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Smart IT Service Desk & CMDB Intelligence
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '720px' }}>
            Multi-model platform utilizing <b>MySQL 8.0</b> for ACID transactions, triggers, and SLA tracking, 
            <b>Neo4j Graph Database</b> for IT asset dependency blast-radius analysis, and <b>Vector Embeddings</b> with Cosine Similarity for AI technical runbook search.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/tickets" className="btn btn-primary">
            Manage Incidents <ArrowUpRight size={16} />
          </Link>
          <Link href="/assets" className="btn btn-secondary">
            Topology Graph <Network size={16} />
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card critical">
          <div className="stat-header">
            <span>Critical Incidents</span>
            <ShieldAlert size={20} color="var(--accent-rose)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-rose)' }}>{stats.criticalIncidents}</div>
          <div className="stat-desc">Requiring immediate engineering dispatch</div>
        </div>

        <div className="stat-card amber">
          <div className="stat-header">
            <span>Active Open Tickets</span>
            <Clock size={20} color="var(--accent-amber)" />
          </div>
          <div className="stat-value">{stats.openTickets}</div>
          <div className="stat-desc">Governed by priority SLA policy triggers</div>
        </div>

        <div className="stat-card critical">
          <div className="stat-header">
            <span>SLA Breaches</span>
            <AlertTriangle size={20} color="var(--accent-rose)" />
          </div>
          <div className="stat-value">{stats.slaBreached}</div>
          <div className="stat-desc">Detected via fn_is_sla_breached() function</div>
        </div>

        <div className="stat-card cyan">
          <div className="stat-header">
            <span>Degraded Assets / CIs</span>
            <Server size={20} color="var(--accent-cyan)" />
          </div>
          <div className="stat-value">{stats.degradedAssets}</div>
          <div className="stat-desc">Analyzed via Neo4j Graph blast radius</div>
        </div>
      </div>

      {/* Main Two-Column Analytics Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
        
        {/* Real-time SLA Tracking (Database View v_active_tickets_sla) */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Real-Time SLA Watchlist</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Powered by SQL View <code>v_active_tickets_sla</code>
              </p>
            </div>
            <Link href="/tickets" style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Priority</th>
                  <th>Assigned Agent</th>
                  <th>Hours Left</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeSlaTickets.slice(0, 5).map((row: any) => (
                  <tr key={row.ticket_id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{row.ticket_code}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.title}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${row.priority.toLowerCase()}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{row.assigned_agent}</td>
                    <td>
                      <span style={{ 
                        fontWeight: 700, 
                        color: row.sla_breached ? 'var(--accent-rose)' : 'var(--text-primary)' 
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
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Technician Workload Metrics</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Powered by SQL View <code>v_agent_workload_metrics</code>
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--accent-emerald)' }}>
              <UserCheck size={16} /> Auto-Balance Ready
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {agentWorkloads.map((agent: any) => {
              const maxLoad = 6;
              const loadPercent = Math.min(100, Math.round((agent.total_active_workload / maxLoad) * 100));

              return (
                <div key={agent.agent_id} style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{agent.agent_name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{agent.email}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.05rem', color: agent.total_active_workload > 3 ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>
                        {agent.total_active_workload} Active
                      </span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {agent.resolved_tickets} Resolved
                      </div>
                    </div>
                  </div>

                  {/* Workload Progress Bar */}
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${loadPercent}%`, 
                      height: '100%', 
                      background: agent.total_active_workload > 3 ? 'var(--gradient-critical)' : 'var(--gradient-brand)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Quick Interactive DBMS Level 3 Feature Ribbon */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
            Evaluation Ready: Inspect Stored Procedures, Views & Triggers
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Run live SQL routines and Neo4j Cypher blast-radius traversals directly from the test console.
          </div>
        </div>
        <Link href="/db-demo" className="btn btn-primary">
          Launch Evaluation Console <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
