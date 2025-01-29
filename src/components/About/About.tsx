import React from 'react';
import './About.css';
import Image from 'next/image';
import { Mail, FileUser } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function About() {
  return (
    <div className="about-container">
      <h1>About</h1>
        <div className='about-content'>
          <div className='about-left'>
            <Image
              src="/assets/photo.jpg"
              alt="Profile Photo"
              width={150}
              height={150}
              className="profile-photo"
            />
            <a href="https://www.linkedin.com/in/mingjian-li-711655251/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <Image
                src="/assets/linkedin.png"
                alt="LinkedIn Logo"
                width={30}
                height={30}
                className="linkedin-logo"
              />
              LinkedIn
            </a>

            <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="github-link">
            <Image
              src="/assets/github.png"
              alt="GitHub Logo"
              width={30}
              height={30}
              className="github-logo"
            />
            GitHub
          </a>

          <a href="mailto:limjiannn@gmail.com" className="email-link">
            <Mail className="email-icon" size={30} />
            Email
          </a>

          <a href="/assets/Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">
            <FileUser className="resume-icon" size={30} />
            Resume
          </a>

          </div>


        <div className='about-right'>
          <p>Hi! I am Mingjian Li (李明键). You can also call me MJ or Norman.</p>
          <p>I am currently a junior student at NYU Tandon, majoring in Computer Science and minoring in Mathematics. I am passionate about and have experience in 3D Reconstruction, Full-stack Development, Machine Learning, and Data Science. </p>
          <p>Before I transferred to NYU, I was studying Accounting at SUFE.</p>
          <p>I love cats, hiking, photography, board games, and ping-pong!</p>
        </div>
        </div>
    </div>
  )
}
