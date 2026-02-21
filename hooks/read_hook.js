const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'claude-read.log');
const timestamp = new Date().toISOString();
const toolName = process.env.CLAUDE_TOOL_NAME || 'unknown';
const toolInput = process.env.CLAUDE_TOOL_INPUT || '{}';

let filePath = '';
try {
  const input = JSON.parse(toolInput);
  filePath = input.file_path || input.path || input.pattern || '';
} catch {
  filePath = toolInput;
}

const logEntry = `[${timestamp}] ${toolName}: ${filePath}\n`;
fs.appendFileSync(logFile, logEntry);
