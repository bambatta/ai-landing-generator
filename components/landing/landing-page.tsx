import { NavBar } from '@/components/landing/nav-bar'
import { HeroSection } from '@/components/landing/hero-section'
import { StatsSection } from '@/components/landing/stats-section'
import { FeatureGrid } from '@/components/landing/feature-grid'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Testimonials } from '@/components/landing/testimonials'
import { PricingSection } from '@/components/landing/pricing-section'
import { FAQSection } from '@/components/landing/faq-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/landing/footer'
import type { FinalLandingPage, FinalSection } from '@/types/landing'

interface LandingPageProps {
  page: FinalLandingPage
}

function renderSection(section: FinalSection, page: FinalLandingPage) {
  switch (section.type) {
    case 'hero':
      return (
        <HeroSection
          key={section.id}
          section={section}
          brandName={page.brandName}
          primaryColor={page.primaryColor}
        />
      )
    case 'stats':
      return <StatsSection key={section.id} section={section} primaryColor={page.primaryColor} />
    case 'features':
      return <FeatureGrid key={section.id} section={section} primaryColor={page.primaryColor} />
    case 'how-it-works':
      return <HowItWorks key={section.id} section={section} primaryColor={page.primaryColor} />
    case 'testimonials':
      return <Testimonials key={section.id} section={section} />
    case 'pricing':
      return <PricingSection key={section.id} section={section} primaryColor={page.primaryColor} />
    case 'faq':
      return <FAQSection key={section.id} section={section} />
    case 'cta':
      return <CTASection key={section.id} section={section} primaryColor={page.primaryColor} />
    default:
      return null
  }
}

export function LandingPage({ page }: LandingPageProps) {
  const heroSection = page.sections.find((s) => s.type === 'hero')

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <NavBar
        brandName={page.brandName}
        primaryCTA={heroSection?.primaryCTA}
        primaryColor={page.primaryColor}
      />
      <main>{page.sections.map((section) => renderSection(section, page))}</main>
      <Footer brandName={page.brandName} tagline={page.tagline} />
    </div>
  )
}
