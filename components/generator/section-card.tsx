'use client'

import { useState } from 'react'
import { RefreshCw, Trash2, ChevronDown, ChevronUp, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import type { DraftSection } from '@/types/landing'

interface SectionCardProps {
  section: DraftSection
  index: number
  onUpdate: (id: string, updates: Partial<DraftSection>) => void
  onRemove: (id: string) => void
  onRegenerate: (id: string) => void
  isRegenerating: boolean
}

const SECTION_LABELS: Record<DraftSection['type'], string> = {
  hero: 'Hero',
  features: 'Features',
  testimonials: 'Testimonials',
  pricing: 'Pricing',
  faq: 'FAQ',
  cta: 'Call to Action',
  stats: 'Stats',
  'how-it-works': 'How It Works',
}

const SECTION_COLORS: Record<DraftSection['type'], string> = {
  hero: 'bg-violet-900/30 text-violet-300 border-violet-800/50',
  features: 'bg-blue-900/30 text-blue-300 border-blue-800/50',
  testimonials: 'bg-emerald-900/30 text-emerald-300 border-emerald-800/50',
  pricing: 'bg-amber-900/30 text-amber-300 border-amber-800/50',
  faq: 'bg-cyan-900/30 text-cyan-300 border-cyan-800/50',
  cta: 'bg-rose-900/30 text-rose-300 border-rose-800/50',
  stats: 'bg-orange-900/30 text-orange-300 border-orange-800/50',
  'how-it-works': 'bg-indigo-900/30 text-indigo-300 border-indigo-800/50',
}

export function SectionCard({
  section,
  index,
  onUpdate,
  onRemove,
  onRegenerate,
  isRegenerating,
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(index < 2)
  const [editingBulletIndex, setEditingBulletIndex] = useState<number | null>(null)

  const addBullet = () => {
    onUpdate(section.id, { bullets: [...section.bullets, ''] })
    setEditingBulletIndex(section.bullets.length)
  }

  const updateBullet = (i: number, value: string) => {
    const next = [...section.bullets]
    next[i] = value
    onUpdate(section.id, { bullets: next })
  }

  const removeBullet = (i: number) => {
    onUpdate(section.id, { bullets: section.bullets.filter((_, idx) => idx !== i) })
  }

  return (
    <Card className="group relative overflow-hidden border-zinc-800/80 transition-all duration-200 hover:border-zinc-700">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-400">
            {index + 1}
          </div>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SECTION_COLORS[section.type]}`}
          >
            {SECTION_LABELS[section.type]}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRegenerate(section.id)}
              disabled={isRegenerating}
              className="h-7 gap-1.5 px-2 text-xs text-zinc-500 hover:text-zinc-300"
            >
              <RefreshCw className={`h-3 w-3 ${isRegenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(section.id)}
              className="h-7 w-7 p-0 text-zinc-600 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-7 w-7 p-0 text-zinc-500 hover:text-zinc-300"
            >
              {expanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <Input
            value={section.headline}
            onChange={(e) => onUpdate(section.id, { headline: e.target.value })}
            placeholder="Section headline..."
            className="border-transparent bg-transparent px-0 text-base font-semibold text-zinc-100 placeholder:text-zinc-600 hover:bg-zinc-800/50 focus-visible:bg-zinc-800/50 focus-visible:ring-0"
          />
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4 pt-0">
          <Textarea
            value={section.subheadline}
            onChange={(e) => onUpdate(section.id, { subheadline: e.target.value })}
            placeholder="Subheadline..."
            className="min-h-[60px] border-zinc-800/50 bg-zinc-900/30 text-sm text-zinc-300"
          />

          {section.bullets.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
                Key Points
              </p>
              {section.bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  <Input
                    value={bullet}
                    onChange={(e) => updateBullet(i, e.target.value)}
                    placeholder="Key point..."
                    className="h-8 border-transparent bg-transparent px-0 text-sm text-zinc-300 hover:bg-zinc-800/30"
                    autoFocus={editingBulletIndex === i}
                    onFocus={() => setEditingBulletIndex(i)}
                    onBlur={() => setEditingBulletIndex(null)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBullet(i)}
                    className="h-6 w-6 shrink-0 p-0 text-zinc-700 hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={addBullet}
                className="h-7 px-2 text-xs text-zinc-600 hover:text-zinc-400"
              >
                + Add point
              </Button>
            </div>
          )}

          {section.cta && (
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-xs font-medium text-zinc-500">CTA:</span>
              <Input
                value={section.cta.text}
                onChange={(e) =>
                  onUpdate(section.id, { cta: { ...section.cta!, text: e.target.value } })
                }
                placeholder="CTA text..."
                className="h-8 border-transparent bg-transparent px-0 text-sm text-violet-400 hover:bg-zinc-800/30"
              />
            </div>
          )}

          <div className="flex items-start gap-2 rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-3">
            <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" />
            <p className="text-xs text-zinc-500 italic">{section.visualDirection}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
