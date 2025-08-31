import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col items-start text-left self-stretch w-full">
      <h1 className="self-start text-3xl md:text-4xl text-cyan-100 mb-5 uppercase tracking-wider text-shadow font-extrabold">
        Contact
      </h1>

      <div className="w-full mb-8">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Get In Touch</h2>
        <div className="bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm p-6">
          <p className="text-cyan-200 mb-6 text-center text-lg">
            Interested in collaborating or have questions about my work? Feel free to reach out!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://github.com/Normanisfine/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition-colors font-medium bg-cyan-500/20 px-6 py-4 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30 hover:scale-105 transition-all duration-300"
            >
              <Image src="/assets/github.png" alt="GitHub" width={24} height={24} className="w-6 h-6" />
              GitHub
            </a>
            
            <a 
              href="https://www.linkedin.com/in/limjiannn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-blue-300 hover:text-blue-200 transition-colors font-medium bg-blue-500/20 px-6 py-4 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              <Image src="/assets/linkedin.png" alt="LinkedIn" width={24} height={24} className="w-6 h-6" />
              LinkedIn
            </a>
            
            <a 
              href="mailto:limjiannn@gmail.com"
              className="inline-flex items-center gap-3 text-green-300 hover:text-green-200 transition-colors font-medium bg-green-500/20 px-6 py-4 rounded-lg border border-green-400/30 hover:bg-green-500/30 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
              Email
            </a>
          </div>

          <div className="mt-8 text-center">
            <p className="text-cyan-200 text-sm">
              I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
