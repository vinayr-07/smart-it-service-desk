import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase } from '@/lib/vectorSearch';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Search query string is required' }, { status: 400 });
    }

    const results = searchKnowledgeBase(query);
    return NextResponse.json({ query, totalResults: results.length, results });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
