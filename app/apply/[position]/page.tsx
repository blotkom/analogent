import { ApplicationForm } from "@/components/application-form"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { getJson } from "@/lib/api"

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
  }
}

export default async function ApplicationPage({ params }: { params: { position: string } }) {
  let job: JobDetail | null = null
  try {
    job = await getJson<JobDetail>(`/jobs/${params.position}`)
  } catch (e) {
    notFound()
  }

  const position = {
    id: job!.slug,
    title: job!.title,
    department: job!.meta?.department || "",
    location: job!.meta?.location || (job!.meta?.is_remote ? "Remote" : ""),
    type: job!.meta?.job_type || "",
    level: job!.meta?.seniority || "",
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Image src="/images/analogent-logo.png" alt="Analogent" width={144} height={48} className="h-10 w-auto" />
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Apply for {position.title}</h1>
            <p className="text-xl text-muted-foreground">
              {position.department} • {position.location}
            </p>
          </div>

          <ApplicationForm position={position} />
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const data = await getJson<{ items: { slug: string }[] }>("/jobs")
    return data.items.map((item) => ({ position: item.slug }))
  } catch (e) {
    return []
  }
}
