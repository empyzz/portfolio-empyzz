import bornToImage from '@/assets/born_to.jpg'
import { AtmosphericBackground } from '@/components/effects/AtmosphericBackground'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { ArrowIcon, DownloadIcon } from '@/components/ui/portfolio-icons'
import { profile } from '@/content/profile'

export function ContactSection() {
  return (
    <section
      className="contact-section atmospheric-host"
      id="contact"
      aria-labelledby="contact-title"
    >
      <AtmosphericBackground />

      <div className="content-section contact-inner">
        <div className="section-heading light-heading">
          <div>
            <span className="section-number">05</span>
            <p className="section-kicker">Open channel</p>
          </div>

          <div>
            <h2 id="contact-title">
              Let's <em>build something.</em>
            </h2>
            <p>
              Open to junior backend and software engineering opportunities in Brazil or remote.
            </p>

            <div className="contact-actions">
              <a className="action action-primary" href={`mailto:${profile.email}`}>
                Email
                <ArrowIcon />
              </a>
              <a
                className="action action-secondary"
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé
                <DownloadIcon />
              </a>
            </div>

            <div className="contact-links">
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
              <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <figure className="contact-artifact">
          <div className="artifact-header">
            <span>Personal system note</span>
            <span>01 / 2026</span>
          </div>
          <img
            src={bornToImage}
            width="1024"
            height="576"
            loading="lazy"
            alt="born to asm"
          />
          <figcaption>yeah</figcaption>
        </figure>
      </div>
    </section>
  )
}
