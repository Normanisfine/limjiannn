'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
const destinations = [['Highlights', 'work'], ['Research', 'research'], ['Publications', 'publications'], ['Projects', 'projects'], ['About', 'about'], ['Education', 'education'], ['Internship', 'internship'], ['Broadway', 'broadway'], ['Contact', 'contact']];
export default function Navbar() {
 const menu = useRef<HTMLDetailsElement>(null);
 const [expanded, setExpanded] = useState(false);
 return <header className="site-header"><div className="shell header-inner"><Link href="/#hero" className="wordmark" aria-label="ml. — Mingjian Li home">ml<span aria-hidden="true">.</span></Link><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/#work">Highlights</Link><Link href="/#about">About</Link><Link href="/#broadway">Beyond work</Link><Link href="/#contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link></nav><details className="site-menu" ref={menu} onToggle={event => { setExpanded(event.currentTarget.open); }} onKeyDown={event => { if (event.key === 'Escape' && menu.current?.open) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}><summary aria-expanded={expanded} aria-controls="all-sections"><span>Menu</span><span className="menu-icon" aria-hidden="true">＋</span></summary><nav id="all-sections">{destinations.map(([label, id]) => <Link key={id} href={`/#${id}`} onClick={() => { if(menu.current) menu.current.open = false; }}>{label}<span aria-hidden="true">↗</span></Link>)}</nav></details></div></header>;
}
