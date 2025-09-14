import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function JobNotFound() {
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
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Job not found</h1>
          <p className="text-muted-foreground">
            The position you’re looking for may have been filled or the link is incorrect.
          </p>
          <div>
            <Link href="/careers" className="text-primary hover:underline">
              Explore open positions
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
