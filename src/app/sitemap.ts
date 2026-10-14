import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { employers } from '@/content/systems'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/overview', ...employers.map((e) => `/systems/${e.slug}`), ...projects.map((p) => `/work/${p.slug}`)]
  return paths.map((p) => ({ url: `${siteUrl}${p}`, lastModified: new Date() }))
}
