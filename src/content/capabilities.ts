import type { Capability } from '@/types/portfolio'

export const capabilities: Capability[] = [
  {
    id: '01',
    title: 'Backend & integration',
    summary: 'Service boundaries, APIs, automation, and the failure paths between them.',
    skills: ['Python', 'FastAPI', 'Django', 'C#', 'REST APIs', 'Webhooks', 'Background jobs'],
    evidence: 'Applied across the refrigeration, NFSe, and real-time system work.',
  },
  {
    id: '02',
    title: 'Data & applied intelligence',
    summary: 'Analysis that supports a workflow, with limitations kept visible.',
    skills: ['Pandas', 'Scikit-learn', 'Anomaly detection', 'Ollama', 'Local LLMs', 'Basic RAG'],
    evidence: 'Used in predictive maintenance and local inference experiments.',
  },
  {
    id: '03',
    title: 'Frontend & mobile',
    summary: 'Interfaces that make backend state understandable and actionable.',
    skills: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'API integration'],
    evidence: 'Used in this portfolio, mobile prototypes, and data interfaces.',
  },
  {
    id: '04',
    title: 'Systems & engineering practice',
    summary: 'The surrounding practices that make software easier to operate and change.',
    skills: ['Linux', 'Git', 'Docker basics', 'Testing', 'Logging', 'Documentation', 'C/C++', 'ESP32'],
    evidence: 'Applied through support work, automation, and connected-device experiments.',
  },
]
