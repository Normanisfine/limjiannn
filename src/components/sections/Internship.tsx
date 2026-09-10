import Image from 'next/image';
const internships = [
    {
        title: 'Robotics Software Engineer Intern',
        company: 'Zhiyuan Company',
        location: 'Chengdu, China',
        duration: 'Dec 2025 – Feb 2026',
        logo: null,
        logoFallback: 'ZY',
        responsibilities: [
            'Built vehicle detection and high-precision localization module for automated parking system, fusing RGB camera data with Livox Mid-360 LiDAR point cloud to estimate 3D vehicle position and orientation.',
            'Developed modular ROS-based software with YOLO real-time detection, achieving ±5cm localization accuracy in dynamic parking environments.',
        ],
        tags: ['ROS', 'LiDAR', 'YOLO', 'C++', 'Python', 'SLAM', 'Point Cloud']
    },
    {
        title: 'Software Engineer Intern',
        company: 'SeeM(useums)',
        location: 'Pittsburgh',
        duration: 'Dec 2024 – May 2025',
        logo: '/assets/seemuseums_logo.jpeg',
        logoFallback: null,
        responsibilities: [
            'Frontend: React, Next.js, Redux. Built authentication, project management.',
            'Backend: Python Flask, Docker, AWS. Scalable deployment.',
            '3D Pipeline: Implemented 3D Gaussian splatting & SuGaR with CUDA.',
        ],
        tags: ['React', 'Next.js', 'Python', 'AWS', '3DGS', 'CUDA']
    },
    {
        title: 'Quant Research Consultant',
        company: 'WorldQuant Brain',
        location: 'Remote',
        duration: 'Sep 2023 – Jan 2024',
        logo: '/assets/wq_logo.png',
        logoFallback: null,
        responsibilities: [
            'Built market-neutral strategy based on cross-field data and sentiment.',
            'Refined strategy to improve Sharpe ratio, turnover, and fitness.',
        ],
        tags: ['Quantitative Research', 'Backtesting', 'Pandas', 'Financial Modeling']
    },
    {
        title: 'Audit Intern',
        company: 'KPMG',
        location: 'Shanghai, China',
        duration: 'Jan 2023 – Feb 2023',
        logo: '/assets/kpmg_logo.jpeg',
        logoFallback: null,
        responsibilities: [
            'Conducted risk assessment and substantive procedures.',
            'Verified integrity of assets, payroll, and expense accounts.',
        ],
        tags: ['Audit', 'Risk Analysis']
    }
];

export default function Internship() {
 return <section id="internship" className="section shell"><div className="section-heading"><h2>Experience</h2><p>Research, engineering, and everything in between.</p></div><div className="experience-list">{internships.map(role => <article key={role.company} className="experience-row"><div className="experience-date">{role.duration}<br/><span>{role.location}</span></div><div><div className="company-line">{role.logo ? <Image src={role.logo} alt="" width={44} height={44}/> : <span className="logo-fallback">{role.logoFallback}</span>}<h3>{role.company}</h3></div><h4>{role.title}</h4><ul>{role.responsibilities.map(item => <li key={item}>{item}</li>)}</ul><p className="tool-line">{role.tags.join(' · ')}</p></div></article>)}</div></section>;
}
