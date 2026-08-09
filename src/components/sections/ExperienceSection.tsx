import { experience } from '@/content/experience'

export function ExperienceSection() {
  return (
    <section className="content-section experience-section" id="experience" aria-labelledby="experience-title">
      <div className="section-heading">
        <div><span className="section-number">03</span><p className="section-kicker">Experience & education</p></div>
        <div>
          <h2 id="experience-title">Learning software through <em>operation and implementation.</em></h2>
        </div>
      </div>
      <div className="experience-list">
        {experience.map((item) => (
          <article key={`${item.role}-${item.organization}`}>
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <p className="experience-organization">{item.organization}</p>
            </div>
            <div>
              <ul>{item.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul>
              <p className="experience-context">{item.context}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
