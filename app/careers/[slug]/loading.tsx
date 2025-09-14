import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingJobDetail() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-11/12" />
                <Skeleton className="h-6 w-10/12" />
                <Skeleton className="h-6 w-9/12" />
                <Skeleton className="h-6 w-8/12" />
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-10/12" />
                <Skeleton className="h-5 w-9/12" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
