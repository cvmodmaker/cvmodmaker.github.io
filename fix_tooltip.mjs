import fs from 'fs';
let content = fs.readFileSync('src/main.tsx', 'utf-8');
content = content.replace(/<TooltipProvider delayDuration=\{1000\}>/, '<TooltipProvider delayDuration={1000} skipDelayDuration={0}>');
fs.writeFileSync('src/main.tsx', content);
