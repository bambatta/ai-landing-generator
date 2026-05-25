import { Check } from 'lucide-react'
import type { FinalSection } from '@/types/landing'

interface PricingSectionProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_HIGHLIGHTED: Record<string, string> = {
  violet:
    'border-violet-600/60 bg-violet-950/40 ring-1 ring-violet-600/30 shadow-lg shadow-violet-900/20',
  blue: 'border-blue-600/60 bg-blue-950/40 ring-1 ring-blue-600/30 shadow-lg shadow-blue-900/20',
  emerald:
    'border-emerald-600/60 bg-emerald-950/40 ring-1 ring-emerald-600/30 shadow-lg shadow-emerald-900/20',
  orange:
    'border-orange-500/60 bg-orange-950/40 ring-1 ring-orange-500/30 shadow-lg shadow-orange-900/20',
  rose: 'border-rose-600/60 bg-rose-950/40 ring-1 ring-rose-600/30 shadow-lg shadow-rose-900/20',
  cyan: 'border-cyan-600/60 bg-cyan-950/40 ring-1 ring-cyan-600/30 shadow-lg shadow-cyan-900/20',
}

const COLOR_BADGE: Record<string, string> = {
  violet: 'bg-violet-900 border border-violet-600 text-violet-300',
  blue: 'bg-blue-900 border border-blue-600 text-blue-300',
  emerald: 'bg-emerald-900 border border-emerald-600 text-emerald-300',
  orange: 'bg-orange-900 border border-orange-600 text-orange-300',
  rose: 'bg-rose-900 border border-rose-600 text-rose-300',
  cyan: 'bg-cyan-900 border border-cyan-600 text-cyan-300',
}

const COLOR_BTN_MAIN: Record<string, string> = {
  violet: 'from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500',
  blue: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
  emerald: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
  orange: 'from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400',
  rose: 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500',
  cyan: 'from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500',
}

const COLOR_CHECK: Record<string, string> = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  orange: 'text-orange-400',
  rose: 'text-rose-400',
  cyan: 'text-cyan-400',
}

export function PricingSection({ section, primaryColor }: PricingSectionProps) {
  const tiers = section.pricingTiers ?? []
  const highlighted = COLOR_HIGHLIGHTED[primaryColor] ?? COLOR_HIGHLIGHTED.violet
  const badge = COLOR_BADGE[primaryColor] ?? COLOR_BADGE.violet
  const btnMain = COLOR_BTN_MAIN[primaryColor] ?? COLOR_BTN_MAIN.violet
  const checkColor = COLOR_CHECK[primaryColor] ?? COLOR_CHECK.violet

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div
          className={`grid gap-6 ${tiers.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
        >
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                tier.highlighted
                  ? highlighted
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              {tier.highlighted && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold ${badge}`}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-base font-semibold text-zinc-200">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-zinc-100">
                    {tier.price}
                  </span>
                  <span className="text-sm text-zinc-500">/{tier.period}</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${checkColor}`} />
                    <span className="text-sm text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
                  tier.highlighted
                    ? `bg-gradient-to-r ${btnMain} text-white shadow-lg`
                    : 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
