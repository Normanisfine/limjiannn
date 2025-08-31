import React from 'react';
import Image from 'next/image';
import { Mail, FileUser } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col items-start text-left self-stretch w-full">
      <h1 className="self-start text-3xl md:text-4xl text-cyan-100 mb-5 uppercase tracking-wider text-shadow font-extrabold">
        About
      </h1>
      
      <div className="flex flex-col lg:flex-row p-5 gap-10 bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm w-full">
        <div className="flex flex-col items-center lg:items-start order-1 lg:order-1">
          <Image
            src="/assets/photo.jpg"
            alt="Profile Photo"
            width={120}
            height={120}
            className="rounded-full mb-5 w-24 h-24 md:w-32 md:h-32 lg:w-[150px] lg:h-[150px]"
          />
          
          {/* Links - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-col gap-4 w-full">
            <a 
              href="https://www.linkedin.com/in/limjiannn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-start text-cyan-300 text-base md:text-lg lg:text-xl no-underline hover:text-cyan-200 transition-colors font-semibold"
            >
              <Image
                src="/assets/linkedin.png"
                alt="LinkedIn Logo"
                width={24}
                height={24}
                className="mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]"
              />
              LinkedIn
            </a>
            
            <a 
              href="https://github.com/your-github-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-start text-cyan-100 text-base md:text-lg lg:text-xl no-underline hover:text-cyan-300 transition-colors font-semibold"
            >
              <Image
                src="/assets/github.png"
                alt="GitHub Logo"
                width={24}
                height={24}
                className="mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]"
              />
              GitHub
            </a>
            
            <a 
              href="mailto:limjiannn@gmail.com" 
              className="flex items-center justify-start text-cyan-300 text-base md:text-lg lg:text-xl no-underline hover:text-cyan-200 transition-colors font-semibold"
            >
              <Mail className="mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]" />
              Email
            </a>
            
            <a 
              href="/assets/Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-start text-cyan-100 text-base md:text-lg lg:text-xl no-underline hover:text-cyan-300 transition-colors font-semibold"
            >
              <FileUser className="mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]" />
              Resume
            </a>
          </div>
        </div>
        
        <div className="mt-5 max-w-full lg:max-w-[700px] text-base md:text-lg lg:text-xl flex flex-col gap-4 text-center lg:text-left order-2 lg:order-2">
          <p className="text-cyan-100 font-semibold">Hi! I am Mingjian Li (李明键).</p>
          <p className="text-cyan-200 font-medium">
            I am currently a senior student at NYU Tandon, majoring in Computer Science and minoring in Mathematics. 
            I am passionate about and have experience in 3D Reconstruction, Full-stack Development, Machine Learning, and Data Science.
          </p>
          <p className="text-cyan-200 font-medium">Before I transferred to NYU, I was studying Accounting at SUFE.</p>
          <p className="text-cyan-200 font-medium">I love cats, hiking, photography, board games, and ping-pong!</p>
          
          {/* Mobile Links - 2x2 Grid after text */}
          <div className="lg:hidden grid grid-cols-2 gap-3 mt-6">
            <a 
              href="https://www.linkedin.com/in/limjiannn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center justify-center p-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/linkedin.png"
                alt="LinkedIn Logo"
                width={20}
                height={20}
                className="w-6 h-6 mb-1"
              />
              <span className="text-xs text-cyan-300 font-semibold">LinkedIn</span>
            </a>
            
            <a 
              href="https://github.com/your-github-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center justify-center p-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/github.png"
                alt="GitHub Logo"
                width={20}
                height={20}
                className="w-6 h-6 mb-1"
              />
              <span className="text-xs text-cyan-100 font-semibold">GitHub</span>
            </a>
            
            <a 
              href="mailto:limjiannn@gmail.com" 
              className="flex flex-col items-center justify-center p-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-6 h-6 mb-1 text-cyan-300" />
              <span className="text-xs text-cyan-300 font-semibold">Email</span>
            </a>
            
            <a 
              href="/assets/Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center justify-center p-2 hover:opacity-80 transition-opacity"
            >
              <FileUser className="w-6 h-6 mb-1 text-cyan-100" />
              <span className="text-xs text-cyan-100 font-semibold">Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
