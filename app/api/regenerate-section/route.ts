import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Agent, runner, ensureApiKey } from '@/lib/ai/client'
import { DraftSectionSchema } from '@/lib/validations/landing'
import { generateId } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 30

const sectionAgent = new Agent({
  name: 'landing-section-agent',
  instructions:
    'You are a landing page copywriter. Generate a single section with fresh copy. Respond with JSON only.',
  model: 'gpt-4o-mini',
  modelSettings: {
    temperature: 0.9,
    maxTokens: 500,
    providerData: { text: { format: { type: 'json_object' } } },
  },
})

export async function POST(req: NextRequest) {
  try {
    ensureApiKey()

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

    const result = await runner.run(
      sectionAgent,
      `Generate a "${sectionType}" section for ${brandName} (tone: ${tone}, audience: ${audience}).
Return JSON: { "id": "string", "type": "${sectionType}", "headline": "string", "subheadline": "string", "bullets": ["string"], "cta": { "text": "string" } | null, "visualDirection": "string" }`,
    )

    const raw = result.finalOutput
    if (!raw || typeof raw !== 'string') throw new Error('No content')

    const parsed = JSON.parse(raw) as Record<string, unknown>
    parsed.id = generateId()

    const section = DraftSectionSchema.parse(parsed)
    return NextResponse.json(section)
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.error('[regenerate-section] OpenAI error', err.status, err.message)
      return NextResponse.json({ error: err.message }, { status: err.status ?? 502 })
    }
    console.error('[regenerate-section]', err)
    return NextResponse.json({ error: 'Regeneration failed' }, { status: 500 })
  }
}
