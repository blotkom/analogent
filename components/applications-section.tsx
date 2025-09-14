import { Card, CardContent } from "@/components/ui/card"
import { Bot, Eye, Radar, Microscope as Microchip } from "lucide-react"

export function ApplicationsSection() {
  return (
    <section id="applications" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Edge AI Applications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Targeting real-world use cases where energy efficiency and real-time performance are critical for success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bot className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">Robotics</h3>
              <p className="text-sm text-muted-foreground">
                Real-time decision making for autonomous robots with ultra-low latency and energy-efficient processing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-ring transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-ring/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Radar className="h-8 w-8 text-ring" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">Sensor Processing</h3>
              <p className="text-sm text-muted-foreground">
                Advanced sensor fusion and processing for IoT devices, environmental monitoring, and industrial
                applications.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">Vision & Detection</h3>
              <p className="text-sm text-muted-foreground">
                Real-time computer vision and anomaly detection for security, manufacturing, and autonomous systems.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-ring transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="bg-ring/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Microchip className="h-8 w-8 text-ring" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">Embedded Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Ultra-low-power AI for wearables, medical devices, and edge computing where battery life is critical.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
