'use client';

import Image from "next/image";
import gsap from 'gsap';
import "./globals.css";
import About from "@/components/About/About";
import Education from "@/components/Education/Education";
import Internship from "@/components/Internship/Internship";
import Research from "@/components/Research/Research";
import Project from "@/components/Project/Project";
import Contact from "@/components/Contact/Contact";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from "react";


// gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.to('.home-section', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
    });
  }, []);
  
  return (
    <div className="home-container">
      <div id="about" className="home-section">
        <About />
      </div>
      <div id="education" className="home-section">
        <Education />
      </div>
      <div id="internship" className="home-section">
        <Internship />
      </div>
      <div id="research" className="home-section">
        <Research />
      </div>
      <div id="projects" className="home-section">
        <Project />
      </div>
      <div id="contact" className="home-section">
        <Contact />
      </div>
      
    </div>
  );
}
