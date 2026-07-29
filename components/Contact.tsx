import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { GithubIcon, LinkedinIcon, MailIcon, LocationIcon } from './icons/Icons';
import { SOCIAL_LINKS } from '../constants';

// Contact messages are delivered via FormSubmit.co. We POST to its AJAX
// endpoint (rather than a normal form submit) so the visitor stays on the
// page: the previous implementation redirected to a hardcoded
// `_next=http://localhost:3000/...`, which broke the form on the deployed
// site (every real visitor was bounced to their own localhost). The AJAX
// flow is domain-independent and lets us show inline success/error state.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/shivamraaj1@protonmail.com';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const contactInfo = [
    { icon: <MailIcon className="w-6 h-6 text-indigo-400" />, text: 'jainendra@iitk.ac.in', href: SOCIAL_LINKS.email },
    { icon: <LinkedinIcon className="w-6 h-6 text-indigo-400" />, text: 'linkedin.com/in/codewithjainendra', href: SOCIAL_LINKS.linkedin },
    { icon: <LocationIcon className="w-6 h-6 text-indigo-400" />, text: 'Kanpur, Uttar Pradesh, India' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: if a bot filled the hidden field, silently pretend success.
    if (((data.get('_honey') as string) || '').trim()) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: 'New portfolio contact message',
          _template: 'table',
        }),
      });
      const json = await res.json().catch(() => ({} as Record<string, unknown>));
      if (res.ok && (json.success === true || json.success === 'true')) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg((json.message as string) || 'Something went wrong. Please email me directly instead.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection or email me directly.');
    }
  };

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
            {status === 'success' ? (
              <div
                role="status"
                className="h-full flex flex-col items-center justify-center text-center bg-slate-800/50 border border-slate-700 rounded-md p-8"
              >
                <p className="text-green-400 text-lg font-semibold mb-2">Thanks! Your message was sent successfully.</p>
                <p className="text-slate-400">I'll get back to you as soon as I can.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot spam trap */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />

                <div className="flex flex-col sm:flex-row gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      aria-label="Your Name"
                      className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      aria-label="Your Email"
                      className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  aria-label="Your Message"
                  className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                ></textarea>
                {status === 'error' && (
                  <p role="alert" className="text-red-400">{errorMsg}</p>
                )}
                <div className="text-center md:text-left">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors transform hover:scale-105 shadow-lg shadow-indigo-500/30 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {status === 'submitting' ? 'Sending…' : 'Send Message'}
                    </button>
                </div>
              </form>
            )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
