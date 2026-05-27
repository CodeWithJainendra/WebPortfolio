import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SERVICES_DATA, BUSINESS_INFO } from '../constants';

const Services: React.FC = () => {
  return (
    <SectionWrapper id="services" title="Services & Pricing">
      <div className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        <p>
          Professional software development services offered by{' '}
          <span className="font-semibold text-indigo-400">{BUSINESS_INFO.name}</span>. All prices are
          indicative starting prices in Indian Rupees (INR) and may vary based on project scope and
          requirements. Contact us for a detailed quote.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.name}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col hover:border-indigo-500 transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
            <p className="text-slate-400 text-sm flex-grow mb-4">{service.description}</p>
            <div className="mt-auto">
              <span className="text-2xl font-bold text-indigo-400">{service.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-slate-400">
        <p>
          To order a service, please reach out via the{' '}
          <a href="#contact" className="text-indigo-400 hover:underline">Contact</a> section or email{' '}
          <a href={`mailto:${BUSINESS_INFO.email}`} className="text-indigo-400 hover:underline">
            {BUSINESS_INFO.email}
          </a>
          . Payments are accepted in INR.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Services;
