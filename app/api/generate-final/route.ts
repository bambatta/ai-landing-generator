import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'
import { Agent, runner, ensureApiKey } from '@/lib/ai/client'
import { FinalLandingPageSchema } from '@/lib/validations/landing'
import { FINAL_SYSTEM_PROMPT, FINAL_USER_PROMPT } from '@/lib/ai/prompts'
import { generateId } from '@/lib/utils'
import type { DraftSection, LandingPageDraft, SectionType } from '@/types/landing'

export const runtime = 'nodejs'
export const maxDuration = 60

const VALID_SECTION_TYPES: SectionType[] = [
  'hero',
  'features',
  'testimonials',
  'pricing',
  'faq',
  'cta',
  'stats',
  'how-it-works',
]

const VALID_COLOR_SCHEMES = ['dark', 'light', 'gradient'] as const
const VALID_PRIMARY_COLORS = ['violet', 'blue', 'emerald', 'orange', 'rose', 'cyan']

/**
 * Sanitize raw AI JSON before Zod validation.
 * GPT-4o-mini occasionally returns enum values outside our allowed set
 * (e.g. "social-proof" instead of "testimonials", "purple" instead of "violet").
 * Coerce those to safe fallbacks so Zod never sees invalid enum values.
 */
function sanitizeAIResponse(
  raw: Record<string, unknown>,
  draftOrder: SectionType[],
): Record<string, unknown> {
  const colorScheme = VALID_COLOR_SCHEMES.includes(
    raw.colorScheme as (typeof VALID_COLOR_SCHEMES)[number],
  )
    ? raw.colorScheme
    : 'dark'

  const primaryColor = VALID_PRIMARY_COLORS.includes(raw.primaryColor as string)
    ? raw.primaryColor
    : 'violet'

  const sections = Array.isArray(raw.sections)
    ? (raw.sections as Array<Record<string, unknown>>).map((s, i) => {
        const rawType = s.type as string | undefined
        const type: SectionType =
          rawType && VALID_SECTION_TYPES.includes(rawType as SectionType)
            ? (rawType as SectionType)
            : (draftOrder[i] ?? 'features')

        return {
          ...s,
          id: typeof s.id === 'string' && s.id ? s.id : generateId(),
          type,
          headline: typeof s.headline === 'string' ? s.headline : '',
          subheadline: typeof s.subheadline === 'string' ? s.subheadline : '',
          imageKeywords:
            Array.isArray(s.imageKeywords) &&
            (s.imageKeywords as unknown[]).every((k) => typeof k === 'string')
              ? (s.imageKeywords as string[])
              : undefined,
          // Ensure array fields are actually arrays
          features: Array.isArray(s.features) ? s.features : undefined,
          testimonials: Array.isArray(s.testimonials) ? s.testimonials : undefined,
          pricingTiers: Array.isArray(s.pricingTiers) ? s.pricingTiers : undefined,
          faqs: Array.isArray(s.faqs) ? s.faqs : undefined,
          stats: Array.isArray(s.stats) ? s.stats : undefined,
          steps: Array.isArray(s.steps) ? s.steps : undefined,
        }
      })
    : []

  return {
    ...raw,
    colorScheme,
    primaryColor,
    sections,
  }
}

// Agent is created once at module load; the API key is read at call time by the SDK.
const finalAgent = new Agent({
  name: 'landing-final-agent',
  instructions: FINAL_SYSTEM_PROMPT,
  model: 'gpt-4o-mini',
  modelSettings: {
    temperature: 0.7,
    maxTokens: 4000,
    providerData: { text: { format: { type: 'json_object' } } },
  },
})

export async function POST(req: NextRequest) {
  try {
    ensureApiKey()

    const body = (await req.json()) as { draft?: unknown; description?: unknown }
    const draft = body.draft as LandingPageDraft
    const description = typeof body.description === 'string' ? body.description : ''

    if (!draft || !Array.isArray(draft.sections) || draft.sections.length === 0) {
      return NextResponse.json({ error: 'Invalid draft' }, { status: 400 })
    }

    const sectionSummaries = draft.sections.map((s: DraftSection) => ({
      type: s.type,
      headline: s.headline,
      subheadline: s.subheadline,
      bullets: s.bullets,
      cta: s.cta,
      visualDirection: s.visualDirection,
    }))

    const result = await runner.run(
      finalAgent,
      FINAL_USER_PROMPT(draft.brandName, description, sectionSummaries),
    )

    const raw = result.finalOutput
    if (!raw || typeof raw !== 'string') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 502 })
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>
    const draftOrder = draft.sections.map((s: DraftSection) => s.type)
    const sanitized = sanitizeAIResponse(parsed, draftOrder)

    const final = FinalLandingPageSchema.parse(sanitized)

    return NextResponse.json(final)
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.error('[generate-final] OpenAI error', err.status, err.message)
      const status = err.status === 429 ? 429 : 502
      return NextResponse.json({ error: err.message }, { status })
    }
    if (err instanceof z.ZodError) {
      console.error('[generate-final] Zod validation failed:', JSON.stringify(err.issues, null, 2))
      return NextResponse.json(
        { error: 'AI returned an unexpected structure. Please try again.' },
        { status: 502 },
      )
    }
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 502 })
    }
    console.error('[generate-final]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
