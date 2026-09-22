// Concise project summaries displayed on the homepage.
interface SelectedProject {
  name: string
  description: string
  stack: string
  source?: string
  status?: string
}

export const selectedProjects: SelectedProject[] = [
  {
    name: 'Budokai Tenkaichi 3 — PC recompilation',
    description: 'Reverse engineering the Wii version of Dragon Ball Z: Budokai Tenkaichi 3. I’ve extracted and analyzed the PowerPC code from my disc image; I’m now working toward getting the game running natively on an x86-64 PC.',
    stack: 'Ghidra · NWiiRecomp · C/C++ · PowerPC assembly → x86-64',
    status: 'In progress · PC execution is the goal',
  },
  {
    name: 'm1-android',
    description: 'Restoring an old arcade music player for modern Android. Updating the build and fixing the native audio engine while keeping the original software alive.',
    stack: 'C/C++ · Java · Android NDK · JNI',
    source: 'https://github.com/empyzz/M1-Android',
  },
  {
    name: 'nfse-automation',
    description: 'An API for automating invoice portal workflows with a headless browser. Tracks processing state and makes failures easier to investigate.',
    stack: 'Python · FastAPI · Playwright · SQLite',
    source: 'https://github.com/empyzz/NFSe_WebScrapping_API',
  },
  {
    name: 'predictive-refrigeration',
    description: 'An academic experiment in detecting unusual refrigeration behavior from telemetry, with a local language model for diagnostic explanations.',
    stack: 'Python · Scikit-learn · Pandas · Ollama',
    source: 'https://github.com/empyzz/poc-eletrofrio',
  },
]
