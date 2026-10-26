import { NextRequest, NextResponse } from 'next/server';
import { getViewActiveTicketsSLA, getViewAgentWorkload, getViewAssetFailureFrequency } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const viewName = searchParams.get('name');

    if (viewName === 'v_active_tickets_sla') {
      const data = await getViewActiveTicketsSLA();
      return NextResponse.json({ view: viewName, rows: data });
    } else if (viewName === 'v_agent_workload_metrics') {
      const data = await getViewAgentWorkload();
      return NextResponse.json({ view: viewName, rows: data });
    } else if (viewName === 'v_asset_failure_frequency') {
      const data = await getViewAssetFailureFrequency();
      return NextResponse.json({ view: viewName, rows: data });
    }

    // Default return all views
    const [activeSla, agentWorkload, assetFailures] = await Promise.all([
      getViewActiveTicketsSLA(),
      getViewAgentWorkload(),
      getViewAssetFailureFrequency()
    ]);

    return NextResponse.json({
      activeSla,
      agentWorkload,
      assetFailures
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
