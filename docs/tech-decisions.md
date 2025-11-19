# Tech Decisions — Next.js TODO App

This document summarizes the key architectural and technical decisions made for the FE Case Study.  
All items are intentionally concise and expressed as bullet points, as required by the assessment.

---

## Framework & Routing

- **Next.js App Router** chosen for modern routing, layouts, server/client component model, and built-in performance benefits.
- Todo features implemented as **client components** to support React Query.
- Pagination, filters, and search are managed via **URL searchParams**.

---

## Data Layer & API Simulation

- localStorage acts as the persistence layer but is accessed **only via a repository layer**.
- Repository layer simulates a remote API using:
  - artificial async latency
  - Zod validation
  - structured success/error results
- Components never access localStorage directly.

---

## Validation

- **Zod** selected over io-ts due to simpler ergonomics, strong TypeScript inference, and excellent compatibility with App Router and react-hook-form.
- All repository outputs and inputs are validated at runtime.
- Validation failures surface structured errors.

---

## Async State Management

- **React Query** handles async operations, caching, background refetches, and stale-while-revalidate patterns.
- Query keys include pagination + filters to ensure correct cache segmentation.
- `keepPreviousData` used to avoid flicker during pagination.
- React Query mutations use **optimistic updates** with rollback on failure.

---

## UI State (Non-Domain)

- **Zustand** used for UI-only state such as:
  - toasts
  - modals
  - simple toggle state (e.g., theme)
- Domain data remains exclusively in React Query to avoid duplication.

---

## Pattern Matching

- **ts-pattern** used for:
  - handling repository Result objects
  - branching UI states (loading, error, success)
  - filter/status logic
- Enforces exhaustive pattern handling and prevents unhandled branches.

---

## Forms

- **react-hook-form** chosen for performant form state management.
- Integrated with Zod schemas for field validation and transformations.

---

## Folder Structure

- **Feature-first** layout for clarity and scalability:
  - `features/todos` contains UI, hooks, schemas, repository, and store.
  - Shared utilities placed in `lib/`.
  - Ensures isolation and minimizes cross-feature interdependencies.

---

## UX Decisions

- Loading: skeletons or spinners via Tailwind.
- Error boundaries for repository failures.
- Empty state messaging improves clarity.
- Toasts provide non-intrusive feedback for success/error events.
- Fully responsive layout built with Tailwind CSS.

---

## Theming

- Light/Dark theme via Tailwind's `dark:` classes.
- Toggle stored in Zustand or managed using `next-themes`.

---

## i18n

- Support for `en` and `ar` via next-intl.
- RTL layout support when Arabic is selected using Tailwind RTL plugin.
- Translation message-descriptor pattern `t(defaultValue, { key })` instead of key-only translations to
keep components self-documenting, ensure clear fallback text, and avoid key-text mismatch bugs.

---

## Testing

- **Unit tests**: repository layer, schema validation, utilities.
- **Integration tests**: React components + React Query + MSW mocks.

---

## Deployment

- CI/CD via GitHub Actions
- Deployment targets: **Netlify**

---

## Tradeoffs Considered

- io-ts provides functional programming benefits, but Zod offers simpler authoring, native inference, and better tooling integration for a project of this size.
- Repository layer adds complexity but isolates persistence logic, improving testability.
- Feature-first structure preferred over atomic/component-centric folders due to clearer boundaries.
- React Query chosen over SWR due to better mutation handling and optimistic features.
