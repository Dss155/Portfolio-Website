
import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const Hero = () => {
  const { data: portfolioContent, isLoading } = usePortfolioContent();

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </section>
    );
  }

  const name = getPortfolioValue(portfolioContent, 'hero', 'name', 'Your Name');
  const title = getPortfolioValue(portfolioContent, 'hero', 'title', 'MCA Student & Full Stack Developer');
  const description = getPortfolioValue(portfolioContent, 'hero', 'description', 'Passionate about creating innovative solutions and building scalable applications with modern technologies.');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {title}
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a
              href="#contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="border border-cyan-500 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </a>
          </div>
          
          <div className="flex justify-center space-x-6 pt-8">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Github size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-gray-400" size={24} />
      </div>
    </section>
  );
};

export default Hero;
