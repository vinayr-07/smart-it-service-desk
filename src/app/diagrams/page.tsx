'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Network, 
  GitBranch, 
  Download, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function DiagramsPage() {
  const [activeTab, setActiveTab] = useState<'er' | 'rel' | 'arch' | 'cmdb'>('er');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const diagrams = {
    er: {
      title: 'Entity-Relationship (ER) Diagram',
      subtitle: 'Strict Peter Chen DBMS Notation • Experiential Learning Rulebook Compliant',
      file: '/diagrams/er_diagram.svg',
      desc: 'Formally models the conceptual design adhering strictly to DBMS rulebook specifications: Rectangles (Strong Entities), Double Rectangles (Weak Entities), Diamonds (Relationships), Double Diamonds (Identifying Relationships), Double Lines (Total Participation), Underlined Ovals (Primary Keys), Dashed Underlines (Discriminators), Branching Ovals (Composite Attributes), Double Ovals (Multivalued Attributes), and Dashed Ovals (Derived Attributes).'
    },
    rel: {
      title: 'Relational Schema Diagram (3NF Normalization)',
      subtitle: 'Table Schema Mapping • Underlined Primary Keys • Foreign Key Arrows',
      file: '/diagrams/relational_schema.svg',
      desc: 'Illustrates the formal relational schema mapping after ER-to-relational conversion. Depicts each table with underlined Primary Keys, foreign key referential arrows pointing directly to parent primary keys, data types, and referential integrity constraints (CASCADE, RESTRICT, SET NULL).'
    },
    arch: {
      title: '3-Tier System Architecture Diagram',
      subtitle: 'Client Presentation • Next.js Route Handlers • Multi-Paradigm Data Tier',
      file: '/diagrams/system_architecture.svg',
      desc: 'Illustrates the 3-Tier Enterprise Architecture: Next.js Frontend with RBAC, Backend Route Handlers, and the Multi-Paradigm Data Tier combining MySQL (SQL), Neo4j (NoSQL Graph), and Vector Embeddings.'
    },
    cmdb: {
      title: 'Neo4j CMDB Topology & Blast Radius Graph',
      subtitle: 'Graph Database Paradigm • Configuration Items • Failure Propagation',
      file: '/diagrams/cmdb_topology.svg',
      desc: 'Maps IT Configuration Items (Applications, Microservices, Databases, Servers, Switches) across 5 architectural tiers, demonstrating recursive Cypher traversal when edge switch SW-EDGE-02 suffers an outage.'
    }
  };

  const current = diagrams[activeTab];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = current.file;
    link.download = `${activeTab}_diagram.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#A5B4FC', marginBottom: '8px' }}>
            <Layers size={14} /> SYSTEM DESIGN ARTIFACTS &amp; DIAGRAMS
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
            Database Design &amp; Architectural Diagrams
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '800px' }}>
            Official graphical deliverables fulfilling <b>Section 4 (Database Design / ER Diagram)</b> and <b>Section 13 (System Architecture)</b> of the DBMS Level 3 syllabus.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', gap: '4px' }}>
          <button
            className={`btn btn-sm ${activeTab === 'er' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('er'); setZoomLevel(100); }}
          >
            <GitBranch size={14} /> ER Diagram
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'rel' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('rel'); setZoomLevel(100); }}
          >
            <FileText size={14} /> Relational Schema
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'arch' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('arch'); setZoomLevel(100); }}
          >
            <Layers size={14} /> System Architecture
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'cmdb' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('cmdb'); setZoomLevel(100); }}
          >
            <Network size={14} /> CMDB Topology
          </button>
        </div>
      </div>

      {/* Diagram Viewer Card */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Controls Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{current.title}</h2>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{current.subtitle}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-input)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(60, prev - 15))}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', minWidth: '45px', textAlign: 'center' }}>
                {zoomLevel}%
              </span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button onClick={handleDownload} className="btn btn-secondary btn-sm">
              <Download size={14} /> Export SVG
            </button>
          </div>
        </div>

        {/* Description Banner */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          <b>Overview:</b> {current.desc}
        </div>

        {/* Viewport Frame */}
        <div style={{
          background: '#040711',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto',
          maxHeight: '780px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <div style={{ width: `${zoomLevel}%`, minWidth: '900px', transition: 'width 0.2s ease-out', margin: '0 auto' }}>
            <img 
              src={current.file} 
              alt={current.title} 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} 
            />
          </div>
        </div>

      </div>

      {/* Checklist Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6EE7B7', fontWeight: 700, fontSize: '0.95rem', marginBottom: '10px' }}>
            <CheckCircle2 size={18} /> Syllabus Section 4: ER Design
          </div>
          <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Entity identification with primary keys (PK) and foreign keys (FK)</li>
            <li>Referential actions: <code>ON DELETE RESTRICT</code> and <code>CASCADE</code></li>
            <li>Crow's foot cardinality indicators (1:1 and 1:N)</li>
            <li>Domain check constraints and enum definitions</li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#67E8F9', fontWeight: 700, fontSize: '0.95rem', marginBottom: '10px' }}>
            <CheckCircle2 size={18} /> Syllabus Section 13: System Architecture
          </div>
          <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>3-Tier separation: Client, API Middleware, Multi-Model DBs</li>
            <li>Role-Based Access Control integration for 3 user types</li>
            <li>Connection routes from Next.js to MySQL and Neo4j</li>
            <li>Decoupled on-device vector embedding engine</li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C084FC', fontWeight: 700, fontSize: '0.95rem', marginBottom: '10px' }}>
            <CheckCircle2 size={18} /> Syllabus Section 7: NoSQL CMDB
          </div>
          <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Configuration Items mapped across 5 architectural tiers</li>
            <li>Directed edges: <code>[:DEPENDS_ON]</code> and <code>[:HOSTED_ON]</code></li>
            <li>Outage blast-radius propagation path calculation</li>
            <li>Sub-millisecond graph query traversal via Cypher</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
