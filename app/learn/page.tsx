'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { AudioButton } from '@/components/AudioButton'
import { ArticulationBadge } from '@/components/ArticulationBadge'
import SYMBOLS, { getSymbolById } from '@/lib/data/symbols'
import { getTodayQueue, submitReview, updateStreak } from '@/lib/db/repository'
import { QUALITY_LABELS } from '@/lib/srs/sm2'
import type { ReviewQuality } from '@/lib/srs/sm2'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

const QUALITY_CONFIGS: { quality: ReviewQuality; label: string; color: string; key: string }[] = [
  { quality: 1, label: 'Otra vez', color: 'border-red-700 hover:bg-red-950/60 text-red-400', key: '1' },
  { quality: 2, label: 'Difícil', color: 'border-orange-700 hover:bg-orange-950/60 text-orange-400', key: '2' },
  { quality: 4, label: 'Bien', color: 'border-green-700 hover:bg-green-950/60 text-green-400', key: '3' },
  { quality: 5, label: 'Fácil', color: 'border-emerald-600 hover:bg-emerald-950/60 text-emerald-400', key: '4' },
]

export default function LearnPage() {
  const [queue, setQueue] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })
  const startTime = useRef<number>(Date.now())

  useEffect(() => {
    getTodayQueue()
      .then((q) => {
        setQueue(q)
        setLoading(false)
        if (q.length === 0) setDone(true)
      })
      .catch(console.error)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    if (!flipped) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          setFlipped(true)
        }
      }
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    } else {
      const handleKey = (e: KeyboardEvent) => {
        const config = QUALITY_CONFIGS.find((c) => c.key === e.key)
        if (config) handleReview(config.quality)
      }
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [flipped, currentIndex, queue])

  const handleReview = useCallback(
    async (quality: ReviewQuality) => {
      const symbolId = queue[currentIndex]
      if (!symbolId) return
      const ms = Date.now() - startTime.current
      await submitReview(symbolId, quality, 'flashcard', ms)
      setSessionStats((s) => ({
        correct: quality >= 3 ? s.correct + 1 : s.correct,
        total: s.total + 1,
      }))
      if (currentIndex + 1 >= queue.length) {
        await updateStreak()
        setDone(true)
      } else {
        setCurrentIndex((i) => i + 1)
        setFlipped(false)
        startTime.current = Date.now()
      }
    },
    [queue, currentIndex],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground animate-pulse">Cargando sesión…</div>
      </div>
    )
  }

  if (done) {
    const pct = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
        <div className="text-5xl">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
        <h1 className="text-2xl font-bold text-foreground">¡Sesión terminada!</h1>
        <div className="text-center text-muted-foreground space-y-1">
          <p>Revisaste <span className="text-foreground font-semibold">{sessionStats.total}</span> tarjetas</p>
          <p>Precisión: <span className={cn('font-semibold', pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400')}>{pct}%</span></p>
        </div>
        <div className="flex gap-3">
          <Link href="/stats" className="rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ver estadísticas
          </Link>
          <Link href="/practice/flashcard" className="rounded-xl bg-primary/15 border border-primary/40 px-4 py-2 text-sm text-primary hover:bg-primary/25 transition-colors">
            Seguir practicando
          </Link>
        </div>
      </div>
    )
  }

  if (queue.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-4xl">✅</div>
        <h1 className="text-xl font-bold text-foreground">No hay tarjetas pendientes hoy</h1>
        <p className="text-muted-foreground text-sm">¡Estás al día! Volvé mañana o practica libremente.</p>
        <Link href="/practice/flashcard" className="rounded-xl bg-primary/15 border border-primary/40 px-4 py-2 text-sm text-primary">
          Práctica libre
        </Link>
      </div>
    )
  }

  const symbolId = queue[currentIndex]
  const symbol = getSymbolById(symbolId)
  if (!symbol) return null

  const progress = (currentIndex / queue.length) * 100

  return (
    <div className="mx-auto max-w-lg px-4 py-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{currentIndex + 1} / {queue.length}</span>
        <span className={cn(
          'font-medium',
          symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400',
        )}>
          {symbol.category === 'vowel' ? 'Vocal' : 'Consonante'}
        </span>
        <span className="text-yellow-400">{'★'.repeat(symbol.difficulty)}</span>
      </div>
      <Progress value={progress} className="h-1.5" />

      {/* Card */}
      <div
        className="flip-card w-full"
        style={{ height: flipped ? 'auto' : '320px' }}
        onClick={() => !flipped && setFlipped(true)}
      >
        {!flipped ? (
          // Front: just the symbol + audio
          <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-card border border-border/60 cursor-pointer h-80 p-8 select-none">
            <span className={cn('ipa-symbol text-9xl leading-none', symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
              {symbol.ipa}
            </span>
            <div className="flex items-center gap-3">
              <AudioButton src={`/audio/${symbol.audio}`} size="lg" label="Escuchar" />
              <span className="text-xs text-muted-foreground">Espacio/Enter para ver respuesta</span>
            </div>
            {symbol.isNewForSpanish && (
              <span className="text-xs text-orange-400 bg-orange-950/40 border border-orange-800/30 rounded-full px-2.5 py-0.5">
                Nuevo para español
              </span>
            )}
          </div>
        ) : (
          // Back: full info
          <div className="rounded-2xl bg-card border border-border/60 p-6 space-y-5">
            {/* Symbol + name */}
            <div className="flex items-start gap-4">
              <span className={cn('ipa-symbol text-5xl leading-none', symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
                {symbol.ipa}
              </span>
              <div className="flex-1">
                <h2 className="font-bold text-foreground">{symbol.name}</h2>
                <ArticulationBadge symbol={symbol} className="mt-2" />
              </div>
              <AudioButton src={`/audio/${symbol.audio}`} size="md" />
            </div>

            {/* Tip */}
            {symbol.tip && (
              <div className="rounded-lg bg-muted/40 border border-border/40 p-3 text-sm text-muted-foreground leading-relaxed">
                💡 {symbol.tip}
              </div>
            )}

            {/* Examples */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ejemplos</p>
              {symbol.examples.map((ex) => (
                <div key={ex.word + ex.lang} className="flex items-center gap-2.5 text-sm">
                  <AudioButton src={`/audio/${ex.audio}`} size="sm" />
                  <span className="font-medium text-foreground">{ex.word}</span>
                  <span className="font-mono text-xs text-muted-foreground">[{ex.ipa}]</span>
                  <span className="ml-auto text-xs text-muted-foreground/50 shrink-0">{ex.langLabel}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review buttons (visible after flip) */}
      {flipped && (
        <div className="grid grid-cols-4 gap-2">
          {QUALITY_CONFIGS.map((c) => (
            <button
              key={c.quality}
              onClick={() => handleReview(c.quality)}
              className={cn(
                'rounded-xl border py-3 text-xs font-medium transition-all',
                c.color,
                'bg-card/50',
              )}
            >
              <span className="block text-xs opacity-40 mb-0.5">[{c.key}]</span>
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      {!flipped && (
        <p className="text-center text-xs text-muted-foreground/50">
          Espacio = voltear · 1-4 = calificar después
        </p>
      )}
    </div>
  )
}
