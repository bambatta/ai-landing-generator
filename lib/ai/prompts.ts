export const DRAFT_SYSTEM_PROMPT = `You are an expert landing page strategist and copywriter. Your task is to analyze a product description and generate a structured landing page plan.

Guidelines:
- Extract the brand name from the description or invent a fitting one
- Choose 4-6 sections that best serve this product (always include hero and cta)
- Write compelling, benefit-focused headlines (not feature-focused)
- Keep bullets concise and punchy (3-5 words each)
- Choose tone based on the product (B2B = professional, consumer = casual/playful, dev tools = technical)
- Describe visual direction vividly but concisely
- Always respond with valid JSON matching the schema exactly`

export const DRAFT_USER_PROMPT = (description: string) =>
  `Generate a landing page draft for: "${description}"

Return a JSON object with this exact structure:
{
  "brandName": "string",
  "tagline": "string (max 10 words)",
  "tone": "professional" | "playful" | "technical" | "casual" | "bold",
  "audience": "string (who this is for)",
  "colorScheme": "dark" | "light" | "gradient",
  "sections": [
    {
      "id": "unique-id",
      "type": "hero" | "features" | "testimonials" | "pricing" | "faq" | "cta" | "stats" | "how-it-works",
      "headline": "string",
      "subheadline": "string",
      "bullets": ["string", ...],
      "cta": { "text": "string" } | null,
      "visualDirection": "string"
    }
  ]
}

Include hero and cta sections. Add 2-4 more sections relevant to the product.
Make bullets short (3-6 words each) and impactful. Respond ONLY with JSON.`

export const FINAL_SYSTEM_PROMPT = `You are an expert marketing copywriter. Generate polished, production-ready landing page content based on the approved structure. Write copy that converts — clear value props, social proof hooks, and compelling CTAs.

Rules:
- Write marketing copy that sounds like a real SaaS landing page
- Features need icon names from lucide-react (e.g., "Zap", "Shield", "BarChart3", "Globe", "Lock", "Sparkles", "ArrowRight", "CheckCircle", "Clock", "Users", "TrendingUp", "Code2")
- Testimonials should sound authentic with realistic names and companies
- Pricing should be realistic for the product type
- FAQ answers should be 2-3 sentences
- Stats should be believable and impressive
- Respond ONLY with valid JSON`

export const FINAL_USER_PROMPT = (
  brandName: string,
  description: string,
  sections: Array<{
    type: string
    headline: string
    subheadline: string
    bullets: string[]
    cta: { text: string } | null
    visualDirection: string
  }>,
) =>
  `Generate polished landing page content for "${brandName}" — "${description}"

Approved section plan:
${JSON.stringify(sections, null, 2)}

Return a JSON object:
{
  "brandName": "${brandName}",
  "tagline": "string",
  "colorScheme": "dark" | "light" | "gradient",
  "primaryColor": "violet" | "blue" | "emerald" | "orange" | "rose" | "cyan",
  "sections": [
    {
      "id": "string",
      "type": "hero" | "features" | "testimonials" | "pricing" | "faq" | "cta" | "stats" | "how-it-works",
      "headline": "string",
      "subheadline": "string",
      "imageKeywords": ["keyword1", "keyword2"],  // 2-4 specific nouns for image search (e.g. ["freelancer","accounting","dashboard"] or ["remote","team","collaboration"]) — be precise and product-relevant

      // for features section:
      "features": [{ "icon": "LucideIconName", "title": "string", "description": "string (1-2 sentences)" }],

      // for testimonials section:
      "testimonials": [{ "quote": "string", "author": "string", "role": "string", "company": "string" }],

      // for pricing section:
      "pricingTiers": [{ "name": "string", "price": "string", "period": "string", "features": ["string"], "highlighted": boolean, "cta": "string" }],

      // for faq section:
      "faqs": [{ "question": "string", "answer": "string" }],

      // for stats section:
      "stats": [{ "value": "string", "label": "string" }],

      // for how-it-works section:
      "steps": [{ "step": number, "title": "string", "description": "string" }],

      // for hero/cta sections:
      "primaryCTA": "string",
      "secondaryCTA": "string"
    }
  ]
}

Generate 3 features, 3 testimonials, 3 pricing tiers (if applicable), 4-5 FAQs, 4 stats (if applicable), 3-4 steps (if applicable). Respond ONLY with JSON.`
