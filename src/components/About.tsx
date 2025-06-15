
import React from 'react';
import { GraduationCap, Code, Award, Users, Target, Heart, Database, Globe } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const About = () => {
  const { data: portfolioContent, isLoading } = usePortfolioContent();

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  const journeyTitle = getPortfolioValue(portfolioContent, 'about', 'journey_title', 'My Journey');
  const journeyDescription = getPortfolioValue(portfolioContent, 'about', 'journey_description', 'Currently pursuing Master of Computer Applications (MCA), I am passionate about full-stack development and emerging technologies.');

  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'MCA Student', color: 'blue' },
    { icon: Code, label: 'Projects', value: '15+', color: 'indigo' },
    { icon: Award, label: 'Certifications', value: '8+', color: 'purple' },
    { icon: Users, label: 'Team Projects', value: '5+', color: 'blue' },
  ];

  const expertise = [
    { icon: Globe, title: 'Frontend Development', desc: 'React, Vue, Angular with modern frameworks' },
    { icon: Database, title: 'Backend Development', desc: 'Node.js, Python, API design and architecture' },
    { icon: Code, title: 'Full Stack Solutions', desc: 'End-to-end application development' },
    { icon: Target, title: 'Problem Solving', desc: 'Analytical thinking and clean code practices' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated developer with a passion for creating efficient, scalable solutions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="card-professional p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">{journeyTitle}</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                {journeyDescription}
              </p>
              <p className="text-slate-700 leading-relaxed">
                I specialize in building robust web applications using modern frameworks and 
                best practices. My approach focuses on clean code, scalable architecture, 
                and delivering exceptional user experiences.
              </p>
            </div>
            
            <div className="card-professional p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Core Expertise</h3>
              <div className="grid grid-cols-1 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card-professional p-6 text-center group hover:border-blue-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="card-professional p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900">Frontend Development</span>
                    <span className="text-slate-600">90%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900">Backend Development</span>
                    <span className="text-slate-600">85%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-900">Database Design</span>
                    <span className="text-slate-600">80%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
