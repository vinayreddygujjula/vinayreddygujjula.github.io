import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/PageShell'
import { Reveal } from '@/components/Reveal'
import { Environment } from '@/components/SystemsExplorer'
import { getProject } from '@/content/projects'
import { employers, getEmployer } from '@/content/systems'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return employers.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const e = getEmployer((await params).slug)
  if (!e) return {}
  const title = `${e.company}: ${e.role}`
  return { title, description: e.summary, alternates: { canonical: `/systems/${e.slug}` }, openGraph: { title, description: e.summary } }
}

export default async function SystemPage({ params }: Params) {
  const emp = getEmployer((await params).slug)
  if (!emp) notFound()
  const i = employers.indexOf(emp)
  const prev = employers[i - 1]
  const next = employers[i + 1]
  const related = (emp.projects ?? []).map(getProject).filter((p) => !!p)

  return (
    <PageShell back={{ href: '/#systems', label: 'All systems' }}>
      <article style={{ '--hue': emp.hue } as React.CSSProperties}>
        <Reveal as="header">
          <p className="annot" style={{ color: emp.hue }}>
            Case study · {emp.domain}
          </p>
          <h1 className="display mt-6 text-[clamp(2.75rem,9vw,7rem)]">{emp.company}</h1>
          <dl className="mt-8 grid grid-cols-1 gap-4 border-y border-line py-4 sm:grid-cols-3">
            {[
              ['Role', emp.role],
              ['Period', `${emp.start} — ${emp.end}`],
              ['Location', emp.location],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="annot">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
            <p className="heading text-2xl leading-tight md:col-span-5 md:text-3xl">{emp.headline}</p>
            <p className="text-lg leading-relaxed text-mute md:col-span-7">{emp.summary}</p>
          </div>
        </Reveal>

        <section aria-labelledby="explore" className="mt-16">
          <h2 id="explore" className="annot mb-4 text-fg">
            Explore the generalized system
          </h2>
          <Environment emp={emp} standalone />
        </section>

        <section aria-labelledby="all" className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12">
          <h2 id="all" className="heading text-3xl md:col-span-4">
            Everything I worked on here
          </h2>
          <ol className="md:col-span-8">
            {emp.contributions.map((c, n) => (
              <li key={c} className="grid grid-cols-[3rem_1fr] border-t border-line py-4 leading-relaxed">
                <span className="font-mono text-[11px] text-dim">{String(n + 1).padStart(2, '0')}</span>
                <span className="text-fg/90">{c}</span>
              </li>
            ))}
          </ol>
        </section>

        {related.length ? (
          <section aria-labelledby="rel" className="mt-20">
            <h2 id="rel" className="annot text-fg">
              Related case studies
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
              {related.map((p) => (
                <li key={p!.slug} className="bg-ink">
                  <Link href={`/work/${p!.slug}`} className="group flex items-center justify-between gap-4 p-5 hover:bg-panel">
                    <span className="heading text-xl">{p!.name}</span>
                    <ArrowRight size={16} aria-hidden className="text-mute transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav aria-label="Other systems" className="mt-20 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
          {prev ? (
            <Link href={`/systems/${prev.slug}`} className="group bg-ink p-5 hover:bg-panel">
              <span className="annot inline-flex items-center gap-2">
                <ArrowLeft size={12} aria-hidden /> More recent
              </span>
              <span className="heading mt-2 block text-xl">{prev.company}</span>
            </Link>
          ) : (
            <span className="bg-ink" />
          )}
          {next ? (
            <Link href={`/systems/${next.slug}`} className="group bg-ink p-5 text-right hover:bg-panel">
              <span className="annot inline-flex items-center gap-2">
                Earlier <ArrowRight size={12} aria-hidden />
              </span>
              <span className="heading mt-2 block text-xl">{next.company}</span>
            </Link>
          ) : (
            <span className="bg-ink" />
          )}
        </nav>
      </article>
    </PageShell>
  )
}
