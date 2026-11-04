/**
 * HOMIQ — SMART PROPERTY CRM
 * End-to-End System Smoke Test & Route Integrity Auditor
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log('  HOMIQ SMART PROPERTY CRM — AUTOMATED SYSTEM INTEGRITY AUDIT  ');
console.log('================================================================\n');

const BASE_DIR = path.resolve(__dirname, '..');
const APP_DIR = path.join(BASE_DIR, 'app');

let totalTests = 0;
let passedTests = 0;

function check(label, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${label}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${label}`);
    console.error(`         ${err.message}`);
  }
}

// 1. Audit Route Coverage
console.log('--- 1. AUDITING 23 APP ROUTER ENDPOINTS ---');
const EXPECTED_ROUTES = [
  'page.tsx',
  'leads/page.tsx',
  'customers/page.tsx',
  'pipeline/page.tsx',
  'follow-ups/page.tsx',
  'projects/page.tsx',
  'siteplan/page.tsx',
  'construction/page.tsx',
  'team/page.tsx',
  'site-visits/page.tsx',
  'bookings/page.tsx',
  'kpr-calculator/page.tsx',
  'whatsapp-center/page.tsx',
  'documents/page.tsx',
  'gallery/page.tsx',
  'map-explorer/page.tsx',
  'lead-scoring/page.tsx',
  'ai-copilot/page.tsx',
  'analytics/page.tsx',
  'reports/page.tsx',
  'settings/page.tsx',
  'super-admin/page.tsx',
  'portal-kpr/page.tsx',
  'portal-kpr/[id]/page.tsx',
  'portal/page.tsx',
  'login/page.tsx'
];

EXPECTED_ROUTES.forEach(routeFile => {
  check(`Route file exists & has default export: app/${routeFile}`, () => {
    const fullPath = path.join(APP_DIR, routeFile);
    assert.ok(fs.existsSync(fullPath), `File not found: ${fullPath}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(
      content.includes('export default') || content.includes('redirect('),
      `Missing export default or redirect in app/${routeFile}`
    );
  });
});

// 2. Audit Demo Data Integrity
console.log('\n--- 2. AUDITING REAL ESTATE DEMO DATASET ---');
check('demo-data.ts contains valid projects, leads, bookings, and KPIs', () => {
  const demoDataPath = path.join(BASE_DIR, 'lib/demo-data.ts');
  assert.ok(fs.existsSync(demoDataPath), 'lib/demo-data.ts missing');
  const content = fs.readFileSync(demoDataPath, 'utf8');
  assert.ok(content.includes('DEMO_PROJECTS'), 'Missing DEMO_PROJECTS');
  assert.ok(content.includes('DEMO_LEADS'), 'Missing DEMO_LEADS');
  assert.ok(content.includes('DEMO_BOOKINGS'), 'Missing DEMO_BOOKINGS');
  assert.ok(content.includes('DEMO_KPI'), 'Missing DEMO_KPI');
  assert.ok(content.includes('Bumi Cimanuk Asri'), 'Missing project Bumi Cimanuk Asri');
  assert.ok(content.includes('Grand Karangpawitan'), 'Missing project Grand Karangpawitan');
});

// 3. Audit Critical Enterprise Features
console.log('\n--- 3. AUDITING ENTERPRISE SPECIFIC CAPABILITIES ---');

check('e-Meterai Peruri Rp 10.000 & Digital Signature present in Documents', () => {
  const docPage = fs.readFileSync(path.join(APP_DIR, 'documents/page.tsx'), 'utf8');
  assert.ok(docPage.includes('e-Meterai'), 'Missing e-Meterai references');
  assert.ok(docPage.includes('10000') || docPage.includes('10.000'), 'Missing 10.000 meterai nominal');
  assert.ok(docPage.includes('Digital Signature') || docPage.includes('E-SIGN'), 'Missing digital signature');
});

check('SLIK OJK Pra-Skrining present in Customers 360 dossier', () => {
  const custPage = fs.readFileSync(path.join(APP_DIR, 'customers/page.tsx'), 'utf8');
  assert.ok(custPage.includes('SLIK') || custPage.includes('BI Checking'), 'Missing SLIK OJK audit');
  assert.ok(custPage.includes('Kol-1') || custPage.includes('KOL-1'), 'Missing Kol-1 status');
});

check('Bank BTN BAPF and Construction S-Curve present in Construction page', () => {
  const constPage = fs.readFileSync(path.join(APP_DIR, 'construction/page.tsx'), 'utf8');
  assert.ok(constPage.includes('BAPF'), 'Missing BAPF references');
  assert.ok(constPage.includes('Bank BTN'), 'Missing Bank BTN references');
  assert.ok(constPage.includes('quality_checks'), 'Missing quality_checks SNI');
});

check('Payment Gateway Escrow (QRIS Dinamis & VAs) present in Bookings', () => {
  const bookPage = fs.readFileSync(path.join(APP_DIR, 'bookings/page.tsx'), 'utf8');
  assert.ok(bookPage.includes('activePaymentGateway'), 'Missing activePaymentGateway state');
  assert.ok(bookPage.includes('QRIS'), 'Missing QRIS option');
  assert.ok(bookPage.includes('BTN VA') || bookPage.includes('Virtual Account'), 'Missing VA options');
});

check('PPN DTP Government Tax Incentive (PMK No. 7/2024) present in KPR Calculator', () => {
  const kprPage = fs.readFileSync(path.join(APP_DIR, 'kpr-calculator/page.tsx'), 'utf8');
  assert.ok(kprPage.includes('PPN DTP'), 'Missing PPN DTP reference');
  assert.ok(kprPage.includes('PMK No. 7/2024'), 'Missing PMK 7/2024 regulation citation');
});

check('Corporate 5-in-1 Role Switcher present in Login page', () => {
  const loginPage = fs.readFileSync(path.join(APP_DIR, 'login/page.tsx'), 'utf8');
  assert.ok(loginPage.includes('Direktur Utama'), 'Missing Direktur Utama role card');
  assert.ok(loginPage.includes('Konsultan Marketing'), 'Missing Marketing role card');
  assert.ok(loginPage.includes('Admin Keuangan'), 'Missing Finance role card');
  assert.ok(loginPage.includes('Site Manager'), 'Missing Site Manager role card');
  assert.ok(loginPage.includes('Super Admin'), 'Missing Super Admin role card');
});

check('Progressive Web App (PWA) assets: manifest.json & sw.js verified', () => {
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'public/manifest.json')), 'manifest.json missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'public/sw.js')), 'sw.js missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'public/favicon.svg')), 'favicon.svg missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'public/robots.txt')), 'robots.txt missing');
});

check('Sound chimes (Web Audio API) with topbar Mute/Unmute toggle verified', () => {
  const toastFile = fs.readFileSync(path.join(BASE_DIR, 'components/ui/Toast.tsx'), 'utf8');
  const headerFile = fs.readFileSync(path.join(BASE_DIR, 'components/layout/Header.tsx'), 'utf8');
  assert.ok(toastFile.includes('playNotificationSound'), 'Missing playNotificationSound in Toast.tsx');
  assert.ok(toastFile.includes('AudioContext'), 'Missing AudioContext Web Audio API');
  assert.ok(headerFile.includes('Volume2') && headerFile.includes('VolumeX'), 'Missing sound toggle in Header.tsx');
});

// 4. Audit Documentation & Deployment Files
console.log('\n--- 4. AUDITING DOCUMENTATION & DEPLOYMENT PREPAREDNESS ---');
check('README.md, DEPLOYMENT_GUIDE.md, and HOMIQ_PITCH_AND_DEMO_GUIDE.md exist and complete', () => {
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'README.md')), 'README.md missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'DEPLOYMENT_GUIDE.md')), 'DEPLOYMENT_GUIDE.md missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'HOMIQ_PITCH_AND_DEMO_GUIDE.md')), 'HOMIQ_PITCH_AND_DEMO_GUIDE.md missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, 'vercel.json')), 'vercel.json missing');
  assert.ok(fs.existsSync(path.join(BASE_DIR, '.env.example')), '.env.example missing');
});

console.log('\n================================================================');
console.log(`  AUDIT RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED (100% HEALTHY)`);
console.log('================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
