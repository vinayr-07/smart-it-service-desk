import { NextRequest, NextResponse } from 'next/server';
import { getTickets, createTicket, autoAssignTicket, resolveTicketAtomic, getAuditLogs } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const priority = searchParams.get('priority') || undefined;
    const ticketId = searchParams.get('id');

    if (ticketId) {
      const tickets = await getTickets();
      const ticket = tickets.find(t => t.ticket_id === parseInt(ticketId));
      if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
      const logs = await getAuditLogs(parseInt(ticketId));
      return NextResponse.json({ ticket, logs });
    }

    const tickets = await getTickets(status, priority);
    return NextResponse.json({ tickets });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, priority, asset_id, created_by } = body;

    if (!title || !description || !category || !priority) {
      return NextResponse.json({ error: 'Missing required ticket fields' }, { status: 400 });
    }

    const newTicket = await createTicket({
      title,
      description,
      category,
      priority,
      asset_id: asset_id ? parseInt(asset_id) : undefined,
      created_by: created_by ? parseInt(created_by) : 7 // Default to employee Aditya
    });

    return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, ticket_id, solution, asset_status, agent_id } = body;

    if (!ticket_id) {
      return NextResponse.json({ error: 'ticket_id is required' }, { status: 400 });
    }

    if (action === 'auto_assign') {
      const result = await autoAssignTicket(parseInt(ticket_id));
      return NextResponse.json({ success: true, ...result });
    }

    if (action === 'resolve_atomic') {
      if (!solution) {
        return NextResponse.json({ error: 'solution description is required for resolution' }, { status: 400 });
      }
      const resolved = await resolveTicketAtomic(
        parseInt(ticket_id),
        agent_id ? parseInt(agent_id) : 3,
        solution,
        asset_status || 'OPERATIONAL'
      );
      return NextResponse.json({ success: true, ticket: resolved });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
