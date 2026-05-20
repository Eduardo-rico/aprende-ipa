'use client'

import { useState } from 'react'
import SYMBOLS from '@/lib/data/symbols'
import { SymbolCard } from '@/components/SymbolCard'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'consonant' | 'vowel' | 'new' | 'week1' | 'week2' | 'week3'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'consonant', label: 'Consonantes' },
  { id: 'vowel', label: 'Vocales' },
  { id: 'new', label: 'Nuevos para español' },
  { id: 'week2', label: 'Semana 2' },
  { id: 'week3', label: 'Semana 3' },
]

export default function SymbolsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  const filtered = SYMBOLS.filter((s) => {
    const matchSearch =
      !search ||
      s.ipa.includes(search) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.examples.some((e) => e.word.toLowerCase().includes(search.toLowerCase()))

    const matchFilter =
      filter === 'all' ||
      (filter === 'consonant' && s.category === 'consonant') ||
      (filter === 'vowel' && s.category === 'vowel') ||
      (filter === 'new' && s.isNewForSpanish) ||
      (filter === 'week1' && s.week === 1) ||
      (filter === 'week2' && s.week === 2) ||
      (filter === 'week3' && s.week === 3)

    return matchSearch && matchFilter
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Todos los símbolos IPA</h1>
        <p className="text-muted-foreground text-sm mt-1">{SYMBOLS.length} símbolos — clic en cualquier carta para ver detalles</p>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                filter === f.id
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-border/80',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Buscar símbolo o palabra…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/60 w-full sm:w-56"
        />
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} símbolo{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((s) => (
          <SymbolCard key={s.id} symbol={s} linkToDetail />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          No hay símbolos que coincidan con tu búsqueda.
        </div>
      )}
    </div>
  )
}
