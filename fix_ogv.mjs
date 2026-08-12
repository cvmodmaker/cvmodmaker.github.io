import fs from 'fs';

let content = fs.readFileSync('src/utils/zipExporter.ts', 'utf-8');

// The original code was:
// await ffmpeg.exec(['-i', 'input.mp4', '-c:v', 'libtheora', '-qscale:v', '6', '-c:a', 'libvorbis', '-qscale:a', '4', 'dub_video.ogv']);
// Let's replace it with a simpler command. Wait, if the problem is that libtheora isn't compiled in the WASM, ffmpeg will error out.
// Let's check what codecs are in ffmpeg-core.wasm.
