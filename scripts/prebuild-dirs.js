const fs = require('fs');
const path = require('path');

const appDir = path.resolve(__dirname, '../app');
const nextDir = path.resolve(__dirname, '../.next');

function getAllDirs(dir, base = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const relPath = path.join(base, entry.name);
      results.push(relPath);
      results = results.concat(getAllDirs(path.join(dir, entry.name), relPath));
    }
  }
  return results;
}

const appSubdirs = getAllDirs(appDir);

const targets = [
  path.join(nextDir, 'server/app'),
  path.join(nextDir, 'types/app'),
  path.join(nextDir, 'static/chunks/app'),
  path.join(nextDir, 'static/chunks/pages'),
  path.join(nextDir, 'cache/webpack'),
  path.join(nextDir, 'server/pages'),
];

for (const t of targets) {
  fs.mkdirSync(t, { recursive: true });
}

for (const sub of appSubdirs) {
  fs.mkdirSync(path.join(nextDir, 'server/app', sub), { recursive: true });
  fs.mkdirSync(path.join(nextDir, 'types/app', sub), { recursive: true });
  fs.mkdirSync(path.join(nextDir, 'static/chunks/app', sub), { recursive: true });
}

console.log('Pre-created', appSubdirs.length, 'app directories under .next');
