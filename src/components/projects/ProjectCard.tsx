import type { Project } from '@/types/portfolio'
import { CodeIcon, PlusIcon } from '@/components/ui/portfolio-icons'

const statusLabels: Record<Project['status'], string> = {
  production: 'Production',
  prototype: 'Prototype',
  academic: 'Academic',
  'proof-of-concept': 'Proof of concept',
  'in-development': 'In development',
  archived: 'Archived',
}

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '#';
  return url.startsWith('http://') || url.startsWith('https://') 
    ? url 
    : `https://${url}`;
};

const renderGithubLink = (url?: string | null) => {
  if (!url || url.trim() === '') {
    return <span className="github private-repo">Private Repo</span>;
  }
  
  return (
    <a className="github" href={ensureAbsoluteUrl(url)} target="_blank" rel="noopener noreferrer">
      Github Repo
    </a>
  );
};

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" id={project.slug}>
      <div className="project-visual" aria-label={`Architecture flow for ${project.title}`} role="img">
        <div className="visual-topline">
          <span><CodeIcon /> System flow</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <ol>
          {project.architecture.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <span className="visual-signal">signal / {project.slug}</span>
      </div>

      <div className="project-content">
        <div className="project-meta">
          <span>{project.eyebrow} · {renderGithubLink(project.github)}
          </span>
          <span className={`status status-${project.status}`}>{statusLabels[project.status]}</span>
        </div>
        <h3>{project.title}</h3>

        <dl className="project-summary">
          <div><dt>Problem</dt><dd>{project.problem}</dd></div>
          <div><dt>Solution</dt><dd>{project.solution}</dd></div>
          <div><dt>My role</dt><dd>{project.role}</dd></div>
        </dl>

        <ul className="tech-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>

        <details className="case-study">
          <summary>Engineering notes <PlusIcon /></summary>
          <div className="case-study-grid">
            <section aria-labelledby={`${project.slug}-decisions`}>
              <h4 id={`${project.slug}-decisions`}>Key decisions</h4>
              <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section aria-labelledby={`${project.slug}-validation`}>
              <h4 id={`${project.slug}-validation`}>Validation status</h4>
              <p>{project.validation}</p>
              <h4>Known limitations</h4>
              <ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section aria-labelledby={`${project.slug}-next`}>
              <h4 id={`${project.slug}-next`}>Next steps</h4>
              <ul>{project.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </div>
        </details>
      </div>
    </article>
  )
}
