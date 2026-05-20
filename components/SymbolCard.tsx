'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AudioButton } from './AudioButton'
import { ArticulationBadge } from './ArticulationBadge'
import type { IPASymbol } from '@/lib/data/symbols'
import { cn } from '@/lib/utils'

interface SymbolCardProps {
  symbol: IPASymbol
  /** If true, shows the full back of the card by default (no flip needed) */
  showBack?: boolean
  /** If provided, wraps the symbol in a link to the detail page */
  linkToDetail?: boolean
  className?: string
  /** Accuracy 0-100, displayed as a heatmap color */
  accuracy?: number | null
}

export function SymbolCard({ symbol, showBack = false, linkToDetail = false, className, accuracy }: SymbolCardProps) {
  const [flipped, setFlipped] = useState(showBack)

  const front = (
    <div className="flip-card-front flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-card border border-border/60 cursor-pointer select-none h-full">
      {accuracy !== null && accuracy !== undefined && (
        <div className="absolute top-3 right-3">
          <AccuracyPip accuracy={accuracy} />
        </div>
      )}
      <span className={cn('ipa-symbol text-7xl text-primary leading-none', symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
        {symbol.ipa}
      </span>
      <div className="flex items-center gap-2">
        <AudioButton src={`/audio/${symbol.audio}`} size="md" />
        <span className="text-xs text-muted-foreground">clic para voltear</span>
      </div>
      {symbol.isNewForSpanish && (
        <span className="absolute top-3 left-3 text-xs font-medium text-orange-400 bg-orange-950/60 border border-orange-800/40 rounded-full px-2 py-0.5">
          Nuevo
        </span>
      )}
    </div>
  )

  const back = (
    <div className="flip-card-back flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border/60 overflow-y-auto h-full">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn('ipa-symbol text-3xl leading-none', symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
              {symbol.ipa}
            </span>
            <AudioButton src={`/audio/${symbol.audio}`} size="sm" />
          </div>
          <p className="text-sm font-semibold text-foreground mt-1">{symbol.name}</p>
        </div>
        <DifficultyStars count={symbol.difficulty} />
      </div>

      <ArticulationBadge symbol={symbol} />

      {symbol.tip && (
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2.5 border border-border/40 leading-relaxed">
          💡 {symbol.tip}
        </p>
      )}

      <div className="space-y-1.5">
        {symbol.examples.slice(0, 3).map((ex) => (
          <div key={ex.word + ex.lang} className="flex items-center gap-2 text-sm">
            <AudioButton src={`/audio/${ex.audio}`} size="sm" />
            <span className="font-medium text-foreground">{ex.word}</span>
            <span className="text-muted-foreground font-mono text-xs">[{ex.ipa}]</span>
            <span className="ml-auto text-xs text-muted-foreground/60">{ex.langLabel}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const cardContent = (
    <div
      className={cn('flip-card relative w-full h-64', className)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={cn('flip-card-inner w-full h-full', flipped && 'flipped')}>
        {front}
        {back}
      </div>
    </div>
  )

  if (linkToDetail) {
    return (
      <Link href={`/symbols/${symbol.id}`} className="block">
        <div className="flip-card relative w-full h-64 cursor-pointer group">
          <div className="flip-card-front flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-border/60 group-hover:border-primary/40 transition-colors h-full absolute inset-0">
            {accuracy !== null && accuracy !== undefined && (
              <div className="absolute top-3 right-3">
                <AccuracyPip accuracy={accuracy} />
              </div>
            )}
            <span className={cn('ipa-symbol text-6xl leading-none', symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
              {symbol.ipa}
            </span>
            <p className="text-xs text-muted-foreground text-center leading-snug">{symbol.name}</p>
            <div onClick={(e) => e.preventDefault()}>
              <AudioButton src={`/audio/${symbol.audio}`} size="sm" />
            </div>
            {symbol.isNewForSpanish && (
              <span className="absolute top-3 left-3 text-xs font-medium text-orange-400 bg-orange-950/60 border border-orange-800/40 rounded-full px-2 py-0.5">
                Nuevo
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return cardContent
}

function DifficultyStars({ count }: { count: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className={cn('text-sm', i <= count ? 'text-yellow-400' : 'text-muted-foreground/30')}>
          ★
        </span>
      ))}
    </div>
  )
}

function AccuracyPip({ accuracy }: { accuracy: number }) {
  const color =
    accuracy >= 80 ? 'bg-green-500' :
    accuracy >= 50 ? 'bg-yellow-500' :
    'bg-red-500'
  return (
    <div className={cn('w-2.5 h-2.5 rounded-full', color)} title={`${accuracy}% aciertos`} />
  )
}
