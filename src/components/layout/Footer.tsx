import { profile } from '@/content/profile'

export function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 {profile.shortName}</span>
      <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  )
}
