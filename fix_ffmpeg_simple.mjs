import fs from 'fs';

let content = fs.readFileSync('src/utils/zipExporter.ts', 'utf-8');

content = content.replace(
  /const execResult = await ffmpeg\.exec\(\[[\s\S]*?'dub_video\.ogv',\s*\]\);/,
  `// Use simpler FFmpeg command that auto-handles streams (avoids errors if no audio track exists)
    const execResult = await ffmpeg.exec([
      '-i', 'input.mp4',
      '-q:v', '6',
      '-q:a', '4',
      'dub_video.ogv'
    ]);`
);

// Also fix the zip.file so if it DOES fallback to MP4, it uses the right extension so it doesn't create corrupt files.
content = content.replace(
  /zip\.file\('dub_video\.ogv', ogvBlob\);/,
  `const ext = ogvBlob.type === 'video/mp4' || ogvBlob.type.includes('mp4') ? 'mp4' : 'ogv';
      zip.file(\`dub_video.\$\{ext\}\`, ogvBlob);`
);

fs.writeFileSync('src/utils/zipExporter.ts', content);
