import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/ai/client'
import { DraftSectionSchema } from '@/lib/validations/landing'
import { generateId } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      sectionType?: unknown
      brandName?: unknown
      tone?: unknown
      audience?: unknown
    }

    const sectionType = String(body.sectionType ?? '')
    const brandName = String(body.brandName ?? '')
    const tone = String(body.tone ?? 'professional')
    const audience = String(body.audience ?? '')

    const completion = await getOpenAIClient().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a landing page copywriter. Generate a single section with fresh copy. Respond with JSON only.',
        },
        {
          role: 'user',
          content: `Generate a "${sectionType}" section for ${brandName} (tone: ${tone}, audience: ${audience}).
Return JSON: { "id": "string", "type": "${sectionType}", "headline": "string", "subheadline": "string", "bullets": ["string"], "cta": { "text": "string" } | null, "visualDirection": "string" }`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.9,
      max_tokens: 500,
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) throw new Error('No content')

    const parsed = JSON.parse(raw) as Record<string, unknown>
    parsed.id = generateId()

    const section = DraftSectionSchema.parse(parsed)
    return NextResponse.json(section)
  } catch (err) {
    console.error('[regenerate-section]', err)
    return NextResponse.json({ error: 'Regeneration failed' }, { status: 500 })
  }
}
