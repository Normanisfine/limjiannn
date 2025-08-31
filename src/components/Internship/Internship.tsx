import React from 'react';
import Image from 'next/image';

export default function Internship() {
  const internships = [
    {
      title: 'Software Engineer Intern',
      company: 'SeeM(useums)',
      location: 'Pittsburgh',
      duration: 'Dec 2024 – May 2025',
      logo: '/assets/seemuseums_logo.jpeg',
      responsibilities: [
        'Developed a front-end application using React, Next.js, and Redux, featuring authentication, project management, and integration with an AI agent, deployed on AWS for scalable infrastructure.',
        'Contributed to back-end development by designing data schemas and setting up environments using Docker with Flask in Python, ensuring efficient, scalable, and consistent deployment.',
        'Implemented a 3D reconstruction pipeline using 3D Gaussian splatting and SuGaR technology, featuring CUDA extensions and support for multiple data formats. This setup consistently achieves a steady quality with PSNR over 26, and includes front-end visualization using Three.js.',
      ],
      tags: [
        { text: 'React', color: 'cyan' },
        { text: 'Next.js', color: 'cyan' },
        { text: 'Redux', color: 'cyan' },
        { text: 'Python', color: 'green' },
        { text: 'Flask', color: 'green' },
        { text: 'Docker', color: 'blue' },
        { text: 'AWS', color: 'yellow' },
        { text: '3D Gaussian Splatting', color: 'purple' },
        { text: 'CUDA', color: 'purple' },
        { text: 'Three.js', color: 'purple' }
      ]
    },
    {
      title: 'Quant Research Consultant',
      company: 'WorldQuant Brain',
      location: 'Remote',
      duration: 'Sep 2023 – Jan 2024',
      logo:'/assets/wq_logo.png',
      responsibilities: [
        'Build market-neutral, medium-frequency strategy based on cross-field data and sentiment analysis.',
        'Implement backtesting and refine strategy to improve Sharpe ratio, turnover, and fitness performance.',
      ],
      tags: [
        { text: 'Quantitative Research', color: 'cyan' },
        { text: 'Strategy Development', color: 'cyan' },
        { text: 'Backtesting', color: 'green' },
        { text: 'Sentiment Analysis', color: 'blue' },
        { text: 'Financial Modeling', color: 'yellow' },
        { text: 'Risk Management', color: 'purple' }
      ]
    },
    {
      title: 'Audit Intern',
      company: 'KPMG',
      location: 'Shanghai, China',
      duration: 'Jan 2023 – Feb 2023',
      logo: '/assets/kpmg_logo.jpeg',
      responsibilities: [
        'Recognized risk points and conducted assessment in collaboration with colleagues to enhance analysis procedure.',
        'Performed inquiry, recalculation, observation and other substantive procedures for the integrity of assets, payroll and expense accounts and contributed to regulatory compliance audits for 5 international companies.',
        'Investigated subsequent events and conducted substantive tests of year-end transaction for each corporation.',
      ],
      tags: [
        { text: 'Audit', color: 'cyan' },
        { text: 'Risk Assessment', color: 'cyan' },
        { text: 'Financial Analysis', color: 'green' },
        { text: 'Regulatory Compliance', color: 'blue' },
        { text: 'Substantive Procedures', color: 'yellow' },
        { text: 'International Standards', color: 'purple' }
      ]
    },
  ];

  const getTagColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      cyan: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
      green: 'bg-green-500/20 text-green-200 border-green-400/30',
      blue: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
      yellow: 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30',
      purple: 'bg-purple-500/20 text-purple-200 border-purple-400/30'
    };
    return colorMap[color] || 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30';
  };

  return (
    <div className="flex flex-col items-start text-left self-stretch w-full">
      <h1 className="self-start text-3xl md:text-4xl text-cyan-100 mb-5 uppercase tracking-wider text-shadow font-extrabold">
        Internship
      </h1>
      
      {internships.map((internship, index) => (
        <div key={index} className="flex flex-col lg:flex-row p-5 gap-6 bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm w-full mb-6 last:mb-0">
          <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
            {internship.logo && (
              <Image
                src={internship.logo}
                alt={`${internship.company} Logo`}
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-[10px]"
              />
            )}
          </div>
          
          <div className="flex flex-col flex-grow">
            <h2 className="text-2xl text-cyan-100 text-shadow mb-2">{internship.title}</h2>
            <p className="text-cyan-200 text-shadow mb-1"><strong>{internship.company}</strong> – {internship.location}</p>
            <p className="text-cyan-200 text-shadow mb-3">{internship.duration}</p>
            <ul className="list-disc pl-10 text-cyan-200 text-shadow mb-4">
              {internship.responsibilities.map((responsibility, idx) => (
                <li key={idx} className="mb-1">{responsibility}</li>
              ))}
            </ul>
            
            {/* Tags Section */}
            <div className="flex flex-wrap gap-2">
              {internship.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex} 
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getTagColorClasses(tag.color)}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
