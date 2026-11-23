import type { PortfolioData } from '@/types/portfolio'

const skills: PortfolioData['skills'] = [
  // Orbit 1 - Core Backend & APIs
  { name: 'Python', group: 'backend', orbit: 1, accent: 'cyan' },
  { name: 'Django', group: 'backend', orbit: 1, accent: 'blue' },
  { name: 'FastAPI', group: 'backend', orbit: 1, accent: 'violet' },
  { name: 'DRF', group: 'backend', orbit: 1, accent: 'cyan' },
  { name: 'REST APIs', group: 'backend', orbit: 1, accent: 'blue' },
  { name: 'PostgreSQL', group: 'data', orbit: 1, accent: 'violet' },

  // Orbit 2 - Frontend & Interface
  { name: 'React.js', group: 'frontend', orbit: 2, accent: 'cyan' },
  { name: 'TypeScript', group: 'frontend', orbit: 2, accent: 'blue' },
  { name: 'JavaScript', group: 'frontend', orbit: 2, accent: 'violet' },
  { name: 'Tailwind CSS', group: 'interface', orbit: 2, accent: 'cyan' },
  { name: 'HTML5 & CSS3', group: 'interface', orbit: 2, accent: 'blue' },
  { name: 'Gemini API', group: 'backend', orbit: 2, accent: 'violet' },

  // Orbit 3 - Data, AI & Delivery
  { name: 'MySQL', group: 'data', orbit: 3, accent: 'cyan' },
  { name: 'Redis', group: 'data', orbit: 3, accent: 'blue' },
  { name: 'Git & GitHub', group: 'delivery', orbit: 3, accent: 'cyan' },
  { name: 'Pandas & NumPy', group: 'data', orbit: 3, accent: 'violet' },
  { name: 'LangChain', group: 'backend', orbit: 3, accent: 'blue' },
  { name: 'Prompt Eng.', group: 'backend', orbit: 3, accent: 'cyan' },
]

export const portfolio: PortfolioData = {
  person: {
    name: 'Shrikant Hundekar',
    firstName: 'Shrikant',
    lastName: 'Hundekar',
    role: 'Python Developer',
    secondaryRole: 'Full-Stack & AI Builder',
    location: 'Pune, India',
    email: 'shrikant.hundekar29@gmail.com',
    phone: '+91 9423381155',
    availability: 'Open to Software Developer Roles',
    summary:
      'Python Developer fresher with a solid foundation in Python, OOP, Django, FastAPI, SQL, and REST APIs. Experienced in full-stack web applications with React.js, automated resume parsing with Google Gemini API, and role-based authentication. Passionate about solving complex engineering challenges and shipping clean, scalable software.',
  },
  education: {
    degree: 'B.E. Information Technology',
    year: '2022 – 2026',
    cgpa: '7.61',
  },
  skills,
  projects: [
    {
      number: '01',
      title: 'AI Career Matching Platform',
      kicker: 'FastAPI + Gemini API + React',
      description:
        'An intelligent career matching platform designed to connect job seekers with ideal opportunities using AI embeddings, automated resume parsing, and scoring algorithms.',
      outcome:
        'Automated resume parsing with PyMuPDF & Google Gemini API, implemented JWT role-based access control, and built a recruiter dashboard with Kanban-style applicant tracking.',
      technologies: ['Python', 'FastAPI', 'React.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Gemini API'],
      github: 'https://github.com/ShrikantHundekar',
      demo: '#contact',
      accent: 'cyan',
      editable: false,
    },
    {
      number: '02',
      title: 'Task Management System',
      kicker: 'Django + DRF + React full-stack',
      description:
        'A comprehensive full-stack task management application featuring user authentication, user-specific task management, and responsive status workflows.',
      outcome:
        'Engineered modular REST APIs via Django REST Framework, implemented real-time task filtering, status workflows, and seamless frontend-backend communication.',
      technologies: ['Python', 'Django', 'DRF', 'React.js', 'SQL', 'Tailwind CSS'],
      github: 'https://github.com/ShrikantHundekar',
      demo: '#contact',
      accent: 'blue',
      editable: false,
    },
    {
      number: '03',
      title: 'Travel Website Frontend',
      kicker: 'Responsive Production Web Platform',
      description:
        'Engineered responsive web interfaces and modular UI components for a commercial travel portal during internship at Devine Tech Solutions, Pune.',
      outcome:
        'Built reusable component hierarchy, dynamic content pages, fluid navigation, and responsive cross-device layouts with high performance and maintainability.',
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
      github: 'https://github.com/ShrikantHundekar',
      demo: '#contact',
      accent: 'violet',
      editable: false,
    },
    {
      number: '04',
      title: 'Data Analytics & ML Insights',
      kicker: 'Data Preprocessing & Predictive Modeling',
      description:
        'Applied data science methodologies, exploratory data analysis, and predictive modeling using Python scientific stack and machine learning techniques.',
      outcome:
        'Executed data preprocessing and feature engineering with Pandas and NumPy, integrated prompt engineering workflows, and developed interactive dashboards.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
      github: 'https://github.com/ShrikantHundekar',
      demo: '#contact',
      accent: 'cyan',
      editable: false,
    },
  ],
  experience: [
    {
      period: 'Dec 2024 — Jan 2025',
      title: 'Frontend Intern',
      context: 'Devine Tech Solutions, Pune, India',
      description:
        'Developed responsive web interfaces using HTML, CSS, JavaScript, and React.js for a travel website. Built reusable UI components, structured content pages, and collaborated with developers for backend integration.',
      tags: ['React.js', 'JavaScript', 'HTML5/CSS3', 'UI Components', 'Responsive Web'],
    },
    {
      period: '2022 — 2026',
      title: 'B.E. Information Technology',
      context: 'Trinity College of Engineering and Research, Pune',
      description:
        'Pursuing Bachelor of Engineering in IT with current CGPA 7.61. Coursework in Data Structures, Database Management, OOP, Web Systems, and Operating Systems.',
      tags: ['B.E. IT', 'CGPA: 7.61', 'Software Engineering', 'Databases', 'Algorithms'],
    },
    {
      period: '2020 — 2022',
      title: 'Higher Secondary Certificate (HSC)',
      context: 'B.H. Chate Junior College, Pune',
      description:
        'Completed Higher Secondary Certificate with 86.60% distinction, focusing on Mathematics, Physics, and Computer Science fundamentals.',
      tags: ['HSC: 86.60%', 'Mathematics', 'Computer Science'],
    },
    {
      period: 'Active',
      title: 'Certifications & Continuous Learning',
      context: 'Naresh IT & JLPT',
      description:
        'Certified in Python Programming from Naresh IT. Certified in Japanese-Language Proficiency Test (JLPT) N5 Level. Actively building with LLMs and Agentic AI.',
      tags: ['Python Certified (Naresh IT)', 'JLPT N5 Japanese', 'LLM / Gemini API'],
    },
  ],
  achievements: [
    { label: 'CGPA', value: 7.61, decimals: 2, note: 'B.E. Information Technology' },
    { label: 'HSC Score', value: 86.6, decimals: 1, suffix: '%', note: 'Higher Secondary Distinction' },
    { label: 'Core Stack', value: 16, suffix: '+', note: 'Languages, Frameworks & DBs' },
    { label: 'Certifications', value: 2, note: 'Python (Naresh IT) & JLPT N5' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/ShrikantHundekar', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/shrikant-hundekar', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:shrikant.hundekar29@gmail.com', icon: 'mail' },
  ],
}
