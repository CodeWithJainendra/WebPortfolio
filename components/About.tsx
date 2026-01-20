import React from 'react';
import SectionWrapper from './SectionWrapper';
import CodingGhibli from './CodingGhibli';

const About: React.FC = () => {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="md:w-1/3 flex-shrink-0">
          <div className="relative w-64 h-64 md:w-full md:h-auto max-w-sm mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur opacity-50"></div>
            <CodingGhibli className="relative" width={320} height={320} />
          </div>
        </div>
        <div className="md:w-2/3 text-center md:text-left text-lg text-slate-400 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-2">Software Engineer & Full Stack Developer</h3>
          <p>
            I'm a technology enthusiast with a robust background in software development and cybersecurity. My journey has been fueled by a relentless curiosity and a desire to build innovative, secure, and user-friendly solutions.
          </p>
          <p>
            With hands-on experience in IoT and application development, I thrive on turning complex problems into elegant applications. I bring a unique perspective that emphasizes resilient and high-performance software, always with a collaborative, team-player mindset.
          </p>
        </div>
      </div>
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Languages</h3>
        <div className="flex justify-center gap-8 md:gap-12">
          <div className="text-lg bg-slate-800/50 p-4 rounded-lg border border-slate-700 min-w-[120px]">
            <p className="font-semibold text-slate-300">English</p>
            <p className="text-slate-400 text-sm">Bilingual</p>
          </div>
          <div className="text-lg bg-slate-800/50 p-4 rounded-lg border border-slate-700 min-w-[120px]">
            <p className="font-semibold text-slate-300">Hindi</p>
            <p className="text-slate-400 text-sm">Fluent</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;