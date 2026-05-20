'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getAllStats, getRecentActivity, getWeakestSymbols, getTotalReviewed, getSettings,
} from '@/lib/db/repository'
import { getSymbolById } from '@/lib/data/symbols'
import SYMBOLS from '@/lib/data/symbols'
import { AudioButton } from '@/components/AudioButton'
import { cn } from '@/lib/utils'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

interface StatsData {
  totalReviewed: number
  streak: number
  bySymbol: Record<string, { total: number; correct: number }>
  recentDays: Array<{ date: string; accuracy: number; total: number; shortDate: string }>
  weakest: Array<{ symbolId: string; accuracy: number; total: number }>
}

export default function StatsPage() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getAllStats(),
      getRecentActivity(14),
      getWeakestSymbols(10),
      getTotalReviewed(),
      getSettings(),
    ]).then(([bySymbol, activity, weakest, totalReviewed, settings]) => {
      const recentDays = Object.entries(activity)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, v]) => ({
          date,
          shortDate: new Date(date + 'T12:00:00').toLocaleDateString('es', { month: 'short', day: 'numeric' }),
          accuracy: Math.round((v.correct / v.total) * 100),
          total: v.total,
        }))
      setData({ totalReviewed, streak: settings.streakDays, bySymbol, recentDays, weakest })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground animate-pulse">Cargando estadísticas…</div>
      </div>
    )
  }

  if (!data) return null

  const totalEvents = Object.values(data.bySymbol).reduce((s, v) => s + v.total, 0)
  const totalCorrect = Object.values(data.bySymbol).reduce((s, v) => s + v.correct, 0)
  const globalAccuracy = totalEvents > 0 ? Math.round((totalCorrect / totalEvents) * 100) : null

  // Build symbol accuracy grid for heatmap
  const symbolGrid = SYMBOLS.map((s) => {
    const stats = data.bySymbol[s.id]
    if (!stats || stats.total === 0) return { symbol: s, accuracy: null, total: 0 }
    return { symbol: s, accuracy: Math.round((stats.correct / stats.total) * 100), total: stats.total }
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Estadísticas</h1>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Símbolos iniciados" value={`${data.totalReviewed}`} sub={`/ ${SYMBOLS.length}`} />
        <StatCard label="Reviews totales" value={`${totalEvents}`} />
        <StatCard label="Precisión global" value={globalAccuracy !== null ? `${globalAccuracy}%` : '—'} />
        <StatCard label="Racha" value={`${data.streak}`} sub="días 🔥" />
      </div>

      {/* Activity chart */}
      {data.recentDays.length > 0 && (
        <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Actividad por día (últimas 2 semanas)</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data.recentDays} barSize={24}>
              <XAxis
                dataKey="shortDate"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'hsl(var(--foreground))',
                }}
                formatter={(val, name) => [
                  name === 'accuracy' ? `${val}%` : val,
                  name === 'accuracy' ? 'Precisión' : 'Reviews',
                ]}
              />
              <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                {data.recentDays.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.accuracy >= 80 ? '#22c55e' : d.accuracy >= 50 ? '#eab308' : '#ef4444'}
                    opacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Symbol accuracy heatmap */}
      <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Mapa de dominio por símbolo</h2>
        <p className="text-xs text-muted-foreground">🟩 ≥80% · 🟨 50-79% · 🟥 &lt;50% · ⬜ sin revisar</p>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {symbolGrid.map(({ symbol, accuracy, total }) => (
            <Link
              key={symbol.id}
              href={`/symbols/${symbol.id}`}
              title={`${symbol.name}: ${accuracy !== null ? `${accuracy}% (${total} reviews)` : 'Sin revisar'}`}
              className={cn(
                'rounded-lg flex flex-col items-center justify-center py-2 px-1 border transition-all hover:scale-105',
                accuracy === null && 'border-border/30 bg-muted/20',
                accuracy !== null && accuracy >= 80 && 'border-green-700/40 bg-green-950/30',
                accuracy !== null && accuracy >= 50 && accuracy < 80 && 'border-yellow-700/40 bg-yellow-950/30',
                accuracy !== null && accuracy < 50 && 'border-red-700/40 bg-red-950/30',
              )}
            >
              <span className={cn(
                'ipa-symbol text-lg leading-none',
                symbol.category === 'vowel' ? 'text-amber-400' : 'text-violet-400',
              )}>
                {symbol.ipa}
              </span>
              {accuracy !== null && (
                <span className={cn(
                  'text-[9px] mt-0.5 font-medium',
                  accuracy >= 80 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400',
                )}>
                  {accuracy}%
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Weakest symbols table */}
      {data.weakest.length > 0 && (
        <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Top 10 más difíciles</h2>
          <div className="space-y-2">
            {data.weakest.map((w, i) => {
              const sym = getSymbolById(w.symbolId)
              if (!sym) return null
              return (
                <div key={w.symbolId} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}.</span>
                  <span className={cn('ipa-symbol text-2xl w-8 text-center', sym.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
                    {sym.ipa}
                  </span>
                  <AudioButton src={`/audio/${sym.audio}`} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-muted-foreground truncate">{sym.name}</span>
                      <span className={cn('text-xs font-bold ml-2', w.accuracy < 50 ? 'text-red-400' : 'text-yellow-400')}>
                        {w.accuracy}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', w.accuracy >= 80 ? 'bg-green-500' : w.accuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500')}
                        style={{ width: `${w.accuracy}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground/50 shrink-0">{w.total} rev.</span>
                  <Link href={`/symbols/${sym.id}`} className="text-xs text-primary hover:underline shrink-0">
                    Ver
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {totalEvents === 0 && (
        <div className="rounded-2xl bg-card border border-border/60 p-10 text-center space-y-3">
          <p className="text-4xl">📊</p>
          <p className="text-foreground font-semibold">Todavía no hay estadísticas</p>
          <p className="text-muted-foreground text-sm">Completá tu primera sesión de estudio para ver datos aquí.</p>
          <Link href="/learn" className="inline-block mt-2 rounded-xl bg-primary/15 border border-primary/40 px-4 py-2 text-sm text-primary">
            Empezar a estudiar →
          </Link>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">
        {value}
        {sub && <span className="text-sm font-normal text-muted-foreground ml-1">{sub}</span>}
      </p>
    </div>
  )
}
