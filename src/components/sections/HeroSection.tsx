import { profile } from '@/content/profile'
import { ArrowIcon, DownloadIcon } from '@/components/ui/portfolio-icons'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { AtmosphericBackground } from '@/components/effects/AtmosphericBackground'

export function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <AtmosphericBackground />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="availability"><span /> Available for junior software engineering roles</p>
          <p className="hero-name">{profile.name}</p>
          <h1 id="hero-title">
             Software Engineer    
            <em> backend systems,</em> 
            <em> automation,</em> 
            <em> applied AI</em>
          </h1>
          <p className="hero-description">
            I design APIs, integrations, and intelligent workflows for real operational problems—connecting reliable software with data, local AI, and physical systems.
          </p>
          <div className="hero-actions">
            <a className="action action-primary" href="#projects">View selected systems <ArrowIcon /></a>
            <a className="action action-secondary" href={profile.resume} target="_blank" rel="noopener noreferrer">Open résumé <DownloadIcon /></a>
          </div>
          <div className="hero-socials" aria-label="Professional profiles">
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>Scroll to inspect systems</span><i /></div>
    </section>
  )
}
