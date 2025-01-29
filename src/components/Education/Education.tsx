import React from 'react';
import Image from 'next/image';
import './Education.css';

export default function Education() {
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
            <p>Jan. 2024 - May 2026</p>
          </div>
          <p>B.S. in Computer Science ; Minor in Mathematics</p>
          <p>GPA: 3.978 / 4</p>
          

          <div>
            <ul>
              <li>Worked as a peer tutor for Calculus III ar TRIO program.</li>
            </ul>
          </div>

          <h2>Courses</h2>
        </div>
        
      </div>

    </div>
  )
}
