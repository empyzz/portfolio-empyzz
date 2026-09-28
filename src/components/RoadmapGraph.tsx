import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Stage, Status } from '../content/roadmap'
import { statusLabels } from '../content/roadmap'
import { graphPlacement, graphEdges } from '../content/roadmapGraph'

export function StatusIcon({ status }: { status: Status }) {
  const classes = { '🟩': 'solid', '🟨': 'learning', '🟧': 'next', '⬜': 'future', '⭐': 'goal' }
  return <svg className={`status-icon ${classes[status]}`} viewBox="0 0 20 20" role="img" aria-label={statusLabels[status]}>
    {status === '🟩' && <circle cx="10" cy="10" r="6" fill="currentColor" />}
    {status === '🟨' && <><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M10 4a6 6 0 0 0 0 12Z" fill="currentColor" /></>}
    {status === '🟧' && <path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />}
    {status === '⬜' && <path d="m10 3 7 7-7 7-7-7Z" fill="none" stroke="currentColor" strokeWidth="1.7" />}
    {status === '⭐' && <path d="m10 2 2.4 5 5.6.8-4 4 1 5.5-5-2.6-5 2.6 1-5.5-4-4 5.6-.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" />}
  </svg>
}

// Separate software/hardware lanes converge; supporting tracks use dashed links.
export type GraphBox = { id: string; x: number; y: number; width: number; height: number }
export type GraphLayout = { width: number; height: number; boxes: GraphBox[] }
export const graphWidth = 1520

export function RoadmapGraph({ stages, expanded, active, onSelect, onLayout, renderDetails }: {
  stages: Stage[]; expanded: boolean; active: string
  onSelect: (id: string) => void; onLayout: (layout: GraphLayout) => void
  renderDetails: (stage: Stage, index: number) => ReactNode
}) {
  const board = useRef<HTMLDivElement>(null)
  const press = useRef({ x: 0, y: 0 })
  const [layout, setLayout] = useState<GraphLayout>({ width: graphWidth, height: 3000, boxes: [] })
  useLayoutEffect(() => {
    const element = board.current
    if (!element) return
    const measure = () => {
      const boxes = Array.from(element.querySelectorAll<HTMLElement>('.graph-node')).map(node => ({ id: node.id, x: node.offsetLeft, y: node.offsetTop, width: node.offsetWidth, height: node.offsetHeight }))
      const next = { width: graphWidth, height: element.offsetHeight, boxes }
      setLayout(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next)
      onLayout(next)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    element.querySelectorAll('.graph-node').forEach(node => observer.observe(node))
    measure()
    return () => observer.disconnect()
  }, [onLayout])

  return <div ref={board} className={`branch-board ${expanded ? 'expanded-graph' : ''}`} id="roadmap-board" lang="pt-BR">
    <div className="graph-heading"><span>SOFTWARE + HARDWARE → SILICON</span><p>Lines show learning connections—not mandatory prerequisites. Dashed lines mark supporting tracks.</p></div>
    <svg className="graph-wires" width={graphWidth} height={layout.height} aria-hidden="true">
      <defs><marker id="route-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="m1 1 8 4-8 4" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
      {graphEdges.map(([from, to, support]) => {
        const a = layout.boxes[from], b = layout.boxes[to]
        if (!a || !b) return null
        let path: string
        if (support) {
          const forward = a.x < b.x
          const x1 = forward ? a.x + a.width : a.x
          const x2 = forward ? b.x : b.x + b.width
          const y1 = a.y + a.height / 2, y2 = b.y + b.height / 2
          const bend = from === 16 && to === 10 ? 370 : (x1 + x2) / 2
          path = `M${x1},${y1}H${bend}V${y2}H${x2}`
        } else {
          const x1 = a.x + a.width / 2, x2 = b.x + b.width / 2
          const y1 = a.y + a.height, y2 = b.y
          path = `M${x1},${y1}V${(y1 + y2) / 2}H${x2}V${y2 - 3}`
        }
        return <path key={`${from}-${to}`} d={path} className={support ? 'support-wire' : ''} markerEnd="url(#route-arrow)" />
      })}
    </svg>
    {stages.map((stage, index) => {
      const [column, row, span = 1] = graphPlacement[index]
      const counts = stage.groups.flatMap(group => group.topics).reduce<Partial<Record<Status, number>>>((all, topic) => ({ ...all, [topic.status]: (all[topic.status] ?? 0) + 1 }), {})
      return <div key={stage.id} id={stage.id} className={`graph-node ${index === 16 || index === 7 ? 'support-node' : ''}`} style={{ gridColumn: `${column} / span ${span}`, gridRow: row + 1 }}>
        <button className="graph-card" aria-label={`Open ${stage.title}`} aria-pressed={active === stage.id}
          onPointerDown={event => { press.current = { x: event.clientX, y: event.clientY } }}
          onClick={event => { if (event.detail === 0 || Math.hypot(event.clientX - press.current.x, event.clientY - press.current.y) < 6) onSelect(stage.id) }}>
          <span className="graph-card-meta">{index === 16 ? '∥' : String(index + 1).padStart(2, '0')} / {stage.track}</span>
          <strong>{stage.title}{stage.goal && <StatusIcon status="⭐" />}</strong>
          <span className="graph-card-groups">{stage.groups.map(group => group.title).join(' · ')}</span>
          <span className="graph-card-bottom"><span className="graph-counts">{Object.entries(counts).map(([status, count]) => <span key={status} title={statusLabels[status as Status]}><StatusIcon status={status as Status} />{count}</span>)}</span><span>explore ↗</span></span>
        </button>
        {expanded && renderDetails(stage, index)}
      </div>
    })}
  </div>
}

export function MapOverview({ layout, view, onJump }: { layout: GraphLayout; view: { x: number; y: number; scale: number; width: number; height: number }; onJump: (id: string) => void }) {
  return <details className="map-overview" open><summary>Overview</summary><svg viewBox={`0 0 ${layout.width} ${layout.height}`} aria-label="Roadmap overview">
    {layout.boxes.map(box => <rect key={box.id} x={box.x} y={box.y} width={box.width} height={box.height} rx="8" tabIndex={0} role="button" aria-label={`Jump to stage ${box.id.replace('stage-', '')}`} onClick={() => onJump(box.id)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onJump(box.id) } }} />)}
    <rect className="overview-window" x={-view.x / view.scale} y={-view.y / view.scale} width={view.width / view.scale} height={view.height / view.scale} />
  </svg></details>
}
