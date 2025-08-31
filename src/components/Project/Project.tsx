import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github, FileText, Award, Code, Database, Globe, Brain } from 'lucide-react';
import './Project.css';

export default function Project() {
  return (
    <div className="flex flex-col items-start text-left self-stretch w-full">
      <h1 className="self-start text-3xl md:text-4xl text-cyan-100 mb-5 uppercase tracking-wider text-shadow font-extrabold">
        Projects
      </h1>

      {/* Featured Projects */}
      <div className="w-full mb-8">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Featured Projects</h2>

         {/* Machine Learning & Data Analysis Projects */}
         <div className="bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm p-6 mb-6">
          <h3 className="text-xl text-cyan-100 font-bold mb-3">Kaggle: Jane Street Real-Time Market Data Forecasting</h3>
          
          <div className="mb-4">
            <ul className="list-disc pl-6 text-cyan-200 space-y-1 text-sm">
              <li>Conduct data-cleaning, pre-processing, unsupervised learning including clustering and PCA, and visualizations</li>
              <li>Implement multiple feature transformations and applied regularizations for better performance。</li>
              <li>Fit different models, including SVM, CNNs, RNNs, LSTM and ARIMA with multiple sampling methods</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Python</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Scikit-learn</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">TensorFlow</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Pandas</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a 
              href="https://github.com/Normanisfine/Kaggle-Jane-Street-2024" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors font-medium bg-yellow-500/20 px-3 py-2 rounded-lg border border-yellow-400/30 hover:bg-yellow-500/30"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
            <span className="inline-flex items-center gap-2 text-blue-300 font-medium bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-400/30">
              <Brain className="w-4 h-4" />
              ML/AI
            </span>
            <span className="inline-flex items-center gap-2 text-purple-300 font-medium bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-400/30">
              <Database className="w-4 h-4" />
              Data Science
            </span>
          </div>
        </div>
        
        {/* Portfolio Website Project */}
        <div className="bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm p-6 mb-6">
          <h3 className="text-xl text-cyan-100 font-bold mb-3">Portfolio Management and Analysis App with AI</h3>
          <p className="text-cyan-200 mb-4">
            Modern, responsive portfolio website built with Next.js and Tailwind CSS. Features a clean design with smooth animations, 
            responsive layout, and professional presentation of skills and projects.
          </p>
          
          <div className="mb-4">
            <ul className="list-disc pl-6 text-cyan-200 space-y-1 text-sm">
              <li> Tools Used:Bert, Transformer, OpenAI API, React, ExpressJS, MongoDB, NodeJS, Redux</li>
              <li> Developed a portfolio management app with a visualization dashboard for tracking holdings and market trends,
              integrated Large Language Models and News API for sentiment analysis, delivering tailored financial advice.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Next.js</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">React</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">TypeScript</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* <a 
              href="https://github.com/limjiannn/portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors font-medium bg-cyan-500/20 px-3 py-2 rounded-lg border border-cyan-400/30 hover:bg-cyan-500/30"
            >
              <Github className="w-4 h-4" />
              View Code
            </a> */}
            <span className="inline-flex items-center gap-2 text-green-300 font-medium bg-green-500/20 px-3 py-2 rounded-lg border border-green-400/30">
              <Code className="w-4 h-4" />
              Full-Stack
            </span>
          </div>
        </div>

       

        {/* EcoPantry Project */}
        <div className="bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm p-6 mb-6">
          <h3 className="text-xl text-cyan-100 font-bold mb-3">Full-stack Web App with AI Chat Box: EcoPantry</h3>
          
          <div className="mb-4">
            <ul className="list-disc pl-6 text-cyan-200 space-y-1 text-sm">
              <li> Tools Used: JavaScript, React, ExpressJS, MongoDB, NodeJS, Azure API, Redux, Sass</li>
              <li> Developed a food management app with user-authentication, multiple pages and sidebar navigator featured
              with an AI chat box to analyze food and user health data and give management, health and recipe suggestions</li>
              <li>Implement a Dashboard to summarize food storage information with a searching tool and a updated list.</li>
              <li>Collect data and store hashed user information and formatted food information on a MongoDB database.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Next.js</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">React</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">TypeScript</span>
          </div>

          <div className="flex flex-wrap gap-3">

          <span className="inline-flex items-center gap-2 text-green-300 font-medium bg-green-500/20 px-3 py-2 rounded-lg border border-green-400/30">
              <Code className="w-4 h-4" />
              Full-Stack
            </span>
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="w-full mb-8">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Programming</h4>
            <p className="text-cyan-100 text-sm">Python, C++, JavaScript, TypeScript</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Web Development</h4>
            <p className="text-cyan-100 text-sm">React, Next.js, Node.js, HTML/CSS</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Machine Learning</h4>
            <p className="text-cyan-100 text-sm">PyTorch, TensorFlow, Scikit-learn</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Tools & Others</h4>
            <p className="text-cyan-100 text-sm">Git, Docker, AWS, Linux</p>
          </div>
        </div>
      </div>

      {/* Project Statistics */}
      {/* <div className="w-full">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Project Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm text-center">
            <div className="text-3xl font-bold text-cyan-300 mb-2">10+</div>
            <div className="text-cyan-200 font-medium">Projects Completed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm text-center">
            <div className="text-3xl font-bold text-cyan-300 mb-2">5+</div>
            <div className="text-cyan-200 font-medium">Technologies Mastered</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 backdrop-blur-sm text-center">
            <div className="text-3xl font-bold text-cyan-300 mb-2">3+</div>
            <div className="text-cyan-200 font-medium">Years Experience</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
