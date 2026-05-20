'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTodayQueue, getSettings, getWeakestSymbols, getRecentActivity, getTotalReviewed } from '@/lib/db/repository'
import { getSymbolById } from '@/lib/data/symbols'
import SYMBOLS from '@/lib/data/symbols'
import { AudioButton } from '@/components/AudioButton'
import { cn } from '@/lib/utils'

interface DashboardData {
  queueCount: number
  streak: number
  totalReviewed: number
  weakest: Array<{ symbolId: string; accuracy: number; total: number }>
  recentDays: Array<{ date: string; accuracy: number; total: number }>
}

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getTodayQueue(),
      getSettings(),
      getWeakestSymbols(5),
      getRecentActivity(7),
      getTotalReviewed(),
    ]).then(([queue, settings, weakest, activity, totalReviewed]) => {
      const recentDays = Object.entries(activity)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, v]) => ({
          date,
          accuracy: Math.round((v.correct / v.total) * 100),
          total: v.total,
        }))
      setData({
        queueCount: queue.length,
        streak: settings.streakDays,
        totalReviewed,
        weakest,
        recentDays,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const practiceLinks = [
    { href: '/practice/flashcard', label: 'Flashcards libres', desc: 'Repasa sin límite', icon: '🃏' },
    { href: '/practice/listen', label: 'Escuchar', desc: 'Sonido → Símbolo', icon: '👂' },
    { href: '/practice/articulation', label: 'Articulación', desc: 'Clasifica el símbolo', icon: '🔬' },
    { href: '/practice/pairs', label: 'Pares mínimos', desc: 'Distingue sonidos', icon: '👯' },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-950/60 via-card to-card border border-violet-800/30 p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hola, Edu 👋</h1>
            <p className="text-muted-foreground mt-1">
              {loading ? '…' : data?.queueCount
                ? `Tenés ${data.queueCount} tarjeta${data.queueCount !== 1 ? 's' : ''} para revisar hoy`
                : '¡Estás al día! No hay tarjetas pendientes.'}
            </p>
          </div>
          {data && data.streak > 0 && (
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-400">{data.streak}</p>
              <p className="text-xs text-muted-foreground">días seguidos 🔥</p>
            </div>
          )}
        </div>

        <Link
          href="/learn"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 text-sm transition-colors"
        >
          {data?.queueCount ? `Estudiar (${data.queueCount})` : 'Estudiar'} →
        </Link>
      </div>

      {/* Stats row */}
      {data && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Símbolos iniciados" value={`${data.totalReviewed} / ${SYMBOLS.length}`} />
          <StatCard label="Tarjetas hoy" value={`${data.queueCount}`} />
          <StatCard label="Racha" value={`${data.streak} día${data.streak !== 1 ? 's' : ''}`} />
        </div>
      )}

      {/* Progress bar */}
      {data && (
        <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Progreso del currículo</h2>
            <span className="text-sm text-muted-foreground">{data.totalReviewed} / {SYMBOLS.length}</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all"
              style={{ width: `${(data.totalReviewed / SYMBOLS.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((data.totalReviewed / SYMBOLS.length) * 100)}% del currículo iniciado
          </p>
        </div>
      )}

      {/* Weakest symbols */}
      {data && data.weakest.length > 0 && (
        <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">⚠️ Símbolos más difíciles para vos</h2>
          <div className="space-y-2">
            {data.weakest.map((w) => {
              const sym = getSymbolById(w.symbolId)
              if (!sym) return null
              return (
                <div key={w.symbolId} className="flex items-center gap-3">
                  <span className={cn('ipa-symbol text-2xl w-10 text-center', sym.category === 'vowel' ? 'text-amber-400' : 'text-violet-400')}>
                    {sym.ipa}
                  </span>
                  <AudioButton src={`/audio/${sym.audio}`} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="text-muted-foreground truncate">{sym.name}</span>
                      <span className={cn('font-semibold', w.accuracy < 50 ? 'text-red-400' : 'text-yellow-400')}>
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
                  <Link href={`/symbols/${sym.id}`} className="text-xs text-muted-foreground hover:text-foreground shrink-0">
                    Ver →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Practice modes */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Modos de práctica libre</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {practiceLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl bg-card border border-border/60 hover:border-primary/40 p-4 transition-all group"
            >
              <span className="text-2xl">{l.icon}</span>
              <p className="text-sm font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">{l.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity mini chart */}
      {data && data.recentDays.length > 0 && (
        <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Actividad reciente</h2>
          <div className="flex items-end gap-1.5 h-16">
            {data.recentDays.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={cn('w-full rounded-sm', d.accuracy >= 80 ? 'bg-green-500' : d.accuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500')}
                  style={{ height: `${Math.max(4, d.accuracy)}%` }}
                  title={`${d.date}: ${d.total} rev, ${d.accuracy}%`}
                />
                <span className="text-[10px] text-muted-foreground/60">
                  {new Date(d.date + 'T12:00:00').toLocaleDateString('es', { weekday: 'narrow' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curriculum link */}
      <div className="rounded-2xl bg-card border border-border/60 p-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Ver todos los símbolos</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{SYMBOLS.length} símbolos del currículo de 3 semanas</p>
        </div>
        <Link href="/symbols" className="text-sm text-primary hover:underline">
          Ver →
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
    </div>
  )
}
