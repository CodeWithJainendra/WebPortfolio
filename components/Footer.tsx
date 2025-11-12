import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons/Icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-4xl mx-auto text-center text-slate-500 px-6">
        <div className="flex justify-center items-center space-x-6 md:space-x-8 mb-6">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-transform duration-300 transform hover:scale-110">
                <GithubIcon className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-transform duration-300 transform hover:scale-110">
                <LinkedinIcon className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
            </a>
            <a href={SOCIAL_LINKS.email} className="text-slate-400 hover:text-indigo-400 transition-transform duration-300 transform hover:scale-110">
                <MailIcon className="w-6 h-6" />
                <span className="sr-only">Email</span>
            </a>
        </div>
        <p>&copy; {currentYear} Jainendra Singh. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;