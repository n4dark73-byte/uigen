const fs = require('fs');
const path = require('path');

const claudeDir = path.join(process.cwd(), '.claude');
const exampleFile = path.join(claudeDir, 'settings.example.json');
const localFile = path.join(claudeDir, 'settings.local.json');

if (fs.existsSync(localFile)) {
  console.log('✓ .claude/settings.local.json already exists, skipping.');
  process.exit(0);
}

if (!fs.existsSync(exampleFile)) {
  console.error('✗ .claude/settings.example.json not found.');
  process.exit(1);
}

fs.copyFileSync(exampleFile, localFile);
console.log('✓ .claude/settings.local.json created from settings.example.json');
