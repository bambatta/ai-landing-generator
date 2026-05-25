export type SectionType =
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'cta'
  | 'stats'
  | 'how-it-works'

export type Tone = 'professional' | 'playful' | 'technical' | 'casual' | 'bold'
export type ColorScheme = 'dark' | 'light' | 'gradient'

export interface SectionCTA {
  text: string
  href?: string
}

export interface DraftSection {
  id: string
  type: SectionType
  headline: string
  subheadline: string
  bullets: string[]
  cta: SectionCTA | null
  visualDirection: string
}

export interface LandingPageDraft {
  brandName: string
  tagline: string
  tone: Tone
  audience: string
  colorScheme: ColorScheme
  sections: DraftSection[]
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}

export interface PricingTier {
  name: string
  price: string
  period: string
  features: string[]
  highlighted: boolean
  cta: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface StatItem {
  value: string
  label: string
}

export interface HowItWorksStep {
  step: number
  title: string
  description: string
}

export interface FinalSection {
  id: string
  type: SectionType
  headline: string
  subheadline: string
  imageKeywords?: string[]
  features?: FeatureItem[]
  testimonials?: TestimonialItem[]
  pricingTiers?: PricingTier[]
  faqs?: FAQItem[]
  stats?: StatItem[]
  steps?: HowItWorksStep[]
  primaryCTA?: string
  secondaryCTA?: string
}

export interface FinalLandingPage {
  brandName: string
  tagline: string
  colorScheme: ColorScheme
  primaryColor: string
  sections: FinalSection[]
}

export type GeneratorStep = 'input' | 'drafting' | 'review' | 'generating' | 'preview'
