import { TechnologyHero } from "@/components/technology-hero"
import { TechnologyDetails } from "@/components/technology-details"
import { TechnologySpecs } from "@/components/technology-specs"
import { Navigation } from "@/components/navigation"

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <TechnologyHero />
      <TechnologyDetails />
      <TechnologySpecs />
    </main>
  )
}
