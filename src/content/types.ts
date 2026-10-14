// Shared content types. Every piece of copy on the site is typed here so a typo
// in a data file fails the build instead of rendering a broken section.

export type Link = { label: string; href: string }

export type Profile = {
  name: string
  role: string
  title: string
  tagline: string
  intro: string
  summary: string
  yearsExperience: string
  location: string
  timeZone: string
  identityStrip: string[]
  domains: string[]
  email: string
  /** Full URL, or null to hide. */
  linkedin: string | null
  /** Full URL, or null. While null the site shows a non-clickable "pending" label. */
  github: string | null
  /** Path under /public, or null to hide download buttons. */
  resumeUrl: string | null
  /** Education is not on the source resume. Leave null until confirmed. */
  education: { school: string; degree: string; period?: string }[] | null
}

/** A node in an illustrative architecture diagram. Grid coordinates, not pixels. */
export type ArchNode = {
  id: string
  label: string
  sub: string
  col: number
  row: number
  /** Plain-language description, for non-technical readers. */
  plain: string
}

export type ArchEdge = { from: string; to: string; async?: boolean }

/** A "lens" highlights part of a diagram and explains one engineering concern. */
export type Lens = {
  id: string
  label: string
  nodes: string[]
  title: string
  body: string
  /** Resume-backed contributions relevant to this lens, by index into `contributions`. */
  refs: number[]
}

export type Metric = {
  value: string
  label: string
  /** The exact scope the resume gives this number. Rendered next to it, always. */
  context: string
}

export type Employer = {
  slug: string
  company: string
  location: string
  role: string
  start: string
  end: string
  startDate: string // ISO yyyy-mm, used by the journey axis
  endDate: string | null
  domain: 'Banking' | 'Education' | 'Healthcare'
  /** Environment hue. Each employer subtly re-tints the explorer. */
  hue: string
  headline: string
  summary: string
  themes: string[]
  stack: string[]
  contributions: string[]
  /** Indexes into `contributions` shown in the Quick Overview. */
  keyRefs: number[]
  metrics: Metric[]
  projects?: string[]
  diagram: { title: string; caption: string; nodes: ArchNode[]; edges: ArchEdge[] }
  lenses: Lens[]
}

export type StackTech = { name: string; note: string; seenAt: string[] }

export type StackLayer = {
  id: string
  index: string
  name: string
  short: string
  role: string
  inPractice: string
  techs: StackTech[]
}

export type ProjectSection<T> = T | null // null renders a visible "to be provided" placeholder

export type Project = {
  slug: string
  kind: 'professional' | 'personal'
  name: string
  context: string
  period: string
  oneLiner: string
  problem: ProjectSection<string>
  approach: ProjectSection<string>
  architecture: { nodes: string[]; note: string }
  contribution: ProjectSection<string[]>
  decisions: ProjectSection<{ title: string; body: string }[]>
  challenges: ProjectSection<string[]>
  outcomes: ProjectSection<{ text: string; source: string }[]>
  stack: string[]
  links: { repo: string | null; demo: string | null }
  /** Checklist of details still to provide. Not rendered; kept next to the content it describes. */
  needs: string[]
}

export type FlowNode = {
  id: string
  label: string
  tech: string
  plain: string
  practice: string
  tags: string[]
}
