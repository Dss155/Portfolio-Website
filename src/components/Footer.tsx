
import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const Footer = () => {
  const { data: portfolioContent } = usePortfolioContent();
  const currentYear = new Date().getFullYear();
  
  const footerDescription = getPortfolioValue(portfolioContent, 'footer', 'description', 'Full Stack Developer passionate about creating innovative solutions and building scalable applications with modern technologies.');
  const name = getPortfolioValue(portfolioContent, 'hero', 'name', 'Your Name');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="text-white" size={18} />
              </div>
              <h3 className="text-xl font-bold gradient-text">Portfolio</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {footerDescription}
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              <ArrowUp size={18} />
              <span>Back to Top</span>
            </button>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">About Me</a></li>
              <li><a href="#skills" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Skills</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Projects</a></li>
              <li><a href="#experience" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Experience</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Let's Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all duration-200 transform hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all duration-200 transform hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all duration-200 transform hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-slate-500 text-sm">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-400 flex items-center justify-center space-x-2">
            <span>© {currentYear} Crafted with</span>
            <Heart size={16} className="text-red-500" />
            <span>by {name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
