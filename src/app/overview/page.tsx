import type { Metadata } from 'next'
import { Download, Mail } from 'lucide-react'
import { CopyEmail } from '@/components/CopyEmail'
import { PageShell } from '@/components/PageShell'
import { PrintButton } from '@/components/PrintButton'
import { profile } from '@/content/profile'
import { employers } from '@/content/systems'

export const metadata: Metadata = {
  title: 'Quick overview',
  description: `${profile.name}, ${profile.title}: summary, experience, skills and contact on one page.`,
  alternates: { canonical: '/overview' },
}

// Mirrors the skills section of the resume.
const skills: [string, string][] = [
  ['Backend', 'Java, Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, Spring Cloud, REST, GraphQL, API versioning'],
  ['Messaging & data', 'Kafka, PostgreSQL, MySQL, SQL Server, MongoDB, Redis'],
  ['Cloud & DevOps', 'AWS (EC2, S3, RDS, Lambda, API Gateway, IAM, EKS, ECR), Docker, Kubernetes, Terraform, GitHub Actions, GitLab CI/CD'],
  ['Security', 'Spring Security, JWT, OAuth2, RBAC, CORS, HTTPS, AES encryption'],
  ['Frontend', 'React.js, JavaScript, HTML5, CSS3, Bootstrap, Angular'],
  ['Quality & tooling', 'JUnit 5, Mockito, TDD, Postman, SonarQube, Swagger / OpenAPI, CloudWatch, Log4j, Maven, Git'],
]

const extraAchievements = [
  { text: 'Built CI/CD that publishes Docker images to Amazon ECR and deploys to EKS with autoscaling and rolling deployments.', where: 'Heartland Bank' },
  { text: 'Led API integration across multiple healthcare platforms for secure, reliable data exchange.', where: 'Optum' },
]

export default function OverviewPage() {
  const achievements = employers.flatMap((e) => e.metrics.map((m) => ({ ...m, where: e.company })))

  return (
    <PageShell hideOverview>
      <article className="print-plain mx-auto max-w-3xl">
        <header className="border-b border-line pb-8">
          <p className="annot text-signal">Quick overview · about a minute to read</p>
          <h1 className="heading mt-4 text-5xl md:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl text-mute">
            {profile.title} · {profile.yearsExperience} years · {profile.location}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            <li>
              <a className="link-u" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            {profile.linkedin ? (
              <li>
                <a className="link-u" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            ) : null}
            {profile.github ? (
              <li>
                <a className="link-u" href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            ) : null}
          </ul>
          <div className="no-print mt-6 flex flex-wrap gap-2">
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} download className="btn btn-primary">
                <Download size={14} aria-hidden /> Download resume
              </a>
            ) : null}
            <a href={`mailto:${profile.email}`} className="btn">
              <Mail size={14} aria-hidden /> Email
            </a>
            <CopyEmail email={profile.email} />
            <PrintButton />
          </div>
        </header>

        <section aria-labelledby="ov-summary" className="border-b border-line py-8">
          <h2 id="ov-summary" className="annot">
            Summary
          </h2>
          <p className="mt-3 text-lg leading-relaxed">{profile.summary}</p>
        </section>

        <section aria-labelledby="ov-exp" className="border-b border-line py-8">
          <h2 id="ov-exp" className="annot">
            Experience
          </h2>
          <div className="mt-4 space-y-8">
            {employers.map((e) => (
              <div key={e.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-xl font-semibold">
                    {e.role}, {e.company}
                  </h3>
                  <p className="font-mono text-[12px] text-mute">
                    {e.start} — {e.end}
                  </p>
                </div>
                <p className="text-sm text-mute">
                  {e.location} · {e.domain}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-fg/90 marker:text-dim">
                  {e.keyRefs.map((r) => (
                    <li key={r}>{e.contributions[r]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="ov-skills" className="border-b border-line py-8">
          <h2 id="ov-skills" className="annot">
            Key skills
          </h2>
          <dl className="mt-4 space-y-3">
            {skills.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-1 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-fg/85">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="ov-ach" className="border-b border-line py-8">
          <h2 id="ov-ach" className="annot">
            Selected achievements
          </h2>
          <ul className="mt-4 space-y-3">
            {achievements.map((a) => (
              <li key={a.label} className="grid grid-cols-[4rem_1fr] gap-3">
                <span className="font-mono text-lg text-signal">{a.value}</span>
                <span className="leading-relaxed">
                  {a.label[0].toUpperCase() + a.label.slice(1)} <span className="text-mute">({a.where}). {a.context}</span>
                </span>
              </li>
            ))}
            {extraAchievements.map((a) => (
              <li key={a.text} className="grid grid-cols-[4rem_1fr] gap-3">
                <span aria-hidden className="font-mono text-lg text-signal">
                  —
                </span>
                <span className="leading-relaxed">
                  {a.text} <span className="text-mute">({a.where})</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {profile.education ? (
          <section aria-labelledby="ov-edu" className="border-b border-line py-8">
            <h2 id="ov-edu" className="annot">
              Education
            </h2>
            <ul className="mt-4 space-y-2">
              {profile.education.map((ed) => (
                <li key={ed.school}>
                  <span className="font-semibold">{ed.degree}</span>, {ed.school}
                  {ed.period ? <span className="text-mute"> · {ed.period}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </PageShell>
  )
}
