import fs from 'fs';
let content = fs.readFileSync('src/components/TimelineEditor.tsx', 'utf-8');

// The inline style for clip has `clipColor` available. We can set a CSS custom property `--clip-color: clipColor`.
// And then use it in Tailwind: `bg-[var(--clip-color)] hover:bg-[#d97706]`
content = content.replace(
  /borderColor: isSelected \? '#f59e0b' : \`\$\{clipColor\}40\`,\n\s*\}\}/,
  `borderColor: isSelected ? '#f59e0b' : \`\$\{clipColor\}40\`,
                      '--clip-color': isSelected ? '#f59e0b' : clipColor,
                    } as React.CSSProperties}`
);

content = content.replace(
  /className="absolute h-10 rounded-lg border-2 cursor-grab active:cursor-grabbing flex items-center justify-between px-2 overflow-hidden group/g,
  `className="absolute h-10 rounded-lg border-2 cursor-ew-resize active:cursor-ew-resize flex items-center justify-between px-2 overflow-hidden group`
);

content = content.replace(
  /<div\s*onMouseDown=\{\(e\) => handleMouseDownClip\(e, clip, 'trim-start'\)\}\s*className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"\s*style=\{\{ backgroundColor: clipColor, ':hover': \{ backgroundColor: '#d97706' \} \} as any\}\s*\/>/g,
  `<div
                          onMouseDown={(e) => handleMouseDownClip(e, clip, 'trim-start')}
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--clip-color)] hover:bg-[#d97706] cursor-ew-resize opacity-0 group-hover:opacity-100 z-30 transition-colors"
                        />`
);

content = content.replace(
  /<div\s*onMouseDown=\{\(e\) => handleMouseDownClip\(e, clip, 'trim-end'\)\}\s*className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"\s*style=\{\{ backgroundColor: clipColor, ':hover': \{ backgroundColor: '#d97706' \} \} as any\}\s*\/>/g,
  `<div
                          onMouseDown={(e) => handleMouseDownClip(e, clip, 'trim-end')}
                          className="absolute right-0 top-0 bottom-0 w-1.5 bg-[var(--clip-color)] hover:bg-[#d97706] cursor-ew-resize opacity-0 group-hover:opacity-100 z-30 transition-colors"
                        />`
);

// Dub timestamps behind trim handles: Currently trim handles are z-30. Let's make dub timestamps z-10 or 20.
// They are currently z-10. So that's already correct.

// Replace generic circular icon with a dedicated clip icon.
// Currently it uses: <Tag className="w-3.5 h-3.5 shrink-0" style={{ color: clipColor }} />
content = content.replace(
  /<Tag className="w-3.5 h-3.5 shrink-0" style=\{\{ color: clipColor \}\} \/>/,
  `<Film className="w-3.5 h-3.5 shrink-0" style={{ color: clipColor }} />`
);

// Add Film to imports if not present
if (!content.includes('Film,')) {
  content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => `import { Film, ${p1} } from 'lucide-react';`);
}

// "Contextual Options: Hide or properly update the "Project Options" context action when two or more clips are selected."
content = content.replace(
  /const handleContextMenu = \(e: React\.MouseEvent, clipId: string\) => \{/,
  `const handleContextMenu = (e: React.MouseEvent, clipId: string) => {
    if (selectedClipIds.length > 1) return; // Hide context menu if multiple clips are selected`
);

// We need to pass `selectedClipIds` to `TimelineEditor`?
// Let's check if it's already a prop.
