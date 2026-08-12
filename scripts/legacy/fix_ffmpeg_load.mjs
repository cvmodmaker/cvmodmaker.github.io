import fs from 'fs';

let content = fs.readFileSync('src/utils/zipExporter.ts', 'utf-8');

content = content.replace(
  /const baseURL = window\.location\.origin \+ '\/ffmpeg';\s*await ffmpeg\.load\(\{[\s\S]*?\}\);/m,
  `const baseURL = import.meta.env.BASE_URL + 'ffmpeg';
  await ffmpeg.load({
    coreURL: await toBlobURL(\`\${baseURL}/ffmpeg-core.js\`, 'text/javascript'),
    wasmURL: await toBlobURL(\`\${baseURL}/ffmpeg-core.wasm\`, 'application/wasm'),
    workerURL: await toBlobURL(\`\${baseURL}/ffmpeg-core.worker.js\`, 'text/javascript').catch(() => undefined),
  });`
);

fs.writeFileSync('src/utils/zipExporter.ts', content);
