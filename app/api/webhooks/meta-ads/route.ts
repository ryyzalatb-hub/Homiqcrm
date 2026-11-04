import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || 'homiq_meta_webhook_secure_token_2026';

/**
 * GET: Webhook verification challenge from Meta Graph API.
 * When configuring Webhooks in Meta Developer Portal (Facebook for Developers),
 * Meta sends a GET request with hub.mode, hub.verify_token, and hub.challenge.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  return NextResponse.json({ error: 'Forbidden: Invalid verify token' }, { status: 403 });
}

/**
 * POST: Incoming lead payload from Meta Lead Ads (Instagram / Facebook / TikTok / Zapier).
 * Extracts lead parameters and allocates via Round-Robin.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support standard Meta Leadgen Object or Direct CRM Payload
    let leadName = 'Prospek Baru Meta Ads';
    let leadPhone = '0812-3456-7890';
    let projectName = 'Bumi Cimanuk Asri';
    let campaign = 'Promo Subsidi DP 0%';

    if (body.full_name) leadName = body.full_name;
    if (body.phone) leadPhone = body.phone;
    if (body.project_name) projectName = body.project_name;
    if (body.campaign_name) campaign = body.campaign_name;

    // Simulate Round-Robin PIC assignment
    const salesTeam = ['Kang Dika Pratama', 'Teh Nisa Andriani', 'Kang Fajar Ramadhan'];
    const assignedPIC = salesTeam[Math.floor(Math.random() * salesTeam.length)];
    const leadId = `lead-api-${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Lead berhasil diterima dan dialokasikan ke konsultan properti via Round-Robin',
      data: {
        lead_id: leadId,
        full_name: leadName,
        phone: leadPhone,
        project_name: projectName,
        assigned_to: assignedPIC,
        source: 'Meta Ads Webhook (Instagram/Facebook)',
        campaign,
        status: 'new_lead',
        created_at: new Date().toISOString()
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: 'Invalid JSON payload format',
      details: err?.message || 'Unknown error'
    }, { status: 400 });
  }
}