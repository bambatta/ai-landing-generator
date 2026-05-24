interface FooterProps {
  brandName: string
  tagline: string
}

export function Footer({ brandName, tagline }: FooterProps) {
  return (
    <footer className="border-t border-zinc-800/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-300">{brandName}</div>
            <div className="mt-0.5 text-xs text-zinc-600">{tagline}</div>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800/50 pt-6 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
