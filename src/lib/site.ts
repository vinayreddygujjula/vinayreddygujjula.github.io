// Set NEXT_PUBLIC_SITE_URL in your hosting provider (e.g. https://vinayreddy.dev)
// so canonical URLs, the sitemap and Open Graph images point at the real domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export const sections = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'systems', label: 'Systems', index: '01' },
  { id: 'stack', label: 'Stack', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'journey', label: 'Journey', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
] as const

export type SectionId = (typeof sections)[number]['id']
