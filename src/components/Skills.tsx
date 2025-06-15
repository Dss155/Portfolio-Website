
import React from 'react';
import { useSkills } from '@/hooks/usePortfolioData';
import { groupSkillsByCategory } from '@/utils/portfolioHelpers';

const Skills = () => {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  const skillCategories = groupSkillsByCategory(skills || []);

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Skills & Technologies</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical expertise across modern development stack
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills], index) => (
            <div
              key={index}
              className="card-professional p-8 hover:border-blue-200 group"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-8 text-center group-hover:text-blue-600 transition-colors duration-200">
                {category}
              </h3>
              <div className="space-y-6">
                {(categorySkills as any[]).map((skill: any, skillIndex: number) => (
                  <div key={skillIndex} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-900 font-medium">{skill.name}</span>
                      <span className="text-blue-600 text-sm font-semibold bg-blue-50 px-2 py-1 rounded">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
