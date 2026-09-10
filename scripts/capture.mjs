import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
if(process.argv.includes('--debug-menu')) {
 const page=await browser.newPage({viewport:{width:390,height:844}});page.setDefaultTimeout(10000);await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.locator('.site-menu summary').focus();await page.keyboard.press('Enter');await new Promise(r=>setTimeout(r,500));console.log('menu',await page.locator('.site-menu').evaluate(el=>({open:el.open,html:el.innerHTML})));await page.locator('#all-sections a[href="/#education"]').click();await new Promise(r=>setTimeout(r,500));console.log('URL',page.url());await browser.close();process.exit(0);
}
if(process.argv.includes('--work-reveal')) {
 const checks=[];const assert=(pass,name)=>{checks.push({name,pass:!!pass});if(!pass)throw new Error(name);};
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.waitForTimeout(2800);
  const geometry=await page.locator('#work').evaluate(el=>({top:el.getBoundingClientRect().top+scrollY}));
  const start=geometry.top-900*.85,range=900*.85-170;
  for(const progress of [0,.5,1,.3]) {
   await page.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),start+range*progress);await page.waitForTimeout(150);
   const state=await page.locator('.intro-scene').evaluate(el=>({reveal:parseFloat(el.style.getPropertyValue('--work-reveal')),overflow:document.documentElement.scrollWidth>innerWidth}));
   assert(Math.abs(state.reveal-progress)<.02,`Scroll reveal tracks ${progress} at ${width}`);
   assert(!state.overflow,`No overflow ${progress} at ${width}`);
   if(progress===.5||progress===1)await page.screenshot({path:`docs/screenshots/work-reveal-${width}-${progress}.png`});
  }
  await page.locator('#work a[href="#research-3d"]').click();await page.waitForURL('**/#research-3d');
  assert(true,`Project link usable ${width}`);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert(await page.locator('#hero').evaluate(el=>getComputedStyle(el).position!=='sticky'),`Reduced motion uses normal layout ${width}`);
  await page.close();
 }
 const page=await browser.newPage({javaScriptEnabled:false});await page.goto('http://127.0.0.1:3000');
 assert(await page.locator('#work .work-grid').evaluate(el=>getComputedStyle(el).opacity==='1'),'Projects visible without JavaScript');
 await fs.writeFile('docs/work-reveal-checks.json',JSON.stringify(checks,null,2));await browser.close();console.log(`${checks.length} coordinated reveal checks passed.`);process.exit(0);
}
if(process.argv.includes('--hero-scroll')) {
 const checks=[];
 const assert=(pass,name)=>{checks.push({name,pass:!!pass});if(!pass)throw new Error(name);};
 for(const width of [320,390,1440]) {
  const page=await browser.newPage({viewport:{width,height:1000}});
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  await page.waitForTimeout(2800);
  const separation=()=>page.locator('.sculpture-stage').evaluate(el=>parseFloat(el.style.getPropertyValue('--scroll-separation')));
  assert(await separation()===0,`Together at top ${width}`);
  assert(await page.getByRole('heading',{name:'Tools I work with'}).count()===0,`Tools section removed ${width}`);
  await page.screenshot({path:`docs/screenshots/hero-scroll-rest-${width}.png`});
  await page.evaluate(()=>scrollTo({top:220,behavior:'instant'}));await page.waitForTimeout(120);
  const first=await separation();assert(first>0,`Downward scroll separates ${width}`);
  await page.evaluate(()=>scrollTo({top:350,behavior:'instant'}));await page.waitForTimeout(120);
  assert(await separation()>first,`Further scrolling increases separation ${width}`);
  assert(await page.locator('.sculpture-scroll').evaluateAll(els=>new DOMMatrix(getComputedStyle(els[0]).transform).m41<0&&new DOMMatrix(getComputedStyle(els[1]).transform).m41>0),`Opposite directions ${width}`);
  await page.screenshot({path:`docs/screenshots/hero-scroll-apart-${width}.png`});
  await page.evaluate(()=>scrollTo({top:150,behavior:'instant'}));await page.waitForTimeout(120);
  assert(await separation()<first,`Upward scroll closes ${width}`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),`No horizontal overflow ${width}`);
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(120);
  assert(await separation()===0,`Reduced motion respected ${width}`);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(120);
  assert(await separation()===0,`Top restores original pose ${width}`);
  await page.close();
 }
 await fs.writeFile('docs/hero-scroll-checks.json',JSON.stringify(checks,null,2));await browser.close();console.log(`${checks.length} hero scroll/removal checks passed.`);process.exit(0);
}
if(process.argv.includes('--research-refresh')) {
 const checks=[];
 const assert=(pass,name)=>{checks.push({name,pass:!!pass});if(!pass)throw new Error(name);};
 for(const width of [390,1440]) {
  const page=await browser.newPage({viewport:{width,height:1000}});page.setDefaultTimeout(15000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  assert(await page.locator('.dance-video[src]').count()===0,`Dance media deferred above the fold at ${width}px`);
  assert(await page.locator('.dance-video').count()===6,'All six dance sequences retained');
  await page.locator('#publications').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:`docs/screenshots/research-clean-${width}.png`});
  await page.locator('#dance-examples').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForFunction(()=>{const v=document.querySelector('video[aria-label="AttitudePromenade"]');return !v.paused && v.currentTime>0.15;});
  assert(await page.locator('video[aria-label="AttitudePromenade"]').evaluate(v=>v.muted&&v.loop&&v.playsInline&&v.controls),`Muted inline looping with controls at ${width}px`);
  await page.screenshot({path:`docs/screenshots/dance-autoplay-${width}.png`});
  const first=page.locator('video[aria-label="AttitudePromenade"]');
  await first.evaluate(v=>v.pause());await page.waitForFunction(()=>document.querySelector('video[aria-label="AttitudePromenade"]').paused);
  await page.locator('#contact').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForFunction(()=>[...document.querySelectorAll('.dance-video')].every(v=>v.paused));
  assert(true,`Offscreen dances pause at ${width}px`);
  await page.locator('#dance-examples').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForTimeout(300);
  assert(await first.evaluate(v=>v.paused),`Manual pause persists after returning at ${width}px`);
  await first.evaluate(v=>v.play());
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>[...document.querySelectorAll('.dance-video')].every(v=>v.paused));
  assert(true,`Reduced motion stops automatic dance playback at ${width}px`);
  await page.locator('#research-mri').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:`docs/screenshots/mri-clean-${width}.png`});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),`No horizontal page overflow at ${width}px`);
  const urls=await page.locator('#research a').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  const inventory=JSON.parse(await fs.readFile('docs/content-inventory.json','utf8'));const old=inventory.find(x=>x.file.endsWith('/Research.tsx')).hrefs;
  assert(old.every(url=>urls.includes(url)),`Original research links retained at ${width}px`);
  assert(errors.length===0,`No browser exceptions at ${width}px`);
  await page.close();
 }
 await fs.writeFile('docs/research-refresh-checks.json',JSON.stringify(checks,null,2));await browser.close();console.log(`${checks.length} research layout/playback checks passed.`);process.exit(0);
}
if(process.argv.includes('--work-layout')) {
 const results=[];
 for(const width of [320,390,768,1024,1440]) {
  const page=await browser.newPage({viewport:{width,height:1000}});
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  await page.locator('#work').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:`docs/screenshots/selected-layout-${width}.png`});
  const result=await page.locator('#work').evaluate(el=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,soArm:/SO.?ARM|ARM101/i.test(el.textContent),titles:[...el.querySelectorAll('h3')].map(x=>x.textContent),cards:[...el.querySelectorAll('.work-card')].map(x=>({href:x.getAttribute('href'),rect:x.getBoundingClientRect().toJSON()}))}));
  if(result.overflow||result.soArm||result.cards.length!==3)throw new Error('Selected work check failed');
  if(width===1440){for(const card of result.cards){await page.locator(`#work a[href="${card.href}"]`).click();await page.waitForURL(`**/${card.href}`);if(!await page.locator(card.href).isVisible())throw new Error('Research link failed');}}
  results.push(result);await page.close();
 }
 await fs.writeFile('docs/selected-layout-checks.json',JSON.stringify(results,null,2));await browser.close();console.log('Five widths checked; all three research links work; no SO-ARM text in Selected work.');process.exit(0);
}
if(process.argv.includes('--update-check')) {
 const checks=[];
 const assert=(pass,name)=>{checks.push({name,pass:!!pass});if(!pass)throw new Error(name);};
 for(const width of [320,390,768,1440]) {
  const page=await browser.newPage({viewport:{width,height:1000}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('h1').getAnimations().length>0);
  const motion=await page.evaluate(()=>{
   const name=document.querySelector('h1');
   const all=[...name.getAnimations(), ...[...document.querySelectorAll('.sculpture-motion')].flatMap(el=>el.getAnimations())];
   const starts=all.map(a=>a.startTime);
   all.forEach(a=>{a.pause();a.currentTime=0;});
   const before=getComputedStyle(name).opacity;
   all.forEach(a=>{a.currentTime=a.effect.getTiming().duration/3;});
   const during=getComputedStyle(name).opacity;
   all.forEach(a=>a.finish());
   return {count:all.length,starts,before,during,after:getComputedStyle(name).opacity};
  });
  assert(motion.count===3 && new Set(motion.starts).size===1,`Name and sculptures share timeline at ${width}px`);
  assert(Number(motion.before)===0 && Number(motion.during)>0 && Number(motion.during)<1 && Number(motion.after)===1,`Name fades fully into view at ${width}px`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),`No overflow at ${width}px`);
  assert(await page.locator('#work video, #work .dance-preview img').count()===0,`Simple selected-work preview at ${width}px`);
  await page.locator('#work').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:`docs/screenshots/update-selected-${width}.png`});
  await page.locator('#work a[href="#research-wam"]').click();await page.waitForURL('**/#research-wam');
  assert(await page.locator('#wam-title').isVisible(),`Selected World Action Models card opens its research at ${width}px`);
  await page.locator('#research-wam').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:`docs/screenshots/update-research-${width}.png`});
  assert(errors.length===0,`No browser errors at ${width}px`);
  await page.close();
 }
 const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 assert(await reduced.locator('h1').evaluate(el=>getComputedStyle(el).opacity==='1' && el.getAnimations().length===0),'Reduced motion leaves name fully visible');await reduced.close();
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto('http://127.0.0.1:3000');
 assert(await nojs.locator('h1').evaluate(el=>getComputedStyle(el).opacity==='1'),'No-JS name stays visible');
 assert(await nojs.locator('#research-wam li').count()===3,'Research translation is server-rendered');await nojs.close();
 await fs.writeFile('docs/update-checks.json',JSON.stringify(checks,null,2));
 await browser.close();console.log(`${checks.length} update checks passed.`);process.exit(0);
}
const results=[];
for(const width of [320,390,768,1024,1440]) {
 const page=await browser.newPage({viewport:{width,height:width<768?844:1000},deviceScaleFactor:width<768?2:1});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>document.getAnimations().length===0);
 // Scroll normally to let native lazy loading fill the full-page reference.
 const height = await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=700) {await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(70);}
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:`docs/screenshots/${width}.png`,fullPage:true});
 await page.screenshot({path:`docs/screenshots/${width}-hero.png`});
 results.push(await page.evaluate(({width,errors})=>({width,errors,overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelector('h1').getBoundingClientRect().toJSON(),heroImages:[...document.querySelectorAll('.sculpture-stage img')].map(x=>({src:x.currentSrc,width:x.naturalWidth,rect:x.getBoundingClientRect().toJSON()})),videos:document.querySelectorAll('video').length,animations:document.getAnimations().length}),{width,errors}));
 await page.close();
}
await fs.writeFile('docs/responsive-checks.json',JSON.stringify(results,null,2));
if(process.argv.includes('--screenshots-only')){await browser.close();console.log('Five responsive screenshot sets refreshed.');process.exit(0);}

