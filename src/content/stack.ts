import type { StackLayer } from './types'

// `seenAt` lists where the resume shows the technology in use.
// 'Skills' means it appears in the skills section but is not tied to a specific role.
const HB = 'Heartland Bank'
const NW = 'Northwest Missouri State'
const OP = 'Optum'
const SK = 'Skills'

export const stackLayers: StackLayer[] = [
  {
    id: 'ui',
    index: 'L1',
    name: 'User Interfaces',
    short: 'Interfaces',
    role: 'What people see and touch. It turns clicks into well-formed requests and turns responses into something readable.',
    inPractice:
      'React interfaces for banking screens, academic workflows and high-traffic healthcare apps, with validation that catches bad input before it ever reaches an API.',
    techs: [
      { name: 'React', note: 'Component-based UIs, form handling, validation and dynamic rendering.', seenAt: [HB, NW, OP] },
      { name: 'JavaScript', note: 'The language under every interface I have shipped.', seenAt: [HB, NW, OP] },
      { name: 'HTML5 · CSS3', note: 'Semantic, responsive layouts.', seenAt: [HB, OP] },
      { name: 'Angular', note: 'Used on academic applications alongside React.', seenAt: [NW] },
    ],
  },
  {
    id: 'api',
    index: 'L2',
    name: 'API & Application Services',
    short: 'Services',
    role: 'Where business rules live. Each service owns one job and exposes it through a stable, versioned contract.',
    inPractice:
      'Spring Boot microservices with versioned REST APIs, business logic in core Java (Streams, Collections, OOP) and data access through Spring Data JPA and Hibernate.',
    techs: [
      { name: 'Java', note: 'Core language: Streams, Collections, exception handling, object-oriented design.', seenAt: [HB, NW, OP] },
      { name: 'Spring Boot', note: 'The base for every service I have built professionally.', seenAt: [HB, NW, OP] },
      { name: 'REST · versioning', note: 'Versioned APIs, documented with Swagger / OpenAPI.', seenAt: [HB, OP] },
      { name: 'Spring MVC · Data JPA · Hibernate', note: 'Web layer and persistence.', seenAt: [HB, SK] },
      { name: 'GraphQL', note: 'Listed in my skills.', seenAt: [SK] },
    ],
  },
  {
    id: 'events',
    index: 'L3',
    name: 'Distributed Communication',
    short: 'Events',
    role: 'How services talk without waiting on each other. Events let one part of the system move on while another catches up.',
    inPractice:
      'Kafka-based, event-driven communication in all three roles: decoupling banking services, stabilizing academic processing and absorbing high-volume healthcare events.',
    techs: [
      { name: 'Apache Kafka', note: 'Asynchronous messaging between services.', seenAt: [HB, NW, OP] },
      { name: 'Microservices', note: 'Independently deployable services, each with a clear boundary.', seenAt: [HB, NW, OP] },
      { name: 'Event-driven architecture', note: 'Producers and consumers that scale and fail independently.', seenAt: [HB, NW, OP] },
      { name: 'AWS Lambda', note: 'Event-driven, background and scheduled jobs.', seenAt: [HB] },
    ],
  },
  {
    id: 'data',
    index: 'L4',
    name: 'Data & Performance',
    short: 'Data',
    role: 'Where state is kept and how fast it comes back. Most latency problems end up being data problems.',
    inPractice:
      'Schema, index, query and transaction work in PostgreSQL, MySQL and MongoDB, with Redis caching in front of hot reads.',
    techs: [
      { name: 'PostgreSQL', note: 'Data access layers, query and index tuning, transactions.', seenAt: [HB] },
      { name: 'MySQL', note: 'Schema and index design for academic systems.', seenAt: [NW] },
      { name: 'MongoDB', note: 'Document schemas and indexes.', seenAt: [NW] },
      { name: 'Redis', note: 'Caching to cut response times further.', seenAt: [HB] },
      { name: 'SQL Server', note: 'Listed in my skills.', seenAt: [SK] },
    ],
  },
  {
    id: 'infra',
    index: 'L5',
    name: 'Infrastructure',
    short: 'Infra',
    role: 'Where the software runs and how new versions get there safely.',
    inPractice:
      'Docker images built in CI, published to Amazon ECR and rolled out to EKS with autoscaling and rolling deployments; earlier, applications on EC2 with S3 and RDS.',
    techs: [
      { name: 'AWS', note: 'EC2, S3, RDS, Lambda, API Gateway, IAM, CloudWatch, ECR, EKS.', seenAt: [HB, NW, OP] },
      { name: 'Docker', note: 'Containerized Spring Boot services.', seenAt: [HB, OP] },
      { name: 'Kubernetes', note: 'Amazon EKS: autoscaling and rolling deployments.', seenAt: [HB] },
      { name: 'CI/CD', note: 'GitHub Actions, GitLab CI and pipelines that deploy to EKS.', seenAt: [HB, OP] },
      { name: 'Terraform', note: 'Listed in my skills.', seenAt: [SK] },
    ],
  },
  {
    id: 'security',
    index: 'L6',
    name: 'Security & Quality',
    short: 'Security',
    role: 'The layer that runs through all the others: who is allowed in, and how we know the code still works.',
    inPractice:
      'Spring Security with JWT, OAuth2 and role-based access in every role; secrets kept out of code; unit and integration tests with JUnit and Mockito, APIs validated with Postman.',
    techs: [
      { name: 'Spring Security', note: 'Authentication and fine-grained authorization.', seenAt: [HB, NW, OP] },
      { name: 'OAuth2 · JWT · RBAC', note: 'Token-based auth and role-based access control.', seenAt: [HB, NW, OP] },
      { name: 'JUnit · Mockito', note: 'Unit and integration tests.', seenAt: [HB, NW, OP] },
      { name: 'SonarQube', note: 'Listed in my skills.', seenAt: [SK] },
      { name: 'CORS · HTTPS · AES', note: 'Transport and data protection, listed in my skills.', seenAt: [SK] },
    ],
  },
]
