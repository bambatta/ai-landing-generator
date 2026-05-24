'use client'

import { useState, useCallback } from 'react'
import { PromptInput } from '@/components/generator/prompt-input'
import { DraftReview } from '@/components/generator/draft-review'
import { GenerationProgress } from '@/components/generator/generation-progress'
import { LandingPage } from '@/components/landing/landing-page'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, RotateCcw } from 'lucide-react'
import type { LandingPageDraft, FinalLandingPage, GeneratorStep } from '@/types/landing'

export function GeneratorClient() {
  const [step, setStep] = useState<GeneratorStep>('input')
  const [description, setDescription] = useState('')
  const [draft, setDraft] = useState<LandingPageDraft | null>(null)
  const [finalPage, setFinalPage] = useState<FinalLandingPage | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async (desc: string) => {
    setDescription(desc)
    setError(null)
    setStep('drafting')

    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Generation failed')
      }

      const draftData = (await res.json()) as LandingPageDraft
      setDraft(draftData)
      setStep('review')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStep('input')
    }
  }, [])

  const handleApprove = useCallback(async () => {
    if (!draft) return
    setError(null)
    setStep('generating')

    try {
      const res = await fetch('/api/generate-final', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft, description }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Final generation failed')
      }

      const pageData = (await res.json()) as FinalLandingPage
      setFinalPage(pageData)
      setStep('preview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStep('review')
    }
  }, [draft, description])

  const reset = () => {
    setStep('input')
    setDraft(null)
    setFinalPage(null)
    setDescription('')
    setError(null)
  }

  // Full-page preview — rendered outside the card container
  if (step === 'preview' && finalPage) {
    return (
      <div className="-m-6 sm:-m-8">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur-sm">
          <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            Start over
          </Button>
          <span className="text-xs text-zinc-500">Landing page preview</span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => {
              const blob = new Blob([JSON.stringify(finalPage, null, 2)], {
                type: 'application/json',
              })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${finalPage.brandName.toLowerCase().replace(/\s+/g, '-')}-landing.json`
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Export JSON
          </Button>
        </div>
        <LandingPage page={finalPage} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      {step !== 'input' && (
        <div className="flex items-center gap-3">
          {step !== 'drafting' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (step === 'review') setStep('input')
                if (step === 'generating') setStep('review')
              }}
              className="gap-1.5 text-xs text-zinc-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-2">
            {(['input', 'review', 'preview'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    step === s
                      ? 'bg-violet-500'
                      : i < ['input', 'review', 'preview'].indexOf(step)
                        ? 'bg-violet-700'
                        : 'bg-zinc-800'
                  }`}
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-zinc-600 capitalize">
            {step === 'drafting'
              ? 'Generating draft...'
              : step === 'generating'
                ? 'Building page...'
                : step}
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-900/10 px-4 py-3 text-sm text-red-400">
          {error} —{' '}
          <button onClick={reset} className="underline hover:text-red-300">
            Try again
          </button>
        </div>
      )}

      {step === 'input' && <PromptInput onSubmit={handleGenerate} isLoading={false} />}

      {step === 'drafting' && <GenerationProgress phase="draft" />}

      {step === 'review' && draft && (
        <DraftReview
          draft={draft}
          onUpdate={setDraft}
          onApprove={handleApprove}
          isGenerating={false}
        />
      )}

      {step === 'generating' && <GenerationProgress phase="final" />}
    </div>
  )
}
