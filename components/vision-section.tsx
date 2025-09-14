import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Zap, Globe } from "lucide-react"

export function VisionSection() {
  return (
    <section id="vision" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why the World Needs Analog-Native AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Moving beyond GPU-centric digital AI to unlock orders-of-magnitude improvements in energy efficiency,
            latency, and real-time performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-border hover:border-accent transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">Energy Revolution</h3>
              <p className="text-muted-foreground">
                Analog computing delivers unprecedented energy efficiency, enabling AI at the edge where traditional
                digital compute cannot scale.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-ring transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-ring/10 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-ring" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">Real-Time Intelligence</h3>
              <p className="text-muted-foreground">
                Ultra-low latency processing enables real-time decision making for robotics, autonomous systems, and
                critical applications.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-accent transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">Ubiquitous Deployment</h3>
              <p className="text-muted-foreground">
                Enabling ultra-low-power edge AI applications in environments where today's digital compute simply
                cannot operate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
