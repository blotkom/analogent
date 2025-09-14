import { HeroSection } from "@/components/hero-section"
import { VisionSection } from "@/components/vision-section"
import { TechnologySection } from "@/components/technology-section"
import { ApplicationsSection } from "@/components/applications-section"
import { TractionSection } from "@/components/traction-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <VisionSection />
      <TechnologySection />
      <ApplicationsSection />
      <TractionSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
