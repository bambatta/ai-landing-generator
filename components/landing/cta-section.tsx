import { ArrowRight } from 'lucide-react'
import type { FinalSection } from '@/types/landing'

interface CTASectionProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_GRADIENTS: Record<string, string> = {
  violet: 'from-violet-600/20 via-indigo-600/10 to-transparent',
  blue: 'from-blue-600/20 via-cyan-600/10 to-transparent',
  emerald: 'from-emerald-600/20 via-teal-600/10 to-transparent',
  orange: 'from-orange-500/20 via-amber-500/10 to-transparent',
  rose: 'from-rose-600/20 via-pink-600/10 to-transparent',
  cyan: 'from-cyan-600/20 via-sky-600/10 to-transparent',
}

const COLOR_BTN: Record<string, string> = {
  violet:
    'from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-500/25',
  blue: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-500/25',
  emerald:
    'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25',
  orange:
    'from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 shadow-orange-500/25',
  rose: 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-500/25',
  cyan: 'from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 shadow-cyan-500/25',
}

export function CTASection({ section, primaryColor }: CTASectionProps) {
  const bgGradient = COLOR_GRADIENTS[primaryColor] ?? COLOR_GRADIENTS.violet
  const btn = COLOR_BTN[primaryColor] ?? COLOR_BTN.violet

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${bgGradient}`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          {section.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">{section.subheadline}</p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#"
            className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${btn} px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl`}
          >
            {section.primaryCTA ?? 'Get Started Free'}
            <ArrowRight className="h-4 w-4" />
          </a>
          {section.secondaryCTA && (
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
            >
              {section.secondaryCTA}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
