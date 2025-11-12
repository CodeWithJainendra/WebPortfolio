import React from 'react';
import SectionWrapper from './SectionWrapper';
import { CERTIFICATIONS_DATA } from '../constants';
import { CertificateIcon } from './icons/Icons';

const Certifications: React.FC = () => {
  return (
    <SectionWrapper id="certifications" title="Certifications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS_DATA.map((cert, index) => (
          <div key={index} className="flex items-center bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors duration-300">
            <div className="flex-shrink-0 mr-4">
              <CertificateIcon className="w-10 h-10 text-indigo-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{cert.name}</h4>
              <p className="text-sm text-slate-400">Date: {cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Certifications;