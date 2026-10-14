import type { Project } from './types'

// Professional case studies are sanitized: only what the resume states, in general terms.
// Any field set to null renders as a visible "to be provided" placeholder, so gaps are honest.
// Add personal projects with kind: 'personal'. They get their own section automatically.

const RESUME = 'Resume, Northwest Missouri State'

export const projects: Project[] = [
  {
    slug: 'canvas-lms-sync',
    kind: 'professional',
    name: 'Canvas LMS Data Sync',
    context: 'Northwest Missouri State University',
    period: '2024',
    oneLiner: 'Course, enrollment and assessment data ingested from Canvas automatically, instead of by manual import.',
    problem:
      'Course, enrollment and assessment data lived in Canvas LMS, while internal academic systems needed it too. Moving it across was a manual import, which is slow and easy to get wrong.',
    approach:
      'A secure synchronization between Canvas LMS and the internal academic systems that ingests course, enrollment and assessment data automatically.',
    architecture: {
      nodes: ['Canvas LMS', 'Sync service', 'Academic services', 'MySQL · MongoDB'],
      note: 'Simplified illustration. Internal details are not shown.',
    },
    contribution: [
      'Built the secure data synchronization between Canvas LMS and internal academic systems.',
      'Worked within a platform secured with JWT authentication, OAuth2 authorization and role-based access.',
    ],
    decisions: null,
    challenges: null,
    outcomes: [
      { text: 'Eliminated manual data imports.', source: RESUME },
      { text: 'Improved data accuracy for evaluations.', source: RESUME },
    ],
    stack: ['Java', 'Spring Boot', 'Canvas LMS', 'OAuth2', 'JWT'],
    links: { repo: null, demo: null },
    needs: ['Key technical decisions (e.g. scheduling, error handling, idempotency)', 'Challenges you hit and how you solved them', 'A sanitized architecture sketch or screenshot'],
  },
  {
    slug: 'auto-enroll',
    kind: 'professional',
    name: 'Auto Enroll',
    context: 'Northwest Missouri State University',
    period: '2024',
    oneLiner: 'An academic application for enrollment, part of a suite that automated most faculty and student workflows.',
    problem: null,
    approach:
      'Built with Java and Spring Boot on the backend, alongside Spring Boot microservices for enrollment, with relational and document storage.',
    architecture: {
      nodes: ['Web app', 'Enrollment service', 'MySQL · MongoDB', 'AWS'],
      note: 'Simplified illustration. Internal details are not shown.',
    },
    contribution: [
      'Built the application as part of the academic application suite.',
      'Developed Spring Boot microservices for enrollment.',
    ],
    decisions: null,
    challenges: null,
    outcomes: [
      {
        text: 'Part of the application suite (with Time Clock and the Textbook Finder) credited with automating 75% of faculty and student workflows.',
        source: RESUME,
      },
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'MongoDB'],
    links: { repo: null, demo: null },
    needs: ['The problem in one or two sentences', 'Which front end it used (Angular or React)', 'Decisions, challenges, and a screenshot if allowed'],
  },
  {
    slug: 'time-clock',
    kind: 'professional',
    name: 'Time Clock',
    context: 'Northwest Missouri State University',
    period: '2024',
    oneLiner: 'An academic application for time and attendance, built on Spring Boot services.',
    problem: null,
    approach: 'Built with Java and Spring Boot, alongside Spring Boot microservices for attendance tracking and scheduling.',
    architecture: {
      nodes: ['Web app', 'Attendance service', 'Scheduling service', 'Database'],
      note: 'Simplified illustration. Internal details are not shown.',
    },
    contribution: [
      'Built the application as part of the academic application suite.',
      'Developed Spring Boot microservices for attendance tracking and scheduling.',
    ],
    decisions: null,
    challenges: null,
    outcomes: [
      {
        text: 'Part of the application suite credited with automating 75% of faculty and student workflows.',
        source: RESUME,
      },
    ],
    stack: ['Java', 'Spring Boot', 'MySQL', 'MongoDB'],
    links: { repo: null, demo: null },
    needs: ['Who used it and what it replaced', 'Decisions and challenges', 'A screenshot if allowed'],
  },
  {
    slug: 'textbook-finder',
    kind: 'professional',
    name: 'Online Professional Textbook Finder',
    context: 'Northwest Missouri State University',
    period: '2024',
    oneLiner: 'An academic application in the same suite, built with Java and Spring Boot.',
    problem: null,
    approach: null,
    architecture: {
      nodes: ['Web app', 'Spring Boot service', 'Database'],
      note: 'Simplified illustration. Internal details are not shown.',
    },
    contribution: ['Built the application as part of the academic application suite.'],
    decisions: null,
    challenges: null,
    outcomes: [
      {
        text: 'Part of the application suite credited with automating 75% of faculty and student workflows.',
        source: RESUME,
      },
    ],
    stack: ['Java', 'Spring Boot'],
    links: { repo: null, demo: null },
    needs: ['What it does and for whom', 'Technical approach and stack', 'Decisions, challenges, screenshot'],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
