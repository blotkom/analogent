=== Analogent API ===
Contributors: analogent, windsurf
Tags: rest, jobs, careers, contact, applications, cors
Requires at least: 5.8
Tested up to: 6.6
Stable tag: 1.0.0
License: GPLv2 or later

A WordPress plugin that powers the Analogent frontend APIs for contacts, jobs, and applications with email notifications and CORS.

== Description ==

This plugin exposes REST endpoints under /wp-json/analogent/v1 for:

- Contact submissions: POST /contact
- List jobs: GET /jobs
- Job detail by slug: GET /jobs/{slug}
- Apply for a job or general: POST /apply (supports multipart/form-data with resume)

Configure settings under Admin -> Analogent API.

== Installation ==

1. Upload the `analogent-api` folder to `/wp-content/plugins/` or use the Plugins uploader.
2. Activate the plugin from the Plugins page.
3. Visit "Analogent API" settings to configure emails and CORS.

== REST Endpoints ==

Base: /wp-json/analogent/v1

- POST /contact
  Body (JSON or form): { name, email, phone?, message, source? }

- GET /jobs?search=&department=&location=&job_type=&page=1&per_page=50

- GET /jobs/{slug}

- POST /apply
  Body: JSON or multipart/form-data
  Fields: name, email, phone?, linkedin?, cover_letter?, job_id?, job_slug?, general? (true/false), resume (file) or resume_url

== Email Notifications ==

- Notify admin on new contact and new application.
- Can be disabled in settings.
- Jobs can define a specific "Apply Email" meta to route notifications.

== CORS ==

- Enable/disable and configure allowed origins in settings.
- Defaults to http://localhost:3000 and https://analogent.ai

== Frontend Integration ==

Set NEXT_PUBLIC_API_BASE=https://analogent.ai/api/wp-json/analogent/v1

Examples:

- Contact: POST to `${API_BASE}/contact`
- Careers list: GET `${API_BASE}/jobs`
- Job detail: GET `${API_BASE}/jobs/${slug}`
- Apply: POST `${API_BASE}/apply` (multipart for resume)

== Changelog ==

= 1.0.0 =
* Initial release.
