import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import type { FinalSection } from '@/types/landing'

interface FeatureGridProps {
  section: FinalSection
  primaryColor: string
}

const COLOR_ICON_BG: Record<string, string> = {
  violet: 'bg-violet-900/70 text-violet-300',
  blue: 'bg-blue-900/70 text-blue-300',
  emerald: 'bg-emerald-900/70 text-emerald-300',
  orange: 'bg-orange-900/70 text-orange-300',
  rose: 'bg-rose-900/70 text-rose-300',
  cyan: 'bg-cyan-900/70 text-cyan-300',
}

// Very subtle tint — just a hint of brand color, not an image-killing overlay
const COLOR_TINT: Record<string, string> = {
  violet: 'from-violet-900/20 to-indigo-900/10',
  blue: 'from-blue-900/20 to-cyan-900/10',
  emerald: 'from-emerald-900/20 to-teal-900/10',
  orange: 'from-orange-900/20 to-amber-900/10',
  rose: 'from-rose-900/20 to-pink-900/10',
  cyan: 'from-cyan-900/20 to-sky-900/10',
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
  const tint = COLOR_TINT[primaryColor] ?? COLOR_TINT.violet
  const features = section.features ?? []

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              {/* Feature image — visible at 80%, light tint, bottom fade */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${section.id}-${i}/600/300`}
                  alt={feature.title}
                  fill
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Subtle brand tint — barely there */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tint}`} />
                {/* Bottom fade so image blends into the card */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-900 to-transparent" />

                {/* Icon in top-left with glass background */}
                <div className="absolute top-3 left-3">
                  <div
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ring-1 ring-white/10 backdrop-blur-sm`}
                  >
                    <DynamicIcon name={feature.icon} className="h-4 w-4" />
                  </div>
                </div>

                {/* Top shimmer on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
