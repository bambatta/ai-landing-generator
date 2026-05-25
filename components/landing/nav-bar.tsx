interface NavBarProps {
  brandName: string
  primaryCTA?: string
  primaryColor: string
}

const COLOR_BTN: Record<string, string> = {
  violet: 'from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500',
  blue: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
  emerald: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
  orange: 'from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400',
  rose: 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500',
  cyan: 'from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500',
}

export function NavBar({ brandName, primaryCTA, primaryColor }: NavBarProps) {
  const btn = COLOR_BTN[primaryColor] ?? COLOR_BTN.violet

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className={`h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br ${btn} flex items-center justify-center text-xs font-bold text-white`}
          >
            {brandName[0]}
          </div>
          <span className="truncate text-sm font-semibold text-zinc-100 sm:text-base">
            {brandName}
          </span>
        </div>

        <nav className="hidden items-center gap-6 sm:flex">
          {['Features', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className={`shrink-0 rounded-xl bg-gradient-to-r whitespace-nowrap ${btn} px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md`}
        >
          {primaryCTA ?? 'Get Started'}
        </a>
      </div>
    </header>
  )
}
