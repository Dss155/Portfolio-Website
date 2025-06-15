
import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Terminal } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const Hero = () => {
  const { data: portfolioContent, isLoading } = usePortfolioContent();

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  const name = getPortfolioValue(portfolioContent, 'hero', 'name', 'Your Name');
  const title = getPortfolioValue(portfolioContent, 'hero', 'title', 'Full Stack Developer');
  const description = getPortfolioValue(portfolioContent, 'hero', 'description', 'Building scalable applications with modern technologies and clean code practices.');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-slate-50">
      {/* Professional grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          {/* Developer badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
            <Terminal size={16} />
            <span>Full Stack Developer</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text">
                {name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
              {title}
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Mail size={18} />
              <span>Get In Touch</span>
            </a>
            <a
              href="#projects"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Code size={18} />
              <span>View Projects</span>
            </a>
            <a
              href="#"
              className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-all duration-200 shadow-professional hover:shadow-professional-lg transform hover:scale-[1.02] inline-flex items-center space-x-2"
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-8">
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-slate-400" size={20} />
      </div>
    </section>
  );
};

export default Hero;
