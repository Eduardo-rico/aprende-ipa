import { notFound } from 'next/navigation'
import Link from 'next/link'
import SYMBOLS, { getSymbolById, langToSpeech } from '@/lib/data/symbols'
import { AudioButton } from '@/components/AudioButton'
import { ArticulationBadge } from '@/components/ArticulationBadge'
import { Badge } from '@/components/ui/badge'

export function generateStaticParams() {
  return SYMBOLS.map((s) => ({ id: s.id }))
}

export default async function SymbolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const symbol = getSymbolById(id)
  if (!symbol) notFound()

  const contrastSymbols = symbol.contrasts?.map((cid) => getSymbolById(cid)).filter(Boolean) ?? []

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
      {/* Back */}
      <Link href="/symbols" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Todos los símbolos
      </Link>

      {/* Hero */}
      <div className="rounded-2xl bg-card border border-border/60 p-8 flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <span className={`ipa-symbol text-8xl leading-none ${symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400'}`}>
            {symbol.ipa}
          </span>
          <AudioButton src={`/audio/${symbol.audio}`} size="lg" label="Escuchar sonido aislado" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">{symbol.name}</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs capitalize">{symbol.category === 'vowel' ? 'Vocal' : 'Consonante'}</Badge>
            {symbol.isNewForSpanish && (
              <Badge className="text-xs bg-orange-950/60 text-orange-300 border-orange-800/50">Nuevo para español</Badge>
            )}
            <span className="text-yellow-400 text-sm">{'★'.repeat(symbol.difficulty)}{'☆'.repeat(3 - symbol.difficulty)}</span>
          </div>
        </div>
        <ArticulationBadge symbol={symbol} />
      </div>

      {/* Tip */}
      {symbol.tip && (
        <div className="rounded-xl bg-muted/30 border border-border/40 p-4">
          <h2 className="text-sm font-semibold text-foreground mb-1">💡 Truco de producción</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{symbol.tip}</p>
        </div>
      )}

      {/* Examples */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Ejemplos en idiomas</h2>
        <div className="space-y-2">
          {symbol.examples.map((ex) => (
            <div
              key={ex.word + ex.lang}
              className="flex items-center gap-3 rounded-xl bg-card border border-border/40 px-4 py-3"
            >
              <AudioButton
                src={`/audio/${ex.audio ?? ''}`}
                size="sm"
                label={`Escuchar ${ex.word}`}
                word={ex.word}
                speechLang={langToSpeech(ex.lang)}
              />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-foreground">{ex.word}</span>
                {ex.translation && (
                  <span className="ml-2 text-sm text-amber-400/80 italic">"{ex.translation}"</span>
                )}
                <span className="ml-2 font-mono text-sm text-muted-foreground">[{ex.ipa}]</span>
              </div>
              <span className="text-xs text-muted-foreground/60 shrink-0">{ex.langLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contrasts */}
      {contrastSymbols.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">⚠️ Fácil de confundir con…</h2>
          <div className="flex flex-wrap gap-3">
            {contrastSymbols.map((cs) => cs && (
              <Link
                key={cs.id}
                href={`/symbols/${cs.id}`}
                className="flex items-center gap-3 rounded-xl bg-card border border-border/40 px-4 py-3 hover:border-primary/40 transition-colors"
              >
                <span className={`ipa-symbol text-2xl leading-none ${cs.category === 'vowel' ? 'text-amber-400' : 'text-violet-400'}`}>
                  {cs.ipa}
                </span>
                <div>
                  <p className="text-xs font-medium text-foreground">{cs.name}</p>
                </div>
                <AudioButton src={`/audio/${cs.audio}`} size="sm" className="ml-2" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Curriculum info */}
      <div className="rounded-xl bg-muted/20 border border-border/40 p-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span>📅 Semana {symbol.week}, Día {symbol.day}</span>
        <span className="mx-2 text-border">|</span>
        <span>
          {symbol.category === 'vowel'
            ? `${(symbol.articulation as { height: string }).height} · ${(symbol.articulation as { backness: string }).backness}`
            : `${(symbol.articulation as { place: string }).place} · ${(symbol.articulation as { manner: string }).manner}`}
        </span>
      </div>
    </div>
  )
}
