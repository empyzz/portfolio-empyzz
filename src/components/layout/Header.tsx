import { useEffect, useState } from 'react'
import brandIcon from '@/assets/nfts.jpg'
import { DownloadIcon } from '@/components/ui/portfolio-icons'
import { profile } from '@/content/profile'

const navItems = [
  ['projects', 'Projects'],
  ['capabilities', 'Skills'],
  ['experience', 'Experience'],
  ['about', 'About'],
  ['contact', 'Contact'],
] as const

export function Header() {
  const [activeSection, setActiveSection] = useState('projects')

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const header = document.querySelector<HTMLElement>('.site-header')
    let animationFrame = 0

    const updateActiveSection = () => {
      animationFrame = 0

      const scrollBottom = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // A short final section may never cross the viewport marker.
      // Reaching the bottom therefore activates the last navigation item explicitly.
      if (scrollBottom >= documentHeight - 2) {
        setActiveSection(sections.at(-1)?.id ?? 'projects')
        return
      }

      const headerHeight = header?.offsetHeight ?? 0
      const viewportMarker = window.scrollY + headerHeight + window.innerHeight * 0.28
      let currentSection: HTMLElement | undefined

      for (const section of sections) {
        if (section.offsetTop <= viewportMarker) currentSection = section
        else break
      }

      if (currentSection) setActiveSection(currentSection.id)
      else setActiveSection('')
    }

    const scheduleUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* 2. Update the brand link to use the handler */}
        <a 
          className="brand" 
          href="#top" 
          onClick={(e) => handleNavClick(e, 'top')}
          aria-label={`${profile.shortName}, home`}
        >
          <img className="brand-icon" src={brandIcon} alt="" />
        </a>

        <a
          className="resume-link"
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé <DownloadIcon />
        </a>

        <nav aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)} // 3. Update nav links to use the handler
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}