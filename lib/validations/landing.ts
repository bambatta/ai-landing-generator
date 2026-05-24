import { z } from 'zod'

export const SectionTypeSchema = z.enum([
  'hero',
  'features',
  'testimonials',
  'pricing',
  'faq',
  'cta',
  'stats',
  'how-it-works',
])

export const ToneSchema = z.enum(['professional', 'playful', 'technical', 'casual', 'bold'])
export const ColorSchemeSchema = z.enum(['dark', 'light', 'gradient'])

export const DraftSectionSchema = z.object({
  id: z.string(),
  type: SectionTypeSchema,
  headline: z.string().min(1),
  subheadline: z.string(),
  bullets: z.array(z.string()),
  cta: z
    .object({
      text: z.string(),
      href: z.string().optional(),
    })
    .nullable(),
  visualDirection: z.string(),
})

export const LandingPageDraftSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string(),
  tone: ToneSchema,
  audience: z.string(),
  colorScheme: ColorSchemeSchema,
  sections: z.array(DraftSectionSchema).min(3).max(8),
})

export const FeatureItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
})

export const TestimonialItemSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
})

export const PricingTierSchema = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string(),
  features: z.array(z.string()),
  highlighted: z.boolean(),
  cta: z.string(),
})

export const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

export const StatItemSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const HowItWorksStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
})

export const FinalSectionSchema = z.object({
  id: z.string(),
  type: SectionTypeSchema,
  headline: z.string(),
  subheadline: z.string(),
  features: z.array(FeatureItemSchema).optional(),
  testimonials: z.array(TestimonialItemSchema).optional(),
  pricingTiers: z.array(PricingTierSchema).optional(),
  faqs: z.array(FAQItemSchema).optional(),
  stats: z.array(StatItemSchema).optional(),
  steps: z.array(HowItWorksStepSchema).optional(),
  primaryCTA: z.string().optional(),
  secondaryCTA: z.string().optional(),
})

export const FinalLandingPageSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  colorScheme: ColorSchemeSchema,
  primaryColor: z.string(),
  sections: z.array(FinalSectionSchema),
})

export type LandingPageDraftInput = z.infer<typeof LandingPageDraftSchema>
export type FinalLandingPageInput = z.infer<typeof FinalLandingPageSchema>
