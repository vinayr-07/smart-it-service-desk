import { NextRequest, NextResponse } from 'next/server';
import { getAssets } from '@/lib/db';
import { getTopologyGraph, getBlastRadius } from '@/lib/neo4j';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode');
    const failedCiId = searchParams.get('blastRadius');

    if (failedCiId) {
      const blastResult = await getBlastRadius(failedCiId);
      return NextResponse.json(blastResult);
    }

    if (mode === 'topology') {
      const topology = await getTopologyGraph();
      return NextResponse.json(topology);
    }

    const assets = await getAssets();
    return NextResponse.json({ assets });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
