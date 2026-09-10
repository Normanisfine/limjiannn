const projects = [
    {
        title: 'SO-ARM101 Robot Learning Pipeline',
        desc: '3D printed and assembled an SO-ARM101 robotic arm, calibrated Feetech servo motors, and configured leader-follower teleoperation. Building a robot learning pipeline with teleoperation data collection for policy training and sim-to-real experimentation in Isaac Lab.',
        tags: ['Robotics', 'Isaac Lab', 'Python', 'Teleoperation', 'Sim-to-Real', 'Servo Control'],
        link: null,
        type: 'Robotics',
        date: 'Spring 2026'
    },
    {
        title: 'ML Systems Implementation',
        desc: 'Implemented GPU tensor operators (CUDA/C++) and MLP with auto-differentiation via pybind11. Achieved 97% MNIST accuracy with optimized kernels on NVIDIA T4 GPUs.',
        tags: ['CUDA', 'C++', 'Python', 'PyTorch', 'pybind11'],
        link: 'https://github.com/Normanisfine/baregrad',
        type: 'ML Systems',
        date: 'Fall 2025'
    },
    {
        title: 'SkyRoute: Airline Management System',
        desc: 'Cloud-based airline platform with flight scheduling, booking, and admin control. Normalized MySQL (3NF) on AWS RDS with Next.js RESTful APIs and CI/CD on Vercel.',
        tags: ['Next.js', 'MySQL', 'AWS RDS', 'Vercel', 'REST API'],
        link: 'https://github.com/Normanisfine/SkyRoute',
        type: 'Full-Stack',
        date: 'Spring 2025'
    },
    {
        title: 'Portfolio Management with AI',
        desc: 'Portfolio management app with visualization dashboard for tracking holdings and market trends. Integrated LLMs and News API for sentiment analysis and tailored financial advice.',
        tags: ['BERT', 'Transformer', 'OpenAI', 'React', 'MongoDB', 'Express'],
        link: null,
        type: 'Full-Stack + AI',
        date: 'Oct 2024 - Present'
    },
    {
        title: 'Kaggle: Jane Street Forecasting',
        desc: 'Real-time market data forecasting with data cleaning, PCA, clustering. Implemented SVM, CNN, RNN, LSTM, ARIMA with multiple sampling methods and regularizations.',
        tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'ARIMA'],
        link: 'https://github.com/Normanisfine/Kaggle-Jane-Street-2024',
        type: 'ML/AI',
        date: 'Oct 2024 - Present'
    },
    {
        title: 'EcoPantry: AI Food Manager',
        desc: 'Food management app with user authentication and AI chatbox for health analysis and recipe suggestions. Features dashboard with search and MongoDB storage for user data.',
        tags: ['React', 'Express', 'MongoDB', 'Node.js', 'Azure API', 'Redux', 'Sass'],
        link: 'https://github.com/Normanisfine/EcoPantry',
        type: 'Full-Stack + AI',
        date: 'June 2024'
    },
    {
        title: 'Supply Chain Optimization',
        desc: 'Math modeling project optimizing pricing and restocking strategies for supermarket vegetables. Processed 80,000+ data points using Random Forest, ARIMA, and Particle Swarm Optimization.',
        tags: ['Python', 'NumPy', 'Pandas', 'Random Forest', 'ARIMA', 'PSO'],
        link: null,
        type: 'ML/Optimization',
        date: 'Sep 2023',
        award: '2nd Prize - China Mathematical Contest'
    }
];

export default function Projects() {
 return <section id="projects" className="section shell"><div className="section-heading"><h2>Projects & experiments</h2><p>From low-level kernels to full-stack systems.</p></div>
 <div className="project-list">{projects.map((project, index) => <article id={index === 0 ? 'robot-learning' : `project-${index}`} key={project.title} className="project-row">
 <div className="project-index">{String(index + 1).padStart(2, '0')}</div><div><p className="meta">{project.type} · {project.date}</p><h3>{project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title} <span aria-hidden="true">↗</span></a> : project.title}</h3><p>{project.desc}</p>{project.award && <p className="award">{project.award}</p>}<p className="tool-line">{project.tags.join(' · ')}</p></div>
 {project.link && <a className="round-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>↗</a>}
 </article>)}</div></section>;
}
