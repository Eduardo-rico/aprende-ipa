'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import MINIMAL_PAIRS from '@/lib/data/minimal-pairs'
import { AudioButton } from '@/components/AudioButton'
import { submitReview } from '@/lib/db/repository'
import { cn } from '@/lib/utils'
import { getSymbolById } from '@/lib/data/symbols'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function PairsPracticePage() {
  const [queue, setQueue] = useState(() => shuffle(MINIMAL_PAIRS))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const startTime = useRef(Date.now())

  const pair = queue[currentIndex % queue.length]

  useEffect(() => {
    setSelected(null)
    startTime.current = Date.now()
  }, [currentIndex])

  const symbolA = getSymbolById(pair.symbolA)
  const symbolB = getSymbolById(pair.symbolB)

  const handleSelect = useCallback(
    async (word: 'A' | 'B') => {
      if (selected) return
      setSelected(word)
      const ms = Date.now() - startTime.current
      // Both are always "different" — reward for listening carefully
      const quality = 4
      await submitReview(pair.symbolA, quality, 'pairs', ms)
      await submitReview(pair.symbolB, quality, 'pairs', ms)
      setStats((s) => ({ correct: s.correct + 1, total: s.total + 1 }))
    },
    [selected, pair],
  )

  const next = () => {
    if (currentIndex + 1 >= queue.length) {
      setQueue(shuffle(MINIMAL_PAIRS))
      setCurrentIndex(0)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Pares mínimos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Escuchá cada sonido. ¿Podés notar la diferencia?</p>
        </div>
        {accuracy !== null && (
          <div className="text-right">
            <p className={cn('text-2xl font-bold', accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400')}>
              {accuracy}%
            </p>
            <p className="text-xs text-muted-foreground">{stats.total} rondas</p>
          </div>
        )}
      </div>

      {/* Pair comparison */}
      <div className="grid grid-cols-2 gap-4">
        {([{ word: pair.wordA, sym: pair.symbolA, side: 'A' as const }, { word: pair.wordB, sym: pair.symbolB, side: 'B' as const }]).map(({ word, sym, side }) => {
          const symbol = getSymbolById(sym)
          return (
            <button
              key={side}
              onClick={() => handleSelect(side)}
              disabled={!!selected}
              className={cn(
                'rounded-2xl border p-5 flex flex-col items-center gap-3 transition-all',
                !selected && 'border-border hover:border-primary/50 bg-card cursor-pointer',
                selected && 'border-border/30 bg-card',
              )}
            >
              <AudioButton src={`/audio/${word.audio}`} size="lg" label={`Escuchar ${word.word}`} />
              <div className="text-center">
                <p className="font-semibold text-foreground">{word.word}</p>
                <p className="text-xs text-muted-foreground">{word.langLabel}</p>
              </div>
              {selected && symbol && (
                <div className="mt-1 text-center">
                  <span className={cn(
                    'ipa-symbol text-3xl block',
                    symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400',
                  )}>
                    {symbol.ipa}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{symbol.name}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Instructions */}
      {!selected ? (
        <div className="rounded-xl bg-muted/20 border border-border/40 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Escuchá ambos sonidos y hacé clic en el que te resulte más difícil de producir.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-1">Enfocate en notar la diferencia, no en acertar.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-blue-800/40 bg-blue-950/20 p-4">
            <p className="text-sm font-semibold text-blue-300 mb-1">¿Cuál es la diferencia?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{pair.confusionNote}</p>
          </div>

          {/* Both symbols side by side */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: pair.symbolA, word: pair.wordA },
              { id: pair.symbolB, word: pair.wordB },
            ].map(({ id, word }) => {
              const sym = getSymbolById(id)
              if (!sym) return null
              return (
                <div key={id} className="rounded-xl bg-card border border-border/40 p-3 text-center">
                  <span className={cn(
                    'ipa-symbol text-3xl block',
                    sym.category === 'vowel' ? 'text-amber-400' : 'text-violet-400',
                  )}>
                    {sym.ipa}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{sym.name}</p>
                  <div className="flex justify-center mt-2">
                    <AudioButton src={`/audio/${sym.audio}`} size="sm" />
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={next}
            className="w-full rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm text-primary hover:bg-primary/20 transition-colors"
          >
            Siguiente par →
          </button>
        </div>
      )}
    </div>
  )
}
