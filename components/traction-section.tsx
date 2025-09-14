import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Users, Target } from "lucide-react"

export function TractionSection() {
  return (
    <section id="traction" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Market Validation & Traction
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Strong early validation with multiple letters of intent from potential customers and a clear roadmap to
            market leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-border text-center">
            <CardContent className="p-6">
              <div className="bg-accent/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">Multiple</div>
              <div className="text-sm text-muted-foreground">Letters of Intent</div>
            </CardContent>
          </Card>

          <Card className="border-border text-center">
            <CardContent className="p-6">
              <div className="bg-ring/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-ring" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">Early</div>
              <div className="text-sm text-muted-foreground">Partner Network</div>
            </CardContent>
          </Card>

          <Card className="border-border text-center">
            <CardContent className="p-6">
              <div className="bg-accent/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">Proven</div>
              <div className="text-sm text-muted-foreground">Technology Stack</div>
            </CardContent>
          </Card>

          <Card className="border-border text-center">
            <CardContent className="p-6">
              <div className="bg-ring/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-6 w-6 text-ring" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">Clear</div>
              <div className="text-sm text-muted-foreground">Market Roadmap</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border">
          <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center">Roadmap Confidence</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">
                Phase 1
              </Badge>
              <h4 className="font-semibold text-card-foreground mb-2">Technology Validation</h4>
              <p className="text-sm text-muted-foreground">
                Proof-of-concept demonstrations and initial customer validation
              </p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">
                Phase 2
              </Badge>
              <h4 className="font-semibold text-card-foreground mb-2">Pilot Deployments</h4>
              <p className="text-sm text-muted-foreground">
                Limited production runs with early adopters and strategic partners
              </p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">
                Phase 3
              </Badge>
              <h4 className="font-semibold text-card-foreground mb-2">Market Expansion</h4>
              <p className="text-sm text-muted-foreground">
                Full-scale production and market penetration across target verticals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
