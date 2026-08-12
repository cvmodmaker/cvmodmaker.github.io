import fs from 'fs';

let content = fs.readFileSync('src/components/TimelineEditor.tsx', 'utf-8');

// Update onSelectClip signature and handleTimelineClick for deselection
content = content.replace(
  /onSelectClip: \(clipId: string, isMultiSelect\?: boolean\) => void;/,
  `onSelectClip: (clipId?: string, isMultiSelect?: boolean) => void;`
);

content = content.replace(
  /const handleTimelineClick = \(e: React.MouseEvent<HTMLDivElement>\) => \{/,
  `const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onSelectClip(undefined, false);`
);

// Fix trim handles rendering
content = content.replace(
  /className="absolute left-0 top-0 bottom-0 w-\[6px\] bg-amber-500 hover:bg-amber-400 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20"/g,
  `className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"`
);
content = content.replace(
  /className="absolute right-0 top-0 bottom-0 w-\[6px\] bg-amber-500 hover:bg-amber-400 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20"/g,
  `className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"`
);

// Add inline style to trim handles to match border color by default and hover to darker orange
content = content.replace(
  /<div\s+onMouseDown=\{\(e\) => handleMouseDownClip\(e, clip, 'trim-start'\)\}\s+className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"\s*\/>/g,
  `<div
                          onMouseDown={(e) => handleMouseDownClip(e, clip, 'trim-start')}
                          className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"
                          style={{ backgroundColor: clipColor, ':hover': { backgroundColor: '#d97706' } } as any}
                        />`
);
content = content.replace(
  /<div\s+onMouseDown=\{\(e\) => handleMouseDownClip\(e, clip, 'trim-end'\)\}\s+className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"\s*\/>/g,
  `<div
                          onMouseDown={(e) => handleMouseDownClip(e, clip, 'trim-end')}
                          className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-colors"
                          style={{ backgroundColor: clipColor, ':hover': { backgroundColor: '#d97706' } } as any}
                        />`
);

// Actually, React doesn't support inline pseudo-classes like :hover. Let's use a class or just rely on state. Or simply `bg-[var(--clip-color)] hover:bg-[#d97706]`.
// Wait, Tailwind supports dynamic arbitrary values: `hover:bg-amber-600`.
// Let's rewrite the trim handle replacement to be standard Tailwind.
