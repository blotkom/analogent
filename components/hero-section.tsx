import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Cpu, Brain } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-ring/20 rounded-full blur-xl"></div>
              <div className="relative bg-card border border-border rounded-full p-8">
                <div className="flex items-center justify-center space-x-4">
                  <Brain className="h-12 w-12 text-accent" />
                  <Cpu className="h-12 w-12 text-ring" />
                  <Zap className="h-12 w-12 text-accent" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6">
            <span className="text-foreground">Analog-Native Intelligence</span>
            <br />
            <span className="text-accent">for the Post-Digital Era</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 text-balance">
            Reinventing the entire AI stack—from hardware to software and algorithms—for a new era of
            <span className="text-ring font-semibold"> energy-efficient</span>,
            <span className="text-accent font-semibold"> real-time intelligence</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link href="/technology">
                Explore Our Technology
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
