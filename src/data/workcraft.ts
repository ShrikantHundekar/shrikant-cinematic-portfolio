export interface WorkCraftSlide {
  number: string
  title: string
  kicker: string
  description: string
  technologies: string[]
  github: string
  demo: string
  accent: string
  glow: string
  badge?: string
  highlights?: string[]
}

export const workCraft: WorkCraftSlide[] = [
  {
    number: '01',
    title: 'AI Career Matching Platform',
    kicker: 'FastAPI + Gemini AI + React',
    description:
      'An AI-powered job intelligence platform that connects job seekers with matching roles using scoring algorithms and AI embeddings. Features automated resume parsing with Google Gemini API & PyMuPDF, role-based access control, and a recruiter Kanban board.',
    technologies: ['Python', 'FastAPI', 'React.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Gemini API'],
    github: 'https://github.com/ShrikantHundekar',
    demo: '#contact',
    accent: '#38f8d4',
    glow: 'rgba(56,248,212,0.65)',
    badge: 'Gemini AI Powered',
    highlights: ['Automated PyMuPDF + Gemini Parsing', 'JWT Role-Based Auth', 'Recruiter Kanban View'],
  },
  {
    number: '02',
    title: 'Task Management System',
    kicker: 'Full-stack Django + React.js',
    description:
      'A full-stack task management application engineered with Django and Django REST Framework on the backend and React.js on the frontend. Features secure user authentication, user-specific task isolation, real-time status tracking, and dynamic task filtering.',
    technologies: ['Python', 'Django', 'Django REST Framework', 'React.js', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/ShrikantHundekar',
    demo: '#contact',
    accent: '#4d7cff',
    glow: 'rgba(77,124,255,0.65)',
    badge: 'Modular REST API',
    highlights: ['Modular DRF Endpoints', 'User Authentication Flow', 'Real-Time Status Workflows'],
  },
  {
    number: '03',
    title: 'Travel Website Frontend',
    kicker: 'Production Internship Project',
    description:
      'Engineered responsive web interfaces and modular UI components for a commercial travel platform during internship at Devine Tech Solutions. Built reusable components, structured layouts, and fluid navigation sections for exceptional cross-device UX.',
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design', 'Git'],
    github: 'https://github.com/ShrikantHundekar',
    demo: '#contact',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.65)',
    badge: 'Devine Tech Solutions',
    highlights: ['Reusable Component Hierarchy', 'Mobile-First Responsive UX', 'Interactive Content Views'],
  },
  {
    number: '04',
    title: 'Data Analytics & ML Insights',
    kicker: 'Python Scientific Computing',
    description:
      'Comprehensive data preprocessing, exploratory statistical analysis, and machine learning model exploration using NumPy, Pandas, Scikit-learn, and Matplotlib. Implemented automated feature pipelines and foundational neural network concepts.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'SQL'],
    github: 'https://github.com/ShrikantHundekar',
    demo: '#contact',
    accent: '#38bdf8',
    glow: 'rgba(56,189,248,0.65)',
    badge: 'Data Science & ML',
    highlights: ['Pandas / NumPy Data Cleaning', 'Exploratory Statistical Modeling', 'Predictive Analysis'],
  },
  {
    number: '05',
    title: 'Gen-AI & Cloud Architecture',
    kicker: 'LLMs & Agentic Systems',
    description:
      'Exploring and building with Large Language Models, prompt engineering, LangChain pipelines, and Agentic AI workflows. Developing autonomous agents that integrate with APIs, databases, and structured data extraction.',
    technologies: ['LLMs', 'Prompt Engineering', 'LangChain', 'FastAPI', 'Redis', 'Gemini API'],
    github: 'https://github.com/ShrikantHundekar',
    demo: '#contact',
    accent: '#ec4899',
    glow: 'rgba(236,72,153,0.65)',
    badge: 'Next-Gen AI Systems',
    highlights: ['Agentic Task Automation', 'Semantic Search & Embeddings', 'API Orchestration'],
  },
]
