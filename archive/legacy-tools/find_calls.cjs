const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('analyzeSubtema')) {
    console.log(`File: ${file}`);
    // Find lines containing analyzeSubtema
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('analyzeSubtema')) {
        console.log(`  L${i+1}: ${line.trim()}`);
      }
    });
  }
});
