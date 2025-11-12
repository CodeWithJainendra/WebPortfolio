import { ProjectItem, SkillItem, ExperienceItem, CertificationItem } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const SKILLS_DATA: { category: string; skills: SkillItem[] }[] = [
  {
    category: 'Core Development',
    skills: [
      { name: 'IoT Development', percentage: 95 },
      { name: 'Application Development', percentage: 90 },
      { name: 'Java', percentage: 85 },
      { name: 'Flutter', percentage: 80 },
      { name: 'Embedded Systems', percentage: 75 },
    ]
  },
  {
    category: 'Specializations',
    skills: [
        { name: 'Cybersecurity', percentage: 90 },
        { name: 'AI & Machine Learning', percentage: 70 },
        { name: 'AR/VR Development', percentage: 65 },
    ]
  },
  {
    category: 'Infrastructure',
    skills: [
      { name: 'Server Development', percentage: 80 },
      { name: 'Database Management', percentage: 85 },
      { name: 'Cloud Server Management', percentage: 75 },
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
    {
        title: 'DLCPensioner (Ministry Project)',
        description: 'A comprehensive system developed for a government ministry to monitor and manage pensioner data, ensuring timely and accurate disbursements.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
        tags: ['Government', 'Data Management', 'Backend', 'Security'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'BreakerGuard (IoT Project)',
        description: 'An innovative IoT solution designed to enhance electrical safety. It monitors circuit breakers in real-time to prevent faults and protect lives.',
        image: 'https://images.unsplash.com/photo-1623304255307-531404364239?q=80&w=400&auto=format&fit=crop',
        tags: ['IoT', 'Hardware', 'Real-time', 'Safety', 'Firmware'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'Soil-Humidity Monitoring (IoT)',
        description: 'An IoT-based system for agriculture that allows for real-time control and monitoring of soil humidity sensors to optimize irrigation.',
        image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=400&auto=format&fit=crop',
        tags: ['IoT', 'Agriculture', 'Sensors', 'Real-time'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'Argonauts VR App',
        description: 'An immersive virtual reality application designed for child education, making learning interactive and engaging through VR technology.',
        image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=400&auto=format&fit=crop',
        tags: ['VR', 'Education', 'Unity', 'C#'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'DietaryGuide',
        description: 'A mobile application for health and fitness tracking, helping users monitor their diet, calorie intake, and exercise routines.',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=400&auto=format&fit=crop',
        tags: ['Mobile App', 'Health', 'Fitness', 'Flutter'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'IITK LOAD Monitoring App',
        description: 'An application developed for IIT Kanpur to monitor electricity load in real-time, helping to manage and optimize energy consumption on campus.',
        image: 'https://images.unsplash.com/photo-1487875961445-47a00398c267?q=80&w=400&auto=format&fit=crop',
        tags: ['Monitoring', 'Energy', 'Dashboard', 'Data Visualization'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'Pehchan Lo App',
        description: 'A mobile application inspired by m-Aadhaar, providing a secure and accessible digital identity solution for users.',
        image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=400&auto=format&fit=crop',
        tags: ['Digital ID', 'Mobile App', 'Security', 'Android'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'PDFHub',
        description: 'A versatile web tool for editing PDFs, allowing users to merge, split, compress, and perform various other functions on PDF documents.',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop',
        tags: ['Web Tool', 'PDF', 'File Manipulation', 'JavaScript'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'UPMRC Dummy App',
        description: 'A concept application replicating the functionality of the Delhi Metro app for the Uttar Pradesh Metro Rail Corporation (UPMRC).',
        image: 'https://images.unsplash.com/photo-1557008172-e67a2ba5e5b3?q=80&w=400&auto=format&fit=crop',
        tags: ['Concept', 'UI/UX', 'Mobile App', 'Transit'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'SHE SHOP',
        description: 'An e-commerce platform focused on providing a curated shopping experience for women, featuring a wide range of products.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
        tags: ['E-commerce', 'React', 'Node.js', 'Online Shopping'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
    {
        title: 'FoodSpotter',
        description: 'A food discovery application that helps users find and review local restaurants, cafes, and eateries based on their preferences.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop',
        tags: ['Food', 'Discovery', 'Mobile App', 'API Integration'],
        githubUrl: 'https://github.com/CodeWithJainendra',
    },
];


export const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        date: 'Oct 2024 - Present',
        title: 'Project Engineer',
        institution: 'IIT Kanpur, Kanpur, Uttar Pradesh',
        description: 'Designing and implementing innovative IoT and application solutions. Responsibilities include monitoring project progress, developing detailed work plans, managing server infrastructure, and ensuring application performance and security.',
    },
    {
        date: 'Oct 2024 - Present',
        title: 'Volunteer Project Engineer',
        institution: 'IIT Kanpur, Kanpur, Uttar Pradesh',
        description: 'Monitored and tracked project progress to support completion on time and within budget. Facilitated quality control inspections and collaborated with team members to define scope, timeline, and deliverables.',
    },
    {
        date: 'Jan 2021 - May 2024',
        title: 'Clifford Chance Cyber Security Job Simulation',
        institution: 'IIT Kanpur, Kanpur, Uttar Pradesh',
        description: 'Assisted various clients with legal issues relating to cyber breaches, responded to an ICO Dawn Raid, notified stakeholders about a data breach in accordance with GDPR, and formulated defensive strategies for a data centre.',
    },
    {
        date: 'Sep 2024 - Present',
        title: 'M-Tech in Computer Science and Engineering',
        institution: 'Central University of Haryana',
        description: 'Pursuing a masters degree with a focus on advanced computer science and engineering principles.',
    },
    {
        date: 'Completed Jul 2022',
        title: 'Bachelors of Technology in Information Technology',
        institution: 'Chhatrapati Shahuji Maharaj University',
        description: 'Graduated with a B-Tech degree, laying the foundation for a career in technology.',
    },
    {
        date: 'Completed May 2018',
        title: 'Intermediate in Computer Science',
        institution: 'Wendy High School',
        description: '',
    },
     {
        date: 'Completed Jul 2016',
        title: 'High School in Science',
        institution: 'Kendriya Vidyalaya IIT, Kanpur',
        description: '',
    }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
    { name: 'Goldman Sachs Software Engineering Completion Certificate', date: '07/01/22' },
    { name: 'JPMorgan Chase & Co. Cybersecurity Completion Certificate', date: '03/01/07' },
    { name: 'Software and Application Development of Startup- Breaker Guard', date: '09/01/24' },
    { name: 'Ethical Hacking Using Python', date: '05/01/18' },
    { name: 'Clifford Chance Cyber Security Completion Certificate', date: '03/01/07' }
];

export const SOCIAL_LINKS = {
    linkedin: 'https://www.linkedin.com/in/codewithjainendra/',
    github: 'https://github.com/CodeWithJainendra',
    email: 'mailto:jainendra@iitk.ac.in'
};