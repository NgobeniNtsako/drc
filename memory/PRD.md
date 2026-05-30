# DRC Plant Hire & Sand — Website PRD

## Original Problem Statement
> "Build a website for this company, make it really good. I want to propose it to the company."

Reference flyer supplied by the user identifies the company as **DRC Plant Hire & Sand (Pty) Ltd** — a plant hire and bulk sand supplier in Hlaneki, Giyani (South Africa).

## User Choices (locked from `ask_human`)
- Single landing page with sections + Request Quote form that emails the company.
- Visual style: match the flyer — deep forest green + gold/yellow, professional industrial.
- Email integration via Resend (key not yet provided — emails are dormant; quote requests are persisted to MongoDB and will auto-send once `RESEND_API_KEY` is added).
- Recipient email: `mbewuh@yahoo.com`.
- Include extra service cards for TLB, Excavator, Tipper Truck, Bobcat/Skid Steer.
- "Just the core website" — no admin dashboard or pricing calculator in v1.

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Lucide icons + `sonner` toasts. Single page at `/`, dark theme (`#06130C` background, `#FFB81C` accent), Clash Display + Manrope + Anton fonts.
- **Backend**: FastAPI + Motor (MongoDB) + Resend SDK. All routes prefixed `/api`.
- **Storage**: MongoDB collection `quote_requests`.
- **Email**: Resend (`asyncio.to_thread` to keep FastAPI non-blocking). Dormant until `RESEND_API_KEY` is set.

## Personas
- **Site owner (Mr. Mbewu / company management)** — wants a credible, premium site to win bigger contracts and centralise enquiries.
- **Project contractor / private builder** — looking for a reliable local plant hire & sand supplier; needs pricing transparency and one-tap "Get a Quote".

## Core Requirements (static)
1. Hero with company tagline, CTAs (Get a Quote / View Fleet), stat strip.
2. About section establishing local credibility.
3. Fleet bento grid: TLB, Excavator, Tipper Truck, Bobcat/Skid Steer.
4. Sand products: Riversand, Building Sand, Filling Sand.
5. Why Choose Us — 3 trust pillars from the flyer.
6. Pricing table for all 5 delivery areas (effective 1 May 2026).
7. Contact section: phone, cell, fax, email, address, embedded map, Quote form.
8. Sticky Call CTA + dark-themed footer.

## Implementation Log
### 2026-05-30 — v1 shipped
- Backend: `POST /api/quote`, `GET /api/quotes`, `GET /api/health`, plus existing `/api/status`. Resend wired but inactive (no key yet). Pydantic validation (min lengths, email format). MongoDB persistence with ISO-string timestamps.
- Frontend: 9 sections (`Nav, Hero, Marquee, About, Fleet, Sand, WhyUs, Pricing, Contact, Footer, StickyCall`) wired with anchor navigation, smooth scroll, mobile menu, framer-motion scroll reveals, dark industrial theme with gold (`#FFB81C`) accents, toaster (sonner) feedback, data-testids on every interactive element.
- Branding: title + meta updated to DRC Plant Hire & Sand; favicon kept default.
- Testing: `testing_agent_v3` iteration 1 → 100% backend (pytest), 100% frontend (Playwright). No defects.

## Backlog / Next Tasks
### P0 — to activate full pitch flow
- Add a real `RESEND_API_KEY` (and optionally a verified sender domain) → emails to `mbewuh@yahoo.com` will start flowing automatically.

### P1 — high-impact polish
- Replace stock Unsplash images on Fleet (excavator, tipper, skid-steer) with photos of DRC's actual machinery for authenticity.
- Add a logo upload (currently a stylised "D" mark) — owner's flyer logo can be vectorised for the header.
- WhatsApp click-to-chat button alongside the sticky call CTA (huge in SA for trade enquiries).

### P2 — growth features
- Admin dashboard at `/admin` to view/export quote requests.
- Interactive pricing calculator (area + sand type → instant estimate + WhatsApp share).
- Image gallery / past-projects carousel.
- SEO: structured data (`LocalBusiness`), sitemap, OG image.
- Multi-language toggle (Xitsonga / English).

### P3 — nice to have
- Migrate FastAPI `@app.on_event("shutdown")` to lifespan handler.
- Verify SENDER_EMAIL domain in Resend once a custom domain is acquired.
