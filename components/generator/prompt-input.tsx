'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const EXAMPLE_PROMPTS = [
  'AI bookkeeping software for freelancers',
  'Project management tool for remote design teams',
  'No-code mobile app builder for entrepreneurs',
  'Fitness coaching platform with personalized AI plans',
  'B2B invoice automation for small businesses',
]

interface PromptInputProps {
  onSubmit: (description: string) => void
  isLoading: boolean
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description.trim().length < 10) return
    onSubmit(description.trim())
  }

  const applyExample = (example: string) => {
    setDescription(example)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product or startup in a sentence or two..."
            className="min-h-[120px] resize-none border-zinc-700/80 bg-zinc-900/80 pr-4 text-base text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-500/50 focus-visible:ring-violet-500/30"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit(e)
              }
            }}
          />
          <div className="absolute right-3 bottom-3 text-xs text-zinc-600">
            {description.length > 0 && `${description.length} chars`}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-500">
              ⌘ Enter
            </kbd>{' '}
            to generate
          </p>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={description.trim().length < 10 || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                Generate Landing Page
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-zinc-600" />
          <p className="text-xs font-medium tracking-wider text-zinc-600 uppercase">Examples</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => applyExample(prompt)}
              disabled={isLoading}
              className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
