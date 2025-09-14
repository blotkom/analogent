import { Button } from "@/components/ui/button"
import { ArrowLeft, Cpu, Brain, Zap, Layers } from "lucide-react"
import Link from "next/link"

export function TechnologyHero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-ring/20 rounded-full blur-xl"></div>
              <div className="relative bg-card border border-border rounded-full p-8">
                <div className="grid grid-cols-2 gap-4">
                  <Brain className="h-12 w-12 text-accent" />
                  <Cpu className="h-12 w-12 text-ring" />
                  <Zap className="h-12 w-12 text-ring" />
                  <Layers className="h-12 w-12 text-accent" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6">
            <span className="text-foreground">Revolutionary</span>
            <br />
            <span className="text-accent">Technology Stack</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 text-balance">
            Discover how our breakthrough approach combines analog memristive hardware with 3D architectures, HW-SW
            co-optimization, and new algorithmic frameworks to create the future of AI computing.
          </p>
        </div>
      </div>
    </section>
  )
}
