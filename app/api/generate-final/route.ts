import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/ai/client'
import { FinalLandingPageSchema } from '@/lib/validations/landing'
import { FINAL_SYSTEM_PROMPT, FINAL_USER_PROMPT } from '@/lib/ai/prompts'
import { generateId } from '@/lib/utils'
import type { DraftSection, LandingPageDraft } from '@/types/landing'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
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

    const completion = await getOpenAIClient().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: FINAL_SYSTEM_PROMPT },
        {
          role: 'user',
          content: FINAL_USER_PROMPT(draft.brandName, description, sectionSummaries),
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4000,
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 502 })
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>

    // Ensure sections have IDs and type is preserved from draft order
    if (Array.isArray(parsed.sections)) {
      const draftOrder = draft.sections.map((s: DraftSection) => s.type)
      parsed.sections = (parsed.sections as Array<Record<string, unknown>>).map((s, i) => ({
        ...s,
        id: typeof s.id === 'string' && s.id ? s.id : generateId(),
        type: s.type ?? draftOrder[i],
      }))
    }

    const final = FinalLandingPageSchema.parse(parsed)

    return NextResponse.json(final)
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 502 })
    }
    console.error('[generate-final]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
