'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn">
      <Printer size={14} aria-hidden /> Print / save as PDF
    </button>
  )
}
