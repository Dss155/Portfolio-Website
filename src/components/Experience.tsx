
import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { useExperience } from '@/hooks/usePortfolioData';

const Experience = () => {
  const { data: experiences, isLoading } = useExperience();

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            My journey in the tech industry and key accomplishments
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences?.map((exp, index) => (
            <div
              key={index}
              className="card-professional p-8 hover:border-blue-200 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">{exp.position}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-slate-600 mb-3 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <Building size={18} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin size={18} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-medium">
                    <Calendar size={18} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>
              
              {exp.description && (
                <ul className="space-y-3">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3 text-slate-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
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
