import fs from 'fs';
let content = fs.readFileSync('src/components/VideoStage.tsx', 'utf-8');

// The replacement logic
content = content.replace(
  /\{\/\* Subtitle \/ Caption Overlay.*?\}\)\}\s*<\/div>/s,
  `{/* Subtitle / Caption Overlay (Smart Text Wrapping & Bounds) */}
        {activeClip && activeClip.caption && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {(() => {
              const captionHeight = captionRef.current?.getBoundingClientRect().height || 40;
              const containerHeight = containerRef.current?.getBoundingClientRect().height || 0;
              const yOffsetFromBottom = 24 - localCaptionOffset.y; // 24px is the pb-6 equivalent
              const isUpperHalf = containerHeight > 0 && yOffsetFromBottom > containerHeight / 2;
              
              const verticalStyle = isUpperHalf
                ? { top: Math.max(16, containerHeight - captionHeight - yOffsetFromBottom) + 'px', bottom: 'auto' }
                : { bottom: Math.max(16, yOffsetFromBottom) + 'px', top: 'auto' };

              return (
                <div
                  className="pointer-events-none absolute flex justify-center w-full"
                  style={{
                    ...verticalStyle,
                    transition: isDraggingCaption.current ? 'none' : 'top 0.1s ease-out, bottom 0.1s ease-out',
                  }}
                >
                  <div className="relative group/caption pointer-events-auto inline-flex flex-col items-center">
                    {isHoveringCaption && hasVideo && (
                      <div className="absolute top-0 -translate-y-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-zinc-800 whitespace-nowrap opacity-0 group-hover/caption:opacity-100 transition-opacity pointer-events-none flex items-center justify-center z-20 left-1/2 -translate-x-1/2">
                        <Move className="w-3 h-3 mr-1" />
                        Drag to move
                      </div>
                    )}
                    <span 
                      ref={captionRef}
                      onPointerDown={hasVideo ? handlePointerDown : undefined}
                      onPointerMove={hasVideo ? handlePointerMove : undefined}
                      onPointerUp={hasVideo ? handlePointerUp : undefined}
                      onPointerCancel={hasVideo ? handlePointerUp : undefined}
                      onMouseEnter={() => setIsHoveringCaption(true)}
                      onMouseLeave={() => setIsHoveringCaption(false)}
                      className={\`inline-block bg-[#0a0a0b]/80 text-amber-100 font-medium text-sm px-5 py-2.5 rounded-lg border border-amber-500/20 max-w-lg backdrop-blur-md tracking-wide select-none transition-colors \${
                        hasVideo ? 'cursor-ns-resize hover:border-amber-500/50 hover:bg-[#121214]/90' : 'cursor-default'
                      } text-center\`}
                    >
                      {activeClip.caption}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>`
);

fs.writeFileSync('src/components/VideoStage.tsx', content);
