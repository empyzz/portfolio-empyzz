import { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper, type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import roadmapSource from '../../Roadmap.md?raw'
import roadmapDownload from '../../Roadmap.md?url'
import { parseRoadmap, statusLabels, type Stage, type Status } from '../content/roadmap'
import { Sigil } from '../components/Sigil'
import { MapOverview, RoadmapGraph, StatusIcon, graphWidth, type GraphLayout } from '../components/RoadmapGraph'
import '../simple.css'
import './roadmap.css'

const { stages, summary } = parseRoadmap(roadmapSource)
const mainStages = stages.slice(0, -1)
const topics = stages.flatMap((stage) => stage.groups.flatMap((group, groupIndex) =>
  group.topics.map((topic) => ({ ...topic, stage, group: group.title, target: `${stage.id}-group-${groupIndex}` }))))
const statusClasses: Record<Status, string> = { '🟩': 'solid', '🟨': 'learning', '🟧': 'next', '⬜': 'future', '⭐': 'goal' }

function StagePanel({ stage, query, index, prefix = '' }: { stage: Stage; query: string; index?: number; prefix?: string }) {
  return (
    <section id={`${prefix}${stage.id}`} className={`roadmap-stage ${stage.goal ? 'career-stage' : ''}`} aria-labelledby={`${prefix}${stage.id}-title`}>
      <header className="stage-header">
        <span className="stage-number">{index === undefined ? '∥' : String(index + 1).padStart(2, '0')}</span>
        <div><p className="stage-track">{stage.track}</p><h2 id={`${prefix}${stage.id}-title`}>{stage.title}</h2></div>
        {stage.goal && <span className="career-tag"><StatusIcon status="⭐" /> Objetivo de carreira</span>}
      </header>
      {stage.notes.length > 0 && <details className="stage-notes"><summary>Contexto & conexões</summary><pre>{stage.notes.join('\n')}</pre></details>}
      <div className="topic-groups">
        {stage.groups.map((group, index) => (
          <div className="topic-group" key={group.title} id={`${prefix}${stage.id}-group-${index}`}>
            <h3>{group.title}</h3>
            <ul>
              {group.topics.map((topic, topicIndex) => (
                <li key={`${topic.label}-${topicIndex}`} className={`topic ${statusClasses[topic.status]} ${query && topic.label.toLowerCase().includes(query) ? 'topic-match' : ''}`}>
                  <StatusIcon status={topic.status} />
                  <span>{topic.label}</span>
                </li>
              ))}
            </ul>
            {group.notes.length > 0 && <p className="group-note">{group.notes.join(' ')}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function RoadmapPage() {
  const transform = useRef<ReactZoomPanPinchRef>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const [reading, setReading] = useState(false)
  const [query, setQuery] = useState('')
  const [scale, setScale] = useState(1)
  const [active, setActive] = useState(stages[0].id)
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [detailTarget, setDetailTarget] = useState<string | null>(null)
  const inspector = useRef<HTMLDialogElement>(null)
  const [layout, setLayout] = useState<GraphLayout>({ width: graphWidth, height: 3000, boxes: [] })
  const [view, setView] = useState({ x: 0, y: 0, scale: 1, width: 1000, height: 720 })
  const normalizedQuery = query.trim().toLowerCase()
  const results = normalizedQuery ? topics.filter((topic) => topic.label.toLowerCase().includes(normalizedQuery)) : []

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Engineering Roadmap — Rafael Gonçalves'
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.href
    if (canonical) canonical.href = new URL('/roadmap', canonical.href).href
    return () => {
      document.title = previousTitle
      if (canonical && previousCanonical) canonical.href = previousCanonical
    }
  }, [])

  useEffect(() => {
    if (selected) {
      inspector.current?.showModal()
      if (detailTarget) document.getElementById(`detail-${detailTarget}`)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    } else inspector.current?.close()
  }, [selected, detailTarget])

  // Also block selections that started outside the viewer and extend into it.
  useEffect(() => {
    if (reading) return
    const preventMapSelection = () => {
      const selection = window.getSelection()
      const map = viewport.current
      if (!map || !selection || selection.isCollapsed) return
      for (let i = 0; i < selection.rangeCount; i++) {
        if (selection.getRangeAt(i).intersectsNode(map)) { selection.removeAllRanges(); break }
      }
    }
    document.addEventListener('selectionchange', preventMapSelection)
    return () => document.removeEventListener('selectionchange', preventMapSelection)
  }, [reading])

  function fitStart(api = transform.current) {
    if (!api || !viewport.current) return
    const width = viewport.current.clientWidth
    const nextScale = Math.min(1, width / graphWidth)
    api.setTransform(Math.max(0, (width - graphWidth * nextScale) / 2), 0, nextScale, 0)
    setActive(stages[0].id)
  }

  function jump(id: string, stageId = id) {
    const element = document.getElementById(reading ? id : stageId)
    if (!element) return
    setActive(stageId)
    if (reading) {
      element.scrollIntoView({ block: 'start', behavior: 'instant' })
      return
    }
    const api = transform.current
    const board = document.getElementById('roadmap-board')
    if (!api || !board || !viewport.current) return
    const bounds = element.getBoundingClientRect()
    const boardBounds = board.getBoundingClientRect()
    const currentScale = api.state.scale
    const targetScale = Math.min(1, (viewport.current.clientWidth - 32) / 300)
    const left = (bounds.left - boardBounds.left) / currentScale
    const top = (bounds.top - boardBounds.top) / currentScale
    api.setTransform(16 - left * targetScale, 16 - top * targetScale, targetScale, 0)
    if (id.includes('-group-')) { setDetailTarget(id); setSelected(stageId) }
  }

  function openDetails(id: string) {
    setActive(id)
    setDetailTarget(null)
    setSelected(id)
  }

  const board = reading ? (
    <div className="roadmap-board" id="roadmap-board" lang="pt-BR">
      {stages.map((stage, index) => <StagePanel key={stage.id} stage={stage} query={normalizedQuery} index={index === 16 ? undefined : index} />)}
    </div>
  ) : (
    <RoadmapGraph stages={stages} expanded={expanded} active={active} onSelect={openDetails} onLayout={setLayout}
      renderDetails={(stage, index) => <StagePanel stage={stage} query={normalizedQuery} index={index === 16 ? undefined : index} prefix="expanded-" />} />
  )

  const legend = <details className="viewer-legend" open>
    <summary>Status & connections</summary>
    <div className="roadmap-legend" lang="pt-BR">
      {(Object.entries(statusLabels) as [Status, string][]).map(([symbol, label]) => <span key={symbol}><StatusIcon status={symbol} />{label}</span>)}
    </div>
    <p>Solid line: learning connection · dashed: supporting track. Not strict prerequisites.</p>
  </details>
  return (
    <div className="roadmap-page">
      <a className="skip-link" href="#roadmap-workspace">Skip to roadmap</a>
      <header className="roadmap-intro">
        <div className="roadmap-topline"><a href="/">← portfolio</a><span>RG / learning archive / 002</span><a href={roadmapDownload} download="Roadmap.md">source .md ↓</a></div>
        <div className="roadmap-title"><Sigil /><div><p className="stage-track">From software to silicon</p><h1>Embedded & Semiconductor<br /><em>Engineering Roadmap.</em></h1></div></div>
        <p className="roadmap-lead">Where I am, what comes next, and the hardware I want to understand. A living study map—not a claim that I already know everything here.</p>
      </header>
      <main id="roadmap-workspace" className="roadmap-workspace">
        <div className="roadmap-tools">
          <label className="roadmap-search">Find a topic<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="RISC-V, C++, GPIO…" /></label>
          <label className="roadmap-jump">Jump to stage<select value={active} onChange={(event) => jump(event.target.value)}>{stages.map((stage, index) => <option key={stage.id} value={stage.id}>{index === 16 ? '∥' : String(index + 1).padStart(2, '0')} / {stage.title}</option>)}</select></label>
          <button type="button" className="view-toggle" aria-pressed={reading} onClick={() => { setSelected(null); setReading(!reading) }}>{reading ? 'Open zoomable map' : 'Reading view'}</button>
        </div>
        {normalizedQuery && <div className="roadmap-results"><p role="status">{results.length} matching topics{results.length === 0 ? ' — try another term.' : '. Choose one to locate it.'}</p><div>{results.map((result, index) => <button key={`${result.target}-${index}`} onClick={() => jump(result.target, result.stage.id)}><strong>{result.label}</strong><span>{result.stage.title} / {result.group}</span></button>)}</div></div>}
        <div className="roadmap-layout">
          <aside className="roadmap-index" aria-label="Roadmap stages"><p className="stage-track">Route index</p><ol>{stages.map((stage, index) => <li key={stage.id}><button aria-current={active === stage.id ? 'step' : undefined} onClick={() => jump(stage.id)}><span>{index === 16 ? '∥' : String(index + 1).padStart(2, '0')}</span>{stage.title}</button></li>)}</ol><p className="index-note">{topics.length} topics · {mainStages.length} stages<br />+ mathematics in parallel</p></aside>
          <div className={`roadmap-map ${reading ? 'is-reading' : ''}`}>
            {legend}
            {reading ? <div className="roadmap-reading">{board}</div> : <>
              <div className="map-controls" aria-label="Map controls">
                <button aria-label="Zoom out" disabled={scale <= 0.021} onClick={() => transform.current?.zoomOut(0.2, 0)}>−</button>
                <output aria-label="Zoom level">{Math.round(scale * 100)}%</output>
                <button aria-label="Zoom in" disabled={scale >= 2.99} onClick={() => transform.current?.zoomIn(0.2, 0)}>+</button>
                <button onClick={() => fitStart()}>Fit width / start</button>
                <button onClick={() => {
                  if (!viewport.current) return
                  const s = Math.max(.02, Math.min(viewport.current.clientWidth / layout.width, viewport.current.clientHeight / layout.height))
                  transform.current?.setTransform((viewport.current.clientWidth - layout.width * s) / 2, 0, s, 0)
                }}>Fit whole map</button>
                <button aria-pressed={expanded} onClick={() => { setExpanded(!expanded); requestAnimationFrame(() => jump(active)) }}>{expanded ? 'Collapse all' : 'Expand all'}</button>
                <span>Drag to pan · wheel / pinch to zoom · arrow keys to move</span>
              </div>
              <div className="canvas-shell">
              <div className="map-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Zoomable roadmap. Use arrow keys to pan, plus or minus to zoom. Reading view provides normal page scrolling."
                onKeyDown={(event) => {
                  const api = transform.current
                  if (!api || event.target !== event.currentTarget) return
                  const { positionX: x, positionY: y, scale: s } = api.state
                  const offsets: Record<string, [number, number]> = { ArrowDown: [0, -120], ArrowUp: [0, 120], ArrowRight: [-120, 0], ArrowLeft: [120, 0] }
                  if (offsets[event.key]) { event.preventDefault(); api.setTransform(x + offsets[event.key][0], y + offsets[event.key][1], s, 0) }
                  if (event.key === '+' || event.key === '=') { event.preventDefault(); api.zoomIn(0.2, 0) }
                  if (event.key === '-') { event.preventDefault(); api.zoomOut(0.2, 0) }
                  if (event.key === 'Home') { event.preventDefault(); fitStart() }
                }}>
                <TransformWrapper ref={transform} minScale={0.02} maxScale={3} limitToBounds={false} smooth={false} panning={{ velocityDisabled: true, excluded: ['summary'] }} doubleClick={{ disabled: true }} onInit={api => { requestAnimationFrame(() => fitStart(api)) }} onTransform={(_, state) => {
                  setScale(state.scale)
                  setView({ x: state.positionX, y: state.positionY, scale: state.scale, width: viewport.current?.clientWidth ?? 1000, height: viewport.current?.clientHeight ?? 720 })
                }}>
                  <TransformComponent wrapperClass="roadmap-transform" contentClass="roadmap-transform-content">{board}</TransformComponent>
                </TransformWrapper>
              </div>
              <MapOverview layout={layout} view={view} onJump={jump} />
              </div>
              <div className="map-footnote"><span>HTML text + vector connectors / no rasterized roadmap</span><span>Not sure where you are? Use “Fit width / start”.</span></div>
            </>}
          </div>
        </div>
        <details className="roadmap-summary" lang="pt-BR"><summary>Resumo original & trilha paralela de hardware</summary><pre>{summary}</pre></details>
      </main>
      <dialog ref={inspector} className="roadmap-inspector" aria-label="Stage details" onClose={() => { setSelected(null); setDetailTarget(null) }} onClick={event => { if (event.target === event.currentTarget) setSelected(null) }}>
        <div className="inspector-content">
          <div className="inspector-toolbar"><span>Topic explorer / {selected?.replace('stage-', '')}</span><button onClick={() => setSelected(null)} autoFocus>Close details ×</button></div>
          {selected && <StagePanel stage={stages.find(stage => stage.id === selected)!} query={normalizedQuery} index={selected === 'stage-17' ? undefined : stages.findIndex(stage => stage.id === selected)} prefix="detail-" />}
        </div>
      </dialog>
      <footer className="roadmap-footer"><span>© {new Date().getFullYear()} Rafael Gonçalves</span><span>Learning in public. One layer deeper.</span><a href="/">back to portfolio ↗</a></footer>
    </div>
  )
}
