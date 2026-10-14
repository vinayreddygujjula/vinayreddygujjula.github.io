import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static HTML export for GitHub Pages. trailingSlash makes /overview → /overview/index.html,
  // which Pages serves without any rewrite rules.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
