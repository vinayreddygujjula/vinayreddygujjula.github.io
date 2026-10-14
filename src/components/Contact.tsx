import { ArrowUpRight, Download } from 'lucide-react'
import { profile } from '@/content/profile'
import { CopyEmail } from './CopyEmail'
import { Reveal } from './Reveal'

export function Contact() {
  const channels = [
    profile.linkedin ? { label: 'LinkedIn', value: profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '').replace(/\/$/, ''), href: profile.linkedin, external: true } : null,
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
    profile.github ? { label: 'GitHub', value: profile.github.replace(/^https?:\/\/(www\.)?/, ''), href: profile.github, external: true } : null,
  ].filter((c): c is NonNullable<typeof c> => c !== null)

  return (
    <div className="mt-12">
      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="group block font-sans text-[clamp(1.4rem,5.6vw,4rem)] [overflow-wrap:anywhere] font-extrabold leading-none tracking-[-0.03em] [font-stretch:112%]"
        >
          <span className="link-u text-fg transition-colors group-hover:text-signal">{profile.email}</span>
        </a>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        <CopyEmail email={profile.email} className="btn btn-primary" />
        {profile.resumeUrl ? (
          <a href={profile.resumeUrl} download className="btn">
            <Download size={14} aria-hidden /> Download resume (PDF)
          </a>
        ) : null}
      </div>

      <dl className="mt-16 grid grid-cols-1 border-t border-line md:grid-cols-3">
        {channels.map((c) => (
          <div key={c.label} className="border-b border-line py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
            <dt className="annot">{c.label}</dt>
            <dd className="mt-2">
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group inline-flex items-center gap-1.5 text-lg"
              >
                <span className="link-u">{c.value}</span>
                <ArrowUpRight size={15} aria-hidden className="text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </dd>
          </div>
        ))}
        {!profile.github ? (
          <div className="py-5 md:px-5">
            <dt className="annot">GitHub</dt>
            <dd className="mt-2 text-lg text-dim">Link coming soon</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-8 max-w-xl text-mute">
        Based in {profile.location}. Email is the fastest way to reach me.
      </p>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line pb-24 pt-6 lg:pb-8">
      <div className="annot flex flex-wrap justify-between gap-3 text-dim">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js, TypeScript, Tailwind CSS and Motion · diagrams are illustrative</span>
      </div>
    </footer>
  )
}
