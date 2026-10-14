'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import { Download, PanelsTopLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { profile } from '@/content/profile'
import { sections, type SectionId } from '@/lib/site'

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home')
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId)
      },
      // A thin band across the middle of the viewport decides which section is "current".
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Nav() {
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const current = sections.find((s) => s.id === active)!

  return (
    <>
      {/* Top bar: identity on the left, recruiter shortcuts on the right. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
            <span className="grid grid-cols-1 size-8 place-items-center border border-line-2 font-mono text-[11px] font-semibold tracking-wider transition-colors group-hover:border-signal group-hover:text-signal">
              VR
            </span>
            <span className="annot hidden sm:inline">
              {profile.name} <span className="text-dim">/ control room</span>
            </span>
          </a>

          <div className="annot hidden items-center gap-2 md:flex" aria-hidden>
            <span className="text-signal">{current.index}</span>
            <span className="text-dim">/</span>
            <motion.span key={current.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-fg">
              {current.label}
            </motion.span>
          </div>

          <nav aria-label="Shortcuts" className="flex items-center gap-2">
            <Link href="/overview" className="btn !min-h-9 !px-3 border-signal/60 text-signal hover:!border-signal">
              <PanelsTopLeft size={14} aria-hidden />
              Quick overview
            </Link>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} download className="btn !min-h-9 !px-3 hidden sm:inline-flex">
                <Download size={14} aria-hidden />
                Resume
              </a>
            ) : null}
          </nav>
        </div>
        <motion.div aria-hidden className="h-px origin-left bg-signal/70" style={{ scaleX: progress }} />
      </header>

      {/* Desktop rail: section index on the left edge. */}
      <nav aria-label="Sections" className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ol className="flex flex-col gap-1 pl-5">
          {sections.map((s) => {
            const on = s.id === active
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? 'location' : undefined}
                  className="group flex h-8 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em]"
                >
                  <span className={on ? 'text-signal' : 'text-dim transition-colors group-hover:text-fg'}>{s.index}</span>
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-500 ease-[var(--ease-precise)] ${on ? 'w-8 bg-signal' : 'w-3 bg-line-2 group-hover:w-5 group-hover:bg-mute'}`}
                  />
                  <span
                    className={`transition-all duration-300 ${on ? 'text-fg opacity-100' : 'text-mute opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Mobile: a bottom bar with all six destinations, always reachable by thumb. */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ol className="grid grid-cols-6">
          {sections.map((s) => {
            const on = s.id === active
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? 'location' : undefined}
                  className={`relative flex h-14 flex-col items-center justify-center gap-0.5 font-mono text-[10px] uppercase tracking-wider ${on ? 'text-fg' : 'text-mute'}`}
                >
                  <span className={on ? 'text-signal' : 'text-dim'}>{s.index}</span>
                  {s.label}
                  {on ? <motion.span layoutId="mnav" className="absolute inset-x-3 top-0 h-px bg-signal" /> : null}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
