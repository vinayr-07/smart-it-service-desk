'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TicketCheck, 
  Network, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  UserCheck, 
  Layers, 
  Activity,
  Database
} from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<'Admin' | 'Agent' | 'Employee'>('Admin');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: '/', label: 'Command Center', icon: LayoutDashboard },
    { href: '/tickets', label: 'Incident Desk', icon: TicketCheck },
    { href: '/assets', label: 'CMDB & Topology', icon: Network },
    { href: '/knowledge', label: 'AI Knowledge Search', icon: Sparkles },
    { href: '/diagrams', label: 'ERD & Architecture', icon: Layers },
    { href: '/db-demo', label: 'DBMS 3.0 Showcase', icon: Terminal },
  ];

  return (
    <html lang="en">
      <head>
        <title>Smart IT Service Desk | DBMS Level 3 Project</title>
        <meta name="description" content="Smart IT Service Desk with Asset Management, Neo4j Topology, and Vector Knowledge Search" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="app-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="brand-header">
              <div className="brand-icon">
                <Layers size={22} />
              </div>
              <div>
                <div className="brand-title">Smart Service Desk</div>
                <div className="brand-sub">DBMS Level 3 • Multi-Model</div>
              </div>
            </div>

            <nav className="nav-menu">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Role Switcher */}
            <div className="role-switcher-card">
              <div className="role-label">
                <span>Active Persona (RBAC)</span>
                {currentRole === 'Admin' && <ShieldCheck size={14} color="#6366F1" />}
                {currentRole === 'Agent' && <UserCheck size={14} color="#10B981" />}
                {currentRole === 'Employee' && <Activity size={14} color="#06B6D4" />}
              </div>
              <select
                className="role-select"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as any)}
              >
                <option value="Admin">Admin (Vinay R - Lead)</option>
                <option value="Agent">Agent (Karthik Raja - Tier 2)</option>
                <option value="Employee">Employee (Aditya Verma)</option>
              </select>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Role-based privileges active for {currentRole}.
              </div>
            </div>
          </aside>

          {/* Main Wrapper */}
          <div className="main-wrapper">
            <header className="top-navbar">
              <div className="page-title">
                {pathname === '/' && 'Operations Command Center'}
                {pathname === '/tickets' && 'Service Incident & Ticket Management'}
                {pathname === '/assets' && 'IT Configuration Items & Blast Radius Graph'}
                {pathname === '/knowledge' && 'AI-Powered Semantic Knowledge Base'}
                {pathname === '/diagrams' && 'System Architecture & ER Diagram Design'}
                {pathname === '/db-demo' && 'DBMS Level 3 Evaluation Console'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span className="status-dot pulse" style={{ backgroundColor: '#10B981' }}></span>
                  <span>SQL: <b>MySQL 8.0</b></span>
                  <span style={{ color: 'var(--border-color)' }}>|</span>
                  <span>Graph: <b>Neo4j Cypher</b></span>
                  <span style={{ color: 'var(--border-color)' }}>|</span>
                  <span>Vector: <b>Cosine Sim</b></span>
                </div>

                <div style={{ padding: '6px 12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                  {currentTime || '13:45:00'}
                </div>
              </div>
            </header>

            <main className="content-body">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
