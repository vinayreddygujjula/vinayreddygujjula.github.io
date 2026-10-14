// The Engineering Journey: chapters are the three roles, threads are technologies
// and the roles the resume ties them to. Nothing here implies promotions or titles
// beyond what the resume states.

export type Chapter = {
  employer: string // slug in systems.ts
  number: string
  title: string
  body: string
}

export const chapters: Chapter[] = [
  {
    employer: 'optum',
    number: 'I',
    title: 'Moving sensitive data safely',
    body: 'Three years in healthcare: microservices and integrations between platforms, Kafka for high-volume events, Spring Security around sensitive data, and CI/CD pipelines that built and shipped Docker images.',
  },
  {
    employer: 'northwest-missouri-state',
    number: 'II',
    title: 'Owning applications end to end',
    body: 'A year in education building complete applications for students, faculty and administrators: from React and Angular screens to Spring Boot services, schemas, a Canvas LMS sync and AWS deployment.',
  },
  {
    employer: 'heartland-bank',
    number: 'III',
    title: 'Running services on Kubernetes',
    body: 'Banking today: event-driven Spring Boot services on Amazon EKS, released through pipelines to ECR, behind API Gateway, with PostgreSQL tuning, Redis caching and Lambda workers.',
  },
]

/** Each thread lists the employer slugs where the resume shows that technology. */
export const threads: { name: string; at: string[] }[] = [
  { name: 'Java · Spring Boot', at: ['optum', 'northwest-missouri-state', 'heartland-bank'] },
  { name: 'Kafka · event-driven', at: ['optum', 'northwest-missouri-state', 'heartland-bank'] },
  { name: 'Spring Security · JWT · OAuth2', at: ['optum', 'northwest-missouri-state', 'heartland-bank'] },
  { name: 'React', at: ['optum', 'northwest-missouri-state', 'heartland-bank'] },
  { name: 'AWS', at: ['optum', 'northwest-missouri-state', 'heartland-bank'] },
  { name: 'Swagger / OpenAPI', at: ['optum'] },
  { name: 'Docker · CI/CD', at: ['optum', 'heartland-bank'] },
  { name: 'Angular · MySQL · MongoDB', at: ['northwest-missouri-state'] },
  { name: 'PostgreSQL · Redis', at: ['heartland-bank'] },
  { name: 'Kubernetes (EKS) · Lambda', at: ['heartland-bank'] },
]
