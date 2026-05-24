import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'
import { Agent, runner, ensureApiKey } from '@/lib/ai/client'
import { LandingPageDraftSchema } from '@/lib/validations/landing'
import { DRAFT_SYSTEM_PROMPT, DRAFT_USER_PROMPT } from '@/lib/ai/prompts'
import { generateId } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 60

const VALID_TONES = ['professional', 'playful', 'technical', 'casual', 'bold'] as const
const VALID_COLOR_SCHEMES = ['dark', 'light', 'gradient'] as const
const VALID_SECTION_TYPES = [
  'hero',
  'features',
  'testimonials',
  'pricing',
  'faq',
  'cta',
  'stats',
  'how-it-works',
] as const

function sanitizeDraftResponse(raw: Record<string, unknown>): Record<string, unknown> {
  return {
    ...raw,
    tone: VALID_TONES.includes(raw.tone as (typeof VALID_TONES)[number])
      ? raw.tone
      : 'professional',
    colorScheme: VALID_COLOR_SCHEMES.includes(
      raw.colorScheme as (typeof VALID_COLOR_SCHEMES)[number],
    )
      ? raw.colorScheme
      : 'dark',
    sections: Array.isArray(raw.sections)
      ? (raw.sections as Array<Record<string, unknown>>)
          .filter((s) =>
            VALID_SECTION_TYPES.includes(s.type as (typeof VALID_SECTION_TYPES)[number]),
          )
          .map((s) => ({
            ...s,
            id: typeof s.id === 'string' && s.id ? s.id : generateId(),
            bullets: Array.isArray(s.bullets) ? s.bullets : [],
            cta: s.cta != null && typeof s.cta === 'object' ? s.cta : null,
          }))
      : [],
  }
}

// Agent is created once at module load; the API key is read at call time by the SDK.
const draftAgent = new Agent({
  name: 'landing-draft-agent',
  instructions: DRAFT_SYSTEM_PROMPT,
  model: 'gpt-4o-mini',
  modelSettings: {
    temperature: 0.8,
    maxTokens: 2000,
    providerData: { text: { format: { type: 'json_object' } } },
  },
})

export async function POST(req: NextRequest) {
  try {
    ensureApiKey()

    const body = (await req.json()) as { description?: unknown }
    const description = typeof body.description === 'string' ? body.description.trim() : ''

    if (!description || description.length < 10) {
      return NextResponse.json({ error: 'Description too short' }, { status: 400 })
    }

    if (description.length > 1000) {
      return NextResponse.json({ error: 'Description too long' }, { status: 400 })
    }

    const result = await runner.run(draftAgent, DRAFT_USER_PROMPT(description))

    const raw = result.finalOutput
    if (!raw || typeof raw !== 'string') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 502 })
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>
    const sanitized = sanitizeDraftResponse(parsed)
    const draft = LandingPageDraftSchema.parse(sanitized)

    return NextResponse.json(draft)
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.error('[generate-draft] OpenAI error', err.status, err.message)
      const status = err.status === 429 ? 429 : 502
      return NextResponse.json({ error: err.message }, { status })
    }
    if (err instanceof z.ZodError) {
      console.error('[generate-draft] Zod validation failed:', JSON.stringify(err.issues, null, 2))
      return NextResponse.json(
        { error: 'AI returned an unexpected structure. Please try again.' },
        { status: 502 },
      )
    }
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 502 })
    }
    console.error('[generate-draft]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
