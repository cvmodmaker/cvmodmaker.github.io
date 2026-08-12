import fs from 'fs';

let content = fs.readFileSync('src/components/CharacterManager.tsx', 'utf-8');

// Add state
content = content.replace(
  /const \[autoScreenshot, setAutoScreenshot\] = useState\(false\);/,
  `const [autoScreenshot, setAutoScreenshot] = useState(false);
  const [useDefaultAvatar, setUseDefaultAvatar] = useState(false);`
);

// Reset state
content = content.replace(
  /setAutoScreenshot\(false\);/g,
  `setAutoScreenshot(false);
    setUseDefaultAvatar(false);`
);

// Disable upload button
content = content.replace(
  /onClick=\{\(\) => avatarInputRef\.current\?\.click\(\)\}/,
  `onClick={() => avatarInputRef.current?.click()}
                disabled={autoScreenshot || useDefaultAvatar}`
);

// Style disabled upload button
content = content.replace(
  /className="w-full text-xs text-zinc-300 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"/,
  `className={\`w-full text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border \${
                  autoScreenshot || useDefaultAvatar
                    ? 'bg-zinc-800/50 text-zinc-600 border-zinc-800/50 cursor-not-allowed'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-zinc-100 cursor-pointer'
                }\`}`
);

// Handle save
content = content.replace(
  /const avatar = avatarDataUrl \|\| createAvatarSvgDataUrl\(newName\.trim\(\), newColor\);/,
  `const avatar = (useDefaultAvatar || autoScreenshot) ? createAvatarSvgDataUrl(newName.trim(), newColor) : (avatarDataUrl || createAvatarSvgDataUrl(newName.trim(), newColor));`
);

// Add the default avatar checkbox to create form
content = content.replace(
  /\{\/\* Auto Screenshot Toggle \*\/\}/,
  `<label className="flex items-center gap-2 cursor-pointer group mt-2">
                <div
                  className={\`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 \${
                    useDefaultAvatar
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 border border-zinc-800 group-hover:border-zinc-500 text-transparent'
                  }\`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={useDefaultAvatar}
                  onChange={(e) => {
                    setUseDefaultAvatar(e.target.checked);
                    if (e.target.checked) setAvatarDataUrl(null);
                  }}
                />
                <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  Use default avatar
                </span>
              </label>

              {/* Auto Screenshot Toggle */}`
);

// Update old checkbox styling for autoScreenshot in create form
content = content.replace(
  /className=\{`w-4 h-4 rounded border flex items-center justify-center transition-colors \$\{\s*autoScreenshot\s*\?\s*'bg-amber-500 border-amber-500 text-zinc-950'\s*:\s*'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500 text-transparent'\s*`\}/s,
  `className={\`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 \${
                    autoScreenshot
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 border border-zinc-800 group-hover:border-zinc-500 text-transparent'
                  }\`}`
);

fs.writeFileSync('src/components/CharacterManager.tsx', content);
