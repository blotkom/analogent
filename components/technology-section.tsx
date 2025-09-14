import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Layers, Code, Shuffle } from "lucide-react"

export function TechnologySection() {
  return (
    <section id="technology" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Revolutionary Technology Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Our breakthrough approach combines analog memristive hardware with 3D architectures, HW-SW co-optimization,
            and new algorithmic frameworks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-accent/10 rounded-lg p-2">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">Analog Memristive Hardware</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Based on analog tiled memristive hardware with 3D architectures that fundamentally reimagine how
                computation is performed at the physical level.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 3D tiled memristive arrays</li>
                <li>• Analog signal processing</li>
                <li>• Ultra-low power consumption</li>
                <li>• Massively parallel computation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-ring/10 rounded-lg p-2">
                  <Layers className="h-6 w-6 text-ring" />
                </div>
                <CardTitle className="text-card-foreground">HW-SW Co-Optimization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Joint design of circuits, systems, compilers, and algorithms to maximize the potential of analog-native
                computing architectures.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Integrated circuit design</li>
                <li>• Custom compiler toolchains</li>
                <li>• System-level optimization</li>
                <li>• Performance modeling</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-accent/10 rounded-lg p-2">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">New Algorithmic Frameworks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Development of new algorithmic frameworks specifically optimized for analog-native compute, unlocking
                unprecedented efficiency gains.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Analog-optimized neural networks</li>
                <li>• Noise-resilient algorithms</li>
                <li>• Continuous-time processing</li>
                <li>• Energy-aware computation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-ring/10 rounded-lg p-2">
                  <Shuffle className="h-6 w-6 text-ring" />
                </div>
                <CardTitle className="text-card-foreground">Model Transfer Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Advanced tools for transferring and adapting existing digital AI models onto Analogent's analog-native
                architectures.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Direct GPU-trained Models to Analog Models Conversion</li>
                <li>• Model optimization pipelines</li>
                <li>• Performance validation</li>
                <li>• Seamless integration</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
