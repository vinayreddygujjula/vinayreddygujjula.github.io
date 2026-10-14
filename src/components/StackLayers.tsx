'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { stackLayers } from '@/content/stack'

// L1–L5 stack vertically like a request travelling down through an application.
// L6 (security & quality) is drawn as a vertical band crossing every other layer,
// because that is how it works in practice.
const horizontal = stackLayers.filter((l) => l.id !== 'security')
const crossCut = stackLayers.find((l) => l.id === 'security')!

export function StackLayers() {
  const [activeId, setActiveId] = useState('api')
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const layer = stackLayers.find((l) => l.id === activeId)!
  const order = stackLayers.map((l) => l.id)

  function onKey(e: React.KeyboardEvent, id: string) {
    const i = order.indexOf(id)
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = order[(i + d + order.length) % order.length]
    setActiveId(next)
    refs.current[next]?.focus()
  }

  const slab = (id: string, cls: string, children: React.ReactNode) => {
    const on = id === activeId
    return (
      <button
        key={id}
        ref={(el) => {
          refs.current[id] = el
        }}
        type="button"
        role="tab"
        aria-selected={on}
        aria-controls="stack-detail"
        tabIndex={on ? 0 : -1}
        onClick={() => setActiveId(id)}
        onKeyDown={(e) => onKey(e, id)}
        className={`group relative text-left transition-colors duration-300 ${on ? 'bg-panel-2' : 'bg-ink hover:bg-panel'} ${cls}`}
      >
        {on ? <motion.span layoutId="stack-mark" className="absolute inset-y-0 left-0 w-[2px] bg-signal" /> : null}
        {children}
      </button>
    )
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Stack layers" aria-orientation="vertical" className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-[1fr_72px]">
          {horizontal.map((l, i) =>
            slab(
              l.id,
              'flex min-h-[68px] items-center justify-between gap-4 px-4 py-3 md:col-start-1',
              <>
                <span>
                  <span className={`annot block ${l.id === activeId ? 'text-signal' : 'text-dim'}`}>{l.index}</span>
                  <span className="heading mt-1 block text-lg">{l.name}</span>
                </span>
                <span className="hidden font-mono text-[10px] text-dim sm:block">{l.techs.length} tools</span>
              </>,
            ),
          )}
          {slab(
            crossCut.id,
            'flex items-center gap-3 px-4 py-4 md:col-start-2 md:row-span-5 md:row-start-1 md:flex-col md:justify-between md:px-0 md:py-4',
            <>
              <span className={`annot ${crossCut.id === activeId ? 'text-signal' : 'text-dim'}`}>{crossCut.index}</span>
              <span className="heading text-lg md:rotate-180 md:text-base md:[writing-mode:vertical-rl]">{crossCut.name}</span>
              <span aria-hidden className="hidden font-mono text-[10px] text-dim md:block">∥</span>
            </>,
          )}
        </div>
        <p className="annot mt-3 normal-case tracking-normal text-[11px] text-dim">
          Read top to bottom: a request enters at the interface and reaches infrastructure. Security and quality cut across all of it.
        </p>
      </div>

      <div className="lg:col-span-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={layer.id}
            id="stack-detail"
            role="tabpanel"
            aria-label={layer.name}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="annot text-signal">
              {layer.index} · {layer.short}
            </p>
            <h3 className="heading mt-3 text-3xl md:text-4xl">{layer.name}</h3>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="annot">Its job in an application</p>
                <p className="mt-2 leading-relaxed text-fg/90">{layer.role}</p>
              </div>
              <div>
                <p className="annot">How I work in it</p>
                <p className="mt-2 leading-relaxed text-mute">{layer.inPractice}</p>
              </div>
            </div>

            <table className="mt-8 w-full border-t border-line text-left">
              <caption className="sr-only">Technologies in the {layer.name} layer and where I used them</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Technology</th>
                  <th scope="col">How it is used</th>
                  <th scope="col">Where</th>
                </tr>
              </thead>
              <tbody>
                {layer.techs.map((t) => (
                  <tr key={t.name} className="border-b border-line align-top">
                    <th scope="row" className="w-[34%] py-3 pr-4 text-[15px] font-semibold">
                      {t.name}
                    </th>
                    <td className="py-3 pr-4 text-[14px] leading-relaxed text-mute">{t.note}</td>
                    <td className="hidden py-3 sm:table-cell">
                      <span className="flex flex-wrap justify-end gap-1">
                        {t.seenAt.map((s) => (
                          <span key={s} className={`chip !px-1.5 !py-0.5 !text-[10px] ${s === 'Skills' ? '!text-dim' : ''}`}>
                            {s === 'Skills' ? 'skills list' : s}
                          </span>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="annot mt-3 normal-case tracking-normal text-[11px] text-dim">
              “Where” shows the roles my resume ties each tool to. “Skills list” means it is on my resume but not attached to a specific role.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
