import { projects } from '@/content/projects'
import { profile } from '@/content/profile'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ExternalLink } from '@/components/ui/ExternalLink'

export function ProjectsSection() {
  return (
    <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <div><span className="section-number">01</span><p className="section-kicker">Selected systems</p></div>
        <div>
          <h2 id="projects-title">Engineering work,<br /><em>shown with context.</em></h2>
          <p>Each project explains the problem, my individual contribution, the technical boundary, and what has—or has not—been validated.</p>
        </div>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
      </div>

      <ExternalLink className="section-link" href={profile.github}>
        Explore source code and experiments on GitHub
      </ExternalLink>
    </section>
  )
}
