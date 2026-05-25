# AI Landing Page Generator

A production-quality MVP that generates polished, responsive landing pages from a single product description using GPT-4o.

> **Live Demo:** [ai-landing-generator-iota.vercel.app](https://ai-landing-generator-iota.vercel.app)

---

## Product Flow

```
1. Describe your product  →  2. Review/edit draft sections  →  3. Approve  →  4. View landing page
```

1. **Prompt Input** — User enters a product description (e.g., "AI bookkeeping for freelancers")
2. **Draft Review** — AI generates a structured page plan with editable section cards
3. **Approval Step** — User can edit headlines, bullets, CTAs, remove or regenerate any section
4. **Final Landing Page** — Polished, fully rendered responsive landing page

---

## Tech Stack

| Layer      | Choice                | Reason                                       |
| ---------- | --------------------- | -------------------------------------------- |
| Framework  | Next.js 16 App Router | SSR-first, Server Components, Route Handlers |
| Language   | TypeScript (strict)   | Type safety throughout the AI pipeline       |
| Styling    | Tailwind CSS v4       | Utility-first, consistent design system      |
| Components | shadcn/ui patterns    | Accessible, composable, dark-mode ready      |
| AI         | OpenAI GPT-4o         | Best JSON adherence, structured outputs      |
| Validation | Zod v4                | Schema validation for all AI responses       |
| Fonts      | Geist (next/font)     | Zero layout shift, optimized loading         |

---

## Architecture Overview

### Project Structure

```
ai-landing-generator/
├── app/
│   ├── page.tsx                     # Home — SSR marketing page + generator shell
│   ├── layout.tsx                   # Root layout with Geist fonts
│   └── api/
│       ├── generate-draft/route.ts  # AI Call 1: Generate page draft
│       ├── generate-final/route.ts  # AI Call 2: Generate polished content
│       └── regenerate-section/      # Regenerate individual sections
├── components/
│   ├── ui/                          # Base UI primitives (Button, Card, Badge, etc.)
│   ├── generator/                   # Multi-step generator UI
│   │   ├── generator-client.tsx    # Client state machine orchestrating all steps
│   │   ├── prompt-input.tsx         # Step 1: description input
│   │   ├── draft-review.tsx         # Steps 2-3: editable section cards + approval
│   │   ├── section-card.tsx         # Individual editable section
│   │   └── generation-progress.tsx  # Loading skeletons + animated progress
│   └── landing/                     # Predefined deterministic page components
│       ├── landing-page.tsx         # Assembler — maps section types to components
│       ├── hero-section.tsx
│       ├── feature-grid.tsx
│       ├── stats-section.tsx
│       ├── how-it-works.tsx
│       ├── testimonials.tsx
│       ├── pricing-section.tsx
│       ├── faq-section.tsx
│       ├── cta-section.tsx
│       ├── nav-bar.tsx
│       └── footer.tsx
├── lib/
│   ├── ai/
│   │   ├── client.ts               # Lazy OpenAI client initialization
│   │   └── prompts.ts              # All AI prompt templates
│   ├── validations/landing.ts      # Zod schemas for all AI responses
│   └── utils.ts                    # cn(), generateId(), slugify()
└── types/landing.ts                # TypeScript types derived from Zod schemas
```

### AI Generation Pipeline

**Call 1 — Draft Generation** (`/api/generate-draft`)

- Input: raw product description (string)
- Model: `gpt-4o` with `response_format: { type: 'json_object' }`
- Output: `LandingPageDraft` — brand name, tone, audience, color scheme, 4–6 section plans
- Validated with Zod before returning to client

**Call 2 — Final Composition** (`/api/generate-final`)

- Input: approved draft sections + original description
- Model: `gpt-4o` with `response_format: { type: 'json_object' }`
- Output: `FinalLandingPage` — polished marketing copy, features, testimonials, pricing, FAQs
- Validated with Zod, mapped into predefined components

**Bonus — Section Regeneration** (`/api/regenerate-section`)

- Regenerates a single section's copy without rebuilding the whole draft

### Why Predefined Components (Not AI-Generated React)

The AI generates **structured data** (JSON), not React code. This is intentional:

| AI-generated code          | Predefined components           |
| -------------------------- | ------------------------------- |
| Unpredictable output       | Deterministic, tested rendering |
| Security risks (eval)      | No code execution risk          |
| Hard to style consistently | Enforced design system          |
| Can't be edited by users   | Clean separation of concerns    |

The `landing-page.tsx` assembler maps each `section.type` to the correct React component. The AI just fills in the content.

### SSR Strategy

- **Home page (`/`)** — Statically rendered (SSR). The Generator Client mounts as a Client Component but doesn't block the initial render.
- **API Routes** — Server-side only, never expose the OpenAI key to the browser.
- **Generator state** — Managed in React state (`useState`), no database required for the MVP.
- **Final preview** — Rendered client-side within the generator shell after the second AI call.

---

## Local Development

### Prerequisites

- Node.js 18+
- An OpenAI API key with GPT-4o access

### Setup

```bash
# Clone the repo
git clone <your-repo>
cd ai-landing-generator

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier
npm run format:check # Prettier check
npm run type-check   # TypeScript (no emit)
```

---

## Deployment (Vercel)

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add OPENAI_API_KEY
```

**Required environment variables:**

| Variable         | Description         |
| ---------------- | ------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key |

---

## Code Quality

The project enforces quality at every layer:

- **TypeScript strict mode** — `strict: true`, no `any` types
- **ESLint** — `eslint-config-next` + `@typescript-eslint`
- **Prettier** — `prettier-plugin-tailwindcss` for class sorting
- **Husky** — pre-commit hook runs `lint-staged`
- **lint-staged** — runs ESLint + Prettier on staged files only
- **Zod validation** — every AI response is validated at the API boundary

---

## Tradeoffs & Simplifications

| Decision     | Tradeoff                                                                      |
| ------------ | ----------------------------------------------------------------------------- |
| No database  | State lives in React — refresh loses progress. Acceptable for MVP.            |
| No auth      | Anyone with the URL can use the generator. Add Clerk/NextAuth for production. |
| Client state | Draft/final page in `useState`. A DB + URL param would enable sharing links.  |
| Single model | All calls use GPT-4o. Could add cost tiers with GPT-4o-mini for drafts.       |

---

## How AI Was Used in This Project

- **Product design**: AI helped draft the Zod schemas and prompt templates
- **Copy generation**: The app's own AI pipeline generates all landing page copy
- **Component structure**: Predefined section components were designed to map cleanly to AI-structured JSON output

---

Built with Next.js 16 · TypeScript · Tailwind CSS v4 · OpenAI GPT-4o
