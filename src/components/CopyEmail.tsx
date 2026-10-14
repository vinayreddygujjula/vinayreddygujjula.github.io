'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

type State = 'idle' | 'copied' | 'failed'

function legacyCopy(text: string): boolean {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    ta.remove()
  }
}

export function CopyEmail({ email, className = 'btn' }: { email: string; className?: string }) {
  const [state, setState] = useState<State>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const t = setTimeout(() => setState('idle'), 2400)
    return () => clearTimeout(t)
  }, [state])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      // The async Clipboard API can be blocked (insecure origin, iframes, permissions).
      // Fall back to the legacy copy command, and say so honestly if that fails too.
      setState(legacyCopy(email) ? 'copied' : 'failed')
    }
  }

  return (
    <>
      <button type="button" onClick={copy} className={className}>
        {state === 'copied' ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy blocked: select it instead' : 'Copy email'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied' ? 'Email address copied to clipboard' : state === 'failed' ? 'Could not copy. Your browser blocked clipboard access.' : ''}
      </span>
    </>
  )
}
