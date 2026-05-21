'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface AudioButtonProps {
  src: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
  word?: string
  speechLang?: string
}

export function AudioButton({ src, size = 'md', className, label, word, speechLang }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState<'audio' | 'tts' | 'unavailable'>('audio')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const speakTTS = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !word || !speechLang) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(word)
    utter.lang = speechLang
    utter.rate = 0.85
    utter.onstart = () => setPlaying(true)
    utter.onend = () => setPlaying(false)
    utter.onerror = () => setPlaying(false)
    window.speechSynthesis.speak(utter)
    setPlaying(true)
  }, [word, speechLang])

  const play = useCallback(async () => {
    if (mode === 'unavailable') return

    if (mode === 'tts') {
      if (playing) {
        window.speechSynthesis?.cancel()
        setPlaying(false)
      } else {
        speakTTS()
      }
      return
    }

    if (playing) {
      audioRef.current?.pause()
      if (audioRef.current) audioRef.current.currentTime = 0
      setPlaying(false)
      return
    }

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src)
        audioRef.current.onended = () => setPlaying(false)
        audioRef.current.onerror = () => {
          setPlaying(false)
          if (word && speechLang) {
            setMode('tts')
            speakTTS()
          } else {
            setMode('unavailable')
          }
        }
      }
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      setPlaying(true)
    } catch {
      if (word && speechLang) {
        setMode('tts')
        speakTTS()
      } else {
        setMode('unavailable')
      }
    }
  }, [src, playing, mode, word, speechLang, speakTTS])

  const sizes = {
    sm: 'h-7 w-7 gap-0.5',
    md: 'h-9 w-9 gap-0.5',
    lg: 'h-12 w-12 gap-1',
  }

  const barSizes = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6',
  }

  if (mode === 'unavailable') {
    return (
      <button
        disabled
        title="Audio no disponible"
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-border/40 bg-muted text-muted-foreground/40 cursor-not-allowed',
          sizes[size],
          className,
        )}
      >
        <span className="text-xs">—</span>
      </button>
    )
  }

  return (
    <button
      onClick={play}
      title={mode === 'tts' ? `Escuchar "${word}" (síntesis de voz)` : (label ?? 'Reproducir sonido')}
      aria-label={mode === 'tts' ? `Escuchar "${word}"` : (label ?? 'Reproducir sonido')}
      className={cn(
        'inline-flex items-center justify-center rounded-full border transition-all',
        playing
          ? 'border-primary/60 bg-primary/15 text-primary shadow-[0_0_12px_0px] shadow-primary/30'
          : mode === 'tts'
          ? 'border-sky-700/60 bg-sky-950/20 hover:bg-sky-950/40 text-sky-400/80 hover:text-sky-400'
          : 'border-border/60 bg-muted hover:bg-accent hover:border-primary/40 text-muted-foreground hover:text-primary',
        sizes[size],
        className,
      )}
    >
      {playing ? (
        <span className="flex items-end justify-center gap-[2px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={cn('wave-bar w-[2px] rounded-full bg-primary origin-bottom', barSizes[size])}
            />
          ))}
        </span>
      ) : mode === 'tts' ? (
        <svg
          className={cn(size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4')}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.41 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
        </svg>
      ) : (
        <svg
          className={cn(size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4')}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  )
}
