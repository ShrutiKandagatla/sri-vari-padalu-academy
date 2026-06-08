import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Classes', href: '#classes' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-maroon-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-maroon-800">Sri Vari Padalu</h2>
              <p className="text-xs text-maroon-600">Dance Academy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-maroon-700 hover:text-maroon-900 font-medium transition-colors duration-300 hover:scale-105 px-3 py-2"
                >
                  {item.label}
                </button>
                {index < navItems.length - 1 && (
                  <span className="text-maroon-300">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+919876543210" className="flex items-center text-maroon-700 hover:text-maroon-900 transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-sm">+91 90002 03866</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-maroon-800 p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-maroon-200 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-maroon-700 hover:text-maroon-900 font-medium py-2 px-4 hover:bg-maroon-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
