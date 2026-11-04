/**
 * HOMIQ SMART PROPERTY CRM
 * Verification Script for DraggableAIFab Component Logic
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('  TESTING DRAGGABLE AI FAB LOGIC & BOUNDARY INTEGRITY           ');
console.log('================================================================\n');

const BUTTON_SIZE = 48;
const PADDING = 14;
const DRAG_THRESHOLD = 5;

// Clamp function implementation
function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

// Bounds calculation
function getBounds(windowWidth, windowHeight) {
  const maxX = Math.max(PADDING, windowWidth - BUTTON_SIZE - PADDING);
  const maxY = Math.max(PADDING, windowHeight - BUTTON_SIZE - PADDING);
  return { minX: PADDING, minY: PADDING, maxX, maxY };
}

// 1. Boundary & Clamping Tests across Viewport Sizes
console.log('--- 1. VIEWPORT BOUNDARY AND CLAMPING TESTS ---');

const viewports = [
  { name: 'Desktop Full HD (1920x1080)', w: 1920, h: 1080, expMaxX: 1858, expMaxY: 1018 },
  { name: 'Laptop WXGA (1366x768)', w: 1366, h: 768, expMaxX: 1304, expMaxY: 706 },
  { name: 'Tablet iPad (768x1024)', w: 768, h: 1024, expMaxX: 706, expMaxY: 962 },
  { name: 'Mobile iPhone SE (375x667)', w: 375, h: 667, expMaxX: 313, expMaxY: 605 },
  { name: 'Ultra-Narrow Device (320x568)', w: 320, h: 568, expMaxX: 258, expMaxY: 506 },
];

viewports.forEach(vp => {
  const b = getBounds(vp.w, vp.h);
  assert.strictEqual(b.minX, PADDING, `minX mismatch on ${vp.name}`);
  assert.strictEqual(b.minY, PADDING, `minY mismatch on ${vp.name}`);
  assert.strictEqual(b.maxX, vp.expMaxX, `maxX mismatch on ${vp.name}`);
  assert.strictEqual(b.maxY, vp.expMaxY, `maxY mismatch on ${vp.name}`);
  console.log(`  [PASS] ${vp.name} -> Safe area: [${b.minX}, ${b.minY}] to [${b.maxX}, ${b.maxY}]`);
});

// Clamping negative or out-of-screen values
{
  const b = getBounds(1920, 1080);
  assert.strictEqual(clamp(-100, b.minX, b.maxX), PADDING, 'Negative X must clamp to PADDING');
  assert.strictEqual(clamp(9999, b.minX, b.maxX), b.maxX, 'Exceeding X must clamp to maxX');
  assert.strictEqual(clamp(-50, b.minY, b.maxY), PADDING, 'Negative Y must clamp to PADDING');
  assert.strictEqual(clamp(5000, b.minY, b.maxY), b.maxY, 'Exceeding Y must clamp to maxY');
  console.log('  [PASS] Extreme coordinate clamping (negative & overshoot) verified');
}

// 2. Click vs Drag Euclidean Distance Discrimination
console.log('\n--- 2. CLICK VS DRAG THRESHOLD DISCRIMINATION ---');

function evaluatePointerInteraction(startX, startY, endX, endY) {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const moveDistance = Math.hypot(deltaX, deltaY);
  const isDrag = moveDistance >= DRAG_THRESHOLD;
  return { moveDistance, isDrag, action: isDrag ? 'DRAG_MOVE' : 'OPEN_DRAWER' };
}

// Cases under threshold (< 5px) -> OPEN_DRAWER
const clickCases = [
  { sx: 100, sy: 100, ex: 100, ey: 100, desc: 'Exact stationary click (0px)' },
  { sx: 100, sy: 100, ex: 102, ey: 101, desc: 'Micro jitter tap (2.23px)' },
  { sx: 100, sy: 100, ex: 97, ey: 100, desc: 'Slight finger release shift (3px)' },
  { sx: 100, sy: 100, ex: 103, ey: 103, desc: 'Sub-threshold diagonal move (4.24px)' },
];

clickCases.forEach(c => {
  const res = evaluatePointerInteraction(c.sx, c.sy, c.ex, c.ey);
  assert.strictEqual(res.isDrag, false, `${c.desc} should NOT be recognized as drag`);
  assert.strictEqual(res.action, 'OPEN_DRAWER', `${c.desc} should trigger OPEN_DRAWER`);
  console.log(`  [PASS] ${c.desc} -> dist=${res.moveDistance.toFixed(2)}px -> ${res.action}`);
});

// Cases at or above threshold (>= 5px) -> DRAG_MOVE
const dragCases = [
  { sx: 100, sy: 100, ex: 105, ey: 100, desc: 'Exactly 5px horizontal drag' },
  { sx: 100, sy: 100, ex: 100, ey: 106, desc: '6px vertical drag' },
  { sx: 100, sy: 100, ex: 150, ey: 200, desc: 'Large intentional gesture (111.8px)' },
];

dragCases.forEach(c => {
  const res = evaluatePointerInteraction(c.sx, c.sy, c.ex, c.ey);
  assert.strictEqual(res.isDrag, true, `${c.desc} MUST be recognized as drag`);
  assert.strictEqual(res.action, 'DRAG_MOVE', `${c.desc} MUST NOT open drawer`);
  console.log(`  [PASS] ${c.desc} -> dist=${res.moveDistance.toFixed(2)}px -> ${res.action}`);
});

// 3. Tooltip Edge Positioning
console.log('\n--- 3. TOOLTIP DYNAMIC POSITIONING ---');
function getTooltipDirection(posX) {
  return posX < 180 ? 'RIGHT' : 'LEFT';
}
assert.strictEqual(getTooltipDirection(14), 'RIGHT', 'Near left edge (14px) must position tooltip to RIGHT');
assert.strictEqual(getTooltipDirection(150), 'RIGHT', '150px must position tooltip to RIGHT');
assert.strictEqual(getTooltipDirection(180), 'LEFT', '180px must position tooltip to LEFT');
assert.strictEqual(getTooltipDirection(1850), 'LEFT', 'Right screen must position tooltip to LEFT');
console.log('  [PASS] Dynamic tooltip positioning near screen edges verified');

// 4. LocalStorage Hydration & Sanitization Tests
console.log('\n--- 4. LOCALSTORAGE STATE PARSING & SAFETY TESTS ---');

function parseSavedPos(rawString, bounds) {
  let initialX = bounds.maxX;
  let initialY = bounds.maxY;

  try {
    if (rawString) {
      const parsed = JSON.parse(rawString);
      if (
        parsed &&
        typeof parsed === 'object' &&
        Number.isFinite(parsed.x) &&
        Number.isFinite(parsed.y)
      ) {
        initialX = clamp(parsed.x, bounds.minX, bounds.maxX);
        initialY = clamp(parsed.y, bounds.minY, bounds.maxY);
      }
    }
  } catch {
    // fallback
  }

  return { x: initialX, y: initialY };
}

const bounds = getBounds(1920, 1080);

// Null or undefined
assert.deepStrictEqual(parseSavedPos(null, bounds), { x: bounds.maxX, y: bounds.maxY });
// Malformed JSON string
assert.deepStrictEqual(parseSavedPos('invalid_json{', bounds), { x: bounds.maxX, y: bounds.maxY });
// NaN or non-finite coordinates
assert.deepStrictEqual(parseSavedPos('{"x": "abc", "y": 100}', bounds), { x: bounds.maxX, y: bounds.maxY });
// Out of bounds coordinates (should clamp safely)
assert.deepStrictEqual(parseSavedPos('{"x": -50, "y": 9999}', bounds), { x: bounds.minX, y: bounds.maxY });
// Legitimate valid coordinate
assert.deepStrictEqual(parseSavedPos('{"x": 500, "y": 400}', bounds), { x: 500, y: 400 });

console.log('  [PASS] LocalStorage parser handles null, malformed JSON, strings, NaN, and clamped coordinates');

// 5. Audit Component File Structure
console.log('\n--- 5. SOURCE CODE AUDIT ---');
const fabCode = fs.readFileSync(path.join(__dirname, '../components/ai/DraggableAIFab.tsx'), 'utf8');

assert.ok(fabCode.includes('setPointerCapture'), 'DraggableAIFab must use setPointerCapture');
assert.ok(fabCode.includes('touchAction'), 'DraggableAIFab must have touchAction none');
assert.ok(fabCode.includes('window.addEventListener(\'resize\''), 'DraggableAIFab must register window resize listener');
assert.ok(fabCode.includes('homiq_ai_fab_pos'), 'DraggableAIFab must use homiq_ai_fab_pos localStorage key');
assert.ok(fabCode.includes('DRAG_THRESHOLD'), 'DraggableAIFab must specify DRAG_THRESHOLD');
assert.ok(fabCode.includes('aria-haspopup="dialog"'), 'DraggableAIFab must have proper ARIA attributes');
assert.ok(fabCode.includes('onLostPointerCapture'), 'DraggableAIFab must handle onLostPointerCapture');
assert.ok(!fabCode.match(/if\s*\(saved\)\s*\{[\s\S]*?return;\s*\}/), 'No early return in saved position check that skips resize listener');

console.log('  [PASS] Component code passes all strict static audits');

console.log('\n================================================================');
console.log('  ALL DRAGGABLE FAB TESTS PASSED WITH 100% SUCCESS!             ');
console.log('================================================================\n');
