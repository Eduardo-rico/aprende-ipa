#!/usr/bin/env tsx
/**
 * Downloads word audio files from Wikimedia Commons.
 * Run: npx tsx scripts/download-words.ts
 * Idempotent: skips files that already exist.
 *
 * Wikimedia Commons naming conventions for spoken words:
 *   pt-BR → Pt-br-{word}.ogg
 *   ro    → Ro-{word}.ogg
 *   es    → Es-{word}.ogg
 *   en    → En-us-{word}.ogg  (tries En-{word}.ogg as fallback)
 *   de    → De-{word}.ogg
 *   fr    → Fr-fr-{word}.ogg  (tries Fr-{word}.ogg as fallback)
 *   it    → It-{word}.ogg
 *   ru    → Ru-{word}.ogg
 *   pt-PT → Pt-pt-{word}.ogg
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import SYMBOLS from '../lib/data/symbols'

const WORDS_DIR = join(process.cwd(), 'public', 'audio', 'words')
mkdirSync(WORDS_DIR, { recursive: true })

// Build candidate Wikimedia filenames for a word in a given language
function wikiCandidates(word: string, lang: string): string[] {
  const w = word        // original (with accents, Wikimedia supports them)
  const W = w.charAt(0).toUpperCase() + w.slice(1)  // Title case
  const wl = w.toLowerCase()

  switch (lang) {
    case 'pt-BR':
      return [
        `Pt-br-${wl}.ogg`,
        `Pt-br-${w}.ogg`,
        `Pt-br-${W}.ogg`,
      ]
    case 'pt-PT':
      return [
        `Pt-pt-${wl}.ogg`,
        `Pt-pt-${w}.ogg`,
        `Pt-${wl}.ogg`,
      ]
    case 'ro':
      return [
        `Ro-${wl}.ogg`,
        `Ro-${w}.ogg`,
        `Ro-${W}.ogg`,
      ]
    case 'es':
      return [
        `Es-${wl}.ogg`,
        `Es-${w}.ogg`,
        `Es-es-${wl}.ogg`,
        `Español ${w}.ogg`,
      ]
    case 'en':
      return [
        `En-us-${wl}.ogg`,
        `En-us-${w}.ogg`,
        `En-${wl}.ogg`,
        `En-${W}.ogg`,
      ]
    case 'de':
      return [
        `De-${w}.ogg`,
        `De-${wl}.ogg`,
        `De-${W}.ogg`,
      ]
    case 'fr':
      return [
        `Fr-fr-${wl}.ogg`,
        `Fr-${wl}.ogg`,
        `Fr-${W}.ogg`,
      ]
    case 'it':
      return [
        `It-${wl}.ogg`,
        `It-${w}.ogg`,
        `It-${W}.ogg`,
      ]
    case 'ru':
      return [
        `Ru-${wl}.ogg`,
        `Ru-${w}.ogg`,
        `Ru-${W}.ogg`,
      ]
    default:
      return [`${W}.ogg`, `${wl}.ogg`]
  }
}

async function tryDownload(candidates: string[], dest: string): Promise<string | null> {
  for (const filename of candidates) {
    const encoded = encodeURIComponent(filename)
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}`

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'IPALearnApp/1.0 (educational; mailto:edu@ipa-learn.local)' },
          redirect: 'follow',
        })
        if (res.status === 429) {
          console.log(`    ⏳ Rate limited, waiting 5s...`)
          await new Promise((r) => setTimeout(r, 5000))
          continue
        }
        if (res.status === 404 || res.status === 302) continue
        if (!res.ok) continue

        // Check it's actually audio (not an HTML redirect page)
        const ct = res.headers.get('content-type') ?? ''
        if (ct.includes('text/html')) continue

        const buffer = await res.arrayBuffer()
        if (buffer.byteLength < 1000) continue  // Too small, probably an error page

        writeFileSync(dest, new Uint8Array(buffer))
        return filename  // success — return the winning candidate
      } catch {
        if (attempt < 2) await new Promise((r) => setTimeout(r, 1000))
      }
    }

    // Small delay between candidates
    await new Promise((r) => setTimeout(r, 300))
  }
  return null
}

async function main() {
  console.log(`\n📥 Downloading word audio from Wikimedia Commons…\n`)

  // Collect unique (audio path → word, lang) entries
  const entries = new Map<string, { word: string; lang: string }>()
  for (const symbol of SYMBOLS) {
    for (const ex of symbol.examples) {
      if (ex.audio && ex.audio.startsWith('words/') && !entries.has(ex.audio)) {
        entries.set(ex.audio, { word: ex.word, lang: ex.lang })
      }
    }
  }

  // Group by language for reporting
  const byLang: Record<string, number> = {}
  for (const { lang } of entries.values()) byLang[lang] = (byLang[lang] || 0) + 1

  console.log(`Found ${entries.size} unique word audio files to download:`)
  for (const [lang, count] of Object.entries(byLang).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${lang.padEnd(8)} ${count}`)
  }
  console.log()

  let downloaded = 0
  let skipped = 0
  let failed = 0
  const failedList: string[] = []

  for (const [audioPath, { word, lang }] of entries) {
    const filename = audioPath.replace('words/', '')
    const destPath = join(WORDS_DIR, filename)

    if (existsSync(destPath)) {
      process.stdout.write(`  ⏭  ${filename}\n`)
      skipped++
      continue
    }

    const candidates = wikiCandidates(word, lang)
    process.stdout.write(`  ↓  [${lang}] ${word.padEnd(16)} → ${filename} … `)

    const winner = await tryDownload(candidates, destPath)
    if (winner) {
      process.stdout.write(`✓ (${winner})\n`)
      downloaded++
    } else {
      process.stdout.write(`✗ not found\n`)
      failed++
      failedList.push(`${lang}  ${word.padEnd(20)}  ${filename}`)
    }

    // Polite delay between words
    await new Promise((r) => setTimeout(r, 800))
  }

  console.log(`\n─────────────────────────────────────────`)
  console.log(`✅ Downloaded: ${downloaded}`)
  console.log(`⏭  Skipped:    ${skipped}`)
  console.log(`✗  Not found:  ${failed}`)

  if (failedList.length > 0) {
    console.log(`\nMissing files (TTS fallback will be used in the app):`)
    for (const line of failedList) console.log(`  ${line}`)
    console.log(`\nFor missing files, try searching manually at:`)
    console.log(`  https://commons.wikimedia.org/wiki/Category:Audio_files_of_pronunciation`)
  }
}

main().catch(console.error)
