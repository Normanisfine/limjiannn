'use client';

import About from "@/components/About/About";
import Education from "@/components/Education/Education";
import Research from "@/components/Research/Research";
import Internship from "@/components/Internship/Internship";
import Project from "@/components/Project/Project";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start pt-24 md:pt-28 lg:pt-32 px-4 md:px-8 lg:px-20 pb-4 md:pb-8 lg:pb-20 gap-4 md:gap-8 w-full scroll-smooth">
      {/* Simple, dark, lightweight background */}
      <div className="fixed top-0 left-0 h-screen w-full z-[-2] pointer-events-none">
        {/* Dark gradient background */}
        {/* <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900"></div> */}
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>        
        {/* Optional: Very subtle accent (uncomment if you want this) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full -translate-y-48 translate-x-48"></div>
      </div>
      
      <div id="about" className="home-section w-full">
        <About />
      </div>
      <div id="education" className="home-section w-full">
        <Education />
      </div>
      <div id="research" className="home-section w-full">
        <Research />
      </div>
      <div id="internship" className="home-section w-full">
        <Internship />
      </div>
      <div id="projects" className="home-section w-full">
        <Project />
      </div>
      <div id="contact" className="home-section w-full">
        <Contact />
      </div>
    </div>
  );
}
