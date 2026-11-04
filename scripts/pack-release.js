const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = path.resolve(__dirname, '..');
const zipPath = path.resolve(projectDir, '..', 'homiq-smart-property-crm-production-ready.zip');

console.log('Packing project to:', zipPath);

const psScript = `
$ProgressPreference = 'SilentlyContinue'
$src = '${projectDir.replace(/\\/g, '\\\\')}'
$dst = '${zipPath.replace(/\\/g, '\\\\')}'
if (Test-Path $dst) { Remove-Item -Force $dst }
Get-ChildItem -Path $src -Exclude 'node_modules','.next','.git' | Compress-Archive -DestinationPath $dst -Force
$item = Get-Item $dst
Write-Host "SUCCESS: Archive created with size: $($item.Length) bytes ($([math]::Round($item.Length / 1KB, 1)) KB)"
`;

fs.writeFileSync(path.join(__dirname, 'pack.ps1'), psScript);
try {
  const out = execSync(`powershell -ExecutionPolicy Bypass -File "${path.join(__dirname, 'pack.ps1')}"`, { encoding: 'utf-8' });
  console.log(out);
} finally {
  if (fs.existsSync(path.join(__dirname, 'pack.ps1'))) {
    fs.unlinkSync(path.join(__dirname, 'pack.ps1'));
  }
}
