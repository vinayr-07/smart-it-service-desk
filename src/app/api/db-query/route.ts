import { NextRequest, NextResponse } from 'next/server';
import { executeSQLQuery } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sql } = body;

    if (!sql || typeof sql !== 'string') {
      return NextResponse.json({ error: 'SQL query text is required' }, { status: 400 });
    }

    const result = await executeSQLQuery(sql);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
