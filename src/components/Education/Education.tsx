import React, {useState} from 'react';
import Image from 'next/image';
import './Education.css';

export default function Education() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const courses = [
    { name: 'Machine Learning', gpa: '4.0' },
    { name: 'Operating System', gpa: '4.0' },
    { name: 'Design and Analysis of Algorithms', gpa: '4.0' },
    { name: 'Object Oriented Programming', gpa: '4.0'},
    { name: 'Data Structure', gpa: '4.0'},
    { name: 'Probability and Statistics', gpa: '4.0'},
    { name: 'Honors Numerical Analysis', gpa: '4.0' },
    { name: 'Computer Architecture', gpa: '4.0' },
    { name: 'Intro to Database', gpa: '4.0'},
    { name: 'Odinary Differential Equation', gpa: '4.0'},
    { name: 'Discrete Math', gpa: '4.0'},
    { name: 'Calculus III', gpa: '4.0'},
    // Add more courses as needed
  ];

  const displayedCourses = showMore ? courses : courses.slice(0, 4);

  return (
    <div className='edu-container'>
      <h1>Education</h1>

      <div className='edu-content'>
        <Image
          src="/assets/nyu_logo.jpeg"
          alt="NYU Logo"
          width={100}
          height={100}
          className="edu-logo"
        />

        <div className='edu-details'>
          <div className='edu-header'>
            <h2>New York University</h2>
            <p>Jan. 2024 - May 2026 (Expected)</p>
          </div>
          <p>B.S. in Computer Science ; Minor in Mathematics</p>
          <p>GPA: 3.983 / 4</p>
          

          <div>
            <ul>
              <li>Worked as a peer tutor for Calculus III at TRIO program.</li>
              {/* <li>Involved in project development in the NYU Robotics Club (High-Speed Research Network and Drone subgroups).</li> */}
            </ul>
          </div>

          <h2>Courses</h2>
          <table className="course-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {displayedCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={toggleShowMore} className="show-more-btn">
            {showMore ? 'Show Less' : 'Show More'}
          </button>

        </div>

        
      </div>

      <div className='edu-content'>
        <Image
          src="/assets/sufe_logo.jpeg"
          alt="NYU Logo"
          width={100}
          height={100}
          className="edu-logo"
        />

        <div className='edu-details'>
          <div className='edu-header'>
            <h2>Shanghai University of Finance and Economics</h2>
            <p>Sep. 2022 - Dec. 2023 (transferred out)</p>
          </div>
          <p>B.S. in Accounting ; Minor in Statistics</p>
          <p>GPA: 3.7 / 4</p>
          

          <div>
            <ul>
              <li>Renmin Scholarship First Prize</li>
              <li>Second Prize in China Undergraduate Mathematical Contest in Modeling Shanghai District</li>
            </ul>
          </div>

        </div>

        
      </div>

    </div>
  )
}
