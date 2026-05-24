import { Quote } from 'lucide-react'
import type { FinalSection } from '@/types/landing'

interface TestimonialsProps {
  section: FinalSection
}

const AVATAR_COLORS = [
  'bg-violet-900/60 text-violet-300',
  'bg-blue-900/60 text-blue-300',
  'bg-emerald-900/60 text-emerald-300',
  'bg-amber-900/60 text-amber-300',
]

export function Testimonials({ section }: TestimonialsProps) {
  const testimonials = section.testimonials ?? []

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {section.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">{section.subheadline}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <Quote className="mb-4 h-5 w-5 text-zinc-700" />
              <p className="flex-1 text-sm leading-relaxed text-zinc-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                >
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-200">{testimonial.author}</div>
                  <div className="text-xs text-zinc-500">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
