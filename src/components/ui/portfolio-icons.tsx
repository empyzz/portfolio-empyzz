import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function ArrowIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M5 12h14M14 7l5 5-5 5" /></svg>
}

export function ExternalIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M14 5h5v5M19 5 10 14" /><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
}

export function DownloadIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M12 4v11M8 11l4 4 4-4M5 20h14" /></svg>
}

export function PlusIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M12 5v14M5 12h14" /></svg>
}

export function CodeIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m9 18-6-6 6-6M15 6l6 6-6 6M13 4l-2 16" /></svg>
}
