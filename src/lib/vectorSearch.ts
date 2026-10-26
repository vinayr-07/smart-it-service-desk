// ============================================================================
// Vector Database Engine: Embedding Generation & Cosine Similarity Search
// Meets PDF Section 8: Vector Database / Semantic Search
// ============================================================================

import articlesData from '../../database/vector_knowledge.json';

export interface SearchResult {
  id: number;
  title: string;
  category: string;
  summary: string;
  resolution: string;
  applicable_asset?: string;
  tags: string[];
  similarityScore: number; // 0.00 to 1.00
  matchedKeywords: string[];
}

/**
 * Stopwords to prune non-informative tokens
 */
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'could', 'did', 'do', 'does', 'doing', 'down',
  'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
  'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if',
  'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my',
  'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she',
  'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours'
]);

/**
 * Tokenize and normalize input string
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

/**
 * Build vocabulary and calculate TF vector for text
 */
function calculateTFVector(tokens: string[], vocabulary: string[]): number[] {
  const counts: Record<string, number> = {};
  for (const token of tokens) {
    counts[token] = (counts[token] || 0) + 1;
  }
  return vocabulary.map(word => (counts[word] ? counts[word] / tokens.length : 0));
}

/**
 * Calculate Cosine Similarity between vector A and vector B
 * sim = (A . B) / (||A|| * ||B||)
 */
export function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Perform Vector Semantic Search over Knowledge Base Articles
 */
export function searchKnowledgeBase(query: string, minScore = 0.15): SearchResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  // Build global vocabulary from query and documents
  const allVocabSet = new Set<string>(queryTokens);
  
  const documents = articlesData.map(doc => {
    const docTokens = [
      ...tokenize(doc.title),
      ...tokenize(doc.summary),
      ...tokenize(doc.resolution),
      ...doc.keywords.map(k => k.toLowerCase())
    ];
    docTokens.forEach(t => allVocabSet.add(t));
    return {
      doc,
      docTokens
    };
  });

  const vocabulary = Array.from(allVocabSet);
  const queryVector = calculateTFVector(queryTokens, vocabulary);

  const results: SearchResult[] = [];

  for (const { doc, docTokens } of documents) {
    const docVector = calculateTFVector(docTokens, vocabulary);
    const cosineSim = calculateCosineSimilarity(queryVector, docVector);
    
    // Check keyword overlap
    const matched = queryTokens.filter(q => 
      docTokens.includes(q) || doc.keywords.some(k => k.toLowerCase().includes(q))
    );

    // Boost score if keyword matches title or exact keywords
    let finalScore = cosineSim;
    if (matched.length > 0) {
      finalScore = Math.min(1.0, cosineSim * 1.5 + (matched.length * 0.12));
    }

    if (finalScore >= minScore) {
      results.push({
        id: doc.id,
        title: doc.title,
        category: doc.category,
        summary: doc.summary,
        resolution: doc.resolution,
        applicable_asset: doc.applicable_asset,
        tags: doc.tags,
        similarityScore: Math.round(finalScore * 100) / 100,
        matchedKeywords: Array.from(new Set(matched))
      });
    }
  }

  // Sort descending by similarity score
  return results.sort((a, b) => b.similarityScore - a.similarityScore);
}
