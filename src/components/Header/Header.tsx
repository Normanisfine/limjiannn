'use client';

import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleTitleClick = () => {
    router.push('/');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <h1 className="header-title" onClick={handleTitleClick}>Mingjian Li</h1>
      <button className="nav-toggle" onClick={toggleNav}>
        ☰
      </button>
      <nav ref={navRef} className={`header-nav ${isNavOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#research">Research</a></li>
          <li><a href="#internship">Internship</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}