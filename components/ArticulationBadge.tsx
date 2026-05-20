import { Badge } from '@/components/ui/badge'
import type { IPASymbol } from '@/lib/data/symbols'
import { cn } from '@/lib/utils'

interface ArticulationBadgeProps {
  symbol: IPASymbol
  className?: string
}

export function ArticulationBadge({ symbol, className }: ArticulationBadgeProps) {
  const art = symbol.articulation

  if (art.type === 'consonant') {
    return (
      <div className={cn('flex flex-wrap gap-1.5', className)}>
        <Badge variant="secondary" className="text-xs bg-blue-950/60 text-blue-300 border-blue-800/50">
          {art.place}
        </Badge>
        <Badge variant="secondary" className="text-xs bg-violet-950/60 text-violet-300 border-violet-800/50">
          {art.manner}
        </Badge>
        <Badge
          variant="secondary"
          className={cn(
            'text-xs border',
            art.voicing === 'voiced'
              ? 'bg-green-950/60 text-green-300 border-green-800/50'
              : 'bg-zinc-900/60 text-zinc-400 border-zinc-700/50',
          )}
        >
          {art.voicing === 'voiced' ? 'sonora' : 'sorda'}
        </Badge>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      <Badge variant="secondary" className="text-xs bg-amber-950/60 text-amber-300 border-amber-800/50">
        {art.height}
      </Badge>
      <Badge variant="secondary" className="text-xs bg-cyan-950/60 text-cyan-300 border-cyan-800/50">
        {art.backness}
      </Badge>
      <Badge
        variant="secondary"
        className={cn(
          'text-xs border',
          art.rounding === 'rounded'
            ? 'bg-pink-950/60 text-pink-300 border-pink-800/50'
            : 'bg-zinc-900/60 text-zinc-400 border-zinc-700/50',
        )}
      >
        {art.rounding === 'rounded' ? 'redondeada' : 'no redondeada'}
      </Badge>
      {art.nasal && (
        <Badge variant="secondary" className="text-xs bg-teal-950/60 text-teal-300 border-teal-800/50">
          nasal
        </Badge>
      )}
    </div>
  )
}
