import type { Metadata, Viewport } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { profile } from '@/content/profile'
import { siteUrl } from '@/lib/site'
import './globals.css'

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' })
const code = JetBrains_Mono({ subsets: ['latin'], variable: '--font-code', display: 'swap' })

const title = `${profile.name}: ${profile.role}`
const description = `${profile.title} with ${profile.yearsExperience} years building Spring Boot microservices, Kafka event-driven systems, secure APIs and React applications on AWS, across banking, education and healthcare.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  keywords: ['Java', 'Spring Boot', 'Kafka', 'Microservices', 'React', 'AWS', 'Full Stack Developer', 'Software Engineer'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: profile.name, title, description },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#080B10', colorScheme: 'dark' }

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Columbus', addressRegion: 'OH', addressCountry: 'US' },
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
  knowsAbout: ['Java', 'Spring Boot', 'Apache Kafka', 'Microservices', 'React', 'AWS', 'Kubernetes'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${code.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
