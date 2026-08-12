import fs from 'fs';

// 1. Fix CharacterManager.tsx
let charManager = fs.readFileSync('src/components/CharacterManager.tsx', 'utf-8');
charManager = charManager.replace(
  /const avatar = \(editUseDefaultAvatar \|\| editAutoScreenshot\) \? createAvatarSvgDataUrl\(editName\.trim\(\), editColor\) : \(editAvatarDataUrl && !isDicebear \? editAvatarDataUrl : createAvatarSvgDataUrl\(editName\.trim\(\), editColor\)\);/,
  `const avatar = (editUseDefaultAvatar || editAutoScreenshot) ? createAvatarSvgDataUrl(editName.trim(), editColor) : (editAvatarDataUrl && !isDicebear ? editAvatarDataUrl : createAvatarSvgDataUrl(editName.trim(), editColor));`
);
charManager = charManager.replace(
  /const avatar = \(useDefaultAvatar \|\| autoScreenshot\) \? createAvatarSvgDataUrl\(newName\.trim\(\), newColor\) : \(avatarDataUrl \|\| createAvatarSvgDataUrl\(newName\.trim\(\), newColor\)\);/,
  `const avatar = (useDefaultAvatar || autoScreenshot) ? createAvatarSvgDataUrl(newName.trim(), newColor) : (avatarDataUrl || createAvatarSvgDataUrl(newName.trim(), newColor));`
);
fs.writeFileSync('src/components/CharacterManager.tsx', charManager);

// 2. Fix zipExporter.ts
let zipExporter = fs.readFileSync('src/utils/zipExporter.ts', 'utf-8');
zipExporter = zipExporter.replace(
  /const baseURL = import\.meta\.env\.BASE_URL \+ 'ffmpeg';/,
  `const baseURL = (import.meta as any).env?.BASE_URL + 'ffmpeg';`
);
zipExporter = zipExporter.replace(
  /if \(execResult\.code !== 0\) \{\n\s*throw new Error\('FFmpeg conversion failed with code ' \+ execResult\.code\);\n\s*\}/,
  `if (execResult !== 0 && (execResult as any).code !== 0) {
      throw new Error('FFmpeg conversion failed with code ' + (typeof execResult === 'number' ? execResult : (execResult as any).code));
    }`
);
fs.writeFileSync('src/utils/zipExporter.ts', zipExporter);
