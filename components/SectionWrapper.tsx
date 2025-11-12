import React, { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 px-6 md:px-12 lg:px-24 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-indigo-400 relative pb-4">
          {title}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-indigo-500 rounded-full"></span>
        </h2>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;