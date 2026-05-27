import React from 'react';
import { SOCIAL_LINKS, BUSINESS_INFO } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon } from './icons/Icons';

const POLICY_LINKS = [
  { name: 'Terms & Conditions', href: '/terms.html' },
  { name: 'Privacy Policy', href: '/privacy.html' },
  { name: 'Refund Policy', href: '/refund.html' },
  { name: 'Return Policy', href: '/return.html' },
  { name: 'Shipping Policy', href: '/shipping.html' },
];

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
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
          {POLICY_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-400 hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="text-sm text-slate-400 mb-4 space-y-1">
          <p className="font-semibold text-slate-300">{BUSINESS_INFO.name}</p>
          <p>{BUSINESS_INFO.address}</p>
          <p>
            {BUSINESS_INFO.email} &nbsp;|&nbsp; {BUSINESS_INFO.phone}
          </p>
        </div>
        <p>
          &copy; {currentYear} {BUSINESS_INFO.name}. All Rights Reserved. &middot; Founded by{' '}
          {BUSINESS_INFO.founder}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;