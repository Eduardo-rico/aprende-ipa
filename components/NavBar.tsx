'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/learn', label: 'Estudiar' },
  { href: '/symbols', label: 'Símbolos' },
  { href: '/practice/flashcard', label: 'Práctica' },
  { href: '/stats', label: 'Estadísticas' },
]

export function NavBar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3">
        <Link href="/" className="mr-4 flex items-center gap-2">
          <span className="ipa-symbol text-xl text-primary">/IPA/</span>
          <span className="hidden text-sm font-semibold text-foreground sm:block">Aprende IPA</span>
        </Link>
        <div className="flex flex-1 gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
