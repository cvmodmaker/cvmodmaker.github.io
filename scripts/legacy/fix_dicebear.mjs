import fs from 'fs';

let content = fs.readFileSync('src/utils/sampleData.ts', 'utf-8');

content = content.replace(
  /export function createAvatarSvgDataUrl[\s\S]*?return 'data:image\/svg\+xml;base64,' \+ btoa\(svg\);\n\}/m,
  `export function createAvatarSvgDataUrl(name: string, bgColor = '#3b82f6', textColor = '#ffffff'): string {
  const seed = encodeURIComponent(name || 'Unknown');
  const bg = bgColor.replace('#', '');
  return \`https://api.dicebear.com/10.x/glyphs/svg?seed=\${seed}&backgroundColor=\${bg}\`;
}`
);

fs.writeFileSync('src/utils/sampleData.ts', content);
