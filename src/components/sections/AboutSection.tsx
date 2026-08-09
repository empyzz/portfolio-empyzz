import { profile } from '@/content/profile'

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-light" aria-hidden="true"><span>✦</span></div>
      <div className="content-section about-inner">
        <div><span className="section-number">04</span><p className="section-kicker">Beyond the interface</p></div>
        <div className="about-copy">
          <h2 id="about-title">I like understanding the <em>whole machine.</em></h2>
          <p className="about-lead">I’m an eighth-semester Software Engineering student interested in the point where backend services, data, and physical systems meet.</p>
          <p>Support work taught me that software is only useful when people can depend on it. I carry that into development through explicit error paths, useful logs, maintainable boundaries, and honest documentation.</p>
          <p>I’m currently looking for a junior software engineering or backend role where I can contribute, deepen my system-design judgment, and learn from production constraints.</p>
          <dl className="about-facts">
            <div><dt>Location</dt><dd>{profile.location}</dd></div>
            <div><dt>Education</dt><dd>Software Engineering · graduating Dec 2026</dd></div>
            <div><dt>Interests</dt><dd>Computer architecture, Linux, connected systems, local AI</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
