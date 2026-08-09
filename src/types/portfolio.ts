

export type ProjectStatus =
  | 'production'
  | 'prototype'
  | 'academic'
  | 'proof-of-concept'
  | 'in-development'
  | 'archived'

export interface Project {
  slug: string
  title: string
  eyebrow: string
  github: string
  problem: string
  solution: string
  role: string
  status: ProjectStatus
  technologies: string[]
  highlights: string[]
  architecture: string[]
  validation: string
  limitations: string[]
  nextSteps: string[]
  repositoryUrl?: string
  liveUrl?: string
}

export interface Capability {
  id: string
  title: string
  summary: string
  skills: string[]
  evidence: string
}

export interface ExperienceItem {
  period: string
  role: string
  organization: string
  contributions: string[]
  context: string
}
