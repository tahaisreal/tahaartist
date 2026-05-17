'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { YoutubeVideo } from '@/types';
import { getYoutubeThumbnail } from '@/lib/utils';
import RevealOnScroll from '@/components/RevealOnScroll';

interface Props { videos: YoutubeVideo[] }

export default function YoutubeSection({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="youtube" className="py-20 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <RevealOnScroll>
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label block mb-4">CHANNEL</span>
              <h2 className="font-display font-black leading-none">
                <span className="block text-stroke-red" style={{ fontSize: 'clamp(52px, 8vw, 100px)' }}>YOUTUBE</span>
                <span className="block text-stroke-dim"  style={{ fontSize: 'clamp(40px, 6vw, 78px)' }}>VIDEOS</span>
              </h2>
            </div>
            <span className="timecode opacity-40 flex-shrink-0 self-end">
              {String(videos.length).padStart(2,'0')} EPISODES
            </span>
          </div>
        </RevealOnScroll>

        {/* Inline player */}
        {activeId && (
          <RevealOnScroll>
            <div className="mb-6 relative aspect-video bg-bg border border-red/30">
              <iframe
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title="YouTube player"
              />
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-bg/80 border border-border
                           flex items-center justify-center timecode text-[10px]
                           hover:border-red hover:text-red transition-colors z-10"
              >✕</button>
            </div>
          </RevealOnScroll>
        )}

        {/* List */}
        <RevealOnScroll delay={100}>
          {videos.length === 0 ? (
            <div className="border border-border py-20 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border border-border flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-border">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="timecode opacity-30">No YouTube videos yet — add some via the admin panel</p>
            </div>
          ) : (
            <div className="border-t border-border">
              {/* Header row */}
              <div className="grid gap-4 py-3 border-b border-border"
                style={{ gridTemplateColumns: '80px 1fr 80px 110px' }}>
                <span className="timecode text-[9px] opacity-30">PREVIEW</span>
                <span className="timecode text-[9px] opacity-30">TITLE</span>
                <span className="timecode text-[9px] opacity-30 text-right">TYPE</span>
                <span className="timecode text-[9px] opacity-30 text-right">ID</span>
              </div>
              {videos.map((video, i) => (
                <YoutubeRow
                  key={video.id}
                  video={video}
                  index={i}
                  isActive={activeId === video.youtubeId}
                  onSelect={() => setActiveId(p => p === video.youtubeId ? null : video.youtubeId)}
                />
              ))}
            </div>
          )}
        </RevealOnScroll>

      </div>
    </section>
  );
}

function YoutubeRow({ video, index, isActive, onSelect }: {
  video: YoutubeVideo; index: number; isActive: boolean; onSelect: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className={`yt-row${isActive ? ' yt-active bg-red/5 border-l-2 border-l-red pl-3' : ''}`}
      onClick={onSelect}
    >
      {/* Thumbnail */}
      <div className="yt-thumb">
        {!imgErr && (
          <Image
            src={getYoutubeThumbnail(video.youtubeId)}
            alt={video.title}
            fill
            className="object-cover"
            onError={() => setImgErr(true)}
            unoptimized
          />
        )}
        {/* Play overlay shown on hover / active */}
        <div className="yt-thumb-play">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"
            className={isActive ? 'text-red' : 'text-cream/90'}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title + description */}
      <div className="min-w-0">
        <p className={`text-sm font-medium truncate transition-colors ${isActive ? 'text-red' : 'text-cream'}`}>
          {video.title}
        </p>
        {video.description && (
          <p className="timecode text-[9px] opacity-40 truncate mt-0.5">{video.description}</p>
        )}
      </div>

      <p className="timecode text-[9px] opacity-40 text-right self-center">YOUTUBE</p>
      <p className="timecode text-[9px] opacity-30 text-right self-center truncate">{video.youtubeId}</p>
    </div>
  );
}
