import fs from 'fs';

let content = fs.readFileSync('src/utils/zipExporter.ts', 'utf-8');

content = content.replace(
  /await ffmpeg\.exec\(\[\s*'-i',\s*'input\.mp4',\s*'-c:v',\s*'libtheora',\s*'-qscale:v',\s*'6',\s*'-c:a',\s*'libvorbis',\s*'-qscale:a',\s*'4',\s*'dub_video\.ogv',\s*\]\);/m,
  `const execResult = await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-c:v',
      'libtheora',
      '-q:v',
      '6',
      '-c:a',
      'libvorbis',
      '-q:a',
      '4',
      'dub_video.ogv',
    ]);
    
    if (execResult.code !== 0) {
      throw new Error('FFmpeg conversion failed with code ' + execResult.code);
    }`
);

fs.writeFileSync('src/utils/zipExporter.ts', content);
