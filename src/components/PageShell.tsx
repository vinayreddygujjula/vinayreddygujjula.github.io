import { ArrowLeft, Download, PanelsTopLeft } from 'lucide-react'
import Link from 'next/link'
import { profile } from '@/content/profile'
import { Footer } from './Contact'
import { Providers } from './Providers'

type Props = { children: React.ReactNode; back?: { href: string; label: string }; hideOverview?: boolean }

/** Frame for every page other than home: a slim bar with a way back, then content. */
export function PageShell({ children, back = { href: '/', label: 'Control room' }, hideOverview = false }: Props) {
  return (
    <Providers>
      <header className="no-print sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-3 px-4 md:px-8">
          <Link href={back.href} className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mute hover:text-fg">
            <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
            {back.label}
          </Link>
          <nav aria-label="Shortcuts" className="flex items-center gap-2">
            {hideOverview ? null : (
              <Link href="/overview" className="btn !min-h-9 !px-3 border-signal/60 text-signal hover:!border-signal">
                <PanelsTopLeft size={14} aria-hidden /> <span className="hidden sm:inline">Quick overview</span>
                <span className="sm:hidden">Overview</span>
              </Link>
            )}
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} download className="btn !min-h-9 !px-3">
                <Download size={14} aria-hidden /> Resume
              </a>
            ) : null}
          </nav>
        </div>
      </header>
      <div className="sheet min-h-dvh">
        <main id="main" className="mx-auto max-w-[1200px] px-4 pt-12 md:px-8 md:pt-20">
          {children}
          <div className="no-print">
            <Footer />
          </div>
        </main>
      </div>
    </Providers>
  )
}
