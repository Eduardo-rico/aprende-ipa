#!/usr/bin/env tsx
/**
 * Downloads IPA symbol audio files from Wikimedia Commons.
 * Run: npx tsx scripts/download-audio.ts
 * Idempotent: skips files that already exist.
 */

import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream/promises'
import SYMBOLS from '../lib/data/symbols'

const SYMBOLS_DIR = join(process.cwd(), 'public', 'audio', 'symbols')
const WIKIMEDIA_BASE = 'https://upload.wikimedia.org/wikipedia/commons'

mkdirSync(SYMBOLS_DIR, { recursive: true })

// Maps wikiAudioName → Wikimedia path (first 2 chars of MD5 hash prefix)
// We use the direct /commons/ path which Wikimedia resolves
function getWikimediaUrl(filename: string): string {
  // Wikimedia uses MD5-based paths: /commons/X/XY/Filename.ogg
  // For simplicity, we use the Special:FilePath redirect which is reliable
  const encoded = encodeURIComponent(filename)
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}`
}

async function downloadFile(url: string, dest: string, retries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'IPALearnApp/1.0 (educational; contact: edu@ipa-learn.local)' },
        redirect: 'follow',
      })
      if (res.status === 429) {
        const wait = attempt * 3000
        console.log(`  ⏳ Rate limited, waiting ${wait/1000}s (attempt ${attempt}/${retries})...`)
        await new Promise((r) => setTimeout(r, wait))
        continue
      }
      if (res.status === 404) {
        console.log(`  ⚠  Not found on Wikimedia (404) — skipping`)
        return false
      }
      if (!res.ok) {
        console.error(`  ✗ HTTP ${res.status} for ${url}`)
        return false
      }
      const buffer = await res.arrayBuffer()
      const bytes = new Uint8Array(buffer)
      require('fs').writeFileSync(dest, bytes)
      return true
    } catch (err) {
      console.error(`  ✗ Error: ${err}`)
      if (attempt < retries) await new Promise((r) => setTimeout(r, 2000))
    }
  }
  return false
}

async function main() {
  console.log(`\n📥 Downloading IPA symbol audio files from Wikimedia Commons...\n`)

  let downloaded = 0
  let skipped = 0
  let failed = 0

  const seen = new Set<string>()

  for (const symbol of SYMBOLS) {
    if (!symbol.wikiAudioName) continue
    if (seen.has(symbol.wikiAudioName)) continue
    seen.add(symbol.wikiAudioName)

    // Destination uses the symbol's audio path (e.g., "symbols/p.ogg")
    const filename = symbol.audio.replace('symbols/', '')
    const destPath = join(SYMBOLS_DIR, filename)

    if (existsSync(destPath)) {
      console.log(`  ⏭  ${filename} (already exists)`)
      skipped++
      continue
    }

    const url = getWikimediaUrl(symbol.wikiAudioName)
    console.log(`  ↓  ${filename} ← ${symbol.wikiAudioName}`)
    const ok = await downloadFile(url, destPath)
    if (ok) {
      downloaded++
    } else {
      failed++
    }

    // Polite rate limiting
    await new Promise((r) => setTimeout(r, 1200))
  }

  // Write attribution file
  const attribution = `# Audio Credits

All symbol audio files are from Wikimedia Commons.
License: Creative Commons Attribution-ShareAlike (CC-BY-SA)
Source: https://commons.wikimedia.org/

## Files used:
${[...seen].map((name) => `- ${name}`).join('\n')}
`
  writeFileSync(join(SYMBOLS_DIR, 'CREDITS.md'), attribution)

  console.log(`\n✅ Done: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`)
  if (failed > 0) {
    console.log(`\n⚠️  ${failed} files failed. You can find them manually at https://commons.wikimedia.org/`)
  }
}

main().catch(console.error)
