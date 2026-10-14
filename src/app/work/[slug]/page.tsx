import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/PageShell'
import { Pending } from '@/components/Pending'
import { Reveal } from '@/components/Reveal'
import { MiniArch } from '@/components/Work'
import { getProject, projects } from '@/content/projects'
import { employers } from '@/content/systems'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug)
  if (!p) return {}
  return { title: p.name, description: p.oneLiner, alternates: { canonical: `/work/${p.slug}` }, openGraph: { title: p.name, description: p.oneLiner } }
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`s-${n}`} className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <p className="annot text-signal">{n}</p>
        <h2 id={`s-${n}`} className="heading mt-2 text-2xl">
          {title}
        </h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </section>
  )
}

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const employer = employers.find((e) => e.company === p.context)

  return (
    <PageShell back={{ href: '/#work', label: 'All work' }}>
      <article>
        <Reveal as="header">
          <p className="annot">
            {p.kind === 'professional' ? 'Professional case study · sanitized' : 'Personal project'} · {p.context} · {p.period}
          </p>
          <h1 className="display mt-6 text-[clamp(2.5rem,8vw,6.5rem)]">{p.name}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-mute">{p.oneLiner}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tech stack">
            {p.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16">
          <Block n="01" title="The problem">
            {p.problem ? <p className="text-lg leading-relaxed text-fg/90">{p.problem}</p> : <Pending what="A short description of the problem this solved." />}
          </Block>

          <Block n="02" title="Technical approach">
            {p.approach ? <p className="text-lg leading-relaxed text-fg/90">{p.approach}</p> : <Pending what="How it was built: main components and stack." />}
          </Block>

          <Block n="03" title="Architecture">
            <div className="plate border border-line bg-panel/40 p-5">
              <MiniArch nodes={p.architecture.nodes} />
              <p className="annot mt-4 normal-case tracking-normal text-[11px] text-dim">{p.architecture.note}</p>
            </div>
            <Pending className="mt-4" what="A sanitized architecture diagram or screenshot, if it can be shared." />
          </Block>

          <Block n="04" title="My contribution">
            {p.contribution ? (
              <ul className="space-y-3">
                {p.contribution.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-fg/90">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending what="Your specific role and responsibilities on this project." />
            )}
          </Block>

          <Block n="05" title="Key technical decisions">
            {p.decisions ? (
              <dl className="space-y-5">
                {p.decisions.map((d) => (
                  <div key={d.title}>
                    <dt className="font-semibold">{d.title}</dt>
                    <dd className="mt-1 leading-relaxed text-mute">{d.body}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Pending what="Two or three decisions you made and why, e.g. data model, sync strategy, auth flow." />
            )}
          </Block>

          <Block n="06" title="Challenges">
            {p.challenges ? (
              <ul className="space-y-3">
                {p.challenges.map((c) => (
                  <li key={c} className="leading-relaxed text-fg/90">
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending what="What was hard, and how you worked through it." />
            )}
          </Block>

          <Block n="07" title="Outcomes">
            {p.outcomes ? (
              <ul className="space-y-4">
                {p.outcomes.map((o) => (
                  <li key={o.text}>
                    <p className="text-lg leading-relaxed text-fg/90">{o.text}</p>
                    <p className="annot mt-1 text-dim">Source: {o.source}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending what="Results you can support with evidence." />
            )}
          </Block>

          <Block n="08" title="Stack & links">
            <p className="font-mono text-sm text-mute">{p.stack.join(' · ')}</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {p.links.repo ? (
                <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="btn">
                  Repository <ArrowUpRight size={14} aria-hidden />
                </a>
              ) : (
                <Pending what={p.kind === 'professional' ? 'Repository: private employer code, not public.' : 'Repository link.'} />
              )}
              {p.links.demo ? (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="btn">
                  Live demo <ArrowUpRight size={14} aria-hidden />
                </a>
              ) : (
                <Pending what={p.kind === 'professional' ? 'Live demo: internal system, not public.' : 'Live demo link.'} />
              )}
            </div>
          </Block>
        </div>

        {employer ? (
          <Link href={`/systems/${employer.slug}`} className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <span className="link-u">See the {employer.company} system</span>
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        ) : null}
      </article>
    </PageShell>
  )
}
