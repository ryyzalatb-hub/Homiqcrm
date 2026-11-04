import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    app: 'HOMIQ — Smart Property CRM',
    version: '1.2.0',
    edition: 'Enterprise Multi-Tenant B2B SaaS',
    timestamp: new Date().toISOString(),
    services: {
      row_locking_db: 'ONLINE',
      webhook_ingestion: 'ACTIVE',
      whatsapp_gateway: 'READY',
      kpr_engine: 'ONLINE'
    },
    supported_tenants: [
      { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: 'Garut Sejahtera Property', plan: 'Business' }
    ]
  }, { status: 200 });
}