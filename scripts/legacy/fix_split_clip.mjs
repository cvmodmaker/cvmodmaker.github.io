import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /splitImageUrl = canvas\.toDataURL\('image\/jpeg', 0\.8\);\s*splitImageFilename = \`clip_\$\{Date\.now\(\)\}_screenshot\.jpg\`;/,
  `splitImageUrl = canvas.toDataURL('image/jpeg', 0.8);
            // The imageFilename will be automatically updated by reindexClipsByCharacter`
);

fs.writeFileSync('src/App.tsx', content);
