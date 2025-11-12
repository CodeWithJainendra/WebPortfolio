import React, { useEffect, useRef, useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { SKILLS_DATA } from '../constants';
import { SkillItem } from '../types';
import useOnScreen from '../hooks/useOnScreen';

const SkillBar: React.FC<{ skill: SkillItem }> = ({ skill }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);
    const [width, setWidth] = useState('0%');
  
    useEffect(() => {
      if (isVisible) {
        // Set a timeout to delay the animation start slightly for a better effect
        const timer = setTimeout(() => {
          setWidth(`${skill.percentage}%`);
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [isVisible, skill.percentage]);
  
    return (
      <div ref={ref} className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-slate-300">{skill.name}</span>
          <span className="text-sm font-medium text-indigo-400">{skill.percentage}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div 
            className="bg-indigo-500 h-2.5 rounded-full" 
            style={{ width: width, transition: 'width 1.5s ease-in-out' }}
          ></div>
        </div>
      </div>
    );
  };

const Skills: React.FC = () => {
  return (
    <SectionWrapper id="skills" title="My Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {SKILLS_DATA.map((category) => (
          <div key={category.category}>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center md:text-left">{category.category}</h3>
            <div>
              {category.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;