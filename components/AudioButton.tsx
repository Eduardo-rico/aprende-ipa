'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface AudioButtonProps {
  src: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export function AudioButton({ src, size = 'md', className, label }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(async () => {
    if (error) return
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
          setError(true)
          setPlaying(false)
        }
      }
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      setPlaying(true)
    } catch {
      setError(true)
    }
  }, [src, playing, error])

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

  if (error) {
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
      title={label ?? 'Reproducir sonido'}
      aria-label={label ?? 'Reproducir sonido'}
      className={cn(
        'inline-flex items-center justify-center rounded-full border transition-all',
        playing
          ? 'border-primary/60 bg-primary/15 text-primary shadow-[0_0_12px_0px] shadow-primary/30'
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
