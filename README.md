# Next.js TODO App

The app uses **Next.js App Router**, **React Query**, and a simulated async API backed by `localStorage`.  
All CRUD operations, pagination, filtering, and detail views behave as if interacting with a remote server.

Live demo URL: _<Placeholder URL>_

---

## 🚀 Features

- CRUD Todos (Create, Read, Update, Delete)
- Paginated list (10/page) with search + status filters
- Detail page with edit/delete
- URL-based pagination and filters (`?page=1&status=active&q=homework`)
- Optimistic updates (toggle, edit, delete)
- Global UI state with Zustand (toasts)
- Runtime validation with Zod
- Pattern matching with ts-pattern
- Responsive UI using Tailwind CSS
- React Query caching, error handling, and loading states

---

## 🧱 Tech Stack

- **Next.js App Router**
- **@tanstack/react-query**
- **Zustand** (UI state)
- **Zod** (runtime validation)
- **ts-pattern**
- **react-hook-form**
- **Tailwind CSS**

Optional extras implemented (bonus):

- Optimistic mutations with rollback
- Persisted React Query cache (sessionStorage)
- MSW-powered integration tests (if applicable)

---

## 📂 Project Structure

```
src/
  app/
    todos/
      page.tsx
      [id]/
        page.tsx
  features/
    todos/
      components/
      hooks/
      api/
      store/
      schemas/
  lib/
    utils/
    zod/
```

Feature-first organization + a clean data layer enables scalability and clarity.

---

## 📡 Data Layer

All components interact with a **repository layer**, not localStorage directly.

Repository responsibilities:

- Simulate async network latency
- Zod validation on every read
- Structured error responses
- React Query integration
- Query-key composition with filters/pagination
- Optimistic updates & rollback

---

## 🧪 Testing

- **Unit tests** (repository layer)
- **Integration tests** (React Query + components)

Run tests:

```sh
npm test
```

## ▶️ Getting Started

### Install dependencies

```sh
npm install
```

### Run dev server

```sh
npm run dev
```

App runs at `http://localhost:3000`

### Build

```sh
npm run build
```

### Run production build

```sh
npm start
```

---

## 🌐 Deployment

Recommended: Vercel

Deploy:

```sh
vercel
```

---

## 📝 Tradeoffs & Decisions (Summary)

- **Zod chosen** over io-ts due to simpler ergonomics for this scale.
- **Repository pattern** improves testability and separation of concerns.
- **React Query** chosen for caching, deduping, and async state management.
- **Zustand** used only for UI state—domain data stays in React Query.
- **ts-pattern** improves safety and readability in branching logic.
- **Feature-first structure** scales better for real-world apps.
- **LocalStorage async wrapper** keeps components decoupled from the storage layer.
- **Optimistic updates** improve perceived performance; rollback preserves correctness.

---

## 📬 Notes

This project is intentionally scoped to demonstrate:

- Type safety
- Async state management
- UI responsiveness
- Error handling
- Architectural reasoning
- Correct use of the given tech stack

Please see `tech-decisions.md` for a concise list of architectural decisions.
