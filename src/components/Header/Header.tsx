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
    <header className="flex justify-between items-center p-5 bg-white/10 rounded-[20px] shadow-lg border border-white/20 backdrop-blur-sm text-cyan-100 fixed top-0 w-full z-10 box-border">
      <h1 
        className="m-0 text-xl md:text-2xl cursor-pointer transition-all duration-300 font-extrabold text-cyan-100 hover:text-cyan-300" 
        onClick={handleTitleClick}
      >
        Mingjian Li
      </h1>
      
      <button 
        className="hidden text-2xl bg-transparent border-none cursor-pointer text-cyan-100 md:hidden" 
        onClick={toggleNav}
      >
        ☰
      </button>
      
      <nav ref={navRef} className={`header-nav ${isNavOpen ? 'open' : ''}`}>
        <ul className="list-none flex gap-12 m-0 p-0">
          <li><a href="#about" className="relative text-cyan-100 no-underline text-xl font-bold hover:text-cyan-300 transition-colors duration-300">About</a></li>
          <li><a href="#education" className="relative text-cyan-100 no-underline text-xl font-bold hover:text-cyan-300 transition-colors duration-300">Education</a></li>
          <li><a href="#research" className="relative text-cyan-100 no-underline text-xl font-bold hover:text-cyan-300 transition-colors duration-300">Research</a></li>
          <li><a href="#internship" className="relative text-cyan-100 no-underline text-xl font-bold hover:text-cyan-300 transition-colors duration-300">Internship</a></li>
          <li><a href="#projects" className="relative text-cyan-100 no-underline text-xl font-bold hover:text-cyan-300 transition-colors duration-300">Projects</a></li>
          <li><a href="#contact" className="relative text-cyan-100 no-underline text-xl font-bold hover:text-cyan-300 transition-colors duration-300">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}