import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getJson } from "@/lib/api"

type JobItem = {
  id: number
  slug: string
  title: string
  excerpt: string
  meta: {
    location?: string
    department?: string
    job_type?: string
    seniority?: string
    is_remote?: boolean
    external_apply_url?: string
  }
}

type JobsResponse = {
  total: number
  page: number
  per_page: number
  items: JobItem[]
}

export default async function CareersPage() {
  const data = await getJson<JobsResponse>("/jobs")
  const positions = data.items

  return (
    <main className="min-h-screen bg-background">
      {/* Header with back to home link */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/analogent-logo.png" alt="Analogent" width={144} height={48} className="h-10 w-auto" />
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to Shape the Future?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance mb-8">
              Join our team of visionaries building the next generation of analog-native AI technology. Help us
              revolutionize computing for the post-digital era.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Collaborative Culture</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco & Remote</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Flexible Hours</span>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Open Positions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {positions.map((position, index) => (
                <Card key={index} className="border-border hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-card-foreground">
                        <Link href={`/careers/${position.slug}`} className="hover:underline">
                          {position.title}
                        </Link>
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={position.meta?.seniority === "Leadership" ? "bg-accent text-white" : ""}
                      >
                        {position.meta?.seniority || position.meta?.job_type || "Role"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {position.meta?.department || ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {position.meta?.location || (position.meta?.is_remote ? "Remote" : "")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.excerpt}</p>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      {position.meta?.external_apply_url ? (
                        <a href={position.meta.external_apply_url} target="_blank" rel="noreferrer">
                          Apply Externally
                        </a>
                      ) : (
                        <a href={`/apply/${position.slug}`}>Apply Now</a>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Join Us */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Why Join
              <Image
                src="/images/analogent-logo.png"
                alt="Analogent"
                width={144}
                height={48}
                className="inline h-10 w-auto mx-2"
              />
              ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Cutting-Edge Technology</h3>
                <p className="text-muted-foreground">
                  Work on revolutionary analog AI technology that's reshaping the future of computing.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Impact at Scale</h3>
                <p className="text-muted-foreground">
                  Your work will directly influence the next generation of AI systems across industries.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Growth & Learning</h3>
                <p className="text-muted-foreground">
                  Continuous learning opportunities in a rapidly evolving field with world-class mentors.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Don't see the right role?</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for exceptional talent. Send us your resume and tell us how you'd like to
                contribute to the analog AI revolution.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="/apply/general">Send Your Resume</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
