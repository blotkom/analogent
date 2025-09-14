import Link from "next/link"
import Image from "next/image"
import { MapPin, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getJson } from "@/lib/api"
import { notFound } from "next/navigation"

type JobDetail = {
  id: number
  slug: string
  title: string
  content?: string
  meta: {
    location?: string
    department?: string
    job_type?: string
    seniority?: string
    is_remote?: boolean
    external_apply_url?: string
  }
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  let job: JobDetail | null = null
  try {
    job = await getJson<JobDetail>(`/jobs/${params.slug}`)
  } catch (e) {
    notFound()
  }

  const location = job!.meta?.location || (job!.meta?.is_remote ? "Remote" : "")
  const department = job!.meta?.department || ""

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Image src="/images/analogent-logo.png" alt="Analogent" width={144} height={48} className="h-10 w-auto" />
          </Link>
          <Link
            href="/careers"
            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Careers</span>
          </Link>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">{job!.title}</h1>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              {department && (
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {department}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {location}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardContent className="prose prose-invert max-w-none p-6">
                  {job!.content ? (
                    <div dangerouslySetInnerHTML={{ __html: job!.content }} />
                  ) : (
                    <p className="text-muted-foreground">Job description will be available soon.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <aside className="lg:col-span-1">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Role Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span>{job!.meta?.job_type || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Seniority</span><span>{job!.meta?.seniority || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Remote</span><span>{job!.meta?.is_remote ? "Yes" : "No"}</span></div>
                  {department && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span>{department}</span></div>
                  )}
                  {location && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span>{location}</span></div>
                  )}
                  <div className="pt-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      {job!.meta?.external_apply_url ? (
                        <a href={job!.meta.external_apply_url} target="_blank" rel="noreferrer">Apply Externally</a>
                      ) : (
                        <a href={`/apply/${job!.slug}`}>Apply Now</a>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const data = await getJson<{ items: { slug: string }[] }>("/jobs")
    return data.items.map((item) => ({ slug: item.slug }))
  } catch (e) {
    return []
  }
}
