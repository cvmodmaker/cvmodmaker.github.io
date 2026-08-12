import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(
  /onAssignToActiveClip=\{handleAssignToActiveClip\}/,
  'onAssignToActiveClip={selectedClipIds.length === 1 ? handleAssignToActiveClip : undefined}'
);
fs.writeFileSync('src/App.tsx', content);
