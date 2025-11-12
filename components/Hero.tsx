import React, { useState, useEffect, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { GithubIcon, LinkedinIcon } from './icons/Icons';
import { SOCIAL_LINKS } from '../constants';
// Resolve asset URLs via import.meta to avoid TS module type issues
const profileImageUrl = new URL('../shivam image.png', import.meta.url).href;
const resumePdfUrl = new URL('../Jainendra Resume.pdf', import.meta.url).href;

const ROLES = ['Project Engineer.', 'IoT Developer.', 'Cybersecurity Enthusiast.'];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY = 2000;

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    let ticker: ReturnType<typeof setTimeout>;
    if (isVisible) {
      const handleType = () => {
        const i = loopNum % ROLES.length;
        const fullText = ROLES[i];
    
        setText(
          isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1)
        );
    
        if (!isDeleting && text === fullText) {
          setTimeout(() => setIsDeleting(true), DELAY);
        } else if (isDeleting && text === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      };

      const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
      ticker = setTimeout(handleType, speed);
    }
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, isVisible]);

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-indigo-900/20 py-20 px-6">
      <div className={`container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Hi, I'm <span className="text-indigo-400">Jainendra Singh</span>
          </h1>
          <p className="text-2xl sm:text-3xl text-slate-300 font-semibold mb-6 h-10">
            I am a <span className="text-indigo-400 border-r-4 border-indigo-400 animate-pulse">{text}</span>
          </p>
          <p className="text-slate-400 max-w-xl mx-auto md:mx-0 mb-8">
            Dynamic Project Engineer at IIT Kanpur, specializing in IoT and application development. Proven ability to design and implement innovative solutions, optimizing project timelines and resource allocation. Skilled in cybersecurity and database management, with a strong focus on enhancing user experience through advanced technologies.
          </p>
          <div className="flex justify-center md:justify-start items-center space-x-4 mb-8">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-transform duration-300 transform hover:scale-110">
              <GithubIcon className="w-8 h-8" />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-transform duration-300 transform hover:scale-110">
              <LinkedinIcon className="w-8 h-8" />
            </a>
          </div>
          <a 
            href={resumePdfUrl}
            download
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
          >
            Download CV
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-50"></div>
                 <img 
                    src={profileImageUrl} 
                    alt="Jainendra Singh"
                    className="relative rounded-full w-full h-full object-cover border-4 border-indigo-500/50 shadow-xl" 
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;