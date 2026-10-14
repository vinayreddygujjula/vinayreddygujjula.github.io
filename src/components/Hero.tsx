import { ArrowDownRight, ArrowUpRight, FileText, Mail } from 'lucide-react'
import { profile } from '@/content/profile'
import { LocalClock } from './LocalClock'
import { Reveal } from './Reveal'
import { SystemFlow } from './SystemFlow'

export function Hero() {
  const [first, last] = profile.name.toUpperCase().split(' ')

  return (
    <section id="home" aria-labelledby="hero-name" className="relative pt-20 md:pt-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="annot">
          <span className="text-signal">00</span> <span className="text-dim">/</span> Workspace · {profile.location}
        </p>
        <LocalClock timeZone={profile.timeZone} place="Columbus, OH" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        <div className="lg:col-span-12">
          <h1 id="hero-name" className="display text-[clamp(3.4rem,19vw,10rem)] text-fg">
            <span className="block">{first}</span>
            <span className="block pl-[0.3em] sm:pl-[0.6em]">
              {last}
              <span className="text-signal">.</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col lg:col-span-5 lg:col-start-8 lg:mt-6">
          <p className="heading text-3xl md:text-4xl">{profile.role}.</p>
          <p className="mt-2 font-mono text-sm text-info">{profile.tagline}</p>
          <p className="mt-6 max-w-md leading-relaxed text-mute">{profile.intro}</p>
        </div>
      </div>

      {/* Identity strip */}
      <Reveal delay={0.2}>
        <div className="mt-10 grid grid-cols-1 gap-4 border-y border-line py-4 md:grid-cols-12 md:items-center">
          <p className="font-mono text-sm tracking-[0.18em] text-fg md:col-span-8 md:text-base">
            {profile.identityStrip.map((s, i) => (
              <span key={s}>
                {i > 0 ? <span className="px-2 text-dim md:px-3">/</span> : null}
                {s.toUpperCase()}
              </span>
            ))}
          </p>
          <p className="annot md:col-span-4 md:text-right">
            {profile.yearsExperience} years · {profile.domains.join(' · ')}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Primary links">
          <li>
            <a href="#systems" className="btn btn-primary">
              Explore my work <ArrowDownRight size={15} aria-hidden />
            </a>
          </li>
          {profile.resumeUrl ? (
            <li>
              <a href={profile.resumeUrl} target="_blank" rel="noopener" className="btn">
                <FileText size={14} aria-hidden /> View resume
              </a>
            </li>
          ) : null}
          {profile.linkedin ? (
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
                LinkedIn <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
          ) : null}
          <li>
            <a href={`mailto:${profile.email}`} className="btn">
              <Mail size={14} aria-hidden /> Email
            </a>
          </li>
          <li>
            {profile.github ? (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
                GitHub
              </a>
            ) : (
              <span className="annot inline-flex min-h-[44px] items-center px-2 text-dim" title="GitHub link not added yet">
                GitHub · link coming soon
              </span>
            )}
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 md:mt-24">
        <SystemFlow />
      </Reveal>
    </section>
  )
}
