
import React from 'react';
import { useSkills } from '@/hooks/usePortfolioData';
import { groupSkillsByCategory } from '@/utils/portfolioHelpers';

const Skills = () => {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
        </div>
      </section>
    );
  }

  const skillCategories = groupSkillsByCategory(skills || []);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills], index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {category}
              </h3>
              <div className="space-y-4">
                {(categorySkills as any[]).map((skill: any, skillIndex: number) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
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
