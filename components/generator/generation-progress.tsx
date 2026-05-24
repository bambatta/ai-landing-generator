'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const DRAFT_MESSAGES = [
  'Analyzing your product...',
  'Crafting your brand story...',
  'Designing section structure...',
  'Writing compelling copy...',
  'Finalizing your draft...',
]

const FINAL_MESSAGES = [
  'Polishing your copy...',
  'Generating pricing strategy...',
  'Writing testimonials...',
  'Crafting feature highlights...',
  'Building your landing page...',
]

interface GenerationProgressProps {
  phase: 'draft' | 'final'
}

export function GenerationProgress({ phase }: GenerationProgressProps) {
  const messages = phase === 'draft' ? DRAFT_MESSAGES : FINAL_MESSAGES
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-violet-600/20" />
        <div className="absolute h-16 w-16 animate-pulse rounded-full bg-violet-600/30" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-zinc-300 transition-all duration-500">
          {messages[messageIndex]}
        </p>
        <p className="mt-1 text-xs text-zinc-600">AI is working its magic</p>
      </div>

      <div className="w-full max-w-md space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
