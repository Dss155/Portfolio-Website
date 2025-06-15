
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { usePortfolioContent } from '@/hooks/usePortfolioData';
import { getPortfolioValue } from '@/utils/portfolioHelpers';

const Footer = () => {
  const { data: portfolioContent } = usePortfolioContent();
  const currentYear = new Date().getFullYear();
  
  const footerDescription = getPortfolioValue(portfolioContent, 'footer', 'description', 'MCA Student passionate about creating innovative solutions and building scalable applications with modern technologies.');
  const name = getPortfolioValue(portfolioContent, 'hero', 'name', 'Your Name');

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {footerDescription}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">About</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Skills</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
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
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>© {currentYear} Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>by {name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
