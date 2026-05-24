import Image from 'next/image'
import type { FinalSection } from '@/types/landing'

interface HowItWorksProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_NUMBER: Record<string, string> = {
  violet: 'bg-violet-900/60 text-violet-300 border-violet-800/50',
  blue: 'bg-blue-900/60 text-blue-300 border-blue-800/50',
  emerald: 'bg-emerald-900/60 text-emerald-300 border-emerald-800/50',
  orange: 'bg-orange-900/60 text-orange-300 border-orange-800/50',
  rose: 'bg-rose-900/60 text-rose-300 border-rose-800/50',
  cyan: 'bg-cyan-900/60 text-cyan-300 border-cyan-800/50',
}

const COLOR_TINT: Record<string, string> = {
  violet: 'from-violet-950/30 to-indigo-950/50',
  blue: 'from-blue-950/30 to-cyan-950/50',
  emerald: 'from-emerald-950/30 to-teal-950/50',
  orange: 'from-orange-950/30 to-amber-950/50',
  rose: 'from-rose-950/30 to-pink-950/50',
  cyan: 'from-cyan-950/30 to-sky-950/50',
}

export function HowItWorks({ section, primaryColor }: HowItWorksProps) {
  const numberStyle = COLOR_NUMBER[primaryColor] ?? COLOR_NUMBER.violet
  const tint = COLOR_TINT[primaryColor] ?? COLOR_TINT.violet
  const steps = section.steps ?? []

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={i}
                className={`flex flex-col gap-6 lg:flex-row lg:items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image — 16:9 on mobile, 4:3 on desktop */}
                <div className="relative w-full shrink-0 overflow-hidden rounded-xl border border-zinc-800 lg:w-1/2 lg:rounded-2xl">
                  <div className="relative aspect-video lg:aspect-[4/3]">
                    <Image
                      src={`https://picsum.photos/seed/step-${step.step}/800/600`}
                      alt={step.title}
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle tint */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tint}`}
                    />
                    {/* Step badge */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold ${numberStyle} backdrop-blur-sm`}
                      >
                        {step.step}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2">
                  <div className="mb-1.5 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                    Step {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-400">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
