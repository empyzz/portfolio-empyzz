import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import test from 'node:test'
import { parseRoadmap, statusLabels } from '../src/content/roadmap.ts'
import { graphPlacement, graphEdges } from '../src/content/roadmapGraph.ts'

const source = readFileSync(new URL('../Roadmap.md', import.meta.url), 'utf8')
const { stages, summary } = parseRoadmap(source)

test('every source topic retains its text, status and order', () => {
  const body = source.split('🟩 SOFTWARE — Conhecimento atual')[1].split('Roadmap resumido')[0]
  const expected = [...body.matchAll(/^- (🟩|🟨|🟧|⬜|⭐) (.+)$/gmu)]
    .map(([, status, label]) => ({ status, label: label.trim() }))
  const actual = stages.flatMap(stage => stage.groups.flatMap(group => group.topics))
  assert.deepEqual(actual, expected)
  assert(actual.length > 0)
  assert(actual.every(topic => topic.status in statusLabels))
})

test('career goals and mathematics stay separate from current knowledge', () => {
  assert.equal(stages.length, 17)
  assert.deepEqual(stages.filter(stage => stage.goal).map(stage => stage.title), ['ASIC engineering', 'Semiconductor engineering'])
  assert.equal(stages.at(-1).track, 'Parallel track')
  assert(stages.slice(14, 16).every(stage => stage.groups.every(group => group.topics.every(topic => topic.status === '⬜'))))
})

test('mixed-status groups and priority notes are not flattened', () => {
  const mcus = stages[4].groups.find(group => group.title === 'Próximos Microcontrollers')
  assert.deepEqual(mcus.topics.map(topic => topic.status), ['🟧', '🟧', '🟧', '⬜', '⬜'])
  assert(stages[11].groups[0].notes.join(' ').includes('SystemVerilog + Verilog'))
  assert(stages[4].notes.join('\n').includes('SOFTWARE                 HARDWARE'))
  assert(summary.includes('SystemVerilog • UVM • SVA'))
  assert(summary.includes('Paralelamente:'))
})

test('topic edits are picked up from the source without another data copy', () => {
  const edited = parseRoadmap(source.replace('- 🟨 C++', '- 🟩 C++'))
  assert.equal(edited.stages[0].groups[0].topics.find(topic => topic.label === 'C++').status, '🟩')
})

test('missing section headings produce an explicit error', () => {
  assert.throws(() => parseRoadmap(source.replace('ASIC ENGINEERING', 'REMOVED SECTION')), /section headings/)
})

test('every stage has a valid graph position and the core route descends', () => {
  assert.equal(graphPlacement.length, stages.length)
  for (const [from, to, support] of graphEdges) {
    assert(stages[from] && stages[to])
    if (!support) assert(graphPlacement[to][1] > graphPlacement[from][1])
  }
  assert.deepEqual(graphEdges.filter(([, to, support]) => to === 4 && !support).map(([from]) => from), [1, 3])
  assert.deepEqual(graphEdges.filter(([, to]) => to === 14).map(([from]) => from), [12, 13])
})

test('mathematics and engineering practices are side tracks with supporting links', () => {
  assert.equal(graphPlacement[16][0], 1)
  assert.equal(graphPlacement[7][0], 4)
  assert(graphEdges.filter(([from]) => from === 16 || from === 7).every(([, , support]) => support === 1))
})
