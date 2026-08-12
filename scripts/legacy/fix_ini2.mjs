import fs from 'fs';

let content = fs.readFileSync('src/utils/ini.ts', 'utf-8');

content = content.replace(
  /export function reindexClipsByCharacter\(clips: TimelineClip\[\]\): TimelineClip\[\] \{/,
  `export function reindexClipsByCharacter(clips: TimelineClip[], characters: import('../types').Character[] = []): TimelineClip[] {`
);

content = content.replace(
  /const newFilename = \`\$\{padded\}_\$\{cleanChar\}\`;\s*return \{\s*\.\.\.clip,\s*filename: newFilename,\s*\};/,
  `const newFilename = \`\$\{padded\}_\$\{cleanChar\}\`;
    
    // Check if autoScreenshot is enabled for this character
    const charObj = characters.find(c => c.name === primaryChar);
    let updatedImageFilename = clip.imageFilename;
    if (charObj?.autoScreenshot) {
      updatedImageFilename = \`\$\{cleanChar\}_frame_\$\{count\}.png\`;
    }

    return {
      ...clip,
      filename: newFilename,
      ...(charObj?.autoScreenshot ? { imageFilename: updatedImageFilename } : {})
    };`
);

fs.writeFileSync('src/utils/ini.ts', content);
