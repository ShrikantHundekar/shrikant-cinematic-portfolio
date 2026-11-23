export type SkillGroup = 'backend' | 'frontend' | 'interface' | 'data' | 'delivery'

export interface Skill {
  name: string
  group: SkillGroup
  orbit: number
  accent: 'cyan' | 'blue' | 'violet'
}

export interface Project {
  number: string
  title: string
  kicker: string
  description: string
  outcome: string
  technologies: string[]
  github: string
  demo: string
  accent: 'cyan' | 'blue' | 'violet'
  editable: boolean
}

export interface ExperienceItem {
  period: string
  title: string
  context: string
  description: string
  tags: string[]
}

export interface Achievement {
  label: string
  value: number
  suffix?: string
  decimals?: number
  note: string
  editable?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail'
}

export interface PortfolioData {
  person: {
    name: string
    firstName: string
    lastName: string
    role: string
    secondaryRole: string
    location: string
    email: string
    phone: string
    availability: string
    summary: string
  }
  education: {
    degree: string
    year: string
    cgpa: string
  }
  skills: Skill[]
  projects: Project[]
  experience: ExperienceItem[]
  achievements: Achievement[]
  socials: SocialLink[]
}
