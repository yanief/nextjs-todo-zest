# FE - Hiring Case Study

## Case Study — Next.js TODO App

### Goal

Build a production-style TODO app using Next.js (App Router) with React Query. Data is persisted in
localStorage but must be handled asynchronously as if it were a remote API.

## Core Requirements

### Pages

- `/todos` (or `/`): list with pagination (10/page)
- `/todos/[id]`: details + edit

### Features

- CRUD todos (create, read, update, delete)
- Search & filter (by status: all/active/completed)
- Pagination via URL searchParams (`?page=1&status=active&q=homework`)
- Use zustand or React Context for global UI state (e.g., modals, toasts)

### Tech Stack

- Framework: Next.js App Router (server components allowed, but data fetching for todos happens
  client-side)
- UI: Tailwind or Chakra UI
- Data Management: Async data management with React Query (no direct component→localStorage
  writes; go through a data layer)
- Validation: Runtime validation with io-ts (decode from "API" layer)
- Pattern Matching: ts-pattern for state/branch logic (status matching, result matching, etc.)
- Deployment: Deploy to a public URL
- Repository: Share to public Github repo

**Required Libraries**

- `@tanstack/react-query`
- `ts-pattern`
- `io-ts` or `zod`
- `next`
- `react-hook-form`
- `zustand`

**Optional (Nice to Have)**

- `fp-ts`

## What We Expect (Deliverables)

1. Public URL (deployed app)

2. GitHub Repository with:
   - Clear README (setup, scripts, tradeoffs, decisions)
   - Tech decisions doc (short, bullet points)
   - Minimal tests (unit + one integration) using Vitest/RTL (or Jest/RTL)

3. Type-safe Models:
   - io-ts/zod codec for Todo and paginated responses
   - Decoding + error surfacing (don't trust storage blindly)

4. UX Polish:
   - Loading states (skeleton/spinners), empty state, error fallbacks
   - Accessible form (labels, focus, keyboard, ARIA)
   - Basic responsive layout

## Acceptance Criteria

### Functional

- List shows 10 items/page; page changes update URL and are shareable (deep-linkable)
- Create todo via a form on `/todos` or a modal; newly created item appears without full reload
- Edit & Complete toggles work; optimistic update preferred (with rollback on "API" error)
- Delete works with confirmation
- Search and status filter combine with pagination
- Detail page shows full info and allows edit/delete
- React Query cache keys include filters/pagination; no flicker when paging (keep previous data)

### Non-functional

- TypeScript strict; no any unless justified
- `ts-pattern` used for at least:
  - Matching API result states (success/error/loading)
  - Branching UI logic based on status and filters
- Directory structure is logical & scalable

## Bonus / Stretch (Choose Any)

- **fp-ts**: Use TaskEither in repository layer; surface errors cleanly
- **Optimistic Mutations**: With rollback & toasts
- **Persist React Query Cache**: (e.g., to sessionStorage) to demonstrate caching strategy
- **Playwright E2E**: Create→paginate→edit→delete happy path
- **i18n**: Simple en/ar switch; RTL support if using Tailwind RTL or Chakra's RTL
- **Tagging/Priority**: With client-side sort
- **Bulk Actions**: Complete all, delete selected
- **Theming**: Dark mode; Chakra/Tailwind toggle
