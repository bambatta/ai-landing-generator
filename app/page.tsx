import Link from 'next/link'
import { Sparkles, Layers, Zap, PenLine } from 'lucide-react'
import { GeneratorClient } from '@/components/generator/generator-client'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-100">PageCraft AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="https://github.com"
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-1/4 h-60 w-60 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
            Powered by GPT-4o
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl">
            Ship your{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              landing page
            </span>{' '}
            in minutes
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Describe your product and get a fully designed, conversion-optimized landing page draft
            in seconds. Review, edit, and publish.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: Zap, label: 'AI-powered copy' },
              { icon: Layers, label: 'Editable sections' },
              { icon: PenLine, label: 'One-click export' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400"
              >
                <Icon className="h-3 w-3 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="px-4 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-violet-600/50 to-transparent" />
            <GeneratorClient />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs text-zinc-700">
            Built with Next.js 15 · TypeScript · TailwindCSS · OpenAI GPT-4o
          </p>
        </div>
      </footer>
    </div>
  )
}
