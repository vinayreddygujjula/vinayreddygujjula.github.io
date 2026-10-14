import Link from 'next/link'
import { PageShell } from '@/components/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <div className="py-16">
        <p className="annot text-signal">404 · route not found</p>
        <h1 className="display mt-6 text-[clamp(3rem,10vw,8rem)]">No service here.</h1>
        <p className="mt-6 max-w-lg text-lg text-mute">The page you asked for does not exist. It may have moved, or the link may be mistyped.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to the control room
        </Link>
      </div>
    </PageShell>
  )
}
