import { lazy, Suspense } from 'react'
import App from './App'

const RoadmapPage = lazy(() => import('./pages/RoadmapPage'))

export default function SiteRouter() {
  const isRoadmap = window.location.pathname.replace(/\/$/, '') === '/roadmap'
  return (
    <Suspense fallback={<p style={{ padding: 32 }}>Loading roadmap…</p>}>
      {isRoadmap ? <RoadmapPage /> : <App />}
    </Suspense>
  )
}
