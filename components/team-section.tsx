import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, GraduationCap } from "lucide-react"

export function TeamSection() {
  return (
    <section id="team" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Visionary Team & Careers</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Join our mission to revolutionize AI computing and shape the future of analog-native intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">World-Class Expertise</h3>
              <p className="text-muted-foreground">
                Our founding team and advisors combine decades of experience in analog computing, AI research, and
                hardware-software co-design.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <div className="bg-ring/10 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-ring" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">Collaborative Culture</h3>
              <p className="text-muted-foreground">
                We foster an environment of innovation, collaboration, and continuous learning where breakthrough ideas
                flourish.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">Career Opportunities</h3>
              <p className="text-muted-foreground">
                Join us in building the future of AI computing with opportunities across hardware, software, algorithms,
                and business development.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">Ready to Shape the Future?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're looking for exceptional talent to join our mission. Whether you're a hardware engineer, AI researcher,
            or business strategist, we want to hear from you.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
            <a href="/careers">View Open Positions</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
