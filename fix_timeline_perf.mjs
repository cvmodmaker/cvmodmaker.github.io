import fs from 'fs';

let content = fs.readFileSync('src/components/TimelineEditor.tsx', 'utf-8');

// We can wrap the handleMouseMove contents inside requestAnimationFrame to limit it to 60fps
content = content.replace(
  /const deltaX = e\.clientX - dragStartX;/,
  `
      if (dragRef.current.animationFrame) {
        cancelAnimationFrame(dragRef.current.animationFrame);
      }
      
      dragRef.current.animationFrame = requestAnimationFrame(() => {
        if (!dragRef.current) return;
        
        const deltaX = e.clientX - dragStartX;`
);

content = content.replace(
  /onUpdateClip\(draggingClipId, updateData\);\n\s*\}\n\s*\}\n\s*\},\n\s*\[/,
  `onUpdateClip(draggingClipId, updateData);
        }
      });
    },
    [`
);

fs.writeFileSync('src/components/TimelineEditor.tsx', content);
