import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { MenuIcon, XIcon } from './icons/Icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setIsOpen(false); // Close mobile menu on link click
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
          Jainendra<span className="text-indigo-400">.</span>
        </a>
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-indigo-400 focus:outline-none">
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-slate-800`}>
        <div className="flex flex-col items-center py-4">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)} 
              className="py-2 text-lg text-slate-200 hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;