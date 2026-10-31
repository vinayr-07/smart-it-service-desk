'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Zap, 
  CheckCircle, 
  Clock, 
  ShieldAlert, 
  AlertCircle,
  FileText,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { Ticket, Asset } from '@/lib/mockData';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState<Ticket | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<Ticket | null>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<'Hardware' | 'Software' | 'Network' | 'Security' | 'Access'>('Software');
  const [newPriority, setNewPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('MEDIUM');
  const [newAssetId, setNewAssetId] = useState<string>('');

  const [resolveSolution, setResolveSolution] = useState('');
  const [resolveAssetStatus, setResolveAssetStatus] = useState<'OPERATIONAL' | 'DEGRADED' | 'OUTAGE' | 'MAINTENANCE'>('OPERATIONAL');

  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<'Admin' | 'Agent' | 'Employee'>('Admin');

  useEffect(() => {
    const saved = localStorage.getItem('active_role') as 'Admin' | 'Agent' | 'Employee';
    if (saved) setCurrentRole(saved);

    const onRoleChange = (e: any) => {
      const role = e.detail || localStorage.getItem('active_role') || 'Admin';
      setCurrentRole(role);
    };
    window.addEventListener('roleChanged', onRoleChange);
    return () => window.removeEventListener('roleChanged', onRoleChange);
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tickets?status=${statusFilter}&priority=${priorityFilter}`);
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await fetch('/api/assets');
      const data = await res.json();
      setAssets(data.assets || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchAssets();
  }, [statusFilter, priorityFilter]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          category: newCategory,
          priority: newPriority,
          asset_id: newAssetId || undefined,
          created_by: 7 // Aditya Verma (Employee)
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewTitle('');
        setNewDescription('');
        setActionMessage(`Ticket ${data.ticket.ticket_code} created successfully! SLA Trigger calculated Due Date: ${data.ticket.due_date}`);
        fetchTickets();
        setTimeout(() => setActionMessage(null), 6000);
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleAutoAssign = async (ticketId: number) => {
    if (currentRole === 'Employee') {
      setActionMessage('RBAC Access Denied: Employee role cannot execute sp_auto_assign_ticket. Only Agent or Admin can assign tickets.');
      setTimeout(() => setActionMessage(null), 5000);
      return;
    }
    try {
      const res = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'auto_assign',
          ticket_id: ticketId
        })
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Stored Procedure sp_auto_assign_ticket executed: Ticket auto-assigned to ${data.agent_name}!`);
        fetchTickets();
        setTimeout(() => setActionMessage(null), 5000);
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleResolveTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResolveModal) return;

    if (currentRole === 'Employee') {
      setActionMessage('RBAC Access Denied: Employee role cannot execute sp_resolve_ticket_with_asset_update. Technician credentials required.');
      setShowResolveModal(null);
      setTimeout(() => setActionMessage(null), 5000);
      return;
    }

    try {
      const res = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resolve_atomic',
          ticket_id: showResolveModal.ticket_id,
          solution: resolveSolution,
          asset_status: resolveAssetStatus,
          agent_id: 3 // Karthik Raja (Agent)
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowResolveModal(null);
        setResolveSolution('');
        setActionMessage(`ACID Transaction sp_resolve_ticket_with_asset_update COMMITTED: Ticket resolved and linked asset state synced!`);
        fetchTickets();
        setTimeout(() => setActionMessage(null), 6000);
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleViewDetails = async (ticket: Ticket) => {
    setShowDetailModal(ticket);
    try {
      const res = await fetch(`/api/tickets?id=${ticket.ticket_id}`);
      const data = await res.json();
      setAuditLogs(data.logs || []);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ticket_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* RBAC Active Session Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: currentRole === 'Admin' 
          ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0.04) 100%)' 
          : currentRole === 'Agent' 
          ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0.04) 100%)' 
          : 'linear-gradient(90deg, rgba(6, 182, 212, 0.16) 0%, rgba(6, 182, 212, 0.04) 100%)',
        border: `1px solid ${currentRole === 'Admin' ? 'rgba(99, 102, 241, 0.35)' : currentRole === 'Agent' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(6, 182, 212, 0.35)'}`,
        padding: '12px 20px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentRole === 'Admin' && <ShieldAlert size={18} color="#818CF8" />}
          {currentRole === 'Agent' && <UserCheck size={18} color="#34D399" />}
          {currentRole === 'Employee' && <Clock size={18} color="#22D3EE" />}
          <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
            Active RBAC Session: <span style={{ color: '#FFFFFF' }}>{currentRole} Mode</span>
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {currentRole === 'Admin' && 'Administrator (Vinay R) — Full access to DDL, DML, Procedures & Transactions'}
            {currentRole === 'Agent' && 'Support Agent (Prateek Hachadad) — Queue Management & ACID Transactions'}
            {currentRole === 'Employee' && 'Self-Service Employee (Aditya Verma) — Incident creation & status tracking'}
          </span>
        </div>
        <span className={`badge ${currentRole === 'Admin' ? 'badge-high' : currentRole === 'Agent' ? 'badge-operational' : 'badge-medium'}`} style={{ fontSize: '0.7rem' }}>
          RBAC ACTIVE
        </span>
      </div>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#6EE7B7',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle size={18} />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Control Ribbon */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by code, title, or category..."
              className="form-input"
              style={{ paddingLeft: '38px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            className="form-select" 
            style={{ width: '160px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select 
            className="form-select" 
            style={{ width: '160px' }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={fetchTickets} className="btn btn-secondary">
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
            <Plus size={16} /> New Incident Ticket
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Incident Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>SLA Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--c-gold)', fontSize: '0.92rem' }}>
                    {ticket.ticket_code}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => handleViewDetails(ticket)}>
                    {ticket.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Asset: {ticket.asset_id ? <span style={{ color: 'var(--c-lavender)' }}>{assets.find(a => a.asset_id === ticket.asset_id)?.asset_name || `Asset #${ticket.asset_id}`}</span> : 'None Linked'}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {ticket.category}
                  </span>
                </td>
                <td>
                  <span className={`badge ${ticket.priority === 'CRITICAL' ? 'badge-critical' : ticket.priority === 'HIGH' ? 'badge-high' : 'badge-medium'}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <span className={`badge ${ticket.status === 'RESOLVED' ? 'badge-operational' : ticket.status === 'IN_PROGRESS' ? 'badge-lemon' : 'badge-lavender'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={13} color={ticket.sla_breached ? 'var(--c-crimson)' : 'var(--text-muted)'} />
                    <span style={{ color: ticket.sla_breached ? 'var(--c-crimson)' : 'var(--text-secondary)', fontWeight: ticket.sla_breached ? 800 : 500, fontFamily: 'var(--font-mono)' }}>
                      {ticket.due_date}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {!ticket.assigned_to && ticket.status === 'OPEN' && (
                      <button 
                        className="btn btn-secondary btn-sm"
                        title="Run Stored Procedure: sp_auto_assign_ticket"
                        onClick={() => handleAutoAssign(ticket.ticket_id)}
                      >
                        <Zap size={13} color="var(--c-lemon)" /> Auto-Assign
                      </button>
                    )}

                    {ticket.status !== 'RESOLVED' && (
                      <button 
                        className="btn btn-primary btn-sm"
                        title="Run ACID Transaction: sp_resolve_ticket_with_asset_update"
                        onClick={() => setShowResolveModal(ticket)}
                      >
                        <CheckCircle size={13} /> Resolve
                      </button>
                    )}

                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewDetails(ticket)}
                    >
                      <FileText size={13} /> Audit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE TICKET MODAL */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>Raise Incident Ticket</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Triggers: Database trigger <code>trg_ticket_before_insert_sla</code> will calculate the resolution SLA deadline upon insertion.
            </p>

            <form onSubmit={handleCreateTicket}>
              <div className="form-group">
                <label className="form-label">Incident Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g. Core Switch Port Flap in CS Block" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea 
                  className="form-textarea" 
                  rows={3} 
                  required 
                  placeholder="Describe observed symptoms, error messages, and affected users..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Network">Network</option>
                    <option value="Security">Security</option>
                    <option value="Access">Access / IAM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority (Governs SLA)</label>
                  <select 
                    className="form-select"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                  >
                    <option value="CRITICAL">CRITICAL (2 Hours SLA)</option>
                    <option value="HIGH">HIGH (8 Hours SLA)</option>
                    <option value="MEDIUM">MEDIUM (24 Hours SLA)</option>
                    <option value="LOW">LOW (72 Hours SLA)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Linked IT Asset / CI</label>
                <select 
                  className="form-select"
                  value={newAssetId}
                  onChange={(e) => setNewAssetId(e.target.value)}
                >
                  <option value="">None / General Issue</option>
                  {assets.map(a => (
                    <option key={a.asset_id} value={a.asset_id}>
                      {a.asset_tag} - {a.asset_name} ({a.status})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESOLVE TICKET MODAL (ACID Transaction) */}
      {showResolveModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
              Resolve Incident: {showResolveModal.ticket_code}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Demonstrates Stored Procedure <code>sp_resolve_ticket_with_asset_update</code> with an atomic ACID Transaction.
            </p>

            <form onSubmit={handleResolveTicket}>
              <div className="form-group">
                <label className="form-label">Resolution Summary & Fix Steps</label>
                <textarea 
                  className="form-textarea" 
                  rows={4} 
                  required 
                  placeholder="Document actions taken (e.g. re-seated transceiver, restarted pool, patched config)..."
                  value={resolveSolution}
                  onChange={(e) => setResolveSolution(e.target.value)}
                />
              </div>

              {showResolveModal.asset_id && (
                <div className="form-group">
                  <label className="form-label">Update Linked Asset Operational Status</label>
                  <select 
                    className="form-select"
                    value={resolveAssetStatus}
                    onChange={(e) => setResolveAssetStatus(e.target.value as any)}
                  >
                    <option value="OPERATIONAL">OPERATIONAL (Restored)</option>
                    <option value="DEGRADED">DEGRADED (Partial service)</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </select>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Both ticket and asset status will be committed together atomically.
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setShowResolveModal(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Commit ACID Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUDIT LOG & DETAIL MODAL */}
      {showDetailModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                  {showDetailModal.ticket_code}
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{showDetailModal.title}</h2>
              </div>
              <span className={`badge badge-${showDetailModal.priority.toLowerCase()}`}>
                {showDetailModal.priority}
              </span>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '6px' }}><b>Description:</b></div>
              <div style={{ color: 'var(--text-primary)' }}>{showDetailModal.description}</div>
              {showDetailModal.resolution_summary && (
                <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <div style={{ color: '#6EE7B7', fontWeight: 600 }}>Resolution:</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{showDetailModal.resolution_summary}</div>
                </div>
              )}
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>
              Database Trigger Audit Trail (<code>ticket_audit_log</code>)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
              {auditLogs.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No audit history records found.</div>
              ) : (
                auditLogs.map((log: any) => (
                  <div key={log.log_id} style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: '#A5B4FC' }}>{log.action_type}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{log.logged_at}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{log.comment}</div>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowDetailModal(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
