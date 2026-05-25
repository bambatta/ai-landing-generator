'use client'

import { useState } from 'react'
import { CheckCircle, Sparkles, Users, Palette, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/generator/section-card'
import type { DraftSection, LandingPageDraft } from '@/types/landing'

interface DraftReviewProps {
  draft: LandingPageDraft
  onUpdate: (draft: LandingPageDraft) => void
  onApprove: () => void
  isGenerating: boolean
}

export function DraftReview({ draft, onUpdate, onApprove, isGenerating }: DraftReviewProps) {
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null)

  const updateSection = (id: string, updates: Partial<DraftSection>) => {
    onUpdate({
      ...draft,
      sections: draft.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })
  }

  const removeSection = (id: string) => {
    onUpdate({
      ...draft,
      sections: draft.sections.filter((s) => s.id !== id),
    })
  }

  const regenerateSection = async (id: string) => {
    setRegeneratingId(id)
    try {
      const section = draft.sections.find((s) => s.id === id)
      if (!section) return

      const response = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionType: section.type,
          brandName: draft.brandName,
          tone: draft.tone,
          audience: draft.audience,
        }),
      })

      if (!response.ok) throw new Error('Regeneration failed')
      const updated: Partial<DraftSection> = await response.json()
      updateSection(id, updated)
    } catch {
      // Keep existing section on error
    } finally {
      setRegeneratingId(null)
    }
  }

  const TONE_COLORS: Record<string, string> = {
    professional: 'bg-blue-900/30 text-blue-300 border-blue-800/50',
    playful: 'bg-pink-900/30 text-pink-300 border-pink-800/50',
    technical: 'bg-cyan-900/30 text-cyan-300 border-cyan-800/50',
    casual: 'bg-green-900/30 text-green-300 border-green-800/50',
    bold: 'bg-orange-900/30 text-orange-300 border-orange-800/50',
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Brand meta */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">{draft.brandName}</h2>
            <p className="mt-0.5 text-sm text-zinc-400">{draft.tagline}</p>
          </div>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${TONE_COLORS[draft.tone] ?? ''}`}
          >
            {draft.tone}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Users className="h-3.5 w-3.5" />
            <span>{draft.audience}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Palette className="h-3.5 w-3.5" />
            <span className="capitalize">{draft.colorScheme} theme</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{draft.sections.length} sections</span>
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-300">
            Sections{' '}
            <span className="ml-1 text-zinc-600">— edit, remove, or regenerate any section</span>
          </p>
          <Badge variant="secondary" className="shrink-0 text-xs whitespace-nowrap">
            {draft.sections.length} total
          </Badge>
        </div>

        {draft.sections.map((section, index) => (
          <SectionCard
            key={section.id}
            section={section}
            index={index}
            onUpdate={updateSection}
            onRemove={removeSection}
            onRegenerate={regenerateSection}
            isRegenerating={regeneratingId === section.id}
          />
        ))}
      </div>

      {/* Sticky approval bar */}
      <div className="sticky bottom-4 z-10 rounded-2xl border border-violet-900/50 bg-zinc-950/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-violet-400" />
            <p className="text-sm text-zinc-300">
              Happy with the plan?{' '}
              <span className="text-zinc-500">Generate your landing page.</span>
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={onApprove}
            disabled={isGenerating || draft.sections.length === 0}
            className="w-full gap-2 sm:w-auto sm:shrink-0"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Landing Page
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
