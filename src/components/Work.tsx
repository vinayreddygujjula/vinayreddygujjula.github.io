import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/content/projects'
import { Reveal } from './Reveal'

export function MiniArch({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2 font-mono text-[11px]" aria-label="Simplified flow">
      {nodes.map((n, i) => (
        <li key={n} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden className="flex items-center px-1 text-dim">
              <span className="h-px w-4 bg-line-2" />›
            </span>
          ) : null}
          <span className="border border-line-2 bg-ink px-2 py-1 text-mute">{n}</span>
        </li>
      ))}
    </ol>
  )
}

export function Work() {
  const professional = projects.filter((p) => p.kind === 'professional')
  const personal = projects.filter((p) => p.kind === 'personal')

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
        <h3 className="annot text-fg">A · Professional case studies</h3>
        <p className="annot text-dim">Sanitized · from my resume · no confidential detail</p>
      </div>

      <ol>
        {professional.map((p, i) => (
          <Reveal as="li" key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors hover:bg-panel/50 md:grid-cols-12 md:gap-6 md:px-2 md:py-10"
            >
              <span className="display text-4xl text-dim transition-colors group-hover:text-signal md:col-span-1 md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="md:col-span-6">
                <span className="annot block">
                  {p.context} · {p.period}
                </span>
                <span className="heading mt-2 block text-3xl md:text-[2.6rem]">{p.name}</span>
                <span className="mt-3 block max-w-xl leading-relaxed text-mute">{p.oneLiner}</span>
              </span>
              <div className="flex flex-col justify-between gap-5 md:col-span-5">
                <MiniArch nodes={p.architecture.nodes} />
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-dim">{p.stack.join(' · ')}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-wider text-fg">
                    Case study
                    <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
        <h3 className="annot text-fg">B · Personal projects</h3>
        <p className="annot text-dim">{personal.length ? `${personal.length} projects` : 'Slot reserved'}</p>
      </div>

      {personal.length ? (
        <ul className="grid grid-cols-1 gap-px bg-line md:grid-cols-2">
          {personal.map((p) => (
            <li key={p.slug} className="bg-ink">
              <Link href={`/work/${p.slug}`} className="block p-6 hover:bg-panel/60">
                <span className="heading block text-2xl">{p.name}</span>
                <span className="mt-2 block text-mute">{p.oneLiner}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-1 gap-6 border-b border-dashed border-line-2 py-10 md:grid-cols-12">
          <p className="display text-4xl text-line-2 md:col-span-1 md:text-5xl" aria-hidden>
            —
          </p>
          <div className="md:col-span-7">
            <p className="heading text-2xl text-mute">Personal builds will be documented here.</p>
            <p className="mt-3 max-w-xl leading-relaxed text-dim">
              This space is intentionally empty rather than filled with placeholder repositories. Each personal project will get the same
              treatment as the case studies above: problem, approach, architecture, decisions and evidence-backed outcomes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
