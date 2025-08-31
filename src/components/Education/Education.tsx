import React, {useState} from 'react';
import Image from 'next/image';

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
  ];

  const displayedCourses = showMore ? courses : courses.slice(0, 4);

  return (
    <div className="flex flex-col items-start text-left self-stretch w-full">
      <h1 className="self-start text-3xl md:text-4xl text-cyan-100 mb-5 uppercase tracking-wider text-shadow font-extrabold">
        Education
      </h1>

      <div className="flex flex-col lg:flex-row p-5 gap-10 bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm w-full mb-6">
        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <Image
            src="/assets/nyu_logo.jpeg"
            alt="NYU Logo"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        <div className="flex flex-col text-left flex-grow">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-2">
            <h2 className="text-2xl text-cyan-100 text-shadow mb-1 font-bold">New York University</h2>
            <p className="text-cyan-200 text-shadow font-medium">Jan. 2024 - May 2026 (Expected)</p>
          </div>
          <p className="text-cyan-100 font-semibold">B.S. in Computer Science ; Minor in Mathematics</p>
          <p className="text-cyan-200 text-shadow mb-3 font-medium">GPA: 3.983 / 4</p>
          
          <div className="mb-4">
            <ul className="list-disc pl-10 text-cyan-200 text-shadow">
              <li className="font-medium">Worked as a peer tutor for Calculus III at TRIO program.</li>
            </ul>
          </div>

          <h2 className="text-xl text-cyan-100 text-shadow mb-3 font-bold">Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white/5 rounded-xl border border-cyan-200/20 shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20">
                  <th className="p-4 text-left text-cyan-100 font-bold text-lg border-b border-cyan-200/30">
                    Course Name
                  </th>
                  <th className="p-4 text-left text-cyan-100 font-bold text-lg border-b border-cyan-200/30">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedCourses.map((course, index) => (
                  <tr 
                    key={index} 
                    className={`transition-all duration-200 hover:bg-cyan-500/10 ${
                      index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                    }`}
                  >
                    <td className="p-4 text-cyan-200 font-medium border-b border-cyan-200/10">
                      {course.name}
                    </td>
                    <td className="p-4 text-cyan-300 font-bold border-b border-cyan-200/10">
                      {course.gpa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button 
            onClick={toggleShowMore} 
            className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-cyan-600/30 text-cyan-100 border border-cyan-300/30 rounded-lg cursor-pointer transition-all duration-300 hover:from-cyan-500/50 hover:to-cyan-600/50 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-500/25 font-semibold"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row p-5 gap-10 bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm w-full">
        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
          <Image
            src="/assets/sufe_logo.jpeg"
            alt="SUFE Logo"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        <div className="flex flex-col text-left flex-grow">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-2">
            <h2 className="text-2xl text-cyan-100 text-shadow mb-1 font-bold">Shanghai University of Finance and Economics</h2>
            <p className="text-cyan-200 text-shadow font-medium">Sep. 2022 - Dec. 2023 (transferred out)</p>
          </div>
          <p className="text-cyan-100 font-semibold">B.S. in Accounting ; Minor in Statistics</p>
          <p className="text-cyan-200 text-shadow mb-3 font-medium">GPA: 3.983 / 4</p>
          
          <div>
            <ul className="list-disc pl-10 text-cyan-200 text-shadow">
              <li className="font-medium">Renmin Scholarship First Prize</li>
              <li className="font-medium">Second Prize in China Undergraduate Mathematical Contest in Modeling Shanghai District</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
