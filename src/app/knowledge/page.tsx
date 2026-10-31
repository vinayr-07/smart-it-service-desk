'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  FileCode, 
  Tag, 
  ArrowRight,
  Flame,
  Zap,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SearchResult } from '@/lib/vectorSearch';

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<SearchResult | null>(null);

  const sampleQueries = [
    'wifi disconnects and packet drop on switch',
    'mysql too many connections 1040 pool limit',
    'laptop battery bulging chassis swollen trackpad',
    'san storage volume disk space 90% full resize',
    'azure sso redirect loop login problem'
  ];

  const handleSearch = async (searchStr?: string) => {
    const q = searchStr !== undefined ? searchStr : query;
    if (!q.trim()) return;

    try {
      setLoading(true);
      const res = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setResults(data.results || []);
      if (data.results && data.results.length > 0) {
        setSelectedArticle(data.results[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial search with first sample query
    setQuery(sampleQueries[0]);
    handleSearch(sampleQueries[0]);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Search Header Banner - 9-Color Editorial Treatment */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.96) 0%, rgba(6, 17, 12, 0.94) 55%, rgba(91, 70, 50, 0.35) 100%)',
        border: '1px solid rgba(244, 217, 160, 0.32)',
        padding: '36px 40px',
        position: 'relative'
      }}>
        {/* Editorial Subtitle Pill */}
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
            <Sparkles size={13} /> Vector Database • High-Dimensional Semantic Match
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
            DBMS LEVEL 3 • SECTION 8
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
          Cognitive Runbook & Semantic Diagnostic Engine
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '880px', marginBottom: '24px', lineHeight: 1.6 }}>
          Converts raw, unstructured incident descriptions into mathematical dense embeddings, scoring candidate runbooks via 
          <span style={{ color: 'var(--c-gold)', fontWeight: 600 }}> Cosine Vector Similarity</span>: 
          <code style={{ 
            background: 'rgba(0,0,0,0.6)', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            border: '1px solid var(--border-color)', 
            color: 'var(--c-lemon)',
            marginLeft: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem'
          }}>
            sim(q, d) = (q · d) / (||q|| ||d||)
          </code>.
        </p>

        {/* Search Bar with Ultra-Refined Styling */}
        <div style={{ display: 'flex', gap: '14px', maxWidth: '820px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--c-gold)' }} />
            <input
              type="text"
              className="form-input"
              style={{ 
                paddingLeft: '48px', 
                height: '52px', 
                fontSize: '0.96rem', 
                background: 'rgba(11, 14, 13, 0.85)',
                border: '1px solid var(--c-mocha)',
                color: '#FFFFFF'
              }}
              placeholder="Describe symptoms in plain English (e.g. 'users cannot login with azure sso loop')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            className="btn btn-primary"
            style={{ 
              padding: '0 28px', 
              height: '52px', 
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => handleSearch()}
            disabled={loading}
          >
            <Sparkles size={16} />
            {loading ? 'Vectorizing...' : 'Search Runbooks'}
          </button>
        </div>

        {/* Curated Quick Prompts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Simulated Queries:
          </span>
          {sampleQueries.map((prompt, idx) => (
            <button
              key={idx}
              className="btn btn-secondary btn-sm"
              style={{ 
                fontSize: '0.74rem', 
                padding: '6px 12px',
                borderColor: 'var(--c-mocha)',
                background: 'rgba(23, 23, 23, 0.7)'
              }}
              onClick={() => {
                setQuery(prompt);
                handleSearch(prompt);
              }}
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Search Results View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 1.05fr) minmax(460px, 1.45fr)', gap: '26px', alignItems: 'start' }}>
        
        {/* Ranked Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6px' }}>
            <div className="font-editorial" style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--c-gold)', letterSpacing: '0.08em' }}>
              VECTOR RANKED CANDIDATES ({results.length})
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Cosine Metric $\downarrow$
            </div>
          </div>

          {results.length === 0 && !loading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
              No semantic matches found above the vector similarity threshold.
            </div>
          )}

          {results.map((item) => {
            const isSelected = selectedArticle?.id === item.id;
            const matchPercent = Math.round(item.similarityScore * 100);

            return (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: '22px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--c-gold)' : '1px solid rgba(91, 70, 50, 0.4)',
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(91, 70, 50, 0.22) 100%)' 
                    : 'rgba(23, 23, 23, 0.75)',
                  boxShadow: isSelected ? '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 16px rgba(244, 217, 160, 0.15)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={() => setSelectedArticle(item)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ 
                    fontSize: '0.68rem', 
                    fontWeight: 700, 
                    color: 'var(--c-gold)', 
                    background: 'rgba(244, 217, 160, 0.1)', 
                    border: '1px solid rgba(244, 217, 160, 0.25)', 
                    padding: '3px 8px', 
                    borderRadius: '4px',
                    letterSpacing: '0.04em'
                  }}>
                    {item.category}
                  </span>
                  
                  {/* Cosine Similarity Pill */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    padding: '4px 10px', 
                    borderRadius: 'var(--radius-full)', 
                    background: matchPercent > 70 ? 'rgba(255, 242, 26, 0.15)' : 'rgba(166, 107, 255, 0.15)',
                    border: matchPercent > 70 ? '1px solid var(--c-lemon)' : '1px solid var(--c-lavender)',
                    color: matchPercent > 70 ? 'var(--c-lemon)' : 'var(--c-lavender)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <Flame size={12} />
                    <span>{matchPercent}% Match</span>
                  </div>
                </div>

                <h3 className="font-editorial" style={{ 
                  fontSize: '1.08rem', 
                  fontWeight: 700, 
                  marginBottom: '8px', 
                  color: isSelected ? 'var(--c-gold)' : '#FFFFFF',
                  letterSpacing: '0.02em',
                  lineHeight: 1.3
                }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {item.summary}
                </p>

                {/* Matched Semantic Keywords */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.matchedKeywords.map((kw, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.68rem', 
                      background: 'rgba(166, 107, 255, 0.12)', 
                      color: 'var(--c-lavender)',
                      border: '1px solid rgba(166, 107, 255, 0.28)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Article Full Runbook View */}
        {selectedArticle ? (
          <div className="glass-card" style={{ 
            padding: '32px', 
            position: 'sticky', 
            top: '88px',
            background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(6, 17, 12, 0.9) 100%)',
            border: '1px solid rgba(244, 217, 160, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.68rem', 
                    fontWeight: 700, 
                    color: 'var(--c-gold)', 
                    background: 'rgba(244, 217, 160, 0.12)', 
                    border: '1px solid rgba(244, 217, 160, 0.3)', 
                    padding: '3px 8px', 
                    borderRadius: '4px' 
                  }}>
                    {selectedArticle.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    KB-{selectedArticle.id}
                  </span>
                </div>
                <h2 className="font-editorial" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em', lineHeight: 1.3 }}>
                  {selectedArticle.title}
                </h2>
              </div>
              
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cosine Relevance</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--c-lemon)', fontFamily: 'var(--font-mono)' }}>
                  {(selectedArticle.similarityScore * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Problem Statement Box */}
            <div style={{ 
              background: 'rgba(11, 14, 13, 0.85)', 
              padding: '16px 18px', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: '24px', 
              border: '1px solid var(--c-mocha)' 
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-gold)', marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                SYMPTOM SUMMARY &amp; SCOPE:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {selectedArticle.summary}
              </div>
            </div>

            {/* Resolution Runbook Code Box */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 700, color: 'var(--c-gold)', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <BookOpen size={16} color="var(--c-gold)" /> Official IT Resolution Steps &amp; Runbook
              </div>

              <div className="code-box" style={{ 
                whiteSpace: 'pre-wrap', 
                color: '#F4D9A0', 
                fontSize: '0.84rem', 
                lineHeight: 1.6, 
                border: '1px solid rgba(244, 217, 160, 0.25)', 
                background: '#070A08',
                padding: '20px'
              }}>
                {selectedArticle.resolution}
              </div>
            </div>

            {/* Applicable Configuration Item */}
            {selectedArticle.applicable_asset && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '14px 18px', 
                background: 'rgba(200, 121, 44, 0.08)', 
                borderRadius: 'var(--radius-sm)', 
                border: '1px solid rgba(200, 121, 44, 0.35)' 
              }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Target Configuration Item (CI Dependency):
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-amber)', fontSize: '0.88rem' }}>
                  {selectedArticle.applicable_asset}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select an article from the left column to view the step-by-step resolution procedure.
          </div>
        )}

      </div>

    </div>
  );
}