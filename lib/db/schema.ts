import Dexie, { type EntityTable } from 'dexie'

export interface SymbolReview {
  symbolId: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewAt: Date
  lastReviewedAt?: Date
}

export interface ReviewEvent {
  id?: number
  symbolId: string
  quality: number          // 0-5
  mode: 'flashcard' | 'listen' | 'articulation' | 'pairs'
  responseMs: number
  reviewedAt: Date
  wasCorrect: boolean
}

export interface StudySession {
  id?: number
  startedAt: Date
  endedAt?: Date
  cardsReviewed: number
  correctCount: number
}

export interface UserSettings {
  id: 'singleton'
  dailyNewCards: number
  dailyReviewCards: number
  currentDay: number        // día del currículo (1-21)
  streakDays: number
  lastStudiedAt?: Date
  onboardingDone: boolean
}

class IPADatabase extends Dexie {
  reviews!: EntityTable<SymbolReview, 'symbolId'>
  events!: EntityTable<ReviewEvent, 'id'>
  sessions!: EntityTable<StudySession, 'id'>
  settings!: EntityTable<UserSettings, 'id'>

  constructor() {
    super('IPALearnDB')
    this.version(1).stores({
      reviews: 'symbolId, nextReviewAt, repetitions',
      events: '++id, symbolId, reviewedAt, mode, wasCorrect',
      sessions: '++id, startedAt',
      settings: 'id',
    })
  }
}

export const db = new IPADatabase()
