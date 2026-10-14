import { chapters, threads } from '@/content/journey'
import { employers } from '@/content/systems'
import { Reveal } from './Reveal'

const AXIS_START = new Date(2020, 0, 1).getTime()

function toTime(ym: string | null, now: number) {
  if (!ym) return now
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1).getTime()
}

export function Journey() {
  const now = Date.now()
  const span = now - AXIS_START
  const pct = (t: number) => ((t - AXIS_START) / span) * 100
  const endYear = new Date(now).getFullYear()
  const years = Array.from({ length: endYear - 2020 + 1 }, (_, i) => 2020 + i)

  const ranges = Object.fromEntries(
    employers.map((e) => {
      const s = pct(toTime(e.startDate, now))
      // endDate is the last month worked, so the bar runs to the end of that month.
      const end = e.endDate ? toTime(e.endDate, now) + 31 * 864e5 : now
      return [e.slug, { left: s, width: pct(Math.min(end, now)) - s, emp: e }]
    }),
  )

  return (
    <div className="mt-12">
      {/* Desktop: a proportional time chart with technology threads. */}
      <Reveal className="hidden md:block">
        <figure aria-labelledby="journey-fig" className="plate border border-line bg-panel/30 p-6 lg:p-8">
          <figcaption id="journey-fig" className="annot mb-6 flex justify-between">
            <span>
              <span className="text-signal">Fig. 04</span> Roles to scale, with the technologies each one used
            </span>
            <span className="text-dim">Source: resume</span>
          </figcaption>

          <div className="grid grid-cols-[200px_1fr] gap-x-6 lg:grid-cols-[240px_1fr]">
            <div />
            <div className="relative h-6 border-b border-line" aria-hidden>
              {years.map((y) => (
                <span key={y} className="absolute bottom-0 font-mono text-[10px] text-dim" style={{ left: `${pct(new Date(y, 0, 1).getTime())}%` }}>
                  <span className="absolute bottom-0 h-2 w-px bg-line-2" />
                  <span className="relative -top-3 pl-1.5">{y}</span>
                </span>
              ))}
            </div>

            <div className="annot flex items-center py-3">Role</div>
            <div className="relative h-[76px]">
              {chapters.map((c) => {
                const r = ranges[c.employer]
                return (
                  <div
                    key={c.employer}
                    className="absolute inset-y-2 overflow-hidden border-l-2 bg-ink px-3 py-2"
                    style={{ left: `${r.left}%`, width: `${r.width}%`, borderColor: r.emp.hue }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: r.emp.hue }}>
                      {c.number} · {r.emp.domain}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold">{r.emp.company}</p>
                    <p className="truncate font-mono text-[10px] text-dim">
                      {r.emp.start} — {r.emp.end}
                    </p>
                  </div>
                )
              })}
            </div>

            {threads.map((t) => (
              <div key={t.name} className="contents">
                <div className="flex items-center border-t border-line py-2.5 font-mono text-[11px] text-mute">{t.name}</div>
                <div className="relative border-t border-line">
                  {t.at.map((slug) => {
                    const r = ranges[slug]
                    return (
                      <span
                        key={slug}
                        className="absolute top-1/2 h-[3px] -translate-y-1/2"
                        style={{ left: `${r.left}%`, width: `${r.width}%`, background: r.emp.hue, opacity: 0.85 }}
                        title={`${t.name} at ${r.emp.company}`}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <table className="sr-only">
            <caption>Technologies by role</caption>
            <thead>
              <tr>
                <th scope="col">Technology</th>
                {chapters.map((c) => (
                  <th key={c.employer} scope="col">
                    {ranges[c.employer].emp.company}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {threads.map((t) => (
                <tr key={t.name}>
                  <th scope="row">{t.name}</th>
                  {chapters.map((c) => (
                    <td key={c.employer}>{t.at.includes(c.employer) ? 'Yes' : 'No'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </Reveal>

      {/* Narrative chapters: three columns on desktop, a vertical story on mobile. */}
      <ol className="mt-10 grid grid-cols-1 gap-px bg-line md:mt-12 md:grid-cols-3">
        {chapters.map((c, i) => {
          const e = ranges[c.employer].emp
          const earlier = chapters.slice(0, i).map((x) => x.employer)
          const here = threads.filter((t) => t.at.includes(c.employer))
          const carried = here.filter((t) => t.at.some((s) => earlier.includes(s)))
          const fresh = here.filter((t) => !t.at.some((s) => earlier.includes(s)))
          return (
            <Reveal as="li" key={c.employer} delay={i * 0.08} className="relative bg-ink p-6 lg:p-8">
              <span aria-hidden className="absolute left-0 top-0 h-[2px] w-12" style={{ background: e.hue }} />
              <p className="annot" style={{ color: e.hue }}>
                Chapter {c.number} · {e.domain}
              </p>
              <p className="annot mt-1 text-dim">
                {e.start} — {e.end}
              </p>
              <h3 className="heading mt-5 text-2xl leading-tight lg:text-3xl">{c.title}</h3>
              <p className="mt-2 text-sm text-mute">
                {e.role}, {e.company}
              </p>
              <p className="mt-4 leading-relaxed text-fg/85">{c.body}</p>

              <div className="mt-6 space-y-3">
                {carried.length ? (
                  <div>
                    <p className="annot text-dim">Carried forward</p>
                    <p className="mt-1 font-mono text-[11px] leading-relaxed text-mute">{carried.map((t) => t.name).join(' / ')}</p>
                  </div>
                ) : null}
                <div>
                  <p className="annot text-dim">{i === 0 ? 'Foundations' : 'First appears here'}</p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-fg/80">{fresh.length ? fresh.map((t) => t.name).join(' / ') : '—'}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}
