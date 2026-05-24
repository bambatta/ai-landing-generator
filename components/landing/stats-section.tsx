import type { FinalSection } from '@/types/landing'

interface StatsSectionProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_TEXT: Record<string, string> = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  orange: 'text-orange-400',
  rose: 'text-rose-400',
  cyan: 'text-cyan-400',
}

export function StatsSection({ section, primaryColor }: StatsSectionProps) {
  const textColor = COLOR_TEXT[primaryColor] ?? COLOR_TEXT.violet
  const stats = section.stats ?? []

  if (stats.length === 0) return null

  return (
    <section className="border-y border-zinc-800/50 bg-zinc-900/30 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div
          className={`grid grid-cols-2 gap-8 ${stats.length >= 4 ? 'lg:grid-cols-4' : `lg:grid-cols-${stats.length}`}`}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-4xl font-bold tracking-tight ${textColor} sm:text-5xl`}>
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
