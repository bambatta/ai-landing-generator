import type { FinalSection } from '@/types/landing'

interface HowItWorksProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_NUMBER: Record<string, string> = {
  violet: 'bg-violet-900/40 text-violet-300 border-violet-800/50',
  blue: 'bg-blue-900/40 text-blue-300 border-blue-800/50',
  emerald: 'bg-emerald-900/40 text-emerald-300 border-emerald-800/50',
  orange: 'bg-orange-900/40 text-orange-300 border-orange-800/50',
  rose: 'bg-rose-900/40 text-rose-300 border-rose-800/50',
  cyan: 'bg-cyan-900/40 text-cyan-300 border-cyan-800/50',
}

const COLOR_LINE: Record<string, string> = {
  violet: 'bg-violet-900/30',
  blue: 'bg-blue-900/30',
  emerald: 'bg-emerald-900/30',
  orange: 'bg-orange-900/30',
  rose: 'bg-rose-900/30',
  cyan: 'bg-cyan-900/30',
}

export function HowItWorks({ section, primaryColor }: HowItWorksProps) {
  const numberStyle = COLOR_NUMBER[primaryColor] ?? COLOR_NUMBER.violet
  const lineStyle = COLOR_LINE[primaryColor] ?? COLOR_LINE.violet
  const steps = section.steps ?? []

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className={`absolute top-8 left-6 hidden h-[calc(100%-4rem)] w-px ${lineStyle} lg:block`}
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="relative flex-shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-bold ${numberStyle}`}
                  >
                    {step.step}
                  </div>
                </div>
                <div className="pt-2 pb-2">
                  <h3 className="text-base font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
