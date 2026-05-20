'use client'

import { db, type SymbolReview, type ReviewEvent, type UserSettings } from './schema'
import { createCard, review as sm2Review, isDue, type ReviewQuality } from '../srs/sm2'
import SYMBOLS from '../data/symbols'

// ── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<UserSettings> {
  let s = await db.settings.get('singleton')
  if (!s) {
    s = {
      id: 'singleton',
      dailyNewCards: 5,
      dailyReviewCards: 20,
      currentDay: 1,
      streakDays: 0,
      onboardingDone: false,
    }
    await db.settings.put(s)
  }
  return s
}

export async function updateSettings(patch: Partial<UserSettings>) {
  const current = await getSettings()
  await db.settings.put({ ...current, ...patch })
}

// ── Reviews ───────────────────────────────────────────────────────────────────

export async function getOrCreateReview(symbolId: string): Promise<SymbolReview> {
  let r = await db.reviews.get(symbolId)
  if (!r) {
    const card = createCard()
    r = { symbolId, ...card }
    await db.reviews.put(r)
  }
  return r
}

export async function submitReview(
  symbolId: string,
  quality: ReviewQuality,
  mode: ReviewEvent['mode'],
  responseMs: number,
): Promise<SymbolReview> {
  const r = await getOrCreateReview(symbolId)
  const result = sm2Review(r, quality)
  const updated: SymbolReview = {
    symbolId,
    ...result,
    lastReviewedAt: new Date(),
  }
  await db.reviews.put(updated)
  await db.events.add({
    symbolId,
    quality,
    mode,
    responseMs,
    reviewedAt: new Date(),
    wasCorrect: quality >= 3,
  })
  return updated
}

// ── Due cards ────────────────────────────────────────────────────────────────

export async function getDueCards(limit = 20): Promise<string[]> {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const due = await db.reviews
    .where('nextReviewAt')
    .belowOrEqual(now)
    .toArray()
  return due.map((r) => r.symbolId).slice(0, limit)
}

export async function getNewCards(limit = 5): Promise<string[]> {
  const allIds = SYMBOLS.map((s) => s.id)
  const reviewed = await db.reviews.toArray()
  const reviewedIds = new Set(reviewed.map((r) => r.symbolId))
  return allIds.filter((id) => !reviewedIds.has(id)).slice(0, limit)
}

export async function getTodayQueue(): Promise<string[]> {
  const settings = await getSettings()
  const [due, newCards] = await Promise.all([
    getDueCards(settings.dailyReviewCards),
    getNewCards(settings.dailyNewCards),
  ])
  // Interleave: 1 new per 4 due
  const queue: string[] = []
  let di = 0, ni = 0
  while (di < due.length || ni < newCards.length) {
    for (let i = 0; i < 4 && di < due.length; i++, di++) queue.push(due[di])
    if (ni < newCards.length) queue.push(newCards[ni++])
  }
  return queue
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function getSymbolStats(symbolId: string) {
  const events = await db.events.where('symbolId').equals(symbolId).toArray()
  const total = events.length
  const correct = events.filter((e) => e.wasCorrect).length
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : null
  return { total, correct, accuracy }
}

export async function getAllStats() {
  const events = await db.events.toArray()
  const bySymbol: Record<string, { total: number; correct: number }> = {}
  for (const e of events) {
    if (!bySymbol[e.symbolId]) bySymbol[e.symbolId] = { total: 0, correct: 0 }
    bySymbol[e.symbolId].total++
    if (e.wasCorrect) bySymbol[e.symbolId].correct++
  }
  return bySymbol
}

export async function getRecentActivity(days = 7) {
  const since = new Date()
  since.setDate(since.getDate() - days)
  const events = await db.events.where('reviewedAt').above(since).toArray()
  const byDay: Record<string, { total: number; correct: number }> = {}
  for (const e of events) {
    const key = e.reviewedAt.toISOString().split('T')[0]
    if (!byDay[key]) byDay[key] = { total: 0, correct: 0 }
    byDay[key].total++
    if (e.wasCorrect) byDay[key].correct++
  }
  return byDay
}

export async function getTotalReviewed(): Promise<number> {
  return db.reviews.count()
}

export async function getWeakestSymbols(limit = 5): Promise<Array<{ symbolId: string; accuracy: number; total: number }>> {
  const stats = await getAllStats()
  return Object.entries(stats)
    .filter(([, v]) => v.total >= 3)
    .map(([symbolId, v]) => ({
      symbolId,
      accuracy: Math.round((v.correct / v.total) * 100),
      total: v.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit)
}

export async function updateStreak() {
  const settings = await getSettings()
  const today = new Date().toDateString()
  const lastStudied = settings.lastStudiedAt ? new Date(settings.lastStudiedAt).toDateString() : null
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  let streakDays = settings.streakDays
  if (lastStudied === today) return  // already counted today
  if (lastStudied === yesterday.toDateString()) {
    streakDays += 1
  } else if (lastStudied !== today) {
    streakDays = 1
  }

  await updateSettings({ streakDays, lastStudiedAt: new Date() })
}
