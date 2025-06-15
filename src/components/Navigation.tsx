
import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-orange-200' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50"
                >
                  {item.label}
                </a>
              ))}
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-orange-50"
                >
                  <Settings size={16} />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 p-2 rounded-lg hover:bg-orange-50 transition-all duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-orange-200 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-orange-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-orange-50"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={16} />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
