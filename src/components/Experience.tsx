
import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Full Stack Developer Intern',
      duration: 'June 2024 - Present',
      location: 'Remote',
      description: [
        'Developed and maintained web applications using React and Node.js',
        'Collaborated with senior developers on enterprise-level projects',
        'Implemented responsive designs and optimized application performance',
        'Participated in code reviews and agile development processes',
      ],
    },
    {
      company: 'Digital Innovation Lab',
      position: 'Frontend Developer',
      duration: 'Jan 2024 - May 2024',
      location: 'Hybrid',
      description: [
        'Built interactive user interfaces using modern JavaScript frameworks',
        'Worked closely with UX/UI designers to implement pixel-perfect designs',
        'Optimized web applications for better performance and SEO',
        'Mentored junior developers and conducted technical workshops',
      ],
    },
    {
      company: 'StartupHub',
      position: 'Web Development Trainee',
      duration: 'Sep 2023 - Dec 2023',
      location: 'On-site',
      description: [
        'Learned full-stack development through hands-on projects',
        'Developed multiple web applications from concept to deployment',
        'Gained experience with database design and API development',
        'Collaborated with cross-functional teams on product development',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My journey in the tech industry and key accomplishments
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.position}</h3>
                  <div className="flex items-center space-x-4 text-gray-400 mb-2">
                    <div className="flex items-center space-x-1">
                      <Building size={16} />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-cyan-400">
                    <Calendar size={16} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2 text-gray-300">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
