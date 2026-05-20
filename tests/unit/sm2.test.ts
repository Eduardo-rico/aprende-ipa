import { describe, it, expect } from 'vitest'
import { createCard, review, isDue, isNew, getDaysUntilReview } from '../../lib/srs/sm2'

describe('SM-2 Algorithm', () => {
  it('creates a new card with correct defaults', () => {
    const card = createCard()
    expect(card.easeFactor).toBe(2.5)
    expect(card.interval).toBe(0)
    expect(card.repetitions).toBe(0)
    expect(isNew(card)).toBe(true)
  })

  it('first review with quality >= 3 sets interval to 1', () => {
    const card = createCard()
    const result = review(card, 4)
    expect(result.interval).toBe(1)
    expect(result.repetitions).toBe(1)
  })

  it('second review with quality >= 3 sets interval to 6', () => {
    const card = createCard()
    const r1 = review(card, 4)
    const r2 = review({ ...card, ...r1 }, 4)
    expect(r2.interval).toBe(6)
    expect(r2.repetitions).toBe(2)
  })

  it('third review multiplies by ease factor', () => {
    let card = createCard()
    card = { ...card, ...review(card, 5) }       // rep 1, interval 1
    card = { ...card, ...review(card, 5) }       // rep 2, interval 6
    const r3 = review(card, 5)
    expect(r3.interval).toBeGreaterThan(6)
    expect(r3.repetitions).toBe(3)
  })

  it('quality < 3 resets repetitions and sets interval to 1', () => {
    let card = createCard()
    card = { ...card, ...review(card, 5) }
    card = { ...card, ...review(card, 5) }
    const reset = review(card, 2)
    expect(reset.repetitions).toBe(0)
    expect(reset.interval).toBe(1)
  })

  it('ease factor clamps at minimum 1.3', () => {
    let card = createCard()
    for (let i = 0; i < 10; i++) {
      card = { ...card, ...review(card, 0) }
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3)
  })

  it('ease factor clamps at maximum 2.5', () => {
    let card = createCard()
    for (let i = 0; i < 10; i++) {
      card = { ...card, ...review(card, 5) }
    }
    expect(card.easeFactor).toBeLessThanOrEqual(2.5)
  })

  it('isDue returns true for a new card', () => {
    const card = createCard()
    expect(isDue(card)).toBe(true)
  })

  it('isDue returns false when nextReviewAt is in the future', () => {
    const card = createCard()
    const result = review(card, 5)
    // interval = 1 day from now
    expect(getDaysUntilReview({ ...card, ...result })).toBeGreaterThan(0)
  })

  it('quality 5 increases ease factor', () => {
    const card = createCard()
    const result = review(card, 5)
    expect(result.easeFactor).toBeGreaterThan(2.5 - 0.001)
  })

  it('quality 3 decreases ease factor slightly', () => {
    const card = createCard()
    const result = review(card, 3)
    expect(result.easeFactor).toBeLessThan(2.5)
  })
})
