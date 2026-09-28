export const statusLabels = {
  '🟩': 'Conhecimento atual / sólido',
  '🟨': 'Conhecimento inicial / em desenvolvimento',
  '🟧': 'Próximas etapas',
  '⬜': 'Especialização futura',
  '⭐': 'Objetivo de carreira',
} as const

export type Status = keyof typeof statusLabels
export type Topic = { label: string; status: Status }
export type TopicGroup = { title: string; topics: Topic[]; notes: string[] }
export type Stage = {
  id: string
  title: string
  track: string
  goal: boolean
  notes: string[]
  groups: TopicGroup[]
}

// These section boundaries mirror Roadmap.md; topic lists and statuses are read
// directly from that file, not maintained as a second copy of the roadmap.
const sections = [
  ['🟩 SOFTWARE — Conhecimento atual', 'Software engineering', 'Software'],
  ['TRANSITION — Software → Systems', 'Systems programming', 'Software → systems'],
  ['HARDWARE — Base atual', 'Hardware · current foundation', 'Hardware'],
  ['HARDWARE — Próxima base', 'Electronics & digital fundamentals', 'Hardware'],
  ['EMBEDDED SYSTEMS — Foundation', 'Embedded systems', 'Software + hardware'],
  ['COMMUNICATION & PROTOCOLS', 'Communication & protocols', 'Embedded'],
  ['REAL-TIME EMBEDDED SYSTEMS', 'Real-time systems', 'Embedded'],
  ['DEBUGGING & EMBEDDED DEVELOPMENT', 'Debugging & engineering practices', 'Embedded'],
  ['EMBEDDED LINUX', 'Embedded Linux', 'Embedded'],
  ['COMPUTER ARCHITECTURE', 'Computer architecture', 'Systems → silicon'],
  ['DIGITAL HARDWARE', 'Digital hardware', 'Hardware design'],
  ['FPGA ENGINEERING', 'FPGA engineering', 'Hardware design'],
  ['HARDWARE VERIFICATION', 'Hardware verification', 'Verification'],
  ['PROCESSOR DESIGN', 'Processor & SoC design', 'Chip design'],
  ['ASIC ENGINEERING', 'ASIC engineering', 'Career objective'],
  ['SEMICONDUCTOR ENGINEERING', 'Semiconductor engineering', 'Career objective'],
  ['Matemática', 'Mathematics', 'Parallel track'],
] as const

const topicPattern = /^- (🟩|🟨|🟧|⬜|⭐) (.+)$/u

export function parseRoadmap(source: string) {
  const lines = source.replace(/\r/g, '').split('\n')
  const summaryIndex = lines.indexOf('Roadmap resumido para colocar no topo do portfólio')
  const starts = sections.map(([heading]) => lines.indexOf(heading))
  if (starts.some((start, index) => start < 0 || (index > 0 && start <= starts[index - 1]))) {
    throw new Error('Roadmap.md: expected section headings are missing or out of order.')
  }
  const stages: Stage[] = sections.map(([, title, track], index) => {
    const stage: Stage = { id: `stage-${index + 1}`, title, track, goal: index === 14 || index === 15, notes: [], groups: [] }
    const body = lines.slice(starts[index] + 1, starts[index + 1] ?? (summaryIndex < 0 ? lines.length : summaryIndex))
    let group: TopicGroup | undefined
    for (let i = 0; i < body.length; i++) {
      const line = body[i].trimEnd()
      if (!line.trim()) continue
      const match = line.trim().match(topicPattern)
      if (match) {
        if (!group) throw new Error(`Roadmap.md: topic without a group in ${title}`)
        group.topics.push({ status: match[1] as Status, label: match[2] })
      } else if (body.slice(i + 1).find((next) => next.trim())?.trim().match(topicPattern)) {
        group = { title: line.replace(/^(🟩|🟨|🟧|⬜|⭐)\s*/u, ''), topics: [], notes: [] }
        stage.groups.push(group)
      } else {
        (group ? group.notes : stage.notes).push(line)
      }
    }
    return stage
  })
  return { stages, summary: summaryIndex < 0 ? '' : lines.slice(summaryIndex + 2).join('\n').trim() }
}
