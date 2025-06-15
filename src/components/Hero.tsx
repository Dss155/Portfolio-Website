
import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const Hero = () => {
  const { data: portfolioContent, isLoading } = usePortfolioContent();

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orange-500"></div>
      </section>
    );
  }

  const name = getPortfolioValue(portfolioContent, 'hero', 'name', 'Your Name');
  const title = getPortfolioValue(portfolioContent, 'hero', 'title', 'MCA Student & Full Stack Developer');
  const description = getPortfolioValue(portfolioContent, 'hero', 'description', 'Passionate about creating innovative solutions and building scalable applications with modern technologies.');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto font-medium">
              {title}
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
            <a
              href="#contact"
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Projects
            </a>
            <a
              href="#"
              className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Download CV</span>
            </a>
          </div>
          
          <div className="flex justify-center space-x-8 pt-8">
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors duration-300 transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors duration-300 transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors duration-300 transform hover:scale-110">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-gray-600" size={24} />
      </div>
    </section>
  );
};

export default Hero;
