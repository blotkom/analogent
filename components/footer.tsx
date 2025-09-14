import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2025{" "}
            <Image
              src="/images/analogent-logo.png"
              alt="Analogent"
              width={96}
              height={31}
              className="inline h-5 w-auto mx-1"
            />
            . All rights reserved. Pioneering analog-native intelligence for the post-digital era.
          </p>
        </div>
      </div>
    </footer>
  )
}
