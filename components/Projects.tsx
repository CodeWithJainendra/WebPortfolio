import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import { PROJECTS_DATA } from '../constants';
import { GithubIcon } from './icons/Icons';

// Generate a placeholder image based on project tags/description
function createPlaceholder(title: string, description: string, tags: string[]): string {
  const canvas = document.createElement('canvas');
  const width = 600;
  const height = 400;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const text = (desc: string, tgs: string[]) => {
    const d = desc.toLowerCase();
    const has = (s: string) => d.includes(s) || tgs.map(x => x.toLowerCase()).some(x => x.includes(s));
    if (has('iot') || has('hardware') || has('sensor')) return '📟';
    if (has('vr') || has('virtual')) return '🕶️';
    if (has('mobile') || has('android') || has('flutter')) return '📱';
    if (has('pdf') || has('file')) return '📄';
    if (has('energy') || has('electric')) return '⚡';
    if (has('security') || has('secure')) return '🔒';
    if (has('agri') || has('soil') || has('farm')) return '🌱';
    if (has('transit') || has('metro') || has('rail')) return '🚇';
    if (has('shop') || has('e-commerce') || has('commerce')) return '🛍️';
    if (has('food') || has('restaurant') || has('diet')) return '🍔';
    if (has('data') || has('backend')) return '🗂️';
    return '💡';
  };

  const emoji = text(description, tags);

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Accent glow
  const glow = ctx.createRadialGradient(width * 0.7, height * 0.3, 40, width * 0.7, height * 0.3, 240);
  glow.addColorStop(0, 'rgba(99,102,241,0.35)');
  glow.addColorStop(1, 'rgba(168,85,247,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(width * 0.7, height * 0.3, 240, 0, Math.PI * 2);
  ctx.fill();

  // Title strip
  ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
  ctx.fillRect(0, height - 64, width, 64);
  ctx.fillStyle = '#e5e7eb';
  ctx.font = 'bold 28px system-ui, -apple-system, Segoe UI, Roboto';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, 24, height - 32);

  // Center emoji
  ctx.font = '128px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, width / 2, height / 2);

  return canvas.toDataURL('image/png');
}

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovering) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === PROJECTS_DATA.length - 1 ? 0 : prevIndex + 1
          ),
        3000
      );
    }

    return () => {
      resetTimeout();
    };
  }, [currentIndex, isHovering]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <SectionWrapper id="projects" title="Latest Projects">
      <div 
        className="relative max-w-3xl mx-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform ease-in-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {PROJECTS_DATA.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full p-1"
              >
                <div
                  className="bg-slate-800 rounded-lg overflow-hidden group border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 flex flex-col md:flex-row items-stretch md:h-[300px]"
                >
                  <div className="md:w-1/2 overflow-hidden h-44 md:h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const ph = createPlaceholder(project.title, project.description, project.tags);
                        if (ph) {
                          e.currentTarget.src = ph;
                        }
                        e.currentTarget.referrerPolicy = 'no-referrer';
                      }}
                    />
                  </div>
                  <div className="md:w-1/2 p-3 flex flex-col md:h-full">
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-3 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 mt-auto">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-slate-300 hover:text-indigo-400 font-medium transition-colors"
                        >
                          <GithubIcon className="w-5 h-5 mr-2" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {PROJECTS_DATA.map((_, slideIndex) => (
            <button
              key={slideIndex}
              aria-label={`Go to slide ${slideIndex + 1}`}
              onClick={() => goToSlide(slideIndex)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex ? 'w-6 bg-indigo-500' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;