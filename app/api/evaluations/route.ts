import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Enable Edge Runtime for Cloudflare compatibility
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const agent = searchParams.get('agent');

    // Get from Supabase
    let query = supabase
      .from('cs_evaluation')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (agent && agent !== 'all') {
      query = query.eq('agent_name', agent);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching evaluations:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch evaluations' },
      { status: 500 }
    );
  }
}
