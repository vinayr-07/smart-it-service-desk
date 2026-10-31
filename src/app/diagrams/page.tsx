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
  CheckCircle2, 
  Sparkles,
  Printer
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Header Banner - 9-Color Editorial Treatment */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.96) 0%, rgba(6, 17, 12, 0.94) 55%, rgba(91, 70, 50, 0.35) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.32)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '36px 40px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              background: 'rgba(244, 217, 160, 0.12)', 
              border: '1px solid var(--c-gold)',
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              color: 'var(--c-gold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              <Layers size={13} /> Architecture &amp; Schematics • Formal Artifacts
            </span>
            <span style={{ 
              fontSize: '0.7rem', 
              padding: '3px 10px', 
              background: 'rgba(255, 242, 26, 0.1)', 
              border: '1px solid rgba(255, 242, 26, 0.35)', 
              borderRadius: 'var(--radius-full)', 
              color: 'var(--c-lemon)', 
              fontWeight: 800,
              letterSpacing: '0.06em'
            }}>
              SECTIONS 4, 7 &amp; 13
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
            Database Design &amp; Architectural Diagrams
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '820px', lineHeight: 1.6 }}>
            Formal graphical deliverables fulfilling 
            <span style={{ color: 'var(--c-gold)' }}> Section 4 (Peter Chen ER Notation)</span>, 
            <span style={{ color: 'var(--c-amber)' }}> Section 5 (3NF Relational Schema)</span>, 
            <span style={{ color: 'var(--c-lavender)' }}> Section 7 (Graph Topology)</span>, and 
            <span style={{ color: 'var(--c-lemon)' }}> Section 13 (3-Tier Enterprise Architecture)</span>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(11, 14, 13, 0.9)', 
          padding: '5px', 
          borderRadius: 'var(--radius-sm)', 
          border: '1px solid var(--c-mocha)', 
          gap: '6px',
          flexWrap: 'wrap'
        }}>
          <button
            className={`btn btn-sm ${activeTab === 'er' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => { setActiveTab('er'); setZoomLevel(100); }}
          >
            <GitBranch size={14} /> ER Diagram
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'rel' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => { setActiveTab('rel'); setZoomLevel(100); }}
          >
            <FileText size={14} /> Relational Schema
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'arch' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => { setActiveTab('arch'); setZoomLevel(100); }}
          >
            <Layers size={14} /> 3-Tier Architecture
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'cmdb' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => { setActiveTab('cmdb'); setZoomLevel(100); }}
          >
            <Network size={14} /> CMDB Topology
          </button>
        </div>
      </div>

      {/* Diagram Viewer Card */}
      <div className="glass-card" style={{ 
        padding: '28px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(6, 17, 12, 0.92) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.3)'
      }}>
        
        {/* Controls Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(91, 70, 50, 0.4)', paddingBottom: '20px' }}>
          <div>
            <h2 className="font-editorial" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--c-gold)', letterSpacing: '0.03em', marginBottom: '4px' }}>
              {current.title}
            </h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{current.subtitle}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 14, 13, 0.85)', padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-mocha)' }}>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(60, prev - 15))}
                style={{ background: 'none', border: 'none', color: 'var(--c-gold)', cursor: 'pointer', display: 'flex', padding: '2px' }}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', minWidth: '48px', textAlign: 'center', color: '#FFFFFF' }}>
                {zoomLevel}%
              </span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}
                style={{ background: 'none', border: 'none', color: 'var(--c-gold)', cursor: 'pointer', display: 'flex', padding: '2px' }}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button onClick={handleDownload} className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--c-mocha)', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px' }}>
              <Download size={14} color="var(--c-gold)" /> Export SVG
            </button>

            <button 
              onClick={() => {
                const printWindow = window.open(current.file, '_blank');
                if (printWindow) {
                  printWindow.focus();
                  setTimeout(() => printWindow.print(), 300);
                }
              }} 
              className="btn btn-primary btn-sm" 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px' }}
            >
              <Printer size={14} /> Print / Save PDF
            </button>
          </div>
        </div>

        {/* Description Banner */}
        <div style={{ 
          background: 'rgba(11, 14, 13, 0.8)', 
          padding: '14px 18px', 
          borderRadius: 'var(--radius-sm)', 
          border: '1px solid var(--c-mocha)', 
          fontSize: '0.88rem', 
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          <b style={{ color: 'var(--c-gold)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.8rem', marginRight: '8px' }}>
            Specification &amp; Notation:
          </b> 
          {current.desc}
        </div>

        {/* Viewport Frame */}
        <div style={{
          background: 'radial-gradient(ellipse at center, #0F1612 0%, #06110C 100%)',
          border: '1px solid var(--c-mocha)',
          borderRadius: 'var(--radius-md)',
          overflow: 'auto',
          maxHeight: '780px',
          padding: '28px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.85)'
        }}>
          <div style={{ width: `${zoomLevel}%`, minWidth: '920px', transition: 'width 0.2s ease-out', margin: '0 auto' }}>
            <img 
              src={current.file} 
              alt={current.title} 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.7))' }} 
            />
          </div>
        </div>

      </div>

      {/* Checklist Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
        <div className="glass-card" style={{ padding: '24px', background: 'rgba(23, 23, 23, 0.85)', border: '1px solid rgba(244, 217, 160, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-lemon)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '12px' }}>
            <CheckCircle2 size={18} color="var(--c-lemon)" /> 
            <span className="font-editorial" style={{ letterSpacing: '0.03em', color: '#FFFFFF' }}>Syllabus Section 4: ER Design</span>
          </div>
          <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.5 }}>
            <li>Entity identification with primary keys (PK) and foreign keys (FK)</li>
            <li>Referential actions: <code style={{ color: 'var(--c-lemon)' }}>ON DELETE RESTRICT</code> and <code style={{ color: 'var(--c-lemon)' }}>CASCADE</code></li>
            <li>Crow&apos;s foot cardinality indicators (1:1 and 1:N)</li>
            <li>Domain check constraints and enum definitions</li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '24px', background: 'rgba(23, 23, 23, 0.85)', border: '1px solid rgba(166, 107, 255, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-lavender)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '12px' }}>
            <CheckCircle2 size={18} color="var(--c-lavender)" /> 
            <span className="font-editorial" style={{ letterSpacing: '0.03em', color: '#FFFFFF' }}>Syllabus Section 13: Architecture</span>
          </div>
          <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.5 }}>
            <li>3-Tier separation: Client Presentation, Route Handlers, Multi-Model DBs</li>
            <li>Role-Based Access Control integration for 3 user roles</li>
            <li>Connection routes from Next.js to MySQL and Neo4j</li>
            <li>On-device high-dimensional vector embedding engine</li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '24px', background: 'rgba(23, 23, 23, 0.85)', border: '1px solid rgba(200, 121, 44, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--c-amber)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '12px' }}>
            <CheckCircle2 size={18} color="var(--c-amber)" /> 
            <span className="font-editorial" style={{ letterSpacing: '0.03em', color: '#FFFFFF' }}>Syllabus Section 7: NoSQL CMDB</span>
          </div>
          <ul style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.5 }}>
            <li>Configuration Items mapped across 5 architectural tiers</li>
            <li>Directed edges: <code style={{ color: 'var(--c-amber)' }}>[:DEPENDS_ON]</code> and <code style={{ color: 'var(--c-amber)' }}>[:HOSTED_ON]</code></li>
            <li>Outage blast-radius propagation path calculation</li>
            <li>Sub-millisecond graph query traversal via Cypher</li>
          </ul>
        </div>
      </div>

    </div>
  );
}