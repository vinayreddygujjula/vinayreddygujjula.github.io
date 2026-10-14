import { Reveal } from './Reveal'

type Props = {
  index: string
  label: string
  title: React.ReactNode
  lede?: React.ReactNode
  id?: string
}

/** Section title block, styled like the title strip of an engineering drawing. */
export function SectionHead({ index, label, title, lede, id }: Props) {
  return (
    <header className="grid grid-cols-1 gap-8 border-t border-line pt-6 md:grid-cols-12">
      <div className="annot flex items-baseline gap-3 md:col-span-3">
        <span className="text-signal">{index}</span>
        <span aria-hidden className="h-px w-8 translate-y-[-3px] bg-line-2" />
        <span>{label}</span>
      </div>
      <Reveal className="md:col-span-9">
        <h2 id={id} className="heading text-[clamp(2.25rem,6vw,5rem)] text-fg">
          {title}
        </h2>
        {lede ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">{lede}</p> : null}
      </Reveal>
    </header>
  )
}
