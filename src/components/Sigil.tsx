import sigil from '../assets/sigil.png'

export function Sigil({ className = '' }: { className?: string }) {
  return (
    <img
      className={`sigil ${className}`}
      src={sigil}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  )
}
