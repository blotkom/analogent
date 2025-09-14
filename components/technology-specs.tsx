import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function TechnologySpecs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Performance Specifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Breakthrough performance metrics that redefine what's possible in AI computing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center justify-between">
                Energy Efficiency
                <Badge className="bg-ring text-ring-foreground">1000x</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">vs Digital GPUs</span>
                    <span className="text-foreground font-semibold">1000x improvement</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Analog computation eliminates the energy overhead of digital conversion and memory access.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center justify-between">
                Latency Reduction
                <Badge className="bg-accent text-accent-foreground">100x</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Real-time Processing</span>
                    <span className="text-foreground font-semibold">Sub-microsecond</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Continuous-time processing enables unprecedented real-time AI capabilities.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center justify-between">
                Density Scaling
                <Badge className="bg-ring text-ring-foreground">10x</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">3D Architecture</span>
                    <span className="text-foreground font-semibold">10x denser</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  3D memristive arrays provide massive parallelism in compact form factors.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center justify-between">
                Model Accuracy
                <Badge className="bg-accent text-accent-foreground">99.9%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Precision Maintained</span>
                    <span className="text-foreground font-semibold">Digital Parity</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Advanced noise-resilient algorithms maintain high accuracy in analog domain.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center justify-between">
                Throughput
                <Badge className="bg-ring text-ring-foreground">50x</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Parallel Operations</span>
                    <span className="text-foreground font-semibold">Massive Scale</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Inherent parallelism of analog computation enables massive throughput gains.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center justify-between">
                Scalability
                <Badge className="bg-accent text-accent-foreground">∞</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Architecture Scaling</span>
                    <span className="text-foreground font-semibold">Unlimited</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Modular 3D architecture enables seamless scaling to any compute requirement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
