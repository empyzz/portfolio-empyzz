import type { Project } from '@/types/portfolio'

export const projects: Project[] = [
  {
    slug: 'predictive-refrigeration',
    title: 'Predictive Refrigeration System',
    eyebrow: 'Eletrofrio · Operational intelligence',
    github: 'https://github.com/empyzz/poc-eletrofrio',
    problem:
      'Refrigeration telemetry contains normal operational cycles and abnormal behavior that can look deceptively similar.',
    solution:
      'A predictive maintenance pipeline that separates expected defrost patterns from anomaly signals and prepares technical context for local-LLM diagnostics.',
    role:
      'I designed the backend flow, anomaly-analysis boundary, and local inference integration.',
    status: 'academic',
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'Ollama'],
    highlights: [
      'Separated data ingestion, model analysis, and explanation into clear stages.',
      'Kept local LLM inference outside the request-critical analysis path.',
      'Modeled defrost cycles as expected behavior instead of treating every deviation as a fault.',
    ],
    architecture: ['Telemetry', 'FastAPI', 'Feature analysis', 'Anomaly signal', 'Local explanation'],
    validation:
      'The architecture and analysis flow are being validated with development data; no production impact metric is claimed.',
    limitations: [
      'Model quality depends on representative equipment history.',
      'Generated explanations require technical review before operational use.',
    ],
    nextSteps: ['Expand scenario testing', 'Document model thresholds', 'Add observable inference jobs'],
  },
  {
    slug: 'nfse-automation',
    title: 'Headless NFSe Automation API',
    eyebrow: 'Backend automation · Browser orchestration',
    github: 'https://github.com/empyzz/NFSe_WebScrapping_API',
    problem:
      'Manual invoice workflows require repeated portal interaction, status checks, and error recovery.',
    solution:
      'An API-driven workflow that coordinates headless browser tasks, persists processing state, and exposes each stage through structured logs.',
    role:
      'I modeled the processing stages and implemented the API, browser automation, persistence, and failure visibility.',
    status: 'prototype',
    technologies: ['Python', 'FastAPI', 'Playwright', 'SQLite', 'Structured logging'],
    highlights: [
      'Isolated browser work from the API contract so portal changes remain contained.',
      'Persisted job state to make interrupted processing diagnosable.',
      'Designed explicit error paths for authentication, navigation, and invoice processing failures.',
    ],
    architecture: ['API request', 'Job record', 'Playwright worker', 'NFSe portal', 'Status response'],
    validation:
      'Validated as a controlled prototype. Portal variability and production credentials are intentionally outside this portfolio.',
    limitations: [
      'Portal markup changes can require selector maintenance.',
      'Production operation needs queueing, rate limits, and credential-management controls.',
    ],
    nextSteps: ['Introduce a job queue', 'Add integration fixtures', 'Define credential rotation'],
  },
  {
    slug: 'mobile-sos',
    title: 'Mobile SOS Platform',
    eyebrow: 'Mobile systems · Service integration',
    github: '',
    problem:
      'An emergency flow has to collect essential context quickly and communicate state clearly under pressure.',
    solution:
      'A mobile-first prototype that structures an SOS request, connects it to backend services, and keeps user feedback visible throughout the flow.',
    role:
      'I worked across the mobile interface and API integration, focusing on request state and failure feedback.',
    status: 'in-development',
    technologies: ['React Native', 'TypeScript', 'REST API', 'Mobile UX'],
    highlights: [
      'Reduced the core interaction to a short, explicit request flow.',
      'Represented loading, success, and failure states instead of assuming connectivity.',
      'Kept service integration separate from presentation components.',
    ],
    architecture: ['Mobile client', 'Request validation', 'REST service', 'Event record', 'User feedback'],
    validation:
      'Academic prototype used to explore mobile integration and state handling; it is not an emergency service.',
    limitations: [
      'No claim of emergency-response availability or regulatory compliance.',
      'Production use would require security, location, accessibility, and service-level review.',
    ],
    nextSteps: ['Run accessibility testing', 'Threat-model sensitive data', 'Test unreliable-network behavior'],
  },
{
    slug: 'm1-android',
    title: 'M1-Android (Restoration Project)',
    eyebrow: 'Android · Legacy Code Restoration',
    github: 'https://github.com/empyzz/M1-Android',
    problem:
      'The original M1-Android app was removed from the Play Store, and its 2010-era codebase failed to compile or run on modern devices due to dependency mismatches and strict modern security policies.',
    solution:
      'Revived the project by updating Gradle build scripts, fixing NDK compilation, and patching the legacy native C/C++ audio engine to prevent buffer overflows (FORTIFY crashes) on modern CPUs.',
    role:
      'I took on the challenge to restore the app, focusing on resolving native build errors and bridging the 2008 C++ engine to run on Android 11+.',
    status: 'in-development',
    technologies: ['Android', 'Java', 'C/C++', 'NDK', 'JNI', 'Gradle'],
    highlights: [
      'Successfully patched a 2008 C++ audio engine to bypass modern Android security crashes.',
      'Restored emulation functionality for modern physical devices and emulators (API 34+).',
      'Updated the project to compile with modern Android Studio while preserving the original core engine.',
    ],
    architecture: ['Native C/C++ Engine', 'JNI', 'Android Java Wrapper', 'Local File System (XML/INI)'],
    validation:
      'Phase 1 is complete: the core engine is fully functional and successfully runs on modern Android devices without crashing.',
    limitations: [
      'The Android layer currently relies on legacy 2010-era Java code and AsyncTasks.',
      'Requires manual file system setup due to modern Android scoped storage restrictions.'
    ],
    nextSteps: [
      'Rewrite Java layer to Kotlin using Coroutines for null-safety',
      'Overhaul UI by replacing XML layouts with Jetpack Compose',
      'Improve C/C++ code for better security'
    ],
  },

  {
    slug: 'inspector-seb',
    title: 'Inspector Seb',
    eyebrow: 'Web · Data Analysis Dashboard',
    github: 'https://github.com/empyzz/inspector-seb',
    problem:
      'Formula 1 data is highly fragmented. High-resolution telemetry requires heavy Python processing and caching, while lightweight race context lives in separate REST APIs. Combining them is tricky due to mismatched session identifiers and API instability.',
    solution:
      'A unified "race engineer" dashboard powered by a custom FastAPI backend. It intelligently maps and caches high-fidelity FastF1 telemetry alongside OpenF1 API data, serving cohesive metrics to a React frontend.',
    role:
      'I designed the full-stack architecture, built the Python data ingestion services, and solved the session-matching logic to safely unify the two independent, unofficial F1 data sources.',
    status: 'in-development',
    technologies: ['React (Vite)', 'FastAPI', 'Python', 'FastF1', 'OpenF1', 'Recharts'],
    highlights: [
      'Combined heavy Python-based telemetry (FastF1) with lightweight REST calls (OpenF1) into a single backend flow.',
      'Engineered a matching system (by year, GP, and session type) to align mismatched identifiers across independent APIs.',
      'Calculated advanced physical metrics from raw telemetry, such as corner entry/exit speeds and exact sector deltas.',
    ],
    architecture: ['React Frontend', 'FastAPI Backend', 'FastF1 Telemetry Service', 'OpenF1 Context Service', 'Local Data Cache'],
    validation:
      'Core Python data ingestion services have been built and successfully validated using real session data (e.g., Monaco 2024 Qualifying).',
    limitations: [
      'Relies on unofficial F1 data sources that can change or break without warning.',
      'FastF1 telemetry delta times can be imprecise, requiring exact sector delta fallbacks.',
      'Live in-session data currently requires paid access via OpenF1.'
    ],
    nextSteps: [
      'Build FastAPI endpoints to expose the processed data',
      'Develop the React frontend and UI visualizations',
      'Implement LLM-generated technical race summaries',
      'Add pit stop strategy predictions and simulations'
    ],
  },
]
