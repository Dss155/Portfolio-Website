
import React from 'react';
import { GraduationCap, Code, Award, Users, Target, Heart } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const About = () => {
  const { data: portfolioContent, isLoading } = usePortfolioContent();

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  const journeyTitle = getPortfolioValue(portfolioContent, 'about', 'journey_title', 'My Journey');
  const journeyDescription = getPortfolioValue(portfolioContent, 'about', 'journey_description', 'Currently pursuing Master of Computer Applications (MCA), I am passionate about full-stack development and emerging technologies.');

  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'MCA Student', color: 'orange' },
    { icon: Code, label: 'Projects', value: '15+', color: 'amber' },
    { icon: Award, label: 'Certifications', value: '8+', color: 'yellow' },
    { icon: Users, label: 'Team Projects', value: '5+', color: 'orange' },
  ];

  const skills = [
    { icon: Target, title: 'Problem Solving', desc: 'Analytical thinking and creative solutions' },
    { icon: Heart, title: 'Passion Driven', desc: 'Love for coding and continuous learning' },
    { icon: Users, title: 'Team Player', desc: 'Collaborative approach to development' },
    { icon: Code, title: 'Clean Code', desc: 'Writing maintainable and scalable code' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated MCA student with a passion for technology and innovation
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-200 shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">{journeyTitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {journeyDescription}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                I specialize in building scalable web applications using modern frameworks and 
                technologies. My goal is to create innovative solutions that make a positive impact 
                on users and businesses.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200 shadow-lg">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">What I Do</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center space-x-3 text-lg">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  <span>Full Stack Web Development</span>
                </li>
                <li className="flex items-center space-x-3 text-lg">
                  <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                  <span>Database Design & Management</span>
                </li>
                <li className="flex items-center space-x-3 text-lg">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span>API Development & Integration</span>
                </li>
                <li className="flex items-center space-x-3 text-lg">
                  <span className="w-3 h-3 bg-orange-600 rounded-full"></span>
                  <span>Mobile App Development</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-200 text-center hover:border-orange-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <stat.icon className={`w-10 h-10 text-${stat.color}-500 mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <skill.icon className="w-8 h-8 text-orange-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{skill.title}</h4>
                      <p className="text-gray-600">{skill.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
