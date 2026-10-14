import type { FlowNode, Profile } from './types'

// Source of truth: VinayReddy_Resume.docx (Terry version). Edit here, not in components.

export const profile: Profile = {
  name: 'Vinay Reddy',
  role: 'Software Engineer',
  title: 'Java Full Stack Developer',
  tagline: 'Building systems behind the screen.',
  intro:
    'I design secure, scalable backend systems in Java and Spring Boot, wire services together with Kafka, and ship them to AWS, with React interfaces that keep the people using them moving.',
  summary:
    'Java Full Stack Developer with 5+ years of experience designing and developing enterprise applications using Java, Spring Boot, microservices, REST APIs, Kafka, PostgreSQL and React.js. Strong background in secure, scalable backend services with Spring Security, JWT, OAuth2, RBAC, Hibernate and Spring Data JPA. Experienced in cloud-native deployments using AWS, Docker, Kubernetes and CI/CD pipelines, across banking, education and healthcare.',
  yearsExperience: '5+',
  location: 'Columbus, OH',
  timeZone: 'America/New_York',
  identityStrip: ['Java', 'Spring Boot', 'Kafka', 'React', 'AWS'],
  domains: ['Banking', 'Education', 'Healthcare'],
  email: 'gvinayreddy02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vinayreddygujjula/',
  github: 'https://github.com/vinayreddygujjula',
  resumeUrl: null, // Hidden on the public site (the current PDF includes a phone number). Add a phone-free PDF to /public and set its path here.
  education: null, // TODO(Vinay): not on the resume. Add degree, school and years to show it.
}

/** The homepage signature diagram. An illustrative pattern, not any employer's system. */
export const requestFlow: FlowNode[] = [
  {
    id: 'client',
    label: 'Client',
    tech: 'React · JavaScript',
    plain: 'The screen a person actually uses: a form, a dashboard, an account page. It sends a request when they click.',
    practice:
      'I build React interfaces with form handling, validation and dynamic rendering, and keep them fast on the screens people use most.',
    tags: ['React.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    tech: 'Amazon API Gateway',
    plain: 'The front door. It checks who is calling, rejects bad requests and sends good ones to the right service.',
    practice:
      'I have configured Amazon API Gateway with request validation, authentication, rate limiting and routing to backend microservices.',
    tags: ['API Gateway', 'Rate limiting', 'Request validation'],
  },
  {
    id: 'services',
    label: 'Spring Boot Services',
    tech: 'Java · Spring Boot · Spring Security',
    plain: 'Small, focused programs that each own one job, such as accounts or enrollment. This is where the business rules live.',
    practice:
      'Most of my work sits here: versioned REST APIs, business logic in core Java, and Spring Security with JWT, OAuth2 and role-based access.',
    tags: ['Spring Boot', 'REST', 'JWT / OAuth2', 'RBAC'],
  },
  {
    id: 'kafka',
    label: 'Kafka',
    tech: 'Apache Kafka',
    plain: 'A message backbone. Services post events here instead of waiting on each other, so one slow part does not stall the rest.',
    practice:
      'I use Kafka for event-driven, asynchronous communication between services, which reduces coupling and lets each piece scale on its own.',
    tags: ['Event-driven', 'Async', 'Decoupling'],
  },
  {
    id: 'database',
    label: 'Database',
    tech: 'PostgreSQL · MySQL · MongoDB · Redis',
    plain: 'Where the data is stored and read back. A cache in front keeps the most-asked answers ready.',
    practice:
      'I design schemas and indexes, tune queries and transactions with Spring Data JPA, and add Redis caching where reads are hot.',
    tags: ['PostgreSQL', 'Indexes', 'Redis cache'],
  },
]
