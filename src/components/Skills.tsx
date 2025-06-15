
import React from 'react';
import { useSkills } from '@/hooks/usePortfolioData';
import { groupSkillsByCategory } from '@/utils/portfolioHelpers';

const Skills = () => {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  const skillCategories = groupSkillsByCategory(skills || []);
  const categoryColors = ['orange', 'amber', 'yellow'];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills], index) => {
            const colorIndex = index % categoryColors.length;
            const color = categoryColors[colorIndex];
            
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                  {category}
                </h3>
                <div className="space-y-6">
                  {(categorySkills as any[]).map((skill: any, skillIndex: number) => (
                    <div key={skillIndex} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-semibold text-lg">{skill.name}</span>
                        <span className={`text-${color}-600 text-sm font-bold bg-${color}-100 px-3 py-1 rounded-full`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`bg-gradient-to-r from-${color}-400 to-${color}-600 h-3 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
