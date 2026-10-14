'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, BookOpen, Network } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { employers } from '@/content/systems'
import type { Employer } from '@/content/types'
import { ArchitectureMap } from './ArchitectureMap'

type View = 'explore' | 'read'

export function SystemsExplorer() {
  const [view, setView] = useState<View>('explore')
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const emp = employers[index]

  function onTabKey(e: React.KeyboardEvent, i: number) {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (i + d + employers.length) % employers.length
    setIndex(n)
    tabs.current[n]?.focus()
  }

  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="annot">Select an environment</p>
        <div role="radiogroup" aria-label="Display mode" className="inline-flex border border-line">
          {(
            [
              ['explore', 'Explore systems', Network],
              ['read', 'Reading view', BookOpen],
            ] as const
          ).map(([v, label, Icon]) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={view === v}
              onClick={() => setView(v)}
              className={`inline-flex min-h-10 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                view === v ? 'bg-fg text-ink' : 'text-mute hover:text-fg'
              }`}
            >
              <Icon size={13} aria-hidden /> {label}
            </button>
          ))}
        </div>
      </div>

      {view === 'read' ? (
        <ReadingView />
      ) : (
        <>
          <div role="tablist" aria-label="Employers" className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto border-l border-line md:grid md:grid-cols-3 md:overflow-visible">
            {employers.map((e, i) => {
              const on = i === index
              return (
                <button
                  key={e.slug}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  role="tab"
                  id={`tab-${e.slug}`}
                  aria-selected={on}
                  aria-controls={`panel-${e.slug}`}
                  tabIndex={on ? 0 : -1}
                  onClick={(ev) => {
                    setIndex(i)
                    ev.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })
                  }}
                  onKeyDown={(ev) => onTabKey(ev, i)}
                  style={{ '--hue': e.hue } as React.CSSProperties}
                  className={`relative min-w-[78%] shrink-0 snap-start border-b border-r border-t border-line px-4 py-4 text-left md:min-w-0 transition-colors duration-500 md:px-5 md:py-5 ${
                    on ? 'bg-[color-mix(in_oklab,var(--hue)_7%,var(--color-ink))]' : 'hover:bg-panel'
                  }`}
                >
                  {on ? <motion.span layoutId="env-mark" className="absolute inset-x-0 -top-px h-[2px] bg-[var(--hue)]" /> : null}
                  <span className="annot flex justify-between">
                    <span style={{ color: on ? e.hue : undefined }}>{e.domain}</span>
                    <span className="text-dim">
                      {e.start.slice(-4)}–{e.end === 'Present' ? 'now' : e.end.slice(-4)}
                    </span>
                  </span>
                  <span className={`heading mt-3 block text-xl md:text-2xl ${on ? 'text-fg' : 'text-mute'}`}>{e.company}</span>
                  <span className="mt-1 block font-mono text-[11px] text-dim">{e.role}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={emp.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Environment emp={emp} />
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export function Environment({ emp, standalone = false }: { emp: Employer; standalone?: boolean }) {
  const [lensId, setLensId] = useState(emp.lenses[0].id)
  const lens = emp.lenses.find((l) => l.id === lensId) ?? emp.lenses[0]

  function pickNode(nodeId: string) {
    const match = emp.lenses.find((l) => l.nodes.includes(nodeId) && l.id !== lensId) ?? emp.lenses.find((l) => l.nodes.includes(nodeId))
    if (match) setLensId(match.id)
  }

  return (
    <div
      {...(standalone ? {} : { role: 'tabpanel', id: `panel-${emp.slug}`, 'aria-labelledby': `tab-${emp.slug}` })}
      style={{ '--hue': emp.hue } as React.CSSProperties}
      className={`plate border-line bg-[radial-gradient(120%_80%_at_100%_0%,color-mix(in_oklab,var(--hue)_7%,transparent),transparent_60%)] ${
        standalone ? 'border' : 'border-x border-b'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Brief */}
        <div className="border-b border-line p-5 md:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
          <p className="annot">
            {emp.start} — {emp.end} · {emp.location}
          </p>
          <h3 className="heading mt-4 text-3xl leading-[1.05] md:text-4xl">{emp.headline}</h3>
          <p className="mt-4 leading-relaxed text-mute">{emp.summary}</p>

          {emp.metrics.length ? (
            <dl className="mt-8 grid grid-cols-2 gap-px bg-line">
              {emp.metrics.map((m) => (
                <div key={m.label} className="bg-ink p-3">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="display block text-3xl" style={{ color: emp.hue }}>
                      {m.value}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-fg/90">{m.label}</span>
                    <span className="mt-2 block font-mono text-[10px] leading-snug text-dim">{m.context}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Technical themes">
            {emp.themes.map((t) => (
              <li key={t} className="chip !text-[10.5px]">
                {t}
              </li>
            ))}
          </ul>

          {standalone ? null : (
          <Link
            href={`/systems/${emp.slug}`}
            className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg"
          >
            <span className="link-u">Open full case study</span>
            <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          )}
        </div>

        {/* Map + lenses */}
        <div className="p-5 md:p-8 lg:col-span-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="annot text-fg">{emp.diagram.title}</p>
            <p className="annot text-dim">Illustrative · sanitized</p>
          </div>

          <div role="toolbar" aria-label="Engineering topics" className="no-scrollbar -mx-5 mt-4 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {emp.lenses.map((l) => {
              const on = l.id === lens.id
              return (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setLensId(l.id)}
                  className={`min-h-9 shrink-0 border px-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    on ? 'border-[var(--hue)] text-fg' : 'border-line text-mute hover:border-line-2 hover:text-fg'
                  }`}
                >
                  {l.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 hidden md:block">
            <ArchitectureMap
              title={emp.diagram.title}
              nodes={emp.diagram.nodes}
              edges={emp.diagram.edges}
              active={lens.nodes}
              hue={emp.hue}
              onPick={pickNode}
            />
          </div>

          {/* Mobile: the diagram becomes a short list of the components in focus. */}
          <ul className="mt-5 grid grid-cols-1 gap-px bg-line md:hidden" aria-label="Components in focus">
            {lens.nodes.map((id) => {
              const n = emp.diagram.nodes.find((x) => x.id === id)!
              return (
                <li key={id} className="bg-ink px-3 py-2.5">
                  <span className="text-sm font-semibold">{n.label}</span>{' '}
                  <span className="font-mono text-[11px] text-mute">{n.sub}</span>
                  <span className="mt-0.5 block text-[13px] text-mute">{n.plain}</span>
                </li>
              )
            })}
          </ul>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lens.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-2"
              aria-live="polite"
            >
              <div>
                <p className="annot" style={{ color: emp.hue }}>
                  {lens.label}
                </p>
                <p className="heading mt-2 text-xl leading-snug">{lens.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{lens.body}</p>
              </div>
              <div>
                <p className="annot">From my resume</p>
                <ul className="mt-3 space-y-3">
                  {lens.refs.map((r) => (
                    <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-fg/85">
                      <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0" style={{ background: emp.hue }} />
                      {emp.contributions[r]}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="annot mt-6 normal-case tracking-normal text-[11px] text-dim">{emp.diagram.caption}</p>
        </div>
      </div>
    </div>
  )
}

/** Plain, linear version of the same facts, for skimming and for screen readers. */
function ReadingView() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {employers.map((e) => (
        <article key={e.slug} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
          <header className="md:col-span-4">
            <p className="annot" style={{ color: e.hue }}>
              {e.domain}
            </p>
            <h3 className="heading mt-2 text-2xl">{e.company}</h3>
            <p className="mt-1 text-mute">{e.role}</p>
            <p className="annot mt-2">
              {e.start} — {e.end} · {e.location}
            </p>
          </header>
          <div className="md:col-span-8">
            <ul className="space-y-2.5">
              {e.contributions.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-fg/85">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-line-2" />
                  {c}
                </li>
              ))}
            </ul>
            {e.metrics.length ? (
              <ul className="mt-5 space-y-1 font-mono text-[12px] text-mute">
                {e.metrics.map((m) => (
                  <li key={m.label}>
                    <span className="text-fg">{m.value}</span> {m.label}. <span className="text-dim">{m.context}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <Link href={`/systems/${e.slug}`} className="link-u mt-5 inline-block font-mono text-xs uppercase tracking-wider">
              Full case study →
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
