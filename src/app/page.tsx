import { Contact, Footer } from '@/components/Contact'
import { Hero } from '@/components/Hero'
import { Journey } from '@/components/Journey'
import { Nav } from '@/components/Nav'
import { Providers } from '@/components/Providers'
import { SectionHead } from '@/components/SectionHead'
import { StackLayers } from '@/components/StackLayers'
import { SystemsExplorer } from '@/components/SystemsExplorer'
import { Work } from '@/components/Work'

export default function Home() {
  return (
    <Providers>
      <Nav />
      <div className="sheet min-h-dvh">
        <main id="main" className="mx-auto max-w-[1440px] px-4 md:px-8 lg:pl-40 lg:pr-12 xl:pl-44">
          <Hero />

          <section id="systems" aria-labelledby="systems-title" className="mt-32 md:mt-44">
            <SectionHead
              id="systems-title"
              index="01"
              label="Systems"
              title={
                <>
                  Systems I’ve <br className="hidden md:block" />
                  worked on.
                </>
              }
              lede="Three environments, three domains. Pick one to see the kind of system I built there, then switch lenses to follow security, data, messaging or delivery through it."
            />
            <SystemsExplorer />
          </section>

          <section id="stack" aria-labelledby="stack-title" className="mt-32 md:mt-44">
            <SectionHead
              id="stack-title"
              index="02"
              label="Stack"
              title="Inside my stack."
              lede="Not a wall of logos. Each layer below is a part of a working application: what it is for, how I use it, and which role on my resume it comes from."
            />
            <StackLayers />
          </section>

          <section id="work" aria-labelledby="work-title" className="mt-32 md:mt-44">
            <SectionHead
              id="work-title"
              index="03"
              label="Work"
              title="Projects, as engineering stories."
              lede="Professional work is shown as sanitized case studies: what the resume supports, with clear gaps where details are still to come. Personal projects get their own space."
            />
            <Work />
          </section>

          <section id="journey" aria-labelledby="journey-title" className="mt-32 md:mt-44">
            <SectionHead
              id="journey-title"
              index="04"
              label="Journey"
              title="The engineering journey."
              lede="Healthcare, then education, then banking. The domains changed; the core of Java, Spring Boot, Kafka and secure APIs ran through all three."
            />
            <Journey />
          </section>

          <section id="contact" aria-labelledby="contact-title" className="mt-32 md:mt-44">
            <SectionHead id="contact-title" index="05" label="Contact" title="Let’s build something meaningful." />
            <Contact />
          </section>

          <Footer />
        </main>
      </div>
    </Providers>
  )
}
