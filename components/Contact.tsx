import React from 'react';
import SectionWrapper from './SectionWrapper';
import { GithubIcon, LinkedinIcon, MailIcon, LocationIcon } from './icons/Icons';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const contactInfo = [
    { icon: <MailIcon className="w-6 h-6 text-indigo-400" />, text: 'jainendra@iitk.ac.in', href: SOCIAL_LINKS.email },
    { icon: <LinkedinIcon className="w-6 h-6 text-indigo-400" />, text: 'linkedin.com/in/codewithjainendra', href: SOCIAL_LINKS.linkedin },
    { icon: <LocationIcon className="w-6 h-6 text-indigo-400" />, text: 'Kanpur, Uttar Pradesh, India' },
  ];

  // Using FormSubmit.co free service to send messages directly to your email.
  // First submission will trigger a one-time verification email to your inbox.

  return (
    <SectionWrapper id="contact" title="Get In Touch">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-slate-400 mb-12">
          I'm currently available for freelance work and open to discussing new projects. Whether you have a question or just want to say hi, feel free to reach out!
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        <div className="md:w-1/3 space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-slate-800 p-3 rounded-full border border-slate-700">{item.icon}</div>
                <div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-400 transition-colors">{item.text}</a>
                  ) : (
                    <p className="text-slate-300">{item.text}</p>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="md:w-2/3">
            <form
              action="https://formsubmit.co/shivamraaj1@protonmail.com"
              method="POST"
              className="space-y-6"
            >
                {/* FormSubmit settings */}
                <input type="hidden" name="_subject" value="New portfolio contact message" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="http://localhost:3000/#contact?status=sent" />
                {/* Honeypot spam trap */}
                <input type="text" name="_honey" style={{ display: 'none' }} aria-hidden="true" />

                <div className="flex flex-col sm:flex-row gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                ></textarea>
                <div className="text-center md:text-left">
                    <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors transform hover:scale-105 shadow-lg shadow-indigo-500/30">
                        Send Message
                    </button>
                </div>
            </form>
            {/* Simple client-side hint when redirected back */}
            {typeof window !== 'undefined' && window.location.hash.includes('status=sent') && (
              <p className="mt-4 text-green-400">Thanks! Your message was sent successfully.</p>
            )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;