import React from 'react';
import SectionWrapper from './SectionWrapper';
import { EXPERIENCE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <SectionWrapper id="experience" title="Experience & Education">
      <div className="relative border-l-2 border-teal-700/50 ml-6 md:ml-0">
        {EXPERIENCE_DATA.map((item, index) => (
          <div key={index} className="mb-10 ml-10">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full -left-3 ring-8 ring-gray-900">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-teal-500 transition-colors duration-300">
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{item.date}</time>
                <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                <h4 className="text-md font-medium text-teal-400 mb-2">{item.institution}</h4>
                <p className="text-base font-normal text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
