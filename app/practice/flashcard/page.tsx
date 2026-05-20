'use client'

import { useState, useCallback } from 'react'
import SYMBOLS, { getSymbolsByCategory } from '@/lib/data/symbols'
import { SymbolCard } from '@/components/SymbolCard'
import { cn } from '@/lib/utils'

type Mode = 'all' | 'consonant' | 'vowel' | 'new' | 'week2' | 'week3'

export default function FlashcardPracticePage() {
  const [mode, setMode] = useState<Mode>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const pool = SYMBOLS.filter((s) => {
    if (mode === 'consonant') return s.category === 'consonant'
    if (mode === 'vowel') return s.category === 'vowel'
    if (mode === 'new') return s.isNewForSpanish
    if (mode === 'week2') return s.week === 2
    if (mode === 'week3') return s.week === 3
    return true
  })

  const symbol = pool[currentIndex % pool.length]

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % pool.length)
    setFlipped(false)
  }, [pool.length])

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + pool.length) % pool.length)
    setFlipped(false)
  }, [pool.length])

  const modes: { id: Mode; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'consonant', label: 'Consonantes' },
    { id: 'vowel', label: 'Vocales' },
    { id: 'new', label: 'Nuevos' },
    { id: 'week2', label: 'Semana 2' },
    { id: 'week3', label: 'Semana 3' },
  ]

  if (pool.length === 0) return <div className="p-8 text-muted-foreground">Sin símbolos.</div>

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Práctica libre — Flashcards</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Sin SRS, sin límite. Repasa lo que quieras.</p>
      </div>

      {/* Mode filter */}
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setCurrentIndex(0); setFlipped(false) }}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              mode === m.id
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Counter */}
      <p className="text-xs text-muted-foreground">{(currentIndex % pool.length) + 1} / {pool.length}</p>

      {/* Card */}
      <SymbolCard key={symbol.id + currentIndex} symbol={symbol} />

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={prev}
          className="flex-1 rounded-xl border border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          ← Anterior
        </button>
        <button
          onClick={next}
          className="flex-1 rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm text-primary hover:bg-primary/20 transition-colors"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
