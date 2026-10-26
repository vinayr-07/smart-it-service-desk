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
  Flame
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Search Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
          <Sparkles size={14} /> VECTOR DATABASE / SEMANTIC SIMILARITY SEARCH
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
          AI Knowledge Base & Incident Diagnostic Search
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '850px', marginBottom: '20px' }}>
          Meets DBMS Level 3 Section 8: Converts unstructured incident descriptions into high-dimensional embedding vectors, 
          scoring candidate runbooks via <b>Cosine Similarity</b>: <code>sim(q, d) = (q · d) / (||q|| ||d||)</code>.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '12px', maxWidth: '780px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--accent-cyan)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '44px', height: '48px', fontSize: '1rem' }}
              placeholder="Describe symptoms in plain English (e.g. 'users cannot login with azure sso loop')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            className="btn btn-primary"
            style={{ padding: '0 24px', height: '48px' }}
            onClick={() => handleSearch()}
            disabled={loading}
          >
            {loading ? 'Vectorizing...' : 'Search KB'}
          </button>
        </div>

        {/* Sample Prompts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Prompts:</span>
          {sampleQueries.map((prompt, idx) => (
            <button
              key={idx}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.74rem', padding: '4px 10px' }}
              onClick={() => {
                setQuery(prompt);
                handleSearch(prompt);
              }}
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Search Results View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) minmax(450px, 1.4fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Ranked Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              VECTOR RANKED RESULTS ({results.length})
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Sorted by Cosine Score $\downarrow$
            </div>
          </div>

          {results.length === 0 && !loading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              No semantic matches found above the similarity threshold.
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
                  padding: '18px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-card)',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedArticle(item)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="badge badge-medium" style={{ fontSize: '0.68rem' }}>
                    {item.category}
                  </span>
                  
                  {/* Cosine Similarity Pill */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    padding: '3px 8px', 
                    borderRadius: 'var(--radius-full)', 
                    background: matchPercent > 70 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                    color: matchPercent > 70 ? '#6EE7B7' : '#67E8F9',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <Flame size={12} />
                    <span>{matchPercent}% Match</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '6px', color: isSelected ? '#38BDF8' : 'var(--text-primary)' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '12px' }}>
                  {item.summary}
                </p>

                {/* Matched Keywords */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.matchedKeywords.map((kw, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.68rem', 
                      background: 'rgba(99, 102, 241, 0.15)', 
                      color: '#C7D2FE',
                      padding: '2px 6px',
                      borderRadius: '4px'
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
          <div className="glass-card" style={{ padding: '28px', position: 'sticky', top: '88px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-medium" style={{ marginBottom: '8px' }}>
                  {selectedArticle.category} • KB-{selectedArticle.id}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {selectedArticle.title}
                </h2>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cosine Relevance</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {(selectedArticle.similarityScore * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                PROBLEM SUMMARY:
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                {selectedArticle.summary}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 700, marginBottom: '12px' }}>
                <BookOpen size={16} color="var(--accent-cyan)" /> Official IT Resolution Steps & Runbook
              </div>

              <div className="code-box" style={{ whiteSpace: 'pre-wrap', color: '#E2E8F0' }}>
                {selectedArticle.resolution}
              </div>
            </div>

            {selectedArticle.applicable_asset && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Applicable Configuration Item (CI):
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#A5B4FC', fontSize: '0.85rem' }}>
                  {selectedArticle.applicable_asset}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select an article from the left column to view the step-by-step resolution procedure.
          </div>
        )}

      </div>

    </div>
  );
}
