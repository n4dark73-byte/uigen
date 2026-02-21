const fs = require('fs');
const path = require('path');

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());
  const logFile = path.join(__dirname, '..', 'claude-read.log');
  const timestamp = new Date().toISOString();
  const toolName = toolArgs.tool_name || 'unknown';
  const readPath =
    toolArgs.tool_input?.file_path || toolArgs.tool_input?.path || '';

  // Log the file access
  const logEntry = `[${timestamp}] ${toolName}: ${readPath}\n`;
  fs.appendFileSync(logFile, logEntry);

  // Block reading .env files
  if (readPath.includes('.env')) {
    console.error('You cannot read the .env file');
    process.exit(2);
  }
}

main();
