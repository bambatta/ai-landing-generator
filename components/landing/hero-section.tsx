import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { FinalSection } from '@/types/landing'

interface HeroSectionProps {
  section: FinalSection
  brandName: string
  primaryColor: string
}

const COLOR_GRADIENTS: Record<string, string> = {
  violet: 'from-violet-600 via-indigo-600 to-purple-600',
  blue: 'from-blue-600 via-cyan-600 to-sky-600',
  emerald: 'from-emerald-600 via-teal-600 to-green-600',
  orange: 'from-orange-500 via-amber-500 to-yellow-500',
  rose: 'from-rose-600 via-pink-600 to-red-600',
  cyan: 'from-cyan-600 via-sky-600 to-blue-600',
}

const COLOR_GLOW: Record<string, string> = {
  violet: 'bg-violet-600/20',
  blue: 'bg-blue-600/20',
  emerald: 'bg-emerald-600/20',
  orange: 'bg-orange-500/20',
  rose: 'bg-rose-600/20',
  cyan: 'bg-cyan-600/20',
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

const COLOR_OVERLAY: Record<string, string> = {
  violet: 'from-violet-950/40 via-indigo-950/20 to-purple-950/40',
  blue: 'from-blue-950/40 via-cyan-950/20 to-sky-950/40',
  emerald: 'from-emerald-950/40 via-teal-950/20 to-green-950/40',
  orange: 'from-orange-950/40 via-amber-950/20 to-yellow-950/40',
  rose: 'from-rose-950/40 via-pink-950/20 to-red-950/40',
  cyan: 'from-cyan-950/40 via-sky-950/20 to-blue-950/40',
}

export function HeroSection({ section, brandName, primaryColor }: HeroSectionProps) {
  const gradient = COLOR_GRADIENTS[primaryColor] ?? COLOR_GRADIENTS.violet
  const glow = COLOR_GLOW[primaryColor] ?? COLOR_GLOW.violet
  const btn = COLOR_BTN[primaryColor] ?? COLOR_BTN.violet
  const overlay = COLOR_OVERLAY[primaryColor] ?? COLOR_OVERLAY.violet

  const imgKeywords = section.imageKeywords?.length
    ? section.imageKeywords.join(',')
    : 'software,dashboard,interface'
  const imgSrc = `https://loremflickr.com/1280/720/${imgKeywords}?lock=1`

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
      {/* Background glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl ${glow} opacity-60`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/0 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${gradient} animate-pulse`} />
          {brandName}
        </div>

        {/* Headline — smaller base size so it fits mobile */}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-7xl">
          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {section.headline.split(' ').slice(0, 3).join(' ')}
          </span>{' '}
          {section.headline.split(' ').slice(3).join(' ')}
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg">
          {section.subheadline}
        </p>

        {/* CTAs — stack on mobile, row on sm+ */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <a
            href="#"
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r sm:w-auto ${btn} px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl`}
          >
            {section.primaryCTA ?? 'Get Started'}
            <ArrowRight className="h-4 w-4" />
          </a>
          {section.secondaryCTA && (
            <a
              href="#"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
            >
              {section.secondaryCTA}
            </a>
          )}
        </div>

        <p className="mt-5 text-xs text-zinc-600">No credit card required · Free to get started</p>

        {/* Product mockup */}
        <div className="relative mx-auto mt-12 sm:mt-16">
          <div
            className={`pointer-events-none absolute -bottom-8 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full blur-3xl ${glow} opacity-50`}
          />

          {/* Browser chrome */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-700/50 shadow-2xl shadow-black/70 sm:rounded-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/90 px-3 py-2 backdrop-blur-sm sm:px-4 sm:py-2.5">
              <div className="h-2 w-2 rounded-full bg-rose-500/80 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-full bg-amber-500/80 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-full bg-emerald-500/80 sm:h-2.5 sm:w-2.5" />
              <div className="mx-2 flex h-5 max-w-[180px] flex-1 items-center rounded-md bg-zinc-800 px-2 sm:mx-3 sm:max-w-xs sm:px-3">
                <span className="truncate text-xs text-zinc-500">
                  {brandName.toLowerCase().replace(/\s+/g, '')}.app
                </span>
              </div>
            </div>

            {/* Screenshot */}
            <div className="relative aspect-video sm:aspect-[16/9]">
              <Image
                unoptimized
                src={imgSrc}
                alt={`${brandName} product preview`}
                fill
                className="object-cover"
                priority
              />
              {/* Subtle brand tint */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${overlay} mix-blend-multiply`}
              />
              {/* Bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
