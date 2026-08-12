import fs from 'fs';

let content = fs.readFileSync('src/components/CharacterManager.tsx', 'utf-8');

content = content.replace(
  /'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500 text-transparent'/g,
  `'bg-zinc-800 border border-zinc-800 group-hover:border-zinc-500 text-transparent'`
);
content = content.replace(
  /'bg-amber-500 border-amber-500 text-zinc-950'/g,
  `'bg-amber-500 text-zinc-950 font-bold'`
);

// We also need to add useDefaultAvatar for the create form
// It's missing in the "add character" form! Let's add it.
