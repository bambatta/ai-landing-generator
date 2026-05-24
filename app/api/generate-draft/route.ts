import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/ai/client'
import { LandingPageDraftSchema } from '@/lib/validations/landing'
import { DRAFT_SYSTEM_PROMPT, DRAFT_USER_PROMPT } from '@/lib/ai/prompts'
import { generateId } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { description?: unknown }
    const description = typeof body.description === 'string' ? body.description.trim() : ''

    if (!description || description.length < 10) {
      return NextResponse.json({ error: 'Description too short' }, { status: 400 })
    }

    if (description.length > 1000) {
      return NextResponse.json({ error: 'Description too long' }, { status: 400 })
    }

    const completion = await getOpenAIClient().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: DRAFT_SYSTEM_PROMPT },
        { role: 'user', content: DRAFT_USER_PROMPT(description) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 2000,
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 502 })
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>

    // Ensure sections have IDs
    if (Array.isArray(parsed.sections)) {
      parsed.sections = (parsed.sections as Array<Record<string, unknown>>).map((s) => ({
        ...s,
        id: typeof s.id === 'string' && s.id ? s.id : generateId(),
        bullets: Array.isArray(s.bullets) ? s.bullets : [],
        cta: s.cta ?? null,
      }))
    }

    const draft = LandingPageDraftSchema.parse(parsed)

    return NextResponse.json(draft)
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 502 })
    }
    console.error('[generate-draft]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
