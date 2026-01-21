"use client"

import CTASection from "@/components/cta-section"
import PageLayout from "@/components/page-layout"
import ServicesSection from "@/components/partners-section"

export default function PartnershipPage() {
  return (
    <PageLayout
      title="Trusted Partners"
      subtitle="Proud collaborations with institutions and organizations supporting
                community growth and development"
      image="/government-services-city-utilities.jpg"
    >
      <ServicesSection />
      <CTASection />
    </PageLayout>
  )
}
