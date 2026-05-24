import Image from 'next/image'
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

const COLOR_OVERLAY: Record<string, string> = {
  violet: 'from-violet-950/70 to-indigo-950/70',
  blue: 'from-blue-950/70 to-cyan-950/70',
  emerald: 'from-emerald-950/70 to-teal-950/70',
  orange: 'from-orange-950/70 to-amber-950/70',
  rose: 'from-rose-950/70 to-pink-950/70',
  cyan: 'from-cyan-950/70 to-sky-950/70',
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
  const overlay = COLOR_OVERLAY[primaryColor] ?? COLOR_OVERLAY.violet
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
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              {/* Feature image */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${section.id}-${i}/600/300`}
                  alt={feature.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${overlay}`}
                />
                {/* Icon overlay on top of image */}
                <div className="absolute bottom-3 left-4">
                  <div
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} backdrop-blur-sm`}
                  >
                    <DynamicIcon name={feature.icon} className="h-4.5 w-4.5" />
                  </div>
                </div>
                {/* Top shimmer on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Text content */}
              <div className="p-5">
                <h3 className="mb-1.5 text-base font-semibold text-zinc-100">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
