'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { requestFlow } from '@/content/profile'

// Labels on the connectors between nodes. Index i sits between node i and node i+1.
const hops = [
  { label: 'HTTPS request', async: false },
  { label: 'validated · routed', async: false },
  { label: 'publish event', async: true },
  { label: 'consume · persist', async: false },
]

export function SystemFlow() {
  const [selected, setSelected] = useState(2)
  const [tracing, setTracing] = useState(false)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const node = requestFlow[selected]

  // "Trace a request" walks the path one hop at a time.
  useEffect(() => {
    if (!tracing) return
    if (selected >= requestFlow.length - 1) {
      setTracing(false)
      return
    }
    const t = setTimeout(() => setSelected((s) => s + 1), 1100)
    return () => clearTimeout(t)
  }, [tracing, selected])

  function startTrace() {
    setSelected(0)
    setTracing(true)
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : null
    if (next === null) return
    e.preventDefault()
    const n = (next + requestFlow.length) % requestFlow.length
    setTracing(false)
    setSelected(n)
    buttons.current[n]?.focus()
  }

  return (
    <figure className="plate border border-line bg-panel/40" aria-labelledby="flow-title">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="annot text-signal">Fig. 01</span>
          <span id="flow-title" className="annot text-fg">
            The path of a request
          </span>
          <span className="annot text-dim">Illustrative engineering pattern, not an employer’s architecture</span>
        </div>
        <button type="button" onClick={tracing ? () => setTracing(false) : startTrace} className="btn !min-h-9 !px-3">
          {tracing ? <RotateCcw size={13} aria-hidden /> : <Play size={13} aria-hidden />}
          {tracing ? 'Stop trace' : 'Trace a request'}
        </button>
      </figcaption>

      <div className="px-4 py-6 md:px-6 md:py-10">
        <p id="flow-hint" className="sr-only">
          Five components. Use arrow keys to move between them. The explanation below updates as you select one.
        </p>
        <ol role="group" aria-describedby="flow-hint" className="flex flex-col md:grid md:grid-cols-5 md:gap-x-10 xl:gap-x-24">
          {requestFlow.map((n, i) => {
            const on = i === selected
            const passed = i < selected
            return (
              <li key={n.id} className="relative flex flex-col">
                <button
                  ref={(el) => {
                    buttons.current[i] = el
                  }}
                  type="button"
                  aria-pressed={on}
                  aria-controls="flow-detail"
                  tabIndex={on ? 0 : -1}
                  onClick={() => {
                    setTracing(false)
                    setSelected(i)
                  }}
                  onMouseEnter={() => !tracing && setSelected(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group relative h-full w-full border px-4 py-3 text-left md:py-4 transition-colors duration-300 md:min-h-[128px] ${
                    on ? 'border-signal bg-ink' : passed ? 'border-line-2 bg-ink/60' : 'border-line bg-ink/40 hover:border-line-2'
                  }`}
                >
                  <span className={`annot block ${on ? 'text-signal' : 'text-dim'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`heading mt-3 block text-lg md:text-xl ${on ? 'text-fg' : 'text-fg/80'}`}>{n.label}</span>
                  <span className="mt-1 block font-mono text-[11px] text-mute">{n.tech}</span>
                  {on ? <motion.span layoutId="flow-mark" className="absolute -bottom-px left-0 h-[2px] w-full bg-signal" /> : null}
                </button>

                {i < hops.length ? <Hop hop={hops[i]} lit={i < selected} active={tracing && i === selected - 1} /> : null}
              </li>
            )
          })}
        </ol>

        <div id="flow-detail" aria-live="polite" className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 md:col-span-12 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <p className="annot text-signal">Selected · {String(selected + 1).padStart(2, '0')}</p>
                <p className="heading mt-2 text-2xl">{node.label}</p>
              </div>
              <div className="md:col-span-4">
                <p className="annot">In plain terms</p>
                <p className="mt-2 leading-relaxed text-fg/90">{node.plain}</p>
              </div>
              <div className="md:col-span-5">
                <p className="annot">How I work with it</p>
                <p className="mt-2 leading-relaxed text-mute">{node.practice}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Related technologies">
                  {node.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </figure>
  )
}

function Hop({ hop, lit, active }: { hop: (typeof hops)[number]; lit: boolean; active: boolean }) {
  return (
    <div aria-hidden className="relative flex h-10 items-center pl-6 md:absolute md:left-full md:top-0 md:h-full md:w-10 md:justify-center md:pl-0 xl:w-24">
      {/* vertical on mobile, horizontal on desktop */}
      <svg className="absolute left-6 top-0 h-full w-px md:hidden" preserveAspectRatio="none" viewBox="0 0 1 40">
        <line x1="0.5" y1="0" x2="0.5" y2="40" stroke={lit ? 'var(--color-signal)' : 'var(--color-line-2)'} className={hop.async ? 'flowline' : undefined} strokeDasharray={hop.async ? undefined : 'none'} />
      </svg>
      <svg className="hidden h-px w-full md:block" preserveAspectRatio="none" viewBox="0 0 80 1">
        <line
          x1="0"
          y1="0.5"
          x2="80"
          y2="0.5"
          stroke={lit ? 'var(--color-signal)' : 'var(--color-line-2)'}
          className={hop.async || lit ? 'flowline' : undefined}
          style={{ transition: 'stroke .4s' }}
        />
      </svg>
      <span className="annot ml-4 text-[9px] text-dim md:hidden xl:absolute xl:bottom-[calc(50%+8px)] xl:ml-0 xl:block xl:w-full xl:text-center xl:leading-tight">
        {hop.async ? <span className="text-info">async · </span> : null}
        {hop.label}
      </span>
      {active ? <span className="packet absolute left-[22px] top-0 size-[7px] bg-signal md:left-0 md:top-[calc(50%-3px)]" /> : null}
    </div>
  )
}
