import { portfolio } from '@/data/portfolio'

interface ProjectCardProps {
  index: number
  editable: boolean
}

export function ProjectCard({ index }: ProjectCardProps) {
  const project = portfolio.projects[index]
  return (
    <div className="project-card">
      <div className="project-visual">{/* Visual placeholder */}</div>
      <div className="project-card-copy">
        <div className="project-number">Project • {project.number}</div>
        <div className="project-kicker">{project.kicker}</div>
        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">
          {project.description}
        </p>
        <p className="project-outcome">{project.outcome}</p>
        <div className="project-tags">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github} className="project-tag">GitHub</a>
          <a href={project.demo} className="project-tag">Demo</a>
        </div>
      </div>
    </div>
  )
}