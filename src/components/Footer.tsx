
import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const Footer = () => {
  const { data: portfolioContent } = usePortfolioContent();
  const currentYear = new Date().getFullYear();
  
  const footerDescription = getPortfolioValue(portfolioContent, 'footer', 'description', 'MCA Student passionate about creating innovative solutions and building scalable applications with modern technologies.');
  const name = getPortfolioValue(portfolioContent, 'hero', 'name', 'Your Name');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {footerDescription}
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium"
            >
              <ArrowUp size={20} />
              <span>Back to Top</span>
            </button>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-lg">About Me</a></li>
              <li><a href="#skills" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-lg">Skills</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-lg">Projects</a></li>
              <li><a href="#experience" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-lg">Experience</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-lg">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Let's Connect</h4>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2 text-lg">
            <span>© {currentYear} Crafted with</span>
            <Heart size={18} className="text-red-500" />
            <span>by {name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
