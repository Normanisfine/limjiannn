import Image from 'next/image';
    const courses = [
        { name: 'Machine Learning', gpa: '4.0' },
        { name: 'Machine Learning Systems', gpa: '3.7' },
        { name: 'Software Engineering', gpa: '4.0' },
        { name: 'AR/VR', gpa: '4.0' },
        { name: 'Image and Video Processing', gpa: '4.0' },
        { name: 'Vertically Integrated Projects', gpa: 'P' },
        { name: 'Operating System', gpa: '4.0' },
        { name: 'Design and Analysis of Algorithms', gpa: '4.0' },
        { name: 'Object Oriented Programming', gpa: '4.0' },
        { name: 'Data Structure', gpa: '4.0' },
        { name: 'Probability and Statistics', gpa: '4.0' },
        { name: 'Honors Numerical Analysis', gpa: '4.0' },
        { name: 'Computer Architecture', gpa: '4.0' },
        { name: 'Intro to Database', gpa: '4.0' },
        { name: 'Ordinary Differential Equation', gpa: '4.0' },
        { name: 'Discrete Math', gpa: '4.0' },
        { name: 'Calculus III', gpa: '4.0' },
    ];

export default function Education() {
 return <section id="education" className="section shell"><div className="section-heading"><h2>Education</h2></div><div className="education-list">
 <article className="education-row"><Image src="/assets/upenn-logo-preview.webp" alt="UPenn" width={64} height={64}/><div><p className="meta">Aug 2026 – Present</p><h3>University of Pennsylvania</h3><p>MSE in Computer and Information Science</p><p>Graduate School of Engineering and Applied Science</p></div></article>
 <article className="education-row"><Image src="/assets/nyu_logo.jpeg" alt="NYU" width={64} height={64}/><div><p className="meta">2024 - 2026</p><h3>New York University</h3><p>B.S. in Computer Science; Minor in Mathematics</p><p><strong>GPA: 3.972/4.0</strong> · Dean&apos;s List</p><div className="grants"><p><strong>NextGenPhD Scholars Program</strong><br/>$5,000 research grant for 3D reconstruction and medical imaging (Fall 2025)</p><p><strong>Undergraduate Summer Research Program (UGSRP)</strong><br/>$5,000 grant for research on 3D Gaussian Splatting (Summer 2025)</p></div><details className="course-details"><summary>Coursework & grades <span aria-hidden="true">＋</span></summary><dl>{courses.map(course => <div key={course.name}><dt>{course.name}</dt><dd>{course.gpa}</dd></div>)}</dl></details></div></article>
 <article className="education-row"><Image src="/assets/sufe_logo.jpeg" alt="SUFE" width={64} height={64}/><div><p className="meta">2022 - 2023</p><h3>Shanghai Univ. of Finance & Economics</h3><p>B.S. in Accounting; Minor in Statistics</p><p><strong>GPA: 3.71/4.0</strong></p><ul><li>Renmin Scholarship First Prize</li><li>Mathematical Contest in Modeling (2nd Prize)</li></ul></div></article>
 </div></section>;
}
