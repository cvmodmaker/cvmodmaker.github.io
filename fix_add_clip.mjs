import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /const newClip: TimelineClip = \{/,
  `
    let splitImageUrl = undefined;
    if (charObj?.autoScreenshot) {
      const videoEl = document.getElementById('main-video-player') as HTMLVideoElement;
      if (videoEl) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = videoEl.videoWidth;
          canvas.height = videoEl.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(videoEl, 0, 0);
            splitImageUrl = canvas.toDataURL('image/jpeg', 0.8);
          }
        } catch (e) {
          console.warn('Could not capture frame', e);
        }
      }
    }

    const newClip: TimelineClip = {`
);

content = content.replace(
  /imageFilename: autoImage,/,
  `imageFilename: autoImage,
      ...(splitImageUrl ? { imageUrl: splitImageUrl } : {}),`
);

fs.writeFileSync('src/App.tsx', content);
