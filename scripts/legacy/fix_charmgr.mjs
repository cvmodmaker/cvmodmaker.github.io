import fs from 'fs';

let content = fs.readFileSync('src/components/CharacterManager.tsx', 'utf-8');

// Add editUseDefaultAvatar state
content = content.replace(
  /const \[editAutoScreenshot, setEditAutoScreenshot\] = useState\(false\);/,
  `const [editAutoScreenshot, setEditAutoScreenshot] = useState(false);
  const [editUseDefaultAvatar, setEditUseDefaultAvatar] = useState(false);`
);

// Initialize it in startEditing
content = content.replace(
  /setEditAutoScreenshot\(char.autoScreenshot \|\| false\);/,
  `setEditAutoScreenshot(char.autoScreenshot || false);
    // If the avatar is a dicebear URL or there is no custom file/name, we might consider it default.
    // But since we just added the concept, let's look for dicebear in URL
    setEditUseDefaultAvatar(char.avatarUrl?.includes('dicebear') || false);`
);

// When saving, if useDefaultAvatar is true, clear the avatar filename so it falls back to default logic, or directly assign dicebear
content = content.replace(
  /const avatar = \(editAvatarDataUrl && !isDicebear\) \? editAvatarDataUrl : createAvatarSvgDataUrl\(editName\.trim\(\)\);/,
  `const avatar = (editUseDefaultAvatar || editAutoScreenshot) ? createAvatarSvgDataUrl(editName.trim(), editColor) : (editAvatarDataUrl && !isDicebear ? editAvatarDataUrl : createAvatarSvgDataUrl(editName.trim(), editColor));`
);

// We need to make sure we also use the color: editColor
// Wait, createAvatarSvgDataUrl takes name and color!
// Let's check where it's used in startEditing / saving:
content = content.replace(
  /const avatar = avatarDataUrl \|\| createAvatarSvgDataUrl\(newName\.trim\(\)\);/,
  `const avatar = avatarDataUrl || createAvatarSvgDataUrl(newName.trim(), newColor);`
);

// Also we need to disable the input when default or auto screenshot is checked.
content = content.replace(
  /<button\s+type="button"\s+onClick=\{[^}]+\}\s+className="[^"]+"\s*>/g,
  (match) => {
    if (match.includes('editAvatarInputRef')) {
      return `<button
                        type="button"
                        onClick={() => editAvatarInputRef.current?.click()}
                        disabled={editAutoScreenshot || editUseDefaultAvatar}
                        className={\`text-xs px-2 py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors border w-full \${
                          editAutoScreenshot || editUseDefaultAvatar
                            ? 'bg-zinc-800/50 text-zinc-600 border-zinc-800/50 cursor-not-allowed'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 cursor-pointer'
                        }\`}
                      >`;
    }
    return match;
  }
);

content = content.replace(
  /<input\s+ref=\{editAvatarInputRef\}.*?\/>/s,
  (match) => {
    return match + `
                    <label className="flex items-center gap-2 cursor-pointer group mt-2">
                      <div
                        className={\`w-4 h-4 rounded border flex items-center justify-center transition-colors \${
                          editUseDefaultAvatar
                            ? 'bg-amber-500 border-amber-500 text-zinc-950'
                            : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500 text-transparent'
                        }\`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={editUseDefaultAvatar}
                        onChange={(e) => {
                          setEditUseDefaultAvatar(e.target.checked);
                          if (e.target.checked) setEditAvatarDataUrl(undefined);
                        }}
                      />
                      <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        Use default avatar
                      </span>
                    </label>
`;
  }
);

fs.writeFileSync('src/components/CharacterManager.tsx', content);
