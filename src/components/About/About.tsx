import React from 'react';
// import './About.css';
import Image from 'next/image';
import { Mail, FileUser } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col items-start text-center self-stretch w-full p-4 md:p-5">
      <h1 className="self-start text-2xl md:text-4xl text-gray-800 mb-3 md:mb-5 uppercase tracking-wider ml-2 md:ml-10">About</h1>
      <div className="flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 ml-0 md:ml-10 lg:ml-40 gap-6 md:gap-8 lg:gap-40 bg-white/30 rounded-[20px] shadow-md border border-white/40 backdrop-blur-md w-full">
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/assets/photo.jpg"
            alt="Profile Photo"
            width={120}
            height={120}
            className="rounded-full mb-4 md:mb-5 w-24 h-24 md:w-32 md:h-32 lg:w-[150px] lg:h-[150px]"
          />
          <div className="flex flex-col gap-3 md:gap-4 w-full">
            <a href="https://www.linkedin.com/in/limjiannn/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:justify-start text-[#0077b5] text-base md:text-lg lg:text-xl no-underline hover:opacity-80 transition-opacity">
              <Image
                src="/assets/linkedin.png"
                alt="LinkedIn Logo"
                width={24}
                height={24}
                className="mr-2 md:mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]"
              />
              LinkedIn
            </a>
            <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:justify-start text-gray-800 text-base md:text-lg lg:text-xl no-underline hover:opacity-80 transition-opacity">
              <Image
                src="/assets/github.png"
                alt="GitHub Logo"
                width={24}
                height={24}
                className="mr-2 md:mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]"
              />
              GitHub
            </a>
            <a href="mailto:limjiannn@gmail.com" className="flex items-center justify-center lg:justify-start text-[#3b1914] text-base md:text-lg lg:text-xl no-underline hover:opacity-80 transition-opacity">
              <Mail className="mr-2 md:mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]" />
              Email
            </a>
            <a href="/assets/Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:justify-start text-gray-800 text-base md:text-lg lg:text-xl no-underline hover:opacity-80 transition-opacity">
              <FileUser className="mr-2 md:mr-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-[30px] lg:h-[30px]" />
              Resume
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-5 max-w-full lg:max-w-[700px] text-base md:text-lg lg:text-xl flex flex-col gap-3 md:gap-4 text-center lg:text-left">
          <p>Hi! I am Mingjian Li (李明键).</p>
          <p>I am currently a junior student at NYU Tandon, majoring in Computer Science and minoring in Mathematics. I am passionate about and have experience in 3D Reconstruction, Full-stack Development, Machine Learning, and Data Science.</p>
          <p>Before I transferred to NYU, I was studying Accounting at SUFE.</p>
          <p>I love cats, hiking, photography, board games, and ping-pong!</p>
        </div>
      </div>
    </div>
  )
}
