import * as LucideIcons from 'lucide-react'
import type { FinalSection } from '@/types/landing'

interface FeatureGridProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_ICON_BG: Record<string, string> = {
  violet: 'bg-violet-900/40 text-violet-400',
  blue: 'bg-blue-900/40 text-blue-400',
  emerald: 'bg-emerald-900/40 text-emerald-400',
  orange: 'bg-orange-900/40 text-orange-400',
  rose: 'bg-rose-900/40 text-rose-400',
  cyan: 'bg-cyan-900/40 text-cyan-400',
}

type AnyIcon = React.ComponentType<{ className?: string }>

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const icons = LucideIcons as unknown as Record<string, AnyIcon | undefined>
  const Icon = icons[name] ?? icons['Zap']
  if (!Icon) return null
  return <Icon className={className} />
}

export function FeatureGrid({ section, primaryColor }: FeatureGridProps) {
  const iconBg = COLOR_ICON_BG[primaryColor] ?? COLOR_ICON_BG.violet
  const features = section.features ?? []

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
              >
                <DynamicIcon name={feature.icon} className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-zinc-100">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
