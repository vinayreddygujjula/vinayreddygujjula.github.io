'use client'

import { motion } from 'motion/react'
import { useId, useState } from 'react'
import type { ArchEdge, ArchNode } from '@/content/types'

const COL = 184
const ROW = 112
const W = 152
const H = 64
const PAD_X = 16
const PAD_Y = 22

const box = (n: ArchNode) => ({ x: n.col * COL + PAD_X, y: n.row * ROW + PAD_Y })

/** Orthogonal route between two nodes: straight when aligned, one elbow otherwise. */
function route(a: ArchNode, b: ArchNode): string {
  const A = box(a)
  const B = box(b)
  if (a.row === b.row) {
    const [l, r] = a.col < b.col ? [A, B] : [B, A]
    const y = l.y + H / 2
    return `M${l.x + W} ${y} H${r.x}`
  }
  if (a.col === b.col) {
    const [t, u] = a.row < b.row ? [A, B] : [B, A]
    const x = t.x + W / 2
    return `M${x} ${t.y + H} V${u.y}`
  }
  const rightward = b.col > a.col
  const sx = rightward ? A.x + W : A.x
  const sy = A.y + H / 2
  const ex = rightward ? B.x : B.x + W
  const ey = B.y + H / 2
  const mx = (sx + ex) / 2
  return `M${sx} ${sy} H${mx} V${ey} H${ex}`
}

type Props = {
  title: string
  nodes: ArchNode[]
  edges: ArchEdge[]
  active: string[]
  hue: string
  onPick: (nodeId: string) => void
}

export function ArchitectureMap({ title, nodes, edges, active, hue, onPick }: Props) {
  const [hover, setHover] = useState<ArchNode | null>(null)
  const titleId = useId()
  const markerId = `arr-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const cols = Math.max(...nodes.map((n) => n.col)) + 1
  const rows = Math.max(...nodes.map((n) => n.row)) + 1
  const vw = cols * COL + PAD_X
  const vh = rows * ROW + PAD_Y
  const on = (id: string) => active.includes(id)

  return (
    <div>
      <svg viewBox={`0 0 ${vw} ${vh}`} className="w-full" role="group" aria-labelledby={titleId}>
        <title id={titleId}>{`${title}. Select a component to focus the matching engineering topic.`}</title>
        <defs>
          <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L8 4 L0 8 z" fill="context-stroke" />
          </marker>
        </defs>

        {edges.map((e) => {
          const lit = on(e.from) && on(e.to)
          return (
            <path
              key={`${e.from}-${e.to}`}
              d={route(byId[e.from], byId[e.to])}
              fill="none"
              stroke={lit ? hue : 'var(--color-line-2)'}
              strokeWidth={lit ? 1.5 : 1}
              strokeDasharray={e.async ? '3 5' : undefined}
              className={e.async && lit ? 'flowline' : undefined}
              style={{ transition: 'stroke .45s, stroke-width .45s' }}
              markerEnd={`url(#${markerId})`}
            />
          )
        })}

        {nodes.map((n) => {
          const { x, y } = box(n)
          const lit = on(n.id)
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${n.label}, ${n.sub}. ${n.plain}`}
              aria-pressed={lit}
              onClick={() => onPick(n.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onPick(n.id)
                }
              }}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none [&:focus-visible>rect:first-child]:stroke-signal"
            >
              <motion.rect
                x={x}
                y={y}
                width={W}
                height={H}
                initial={false}
                animate={{
                  fill: lit ? `color-mix(in oklab, ${hue} 10%, #080b10)` : '#0c1016',
                  stroke: lit ? hue : hover?.id === n.id ? '#8b98a9' : '#2a3442',
                }}
                transition={{ duration: 0.4 }}
                strokeWidth={1}
              />
              {lit ? <rect x={x} y={y + H - 2} width={W} height={2} fill={hue} /> : null}
              <text x={x + 12} y={y + 26} className="font-sans" fontSize="15" fontWeight={650} fill={lit ? '#f5f7fa' : '#8b98a9'} style={{ transition: 'fill .4s' }}>
                {n.label}
              </text>
              <text x={x + 12} y={y + 46} className="font-mono" fontSize="10.5" fill={lit ? '#8b98a9' : '#5d6878'} style={{ transition: 'fill .4s' }}>
                {n.sub.length > 24 ? `${n.sub.slice(0, 23)}…` : n.sub}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="annot mt-3 min-h-[2.5em] normal-case tracking-normal text-[12px]" aria-hidden>
        {hover ? (
          <>
            <span className="text-fg">{hover.label}</span> <span className="text-dim">·</span> {hover.plain}
          </>
        ) : (
          <span className="text-dim">Hover or focus a component for a plain-language description.</span>
        )}
      </p>
    </div>
  )
}
