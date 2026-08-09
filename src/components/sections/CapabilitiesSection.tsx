import { capabilities } from '@/content/capabilities'

export function CapabilitiesSection() {
  return (
    <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="content-section">
        <div className="section-heading light-heading">
          <div><span className="section-number">02</span><p className="section-kicker">Engineering capabilities</p></div>
          <div>
            <h2 id="capabilities-title">Capabilities organized by <em>what they enable.</em></h2>
            <p>No percentage bars. These are working tools connected to the project evidence above.</p>
          </div>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article key={capability.id}>
              <span className="capability-id">{capability.id} / function</span>
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
              <ul>{capability.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              <small>{capability.evidence}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
