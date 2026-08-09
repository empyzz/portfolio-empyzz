import './App.css'
import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'

function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) {
      const root = document.documentElement
      const previousBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      document.getElementById(id)?.scrollIntoView()
      window.requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior })
    }
  }, [])

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
