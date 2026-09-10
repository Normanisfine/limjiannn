'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
export default function MediaPlayer({src, poster, label}: {src:string; poster:string; label:string}) {
 const [active, setActive] = useState(false);
 const container = useRef<HTMLDivElement>(null);
 const video = useRef<HTMLVideoElement>(null);
 useEffect(() => {
  if (!active) return;
  video.current?.focus();
  const observer = new IntersectionObserver(([entry]) => { if(!entry.isIntersecting) video.current?.pause(); });
  if(container.current) observer.observe(container.current);
  const pause = () => { if(document.hidden) video.current?.pause(); };
  document.addEventListener('visibilitychange', pause);
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', pause); };
 }, [active]);
 return <div ref={container} className="media-player">{active ? <video ref={video} src={src} poster={poster} controls autoPlay playsInline preload="none" tabIndex={0} aria-label={label}/> : <button className="media-poster" onClick={() => setActive(true)} aria-label={`Play ${label}`}><Image src={poster} alt="" width={512} height={819} loading="lazy"/><span className="play-icon" aria-hidden="true">▶</span><span className="play-label">Play {label}</span></button>}<noscript><a href={src}>Watch {label}</a></noscript></div>;
}
