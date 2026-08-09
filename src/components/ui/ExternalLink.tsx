import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ExternalIcon } from './portfolio-icons'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  showIcon?: boolean
}

export function ExternalLink({ children, showIcon = true, ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {showIcon && <ExternalIcon />}
    </a>
  )
}
