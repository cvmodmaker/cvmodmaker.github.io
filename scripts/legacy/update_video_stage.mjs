import fs from 'fs';

let content = fs.readFileSync('src/components/VideoStage.tsx', 'utf-8');

// 1. Constrain caption dragging
content = content.replace(
  /const candidateLeft = startLeft \+ deltaX;[\s\S]*?setLocalCaptionAlign\(align\);/m,
  `
    let newY = startOffsetY + deltaY;
    const minOffsetY = -(containerHeight - captionHeight - 24) + 16;
    const maxOffsetY = 16;
    newY = Math.max(minOffsetY, Math.min(maxOffsetY, newY));

    // Vertical only, horizontally locked to center
    const newX = 0;
    const align = 'center';

    setLocalCaptionOffset({ x: newX, y: newY });
    setLocalCaptionAlign(align);
`
);

// 2. Adjust rendering of the caption to handle smart text wrapping and bounds.
// We need to change the style of the wrapper.
// Currently it uses:
// <div className={`absolute inset-0 pointer-events-none flex items-end pb-6 px-4 overflow-hidden z-10 ...
// We can replace the rendering.

fs.writeFileSync('src/components/VideoStage.tsx', content);
