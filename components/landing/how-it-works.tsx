import Image from 'next/image'
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

const COLOR_OVERLAY: Record<string, string> = {
  violet: 'from-violet-950/60 to-indigo-950/80',
  blue: 'from-blue-950/60 to-cyan-950/80',
  emerald: 'from-emerald-950/60 to-teal-950/80',
  orange: 'from-orange-950/60 to-amber-950/80',
  rose: 'from-rose-950/60 to-pink-950/80',
  cyan: 'from-cyan-950/60 to-sky-950/80',
}

export function HowItWorks({ section, primaryColor }: HowItWorksProps) {
  const numberStyle = COLOR_NUMBER[primaryColor] ?? COLOR_NUMBER.violet
  const overlay = COLOR_OVERLAY[primaryColor] ?? COLOR_OVERLAY.violet
  const steps = section.steps ?? []

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div className="space-y-12">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={i}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-zinc-800 lg:w-1/2">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={`https://picsum.photos/seed/step-${step.step}/800/600`}
                      alt={step.title}
                      fill
                      className="object-cover opacity-70"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${overlay}`}
                    />
                    {/* Step badge over image */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-bold ${numberStyle} backdrop-blur-sm`}
                      >
                        {step.step}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="w-full lg:w-1/2">
                  <div className="mb-2 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                    Step {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100">{step.title}</h3>
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
