import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"

export function TechnologyRoadmap() {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Proof of Concept",
      status: "completed",
      timeline: "2023 Q4",
      description: "Demonstrated feasibility of analog memristive computation for AI workloads",
      achievements: [
        "Basic memristive crossbar arrays",
        "Simple neural network implementations",
        "Initial energy efficiency validation",
      ],
    },
    {
      phase: "Phase 2",
      title: "3D Architecture Development",
      status: "current",
      timeline: "2024 Q2",
      description: "Developing 3D tiled architectures and advanced algorithmic frameworks",
      achievements: ["3D memristive array fabrication", "HW-SW co-optimization tools", "Noise-resilient algorithms"],
    },
    {
      phase: "Phase 3",
      title: "System Integration",
      status: "upcoming",
      timeline: "2024 Q4",
      description: "Full system integration with model transfer tools and performance optimization",
      achievements: ["Complete compiler toolchain", "Model transfer pipeline", "Performance benchmarking"],
    },
    {
      phase: "Phase 4",
      title: "Commercial Deployment",
      status: "future",
      timeline: "2025 Q2",
      description: "Production-ready systems for commercial deployment and scaling",
      achievements: ["Manufacturing partnerships", "Customer pilot programs", "Market deployment"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-ring" />
      case "current":
        return <Clock className="h-5 w-5 text-accent" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ring text-ring-foreground">Completed</Badge>
      case "current":
        return <Badge className="bg-accent text-accent-foreground">In Progress</Badge>
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      default:
        return <Badge variant="outline">Future</Badge>
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Technology Roadmap</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Our systematic approach to bringing analog-native AI from research to commercial reality.
          </p>
        </div>

        <div className="space-y-8">
          {roadmapItems.map((item, index) => (
            <Card key={index} className={`border-border ${item.status === "current" ? "ring-2 ring-accent/20" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-card-foreground">
                          {item.phase}: {item.title}
                        </CardTitle>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.timeline}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {item.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.status === "completed"
                            ? "bg-ring"
                            : item.status === "current"
                              ? "bg-accent"
                              : "bg-muted-foreground"
                        }`}
                      />
                      <span className="text-sm text-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
