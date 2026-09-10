'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
 const stage = useRef<HTMLDivElement>(null);
 const animations = useRef<Animation[]>([]);
 const playEntrance = () => {
  animations.current.forEach(animation => animation.cancel());
  if (!stage.current || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const mobile = window.matchMedia('(max-width: 1023px)').matches;
  const timing = { duration: mobile ? 1800 : 2600, easing: 'cubic-bezier(.22,1,.36,1)' };
  animations.current = Array.from(stage.current.querySelectorAll<HTMLElement>('.sculpture-motion')).map((element, index) => element.animate([
   { transform: `translateX(${(index ? 1 : -1) * (mobile ? 24 : 64)}px) rotate(${index ? 2 : -2}deg)` },
   { transform: 'translateX(0) rotate(0deg)' }
  ], timing));
  // Both sculptures start together; the name uses a staged CSS fade from first paint.
  const startTime = document.timeline.currentTime;
  animations.current.forEach(animation => { animation.startTime = startTime; });
 };
 useEffect(() => {
  let disposed = false;
  const images = Array.from(stage.current?.querySelectorAll('img') ?? []);
  Promise.all(images.map(img => img.decode())).then(() => { if (!disposed) playEntrance(); }).catch(() => {});
  const finish = () => animations.current.forEach(animation => animation.cancel());
  const visibility = () => { if (document.hidden) finish(); };
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.addEventListener('change', finish);
  document.addEventListener('visibilitychange', visibility);
  return () => { disposed = true; finish(); motion.removeEventListener('change', finish); document.removeEventListener('visibilitychange', visibility); };
 }, []);
 useEffect(() => {
  const element = stage.current;
  if (!element) return;
  const scene = element.closest<HTMLElement>('.intro-scene');
  const work = scene?.querySelector<HTMLElement>('#work');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let origin = 0;
  let range = 1;
  let travel = 0;
  let revealStart = 0;
  let revealRange = 1;

  const update = () => {
   frame = 0;
   const progress = reducedMotion.matches ? 0 : Math.min(1, Math.max(0, (window.scrollY - origin) / range));
   const reveal = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, (window.scrollY - revealStart) / revealRange));
   element.style.setProperty('--scroll-separation', `${progress * travel + (reducedMotion.matches ? 0 : reveal * element.clientWidth * 0.28)}px`);
   scene?.style.setProperty('--work-reveal', `${reveal}`);
   scene?.style.setProperty('--scene-detail-opacity', `${1 - Math.min(1, reveal * 3)}`);
   scene?.style.setProperty('--scene-opacity', `${1 - Math.max(0, (reveal - 0.65) / 0.35)}`);
  };
  const schedule = () => {
   if (!frame) frame = window.requestAnimationFrame(update);
  };
  const measure = () => {
   const hero = element.closest('section');
   origin = (scene?.getBoundingClientRect().top ?? 0) + window.scrollY;
   range = Math.max(1, (hero?.offsetHeight ?? window.innerHeight) * 0.65);
   travel = Math.min(130, element.clientWidth * 0.13);
   if (scene && hero && work) {
    scene.dataset.motion = 'ready';
    const stageOffset = element.offsetTop;
    scene.style.setProperty('--hero-pin-top', `${Math.min(240, stageOffset) - stageOffset}px`);
    // Read the untransformed section so reveal progress cannot feed back into layout.
    const workTop = origin + work.offsetTop;
    revealStart = workTop - window.innerHeight * 0.85;
    revealRange = Math.max(1, window.innerHeight * 0.85 - 170);
   }
   schedule();
  };
  const onMotionChange = () => {
   window.removeEventListener('scroll', schedule);
   if (!reducedMotion.matches) window.addEventListener('scroll', schedule, { passive: true });
   schedule();
  };
  const resize = new ResizeObserver(measure);
  resize.observe(element);
  if (element.parentElement) resize.observe(element.parentElement);
  measure();
  window.addEventListener('resize', measure, { passive: true });
  onMotionChange();
  reducedMotion.addEventListener('change', onMotionChange);
  return () => {
   resize.disconnect();
   window.removeEventListener('resize', measure);
   window.removeEventListener('scroll', schedule);
   reducedMotion.removeEventListener('change', onMotionChange);
   if (frame) window.cancelAnimationFrame(frame);
   element.style.removeProperty('--scroll-separation');
   if (scene) { delete scene.dataset.motion; ['--work-reveal', '--scene-detail-opacity', '--scene-opacity', '--hero-pin-top'].forEach(key => scene.style.removeProperty(key)); }
  };
 }, []);
 return <section id="hero" className="hero shell">
  <h1 aria-label="Mingjian Li"><span aria-hidden="true"><span className="name-initial">M</span><span className="name-rest">ingjian</span></span> <span aria-hidden="true"><span className="name-initial">L</span><span className="name-rest">i<span className="name-period">.</span></span></span></h1>
  <div className="sculpture-stage" ref={stage}>
   <div className="butter-disc" aria-hidden="true"/>
   <div className="sculpture-position dancer-position" aria-hidden="true"><div className="sculpture-scroll"><div className="sculpture-motion"><picture><source type="image/webp" srcSet="/assets/hero/dancer-480.webp 480w, /assets/hero/dancer-640.webp 640w, /assets/hero/dancer-960.webp 960w, /assets/hero/dancer-1254.webp 1254w" sizes="(max-width: 1023px) 59vw, 40vw"/><img src="/assets/hero/dancer.png" alt="" width="1254" height="1254" fetchPriority="high"/></picture></div></div></div>
   <div className="sculpture-position robot-position" aria-hidden="true"><div className="sculpture-scroll"><div className="sculpture-motion"><picture><source type="image/webp" srcSet="/assets/hero/robot-arm-480.webp 467w, /assets/hero/robot-arm-640.webp 623w, /assets/hero/robot-arm-960.webp 934w, /assets/hero/robot-arm-1271.webp 1237w" sizes="(max-width: 1023px) 39vw, 34vw"/><img src="/assets/hero/robot-arm.png" alt="" width="1237" height="1271"/></picture></div></div></div>
  </div>
  <div className="hero-bottom"><p>Crafting digital experiences with code and creativity.<br/>Specializing in 3D Reconstruction, Machine Learning, and Full-Stack Development.</p><a className="hero-cta" href="#work">Explore highlights <span aria-hidden="true">↓</span></a></div>
 </section>;
}
