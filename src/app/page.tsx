'use client';

import gsap from 'gsap';
// import "./globals.css";
// Remove this import since we'll be using Tailwind
// import "./bg.css";
import About from "@/components/About/About";
import Education from "@/components/Education/Education";
import Research from "@/components/Research/Research";
import Internship from "@/components/Internship/Internship";
import Project from "@/components/Project/Project";
import Contact from "@/components/Contact/Contact";
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
    <div className="flex flex-col items-start justify-start p-4 md:p-8 lg:p-20 gap-4 md:gap-8 w-full scroll-smooth">
      {/* Background elements with Tailwind */}
      <div className="fixed top-0 left-0 h-screen w-full z-[-2]">
        <div className="absolute rounded-full h-[90%] w-[80%] bg-[#87CEFA] -left-[29%] -top-[10%] animate-[gradient_4s_infinite]"></div>
        <div className="absolute rounded-full h-[80%] w-[70%] bg-[#40E0D0] -top-[12%] -right-[12%] animate-[gradient_4s_infinite] animation-delay-8000"></div>
        <div className="absolute rounded-full h-[65%] w-[80%] bg-[#ADD8E6] -bottom-[15%] -right-[20%] animate-[gradient_4s_infinite] animation-delay-300"></div>
        <div className="absolute rounded-full h-[50%] w-[75%] bg-[#90EE90] -bottom-[10%] -left-[18%] animate-[gradient_4s_infinite] animation-delay-1200"></div>
        <div className="fixed inset-0 backdrop-blur-[70px]"></div>
      </div>
      
      <div id="about" className="home-section w-full opacity-0 translate-y-[50px] transition-opacity duration-500 ease-out transition-transform">
        <About />
      </div>
      <div id="education" className="home-section w-full opacity-0 translate-y-[50px] transition-opacity duration-500 ease-out transition-transform">
        <Education />
      </div>
      <div id="research" className="home-section w-full opacity-0 translate-y-[50px] transition-opacity duration-500 ease-out transition-transform">
        <Research />
      </div>
      <div id="internship" className="home-section w-full opacity-0 translate-y-[50px] transition-opacity duration-500 ease-out transition-transform">
        <Internship />
      </div>
      <div id="projects" className="home-section w-full opacity-0 translate-y-[50px] transition-opacity duration-500 ease-out transition-transform">
        <Project />
      </div>
      <div id="contact" className="home-section w-full opacity-0 translate-y-[50px] transition-opacity duration-500 ease-out transition-transform">
        <Contact />
      </div>
    </div>
  );
}
