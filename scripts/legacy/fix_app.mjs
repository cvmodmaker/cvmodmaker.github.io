import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /const handleSelectClip = \(clipId: string, isMultiSelect = false\) => \{/,
  `const handleSelectClip = (clipId?: string, isMultiSelect = false) => {
    if (!clipId) {
      setSelectedClipIds([]);
      setSelectedClipId(undefined);
      return;
    }`
);

fs.writeFileSync('src/App.tsx', content);
