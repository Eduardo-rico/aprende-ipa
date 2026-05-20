'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import SYMBOLS from '@/lib/data/symbols'
import { AudioButton } from '@/components/AudioButton'
import { submitReview } from '@/lib/db/repository'
import { cn } from '@/lib/utils'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getOptions(correctId: string, pool: typeof SYMBOLS, count = 4) {
  const others = shuffle(pool.filter((s) => s.id !== correctId)).slice(0, count - 1)
  return shuffle([...others, pool.find((s) => s.id === correctId)!])
}

export default function ListenPracticePage() {
  const pool = SYMBOLS.filter((s) => s.audio)
  const [queue, setQueue] = useState(() => shuffle(pool))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [options, setOptions] = useState(() => getOptions(pool[0].id, pool))
  const [selected, setSelected] = useState<string | null>(null)
  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const startTime = useRef(Date.now())

  const symbol = queue[currentIndex % queue.length]

  useEffect(() => {
    setOptions(getOptions(symbol.id, pool))
    setSelected(null)
    startTime.current = Date.now()
  }, [currentIndex, symbol.id])

  const handleSelect = useCallback(
    async (selectedId: string) => {
      if (selected) return
      setSelected(selectedId)
      const correct = selectedId === symbol.id
      const quality = correct ? 4 : 1
      const ms = Date.now() - startTime.current
      await submitReview(symbol.id, quality, 'listen', ms)
      setStats((s) => ({ correct: correct ? s.correct + 1 : s.correct, total: s.total + 1 }))
    },
    [selected, symbol.id],
  )

  const next = useCallback(() => {
    if (currentIndex + 1 >= queue.length) {
      setQueue(shuffle(pool))
      setCurrentIndex(0)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [currentIndex, queue.length])

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Escuchar → Identificar</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Escuchá el sonido y elegí el símbolo correcto.</p>
        </div>
        {accuracy !== null && (
          <div className="text-right">
            <p className={cn('text-2xl font-bold', accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400')}>
              {accuracy}%
            </p>
            <p className="text-xs text-muted-foreground">{stats.total} resp.</p>
          </div>
        )}
      </div>

      {/* Audio prompt */}
      <div className="rounded-2xl bg-card border border-border/60 flex flex-col items-center gap-4 py-10">
        <AudioButton src={`/audio/${symbol.audio}`} size="lg" label="Escuchar símbolo" />
        <p className="text-sm text-muted-foreground">¿Qué símbolo IPA es este sonido?</p>
        {selected && (
          <span className={cn('ipa-symbol text-6xl', symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
            {symbol.ipa}
          </span>
        )}
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isCorrect = opt.id === symbol.id
          const isSelected = opt.id === selected
          const showResult = !!selected

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={!!selected}
              className={cn(
                'rounded-xl border p-4 text-center transition-all',
                !showResult && 'border-border hover:border-primary/40 hover:bg-muted/60 bg-card',
                showResult && isCorrect && 'border-green-500 bg-green-950/40 text-green-300',
                showResult && isSelected && !isCorrect && 'border-red-500 bg-red-950/40 text-red-300',
                showResult && !isSelected && !isCorrect && 'border-border/30 bg-card/30 opacity-40',
              )}
            >
              <span className={cn('ipa-symbol text-4xl block mb-1', opt.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
                {opt.ipa}
              </span>
              <span className="text-xs text-muted-foreground leading-snug">{opt.name}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {selected && (
        <div className={cn(
          'rounded-xl border p-4 text-sm',
          selected === symbol.id
            ? 'border-green-800/50 bg-green-950/30 text-green-300'
            : 'border-red-800/50 bg-red-950/30 text-red-300',
        )}>
          {selected === symbol.id ? (
            <p>✅ <strong>¡Correcto!</strong> {symbol.name}</p>
          ) : (
            <p>❌ Era <strong>{symbol.ipa}</strong> — {symbol.name}</p>
          )}
          {symbol.tip && <p className="mt-1 text-muted-foreground text-xs">💡 {symbol.tip}</p>}
        </div>
      )}

      {selected && (
        <button
          onClick={next}
          className="w-full rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm text-primary hover:bg-primary/20 transition-colors"
        >
          Siguiente →
        </button>
      )}
    </div>
  )
}
