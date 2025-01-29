'use client';

import React from 'react';
import './Header.css';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <header className="header">
      <h1 className="header-title" onClick={handleTitleClick} >Mingjian Li</h1>
      <nav className="header-nav">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#internship">Internship</a></li>
          <li><a href="#research">Research</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}