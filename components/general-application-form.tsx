"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, CheckCircle, X } from "lucide-react"
import { postMultipart } from "@/lib/api"

export function GeneralApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    interests: "",
    message: "",
    portfolio: "",
    startDate: "",
    remote: false,
    visa: "",
  })

  const handleFileUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file")
      return
    }

    setUploadedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadedFile) {
      alert("Please upload your resume")
      return
    }

    const form = new FormData()
    form.append("name", `${formData.firstName} ${formData.lastName}`.trim())
    form.append("email", formData.email)
    if (formData.phone) form.append("phone", formData.phone)
    if (formData.portfolio) form.append("linkedin", formData.portfolio)
    const coverParts = [
      formData.message,
      formData.interests ? `Interests: ${formData.interests}` : "",
      formData.location ? `Location: ${formData.location}` : "",
      formData.experience ? `Experience: ${formData.experience}` : "",
      formData.startDate ? `Start Date: ${formData.startDate}` : "",
      formData.visa ? `Work Authorization: ${formData.visa}` : "",
      formData.remote ? "Open to remote work" : "",
    ]
      .filter(Boolean)
      .join("\n")
    if (coverParts) form.append("cover_letter", coverParts)
    form.append("general", "true")
    form.append("resume", uploadedFile)

    try {
      await postMultipart("/apply", form)
      setIsSubmitted(true)
    } catch (err: any) {
      alert(err?.message || "Failed to submit application. Please try again.")
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="border-border">
        <CardContent className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Resume Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest in joining Analogent. We'll review your information and reach out if there's a
            good match for current or future opportunities.
          </p>
          <Button asChild>
            <a href="/careers">Back to Careers</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground">General Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Current Location *</Label>
            <Input
              id="location"
              placeholder="City, State/Country"
              required
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          {/* Professional Information */}
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience *</Label>
            <Select onValueChange={(value) => handleInputChange("experience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-15">11-15 years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Areas of Interest *</Label>
            <Textarea
              id="interests"
              placeholder="What areas of analog AI technology interest you most? (e.g., hardware design, compiler optimization, AI algorithms, business development...)"
              className="min-h-24"
              required
              value={formData.interests}
              onChange={(e) => handleInputChange("interests", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Tell Us About Yourself *</Label>
            <Textarea
              id="message"
              placeholder="Share your background, what excites you about analog AI, and how you'd like to contribute to our mission..."
              className="min-h-32"
              required
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
            <Input
              id="portfolio"
              type="url"
              placeholder="https://..."
              value={formData.portfolio}
              onChange={(e) => handleInputChange("portfolio", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Earliest Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visa">Work Authorization Status *</Label>
            <Select onValueChange={(value) => handleInputChange("visa", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your work authorization status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-citizen">US Citizen</SelectItem>
                <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                <SelectItem value="h1b">H1B Visa</SelectItem>
                <SelectItem value="opt">F1 OPT</SelectItem>
                <SelectItem value="other">Other (please specify in message)</SelectItem>
                <SelectItem value="require-sponsorship">Require Visa Sponsorship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={formData.remote}
              onCheckedChange={(checked) => handleInputChange("remote", checked as boolean)}
            />
            <Label htmlFor="remote" className="text-sm">
              I am interested in remote work opportunities
            </Label>
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <Label>Resume/CV *</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : uploadedFile
                    ? "border-green-500 bg-green-50"
                    : "border-border"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <FileText className="h-12 w-12 text-green-500 mx-auto" />
                  <div>
                    <p className="font-medium text-foreground">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={removeFile} className="bg-transparent">
                    <X className="h-4 w-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drag and drop your resume here, or click to browse</p>
                  <p className="text-sm text-muted-foreground">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                  <div className="mt-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="resume-upload-general"
                    />
                    <Button type="button" variant="outline" className="bg-transparent" asChild>
                      <label htmlFor="resume-upload-general" className="cursor-pointer">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </label>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Resume
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
