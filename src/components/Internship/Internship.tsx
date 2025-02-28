import React from 'react';
import Image from 'next/image';
import './Internship.css';

export default function Internship() {
  const internships = [
    {
      title: 'Software Engineer Intern',
      company: 'SeeM(useums)',
      location: 'Pittsburgh',
      duration: 'Dec 2024 – May 2025',
      logo: '/assets/seemuseums_logo.jpeg', // Path to the logo
      responsibilities: [
        'Developed a front-end application using React, Next.js, and Redux, featuring authentication, project management, and integration with an AI agent, deployed on AWS for scalable infrastructure.',
        'Contributed to back-end development by designing data schemas and setting up environments using Docker with Flask in Python, ensuring efficient, scalable, and consistent deployment.',
        'Implemented a 3D reconstruction pipeline using 3D Gaussian splatting and SuGaR technology, featuring CUDA extensions and support for multiple data formats. This setup consistently achieves a steady quality with PSNR over 26, and includes front-end visualization using Three.js.',
      ],
    },
    {
      title: 'Quant Research Consultant',
      company: 'WorldQuant Brain',
      location: 'Remote',
      duration: 'Sep 2023 – Jan 2024',
      logo:'/assets/wq_logo.png', // Path to the logo
      responsibilities: [
        'Build market-neutral, medium-frequency strategy based on cross-field data and sentiment analysis.',
        'Implement backtesting and refine strategy to improve Sharpe ratio, turnover, and fitness performance.',
      ],
    },
    {
      title: 'Audit Intern',
      company: 'KPMG',
      location: 'Shanghai, China',
      duration: 'Jan 2023 – Feb 2023',
      logo: '/assets/kpmg_logo.jpeg', // Path to the logo
      responsibilities: [
        'Recognized risk points and conducted assessment in collaboration with colleagues to enhance analysis procedure.',
        'Performed inquiry, recalculation, observation and other substantive procedures for the integrity of assets, payroll and expense accounts and contributed to regulatory compliance audits for 5 international companies.',
        'Investigated subsequent events and conducted substantive tests of year-end transaction for each corporation.',
      ],
    },
  ];

  return (
    <div className='internship-container'>
      <h1>Internship</h1>
      {internships.map((internship, index) => (
        <div key={index} className='internship-details'>
          <div className='internship-logo-container'>
            {internship.logo && (
              <Image
                src={internship.logo}
                alt={`${internship.company} Logo`}
                width={100}
                height={100}
                className="internship-logo"
              />
            )}
          </div>
          <div className='internship-content'>
            <h2>{internship.title}</h2>
            <p><strong>{internship.company}</strong> – {internship.location}</p>
            <p>{internship.duration}</p>
            <ul>
              {internship.responsibilities.map((responsibility, idx) => (
                <li key={idx}>{responsibility}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}