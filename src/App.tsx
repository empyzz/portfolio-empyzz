import { profile } from './content/profile'
import { selectedProjects } from './content/selectedProjects'
import metalheart from './assets/metalcore1.webp'
import bts from './assets/bts.webp'
import { Sigil } from './components/Sigil'
import './simple.css'

export default function App() {
  return (
    <div className="homepage">
      <a className="skip-link" href="#about">Skip to content</a>
      <header id="top">
        <div className="art-panel" aria-hidden="true">
          <div className="art-register"><span>visual field / 001</span><span>archive edition · 09.2026</span></div>
          <div className="banner-field">
            <img src={metalheart} width="1200" height="960" alt="" decoding="async" />
            <svg className="field-lines" viewBox="0 0 1200 340" preserveAspectRatio="none">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeDasharray="2 7" d="M0 240H390L660 70H1200M160 0v340M990 0v340" />
                <circle cx="390" cy="240" r="6" /><circle cx="660" cy="70" r="6" />
                <path d="M22 48V22h26M1152 22h26v26M22 292v26h26M1152 318h26v-26" />
              </g>
            </svg>
          </div>
          <div className="art-baseline"><span>systems / experiments / unfinished things</span><span className="archive-meter"><i /><i /><i /><i /><i /><i /><i /><i /></span></div>
        </div>
        <div className="intro-copy">
          <p className="site-label"><span>2026</span></p>
          <div className="wordmark">
            <Sigil />
            <div><p className="wordmark-label">software/hardware</p><h1>Rafael Gonçalves da Silva</h1></div>
          </div>
          <p className="role">software engineering / embedded / backend / systems</p>
          <nav aria-label="Main navigation">
            <a href="#about">about</a>
            <a href="#projects">projects</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">github ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          </nav>
        </div>
      </header>
      <main>
        <section id="about" aria-labelledby="about-title">
          <div className="section-inner">
            <div className="chapter-heading">
              <div><p className="chapter-label">Chapter one - Context</p><h2 id="about-title">About me</h2></div>
              <Sigil className="chapter-sigil" />
              <span className="chapter-index" aria-hidden="true">I / »</span>
            </div>
            <p>I build software, tinker with embedded systems, and bring old code back to life. Usually somewhere between C/C++, Python, Android, and Linux.</p>
            <p>I’m finishing my Software Engineering degree at UniSenai in December 2026. Based in São José dos Pinhais, Brazil. I work with backend systems, automation, and IoT—and speak Portuguese and English.</p>
            <p className="interest-label">currently interested in:</p>
            <ul className="interests">
              <li>embedded systems</li><li>systems programming</li>
              <li>backend development</li><li>reverse engineering</li>
            </ul>
            <div className="personal-links">
              <a href={`mailto:${profile.email}`}>email me ↗</a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">résumé <span className="meta">[PDF · PT-BR]</span></a>
            </div>
          </div>
        </section>
        <section id="projects" aria-labelledby="projects-title">
          <div className="section-inner">
            <div className="chapter-heading">
              <div><p className="chapter-label">Chapter two — systems</p><h2 id="projects-title">Selected projects</h2></div>
              <span className="chapter-index" aria-hidden="true">II / »</span>
            </div>
            <ol className="project-list">
              {selectedProjects.map((project, index) => (
                <li key={project.name}>
                  <article>
                    <div className="project-title">
                      <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{project.source ? <a href={project.source}>{project.name}</a> : project.name}</h3>
                    </div>
                    <p>{project.description}</p>
                    <p className="project-stack">{project.stack}</p>
                    {project.status && <p className="project-status">{project.status}</p>}
                    {project.source && <a className="source-link" href={project.source}>source code ↗</a>}
                  </article>
                </li>
              ))}
            </ol>
          </div>
          <figure className="art-panel aside-art">
            <div className="art-register"><span>visual field / 002</span><span>true</span></div>
            <img src={bts} width="1024" height="576" alt="Two cats at computers: born to write asm and C, forced to shit out web apps." loading="lazy" decoding="async" />
            <figcaption className="art-baseline">for real</figcaption>
          </figure>
          <div className="section-inner">
            <a className="more-link" href={profile.github}>more things on github →</a>
          </div>
        </section>
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Rafael Gonçalves</span>
        <a href="#top">↑ top</a>
      </footer>
    </div>
  )
}
