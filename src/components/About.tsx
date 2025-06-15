
import React from 'react';
import { GraduationCap, Code, Award, Users } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const About = () => {
  const { data: portfolioContent, isLoading } = usePortfolioContent();

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
        </div>
      </section>
    );
  }

  const journeyTitle = getPortfolioValue(portfolioContent, 'about', 'journey_title', 'My Journey');
  const journeyDescription = getPortfolioValue(portfolioContent, 'about', 'journey_description', 'Currently pursuing Master of Computer Applications (MCA), I am passionate about full-stack development and emerging technologies.');

  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'MCA Student' },
    { icon: Code, label: 'Projects', value: '15+' },
    { icon: Award, label: 'Certifications', value: '8+' },
    { icon: Users, label: 'Team Projects', value: '5+' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dedicated MCA student with a passion for technology and innovation
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">{journeyTitle}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {journeyDescription}
              </p>
              <p className="text-gray-300 leading-relaxed">
                I specialize in building scalable web applications using modern frameworks and 
                technologies. My goal is to create innovative solutions that make a positive impact 
                on users and businesses.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">What I Do</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>Full Stack Web Development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>Database Design & Management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>API Development & Integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>Mobile App Development</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 text-center hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
