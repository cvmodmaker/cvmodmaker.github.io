import fs from 'fs';
let content = fs.readFileSync('src/components/TimelineEditor.tsx', 'utf-8');
content = content.replace(
  /onUpdateClip\(draggingClipId, \{\n\s*endTime: newEnd,\n\s*\}\);\n\s*\}\n\s*\}\);\n\s*\},/m,
  `onUpdateClip(draggingClipId, {
          endTime: newEnd,
        });
      }
      });
    },`
);
// just in case
