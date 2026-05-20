'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import SYMBOLS from '@/lib/data/symbols'
import { AudioButton } from '@/components/AudioButton'
import { submitReview } from '@/lib/db/repository'
import { cn } from '@/lib/utils'
import type { IPASymbol, ConsonantArticulation, VowelArticulation } from '@/lib/data/symbols'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getUniqueValues<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

function getConsonantOptions(field: keyof ConsonantArticulation, correct: string, all: typeof SYMBOLS) {
  const values = getUniqueValues(
    all
      .filter((s) => s.articulation.type === 'consonant')
      .map((s) => (s.articulation as ConsonantArticulation)[field] as string),
  )
  const wrong = shuffle(values.filter((v) => v !== correct)).slice(0, 3)
  return shuffle([correct, ...wrong])
}

function getVowelOptions(field: keyof VowelArticulation, correct: string, all: typeof SYMBOLS) {
  const values = getUniqueValues(
    all
      .filter((s) => s.articulation.type === 'vowel')
      .map((s) => (s.articulation as VowelArticulation)[field] as string),
  )
  const wrong = shuffle(values.filter((v) => v !== correct)).slice(0, 3)
  return shuffle([correct, ...wrong])
}

type Answers = Record<string, string>

export default function ArticulationPracticePage() {
  const pool = shuffle(SYMBOLS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const startTime = useRef(Date.now())

  const symbol = pool[currentIndex % pool.length]
  const art = symbol.articulation

  useEffect(() => {
    setAnswers({})
    setSubmitted(false)
    startTime.current = Date.now()
  }, [currentIndex])

  const isConsonant = art.type === 'consonant'
  const fields = isConsonant
    ? [
        { key: 'place', label: 'Punto de articulación', correct: (art as ConsonantArticulation).place, options: getConsonantOptions('place', (art as ConsonantArticulation).place, SYMBOLS) },
        { key: 'manner', label: 'Modo de articulación', correct: (art as ConsonantArticulation).manner, options: getConsonantOptions('manner', (art as ConsonantArticulation).manner, SYMBOLS) },
        { key: 'voicing', label: 'Sonoridad', correct: (art as ConsonantArticulation).voicing, options: ['voiced', 'voiceless'] },
      ]
    : [
        { key: 'height', label: 'Altura', correct: (art as VowelArticulation).height, options: getVowelOptions('height', (art as VowelArticulation).height, SYMBOLS) },
        { key: 'backness', label: 'Anterioridad', correct: (art as VowelArticulation).backness, options: ['front', 'central', 'back'] },
        { key: 'rounding', label: 'Redondeamiento', correct: (art as VowelArticulation).rounding, options: ['rounded', 'unrounded'] },
      ]

  const allAnswered = fields.every((f) => answers[f.key])

  const handleSubmit = useCallback(async () => {
    if (!allAnswered) return
    setSubmitted(true)
    const allCorrect = fields.every((f) => answers[f.key] === f.correct)
    const quality = allCorrect ? 4 : fields.filter((f) => answers[f.key] === f.correct).length >= fields.length - 1 ? 3 : 1
    const ms = Date.now() - startTime.current
    await submitReview(symbol.id, quality, 'articulation', ms)
    setStats((s) => ({ correct: allCorrect ? s.correct + 1 : s.correct, total: s.total + 1 }))
  }, [allAnswered, answers, fields, symbol.id])

  const next = () => setCurrentIndex((i) => (i + 1) % pool.length)

  const correctCount = fields.filter((f) => answers[f.key] === f.correct).length
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Símbolo → Articulación</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Clasificá correctamente el símbolo.</p>
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

      {/* Symbol display */}
      <div className="rounded-2xl bg-card border border-border/60 flex items-center justify-center gap-5 py-8">
        <span className={cn('ipa-symbol text-8xl leading-none', isConsonant ? 'text-violet-400' : 'text-amber-400')}>
          {symbol.ipa}
        </span>
        <AudioButton src={`/audio/${symbol.audio}`} size="lg" />
      </div>

      {/* Classification questions */}
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{field.label}</p>
            <div className="grid grid-cols-2 gap-2">
              {field.options.map((opt) => {
                const isSelected = answers[field.key] === opt
                const showResult = submitted
                const isCorrect = opt === field.correct

                return (
                  <button
                    key={opt}
                    onClick={() => !submitted && setAnswers((a) => ({ ...a, [field.key]: opt }))}
                    disabled={submitted}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-all text-left',
                      !showResult && isSelected && 'border-primary bg-primary/15 text-primary',
                      !showResult && !isSelected && 'border-border hover:border-primary/30 text-muted-foreground hover:text-foreground bg-card',
                      showResult && isCorrect && 'border-green-500 bg-green-950/40 text-green-300',
                      showResult && isSelected && !isCorrect && 'border-red-500 bg-red-950/40 text-red-300',
                      showResult && !isSelected && !isCorrect && 'border-border/30 opacity-40 bg-card/30',
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={cn(
            'w-full rounded-xl py-3 text-sm font-medium transition-all',
            allAnswered
              ? 'border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20'
              : 'border border-border/30 bg-card/30 text-muted-foreground/30 cursor-not-allowed',
          )}
        >
          Verificar
        </button>
      ) : (
        <div className="space-y-3">
          <div className={cn(
            'rounded-xl border p-4 text-sm',
            correctCount === fields.length
              ? 'border-green-800/50 bg-green-950/30 text-green-300'
              : 'border-orange-800/50 bg-orange-950/30 text-orange-300',
          )}>
            <p className="font-semibold">
              {correctCount === fields.length ? '✅ ¡Perfecto!' : `${correctCount}/${fields.length} correctos`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{symbol.name}</p>
          </div>
          <button
            onClick={next}
            className="w-full rounded-xl border border-primary/40 bg-primary/10 py-3 text-sm text-primary hover:bg-primary/20"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
