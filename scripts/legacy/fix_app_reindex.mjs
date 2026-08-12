import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/reindexClipsByCharacter\(([^)]+)\)/g, (match, p1) => {
  // if it's already passing 2 args, skip
  if (p1.includes(', characters')) return match;
  return `reindexClipsByCharacter(${p1}, characters)`;
});

fs.writeFileSync('src/App.tsx', content);
