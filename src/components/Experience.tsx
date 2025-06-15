
import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { useExperience } from '@/hooks/usePortfolioData';

const Experience = () => {
  const { data: experiences, isLoading } = useExperience();

  if (isLoading) {
    return (
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
        </div>
      </section>
    );
  }

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
          {experiences?.map((exp, index) => (
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
                    {exp.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-cyan-400">
                    <Calendar size={16} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>
              
              {exp.description && (
                <ul className="space-y-2">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 text-gray-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
