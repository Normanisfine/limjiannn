'use client';

import { useEffect, useRef } from 'react';

export default function DanceVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
 const video = useRef<HTMLVideoElement>(null);

 useEffect(() => {
  const player = video.current;
  if (!player) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let manuallyPaused = false;

  const syncPlayback = () => {
   if (visible && !player.getAttribute('src')) player.src = src;
   if (visible && !document.hidden && !reducedMotion.matches && !manuallyPaused) {
    player.muted = true;
    void player.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
   } else if (!visible || document.hidden || reducedMotion.matches) {
    player.pause();
   }
  };
  const onPause = () => {
   if (visible && !document.hidden && !reducedMotion.matches) manuallyPaused = true;
  };
  const onPlay = () => { manuallyPaused = false; };
  const observer = new IntersectionObserver(([entry]) => {
   visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
   syncPlayback();
  }, { threshold: [0, 0.25] });
  observer.observe(player);
  player.addEventListener('pause', onPause);
  player.addEventListener('play', onPlay);
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);
  return () => {
   observer.disconnect();
   player.removeEventListener('pause', onPause);
   player.removeEventListener('play', onPlay);
   document.removeEventListener('visibilitychange', syncPlayback);
   reducedMotion.removeEventListener('change', syncPlayback);
   player.pause();
  };
 }, [src]);

 return <>
  <video ref={video} className="dance-video" poster={poster} muted loop playsInline controls preload="none" width={512} height={819} aria-label={label}/>
  <noscript><a href={src}>Watch {label}</a></noscript>
 </>;
}
