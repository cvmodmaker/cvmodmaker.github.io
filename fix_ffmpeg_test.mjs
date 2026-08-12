import fs from 'fs';

let content = fs.readFileSync('src/utils/zipExporter.ts', 'utf-8');

console.log(content.match(/await ffmpeg\.exec\(\[[^\]]+\]\);/));
