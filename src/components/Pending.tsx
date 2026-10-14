type Props = { what: string; className?: string }

/** Honest placeholder for content that has not been provided yet. Never a fake value. */
export function Pending({ what, className = '' }: Props) {
  return (
    <div className={`border border-dashed border-line-2 px-4 py-3 ${className}`}>
      <p className="annot text-dim">To be provided</p>
      <p className="mt-1 text-sm text-mute">{what}</p>
    </div>
  )
}
