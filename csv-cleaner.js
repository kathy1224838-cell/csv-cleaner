#!/usr/bin/env node

const fs = require('fs');

function cleanCsv(inputPath, outputPath) {
  const lines = fs.readFileSync(inputPath, 'utf8')
    .split(/\r?\n/)
    .filter(line => line.trim() !== '');
  if (lines.length < 2) throw new Error('CSV 至少需要标题行和一行数据');

  const headers = lines[0].split(',').map(h => h.trim());
  const seen = new Set();
  const output = [headers.join(',')];

  for (const line of lines.slice(1)) {
    const cells = line.split(',').map(c => c.trim());
    if (cells.length !== headers.length) continue;
    const normalized = cells.join('|').toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(cells.join(','));
  }
  fs.writeFileSync(outputPath, output.join('\n') + '\n');
  return { inputRows: lines.length - 1, outputRows: output.length - 1 };
}

if (require.main === module) {
  const [, , input, output = 'cleaned.csv'] = process.argv;
  if (!input) {
    console.error('用法: node csv-cleaner.js input.csv [cleaned.csv]');
    process.exit(1);
  }
  try {
    const result = cleanCsv(input, output);
    console.log(`完成：${result.inputRows} 行 -> ${result.outputRows} 行，输出到 ${output}`);
  } catch (error) {
    console.error(`处理失败：${error.message}`);
    process.exit(1);
  }
}

module.exports = { cleanCsv };
