"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { postJson } from "@/lib/api"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name || !email || !message) {
      setError("Please fill in Name, Email, and Message.")
      return
    }
    setSubmitting(true)
    try {
      await postJson("/contact", {
        name,
        email,
        phone: "",
        message,
        source: "home-contact",
        company,
      })
      setSuccess(true)
      setName("")
      setEmail("")
      setCompany("")
      setMessage("")
    } catch (err: any) {
      setError(err?.message || "Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Explore partnerships, investments, or career opportunities with us.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">Direct Contact</h3>
                </div>
                <p className="text-sm text-muted-foreground">info@analogent.ai</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {success ? (
                  <div className="text-center text-green-600">Thank you! Your message has been sent.</div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-card-foreground mb-2 block">Name</label>
                        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-card-foreground mb-2 block">Email</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-card-foreground mb-2 block">Company</label>
                      <Input placeholder="Your company" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-card-foreground mb-2 block">Message</label>
                      <Textarea
                        placeholder="Tell us about your interest in Analogent..."
                        className="min-h-[120px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    {error && <div className="text-sm text-red-600">{error}</div>}
                    <Button disabled={submitting} className="w-full bg-accent hover:bg-accent/90" type="submit">
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
