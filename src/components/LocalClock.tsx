'use client'

import { useEffect, useState } from 'react'

/** A real clock for Columbus, OH, plus an explicitly decorative ambient indicator. */
export function LocalClock({ timeZone, place }: { timeZone: string; place: string }) {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [timeZone])

  return (
    <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 border border-line bg-panel/60 px-3 py-2">
      <span className="annot flex items-center gap-2" title="Decorative indicator. It does not report any real system.">
        <span aria-hidden className="pulse-dot inline-block size-1.5 rounded-full bg-signal" />
        workspace · ambient
        <span className="text-dim">(decorative)</span>
      </span>
      <span aria-hidden className="h-3 w-px bg-line-2" />
      <span className="annot">
        {place} <span className="text-fg tabular-nums">{now ?? '--:--'}</span>
        <span className="sr-only"> local time</span>
      </span>
    </div>
  )
}
