import { describe, it, expect } from 'vitest'
import SYMBOLS, { getSymbolById, getSymbolsByCategory, getNewSymbols } from '../../lib/data/symbols'

describe('IPA Symbols Data', () => {
  it('has at least 50 symbols', () => {
    expect(SYMBOLS.length).toBeGreaterThanOrEqual(50)
  })

  it('each symbol has required fields', () => {
    for (const s of SYMBOLS) {
      expect(s.id, `${s.ipa} missing id`).toBeTruthy()
      expect(s.ipa, `${s.id} missing ipa`).toBeTruthy()
      expect(s.name, `${s.id} missing name`).toBeTruthy()
      expect(s.audio, `${s.id} missing audio`).toBeTruthy()
      expect(s.examples.length, `${s.id} needs at least 1 example`).toBeGreaterThanOrEqual(1)
    }
  })

  it('getSymbolById returns correct symbol', () => {
    const sym = getSymbolById('v')
    expect(sym).toBeDefined()
    expect(sym?.name).toContain('labiodental')
  })

  it('getSymbolById returns undefined for unknown id', () => {
    expect(getSymbolById('zzz')).toBeUndefined()
  })

  it('has consonants and vowels', () => {
    const consonants = getSymbolsByCategory('consonant')
    const vowels = getSymbolsByCategory('vowel')
    expect(consonants.length).toBeGreaterThan(10)
    expect(vowels.length).toBeGreaterThan(5)
  })

  it('new-for-Spanish symbols are a subset', () => {
    const newSyms = getNewSymbols()
    expect(newSyms.length).toBeGreaterThan(5)
    for (const s of newSyms) {
      expect(s.isNewForSpanish).toBe(true)
    }
  })

  it('critical symbols exist: ɨ, ə, ɐ, ʃ, ʒ, v, z', () => {
    const critical = ['ɨ', 'ə', 'ɐ', 'ʃ', 'ʒ', 'v', 'z']
    for (const id of critical) {
      expect(getSymbolById(id), `missing critical symbol ${id}`).toBeDefined()
    }
  })

  it('nasals are marked as nasal in articulation', () => {
    const nasals = ['ɐ̃', 'ẽ', 'ĩ', 'õ', 'ũ']
    for (const id of nasals) {
      const sym = getSymbolById(id)
      expect(sym, `missing nasal ${id}`).toBeDefined()
      if (sym?.articulation.type === 'vowel') {
        expect(sym.articulation.nasal).toBe(true)
      }
    }
  })

  it('all symbols have week assigned 1, 2, or 3', () => {
    for (const s of SYMBOLS) {
      expect([1, 2, 3], `${s.id} has invalid week`).toContain(s.week)
    }
  })

  it('difficulty is 1, 2, or 3 for all symbols', () => {
    for (const s of SYMBOLS) {
      expect([1, 2, 3]).toContain(s.difficulty)
    }
  })
})