const checks = [];
const assert = (condition, message) => { checks.push({test:message,pass:!!condition}); if(!condition) console.error('FAIL:', message); };
for (const result of results) { assert(!result.overflow, `No overflow at ${result.width}px`); assert(!result.errors.length, `No browser errors at ${result.width}px`); }
const page = await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
page.setDefaultTimeout(10000);
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
await page.keyboard.press('Tab');
assert(await page.locator('.skip-link').evaluate(el => el===document.activeElement), 'Keyboard skip link is first focus target');
// Native summary is exposed as a button by Chromium.
await page.locator('.site-menu summary').focus();await page.keyboard.press('Enter');
assert(await page.locator('.site-menu').evaluate(el=>el.open), 'Keyboard opens mobile menu');
await page.waitForFunction(()=>document.querySelector('.site-menu summary').getAttribute('aria-expanded')==='true');
assert(await page.locator('.site-menu summary').getAttribute('aria-expanded')==='true','Menu reports expanded state');
await page.screenshot({path:'docs/screenshots/mobile-menu.png'});
await page.keyboard.press('Tab');await page.keyboard.press('Escape');
assert(await page.locator('.site-menu').evaluate(el=>!el.open),'Escape closes menu');
assert(await page.locator('.site-menu summary').evaluate(el=>el===document.activeElement),'Escape restores focus');
await page.locator('.site-menu summary').click();await page.locator('#all-sections a[href="/#education"]').click();
await page.waitForURL('**/#education');
assert(page.url().endsWith('#education'),'Menu anchor reaches education');
await page.locator('.course-details summary').click();
assert(await page.locator('.course-details dt').count()===17,'All 17 course grades retained');
const gal=page.locator('.gallery');await gal.scrollIntoViewIfNeeded();
await page.getByRole('button',{name:'Next Broadway photos'}).click();await page.waitForFunction(()=>document.querySelector('.gallery').scrollLeft>100);
assert(await gal.evaluate(el=>el.scrollLeft>100),'Touch gallery next control scrolls');
await page.getByRole('button',{name:'Previous Broadway photos'}).click();await page.waitForFunction(()=>document.querySelector('.gallery').scrollLeft<10);
const photo=page.getByRole('button',{name:'Enlarge Broadway Magnets photo 1'});await photo.click();
assert(await page.getByRole('dialog').isVisible(),'Gallery opens lightbox');
await page.keyboard.press('Escape');assert(await photo.evaluate(el=>el===document.activeElement),'Lightbox Escape restores photo focus');
assert(await page.locator('.media-player video').count()===0,'Demonstration videos wait for activation');
await page.getByRole('button',{name:'Play Unity AR/VR Display',exact:true}).click();
assert(await page.locator('.media-player video').count()===1,'Only requested demonstration video mounts');
await page.locator('#contact').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.media-player video').paused);
assert(await page.locator('.media-player video').evaluate(el=>el.paused),'Offscreen video pauses');
await page.screenshot({path:'docs/screenshots/mobile-footer.png'});
await page.locator('#work').scrollIntoViewIfNeeded();await page.screenshot({path:'docs/screenshots/mobile-work.png'});
await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
assert(await page.evaluate(()=>document.getAnimations().length)===0,'Reduced motion has no entrance animation');
assert(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto','Reduced motion disables smooth scroll');
const urls = await page.locator('a').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
const broken = await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"], a[href^="/#"]')].map(el=>el.hash).filter(hash=>hash && !document.getElementById(hash.slice(1))));
assert(broken.length===0,'All home anchors resolve');
assert(await page.locator('.gallery figure').count()===20,'All 20 Broadway photos retained');
assert(await page.locator('.project-row').count()===7,'All 7 projects retained');
assert(await page.locator('.experience-row').count()===4,'All 4 internships retained');
const originalInventory=JSON.parse(await fs.readFile('docs/content-inventory.json','utf8'));
// Resume links were explicitly removed at the user's request.
const oldLinks=originalInventory.filter(item=>item.file.includes('/sections/')).flatMap(item=>item.hrefs).filter(url=>url!=='/assets/Resume.pdf');
assert(oldLinks.every(url=>urls.includes(url)), 'Every original section URL retained');
for(const route of ['/adv','/links','/nextgenphd','/team7_ai_plan']) { const response=await page.request.get('http://127.0.0.1:3000'+route);assert(response.status()===200,`Preserved route ${route} responds`); }
await page.close();
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
await nojs.goto('http://127.0.0.1:3000');
assert(await nojs.locator('h1').isVisible(),'No-JS name and content visible');
await nojs.locator('.site-menu summary').click();assert(await nojs.locator('#all-sections').isVisible(),'No-JS navigation expands');
await nojs.locator('.course-details summary').click();assert(await nojs.getByText('Calculus III',{exact:true}).isVisible(),'No-JS coursework expands');
assert(await nojs.locator('#research noscript a').count()===8,'No-JS media fallback links available');
await nojs.close();
const desktop=await browser.newPage({viewport:{width:1440,height:1000}});await desktop.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
for(const section of ['work','about','research','projects','broadway']) {await desktop.locator('#'+section).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await desktop.locator('#'+section+' img').evaluateAll(els=>Promise.all(els.filter(el=>el.getBoundingClientRect().top<innerHeight && el.getBoundingClientRect().bottom>0).map(el=>Promise.race([el.decode().catch(()=>{}),new Promise(r=>setTimeout(r,3000))]))));await desktop.screenshot({path:`docs/screenshots/desktop-${section}.png`});}
await desktop.close();
const perf=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true});
await perf.addInitScript(()=>{window.portfolioMetrics={cls:0,lcp:0,longTasks:[],events:[]};new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.portfolioMetrics.cls+=e.value})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>list.getEntries().forEach(e=>window.portfolioMetrics.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>list.getEntries().forEach(e=>window.portfolioMetrics.longTasks.push(e.duration))).observe({type:'longtask',buffered:true});new PerformanceObserver(list=>list.getEntries().forEach(e=>window.portfolioMetrics.events.push({name:e.name,duration:e.duration,interactionId:e.interactionId}))).observe({type:'event',buffered:true,durationThreshold:16});});
const cdp=await perf.context().newCDPSession(perf);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
await perf.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await perf.waitForFunction(()=>document.getAnimations().length===0);
await cdp.send('Performance.enable');const idleStart=await cdp.send('Performance.getMetrics');
await new Promise(resolve=>setTimeout(resolve,2000));const idleEnd=await cdp.send('Performance.getMetrics');
await perf.locator('.site-menu summary').click();await perf.keyboard.press('Escape');
const metrics=await perf.evaluate(()=>({...window.portfolioMetrics,heroResources:performance.getEntriesByType('resource').filter(e=>e.name.includes('/hero/')).map(e=>({name:e.name,transferSize:e.transferSize,encodedBodySize:e.encodedBodySize})),activeAnimations:document.getAnimations().length,mediaResources:performance.getEntriesByType('resource').filter(e=>/\.(mp4|webm)/.test(e.name)).length}));
const get=(x,key)=>x.metrics.find(m=>m.name===key)?.value||0;metrics.idleTaskMs=(get(idleEnd,'TaskDuration')-get(idleStart,'TaskDuration'))*1000;metrics.idleScriptMs=(get(idleEnd,'ScriptDuration')-get(idleStart,'ScriptDuration'))*1000;
await fs.writeFile('docs/performance.json',JSON.stringify(metrics,null,2));await fs.writeFile('docs/interaction-checks.json',JSON.stringify(checks,null,2));
await browser.close();console.log(JSON.stringify({checks,metrics},null,2));
if(checks.some(check=>!check.pass))process.exitCode=1;
