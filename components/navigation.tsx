"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: pathname === "/" ? "#vision" : "/#vision", label: "Vision" },
    { href: pathname === "/" ? "#technology" : "/#technology", label: "Technology" },
    { href: pathname === "/" ? "#applications" : "/#applications", label: "Applications" },
    { href: pathname === "/" ? "#traction" : "/#traction", label: "Traction" },
    { href: pathname === "/" ? "#team" : "/#team", label: "Team" },
    { href: "/careers", label: "Careers" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image src="/images/analogent-logo.png" alt="Analogent" width={144} height={48} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button variant="default" className="bg-accent hover:bg-accent/90" asChild>
              <Link href={pathname === "/" ? "#contact" : "/#contact"}>Contact</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="default" className="w-full mt-4 bg-accent hover:bg-accent/90" asChild>
                <Link href={pathname === "/" ? "#contact" : "/#contact"}>Contact</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
