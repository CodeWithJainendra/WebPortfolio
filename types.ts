export interface SkillItem {
  name: string;
  percentage: number;
}

export interface ProjectItem {
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export interface ExperienceItem {
  date: string;
  title: string;
  institution: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  date: string;
}
