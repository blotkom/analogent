import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Layers, Code, Shuffle, Zap, Brain, Gauge, Shield } from "lucide-react"

export function TechnologyDetails() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Core Technology Pillars</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Four foundational technologies working in harmony to deliver unprecedented AI performance and efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <Cpu className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-card-foreground">Analog Memristive Hardware</CardTitle>
                </div>
                <Badge variant="secondary">Core</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Based on analog tiled memristive hardware with 3D architectures that fundamentally reimagine how
                computation is performed at the physical level.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-ring mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">3D Tiled Arrays</h4>
                    <p className="text-sm text-muted-foreground">
                      Massively parallel memristive crossbar arrays in 3D configurations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gauge className="h-5 w-5 text-ring mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Analog Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Continuous-valued computation eliminating digital conversion overhead
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-ring mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Ultra-Low Power</h4>
                    <p className="text-sm text-muted-foreground">Orders of magnitude reduction in energy consumption</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-ring/10 rounded-lg p-2">
                    <Layers className="h-6 w-6 text-ring" />
                  </div>
                  <CardTitle className="text-card-foreground">HW-SW Co-Optimization</CardTitle>
                </div>
                <Badge variant="secondary">Integration</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Joint design of circuits, systems, compilers, and algorithms to maximize the potential of analog-native
                computing architectures.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Cpu className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Circuit Design</h4>
                    <p className="text-sm text-muted-foreground">Custom analog circuits optimized for AI workloads</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Compiler Toolchains</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced compilers for analog-native code generation
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gauge className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Performance Modeling</h4>
                    <p className="text-sm text-muted-foreground">Predictive models for system-level optimization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <Code className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-card-foreground">New Algorithmic Frameworks</CardTitle>
                </div>
                <Badge variant="secondary">Innovation</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Development of new algorithmic frameworks specifically optimized for analog-native compute, unlocking
                unprecedented efficiency gains.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Brain className="h-5 w-5 text-ring mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Analog Neural Networks</h4>
                    <p className="text-sm text-muted-foreground">Networks designed for continuous-valued computation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-ring mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Noise-Resilient Algorithms</h4>
                    <p className="text-sm text-muted-foreground">Robust computation in the presence of analog noise</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-ring mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Energy-Aware Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Algorithms that optimize for minimal energy consumption
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-ring/10 rounded-lg p-2">
                    <Shuffle className="h-6 w-6 text-ring" />
                  </div>
                  <CardTitle className="text-card-foreground">Model Transfer Tools</CardTitle>
                </div>
                <Badge variant="secondary">Bridge</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Advanced tools for transferring and adapting existing digital AI models onto Analogent's analog-native
                architectures.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shuffle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Direct GPU-trained Models to Analog Models Conversion
                    </h4>
                    <p className="text-sm text-muted-foreground">Seamless migration of existing models</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gauge className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Optimization Pipelines</h4>
                    <p className="text-sm text-muted-foreground">Automated model optimization for analog hardware</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Performance Validation</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive testing and validation frameworks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
