export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5

export interface SM2Card {
  easeFactor: number      // starts at 2.5
  interval: number        // days until next review
  repetitions: number     // consecutive successful reviews
  nextReviewAt: Date
}

export interface ReviewResult {
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewAt: Date
}

const MIN_EASE = 1.3
const MAX_EASE = 2.5
const INITIAL_EASE = 2.5

export function createCard(): SM2Card {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return {
    easeFactor: INITIAL_EASE,
    interval: 0,
    repetitions: 0,
    nextReviewAt: today,
  }
}

export function review(card: SM2Card, quality: ReviewQuality): ReviewResult {
  let { easeFactor, interval, repetitions } = card

  if (quality < 3) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  }

  // EF adjustment: EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  easeFactor = Math.max(MIN_EASE, Math.min(MAX_EASE, easeFactor))

  const nextReviewAt = new Date()
  nextReviewAt.setDate(nextReviewAt.getDate() + interval)
  nextReviewAt.setHours(0, 0, 0, 0)

  return { easeFactor, interval, repetitions, nextReviewAt }
}

export function isDue(card: SM2Card): boolean {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return card.nextReviewAt <= now
}

export function isNew(card: SM2Card): boolean {
  return card.repetitions === 0 && card.interval === 0
}

export function getDaysUntilReview(card: SM2Card): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = card.nextReviewAt.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const QUALITY_LABELS: Record<ReviewQuality, string> = {
  0: 'Sin memoria',
  1: 'Casi nada',
  2: 'Difícil',
  3: 'Con esfuerzo',
  4: 'Bien',
  5: 'Perfecto',
}

export const QUALITY_COLORS: Record<ReviewQuality, string> = {
  0: 'bg-red-600',
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-green-500',
  5: 'bg-emerald-500',
}
