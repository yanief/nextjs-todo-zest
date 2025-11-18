# 1. Requirements Specification (SRS)

## Overview

This document defines the functional and non-functional requirements for the Next.js TODO app.

## Core Requirements

### Pages

- `/todos` (or `/`)
  - Lists all todos with pagination (10 per page)
- `/todos/[id]`
  - Shows todo details
  - Allows editing

### Features

- CRUD todos (create, read, update, delete)
- Search by query text
- Filter by status: `all`, `active`, `completed`
- Pagination via searchParams:
  - `?page=1&status=active&q=homework`
- Global UI state using Zustand or React Context
- Data persisted to localStorage but accessed asynchronously
- React Query must be used for all data operations
  - Persistence with SessionStorage
  - Hydration on Page Load
  - Persisting Cache with Throttled Writes
- Runtime validation required (zod)
- Pattern matching required (ts-pattern)
- Deployed publicly
- Repo must be public

## Required Libraries

- @tanstack/react-query
- ts-pattern
- zod
- next
- react-hook-form
- zustand

## Nice To Have

- fp-ts

## Acceptance Criteria

### Functional

- Paginated list shows 10 items per page
- Pagination updates URL and is shareable
- Creating a todo updates the list without reload
- Editing + toggling completion supports optimistic updates
- Deleting a todo requires confirmation
- Search + filter combine with pagination
- Detail page shows full info and supports edit/delete
- React Query cache keys include filter state
- No data flicker on pagination (keepPreviousData)

### Non-functional

- Strict TypeScript
- ts-pattern used for:
  - API result matching
  - UI state branching
- Logical, scalable directory structure

## UX Requirements

- Loading states
- Empty states
- Error fallbacks
- Accessible forms
- Responsive layout

# 2. Architecture & Project Structure Specification

## Overall Architecture

The project follows a **feature-first, domain-driven** structure with clear separation between:

- Domain models
- Repository (data layer)
- UI components
- Hooks
- Pages
- Shared libraries

## Folder Structure

```
app/
├─ todos/
│  ├─ page.tsx
│  ├─ loading.tsx
│  ├─ error.tsx
│  ├─ components/
│  │  ├─ TodoList.tsx
│  │  ├─ TodoFilters.tsx
│  │  └─ TodoItem.tsx
│  ├─ hooks/
│  │  ├─ useCreateTodo.ts
│  │  ├─ useListTodos.ts
│  │  ├─ useUpdateTodo.ts
│  │  └─ useDeleteTodo.ts
│  └─ [id]/
│     ├─ page.tsx
│     └─ components/
│        └─ TodoDetail.tsx
├─ components/
│  └─ ui/
│     ├─ Button.tsx
│     ├─ Input.tsx
│     ├─ Select.tsx
│     ├─ Modal.tsx
│     └─ Toast.tsx
│  └─ layout/
│     └─ PageContainer.tsx
├─ lib/
│  ├─ query/
│  │  ├─ queryClient.ts
│  │  └─ keys.ts
│  ├─ validation/
│  │  └─ todo.ts
│  ├─ patterns/
│  │  └─ result.ts
│  ├─ storage/
│  │  └─ localStorageClient.ts
│  └─ utils/
│     ├─ pagination.ts
│     └─ format.ts
├─ repositories/
│  └─ todo.repository.ts
├─ stores/
│  └─ ui.store.ts
├─ types/
│  ├─ todo.ts
│  └─ pagination.ts
└─ tests/
   ├─ unit/
   └─ integration/
```

## Routing Rules

- All pages use **Next.js App Router**
- All data fetching must occur in client components
- Server components allowed only for static UI structure

## Component Structure Rules

- Page components should be minimal and delegate logic to hooks & subcomponents
- Reusable components belong in `components/ui`

## Import Aliases

- `@/app/*`
- `@/components/*`
- `@/lib/*`
- `@/repositories/*`
- `@/stores/*`
- `@/types/*`

## Error handling pattern

- All data layer functions return:
  - `Promise<Result<T, Error>>>`
- Always decoded via zod
- Branching in UI must use ts-pattern

# 3. Domain Models & Validation Schemas

## Todo Model

```ts
import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.number(),
});

export type Todo = z.infer<typeof TodoSchema>;
```

## Paginated Response

```ts
export const PaginatedTodoSchema = z.object({
  items: z.array(TodoSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type PaginatedTodo = z.infer<typeof PaginatedTodoSchema>;
```

## Decoding Rules

- Never trust localStorage data.
- Always decode using zod.
- If decoding fails → return a structured error.

## Error Types

- `DecodeError`
- `NotFoundError`
- `StorageError`

## Domain Rules

- A todo must always have:
  - `id` as UUIDv4
  - Non-empty `title`
  - `completed` default false
  - `createdAt` timestamp

# 4. Data Layer / Repository Contract

## Overview

All data access must flow through a repository using async functions.  
LocalStorage is treated like remote storage.

## Repository API (Contract)

```ts
export interface TodoRepository {
  list(params: {
    page: number;
    pageSize: number;
    status: "all" | "active" | "completed";
    q?: string;
  }): Promise<Result<PaginatedTodo, AppError>>;

  get(id: string): Promise<Result<Todo, AppError>>;

  create(input: { title: string }): Promise<Result<Todo, AppError>>;

  update(id: string, patch: Partial<Todo>): Promise<Result<Todo, AppError>>;

  delete(id: string): Promise<Result<null, AppError>>;
}
```

## React Query Keys

```
todos.list({ page, status, q })
todos.detail(id)
todos.all
```

## Result Pattern (`ts-pattern`)

```ts
type Result<T, E> = { type: "success"; data: T } | { type: "error"; error: E };
```

## Optimistic Updates

- Mutations use:
  - `onMutate`
  - `onError`
  - `onSettled`
  - Must rollback on failure
- Toasts triggered from Zustand UI store

## Validation Strategy

- All received data decode using Zod.safeParse
- Invalid data should:
  - Log decoding error
  - Return structured error to UI

# 5. UI System & Component Design Guide

## Principles

- Reusable components
- Accessible
- Minimal, clean UI
- Tailwind-first

## Base Components

- `<Button />`
- `<Input />`
- `<Select />`
- `<Modal />`
- `<Toast />`
- `<Spinner />`
- `<Skeleton />`

## Layout Components

- `<PageContainer />`
- `<Section />`

## Form Rules

- Always use react-hook-form
- Each input must include:
  - label
  - aria-describedby
  - error messaging

## Loading UX

- Use skeletons for lists
- Spinner for detail pages

## Error UX

- Error boundary per page
- Inline error blocks for form validation

## Empty State

- Use centered text + CTA button

## Responsive Layout

- Mobile-first
- Max width for content: `max-w-2xl`
- Use grid or flex for list layout

## Styling Rules

- Avoid inline styles
- Prefer composition over prop explosion
- Tailwind spacing scale only

# 6. Testing Strategy

## Framework

- Vitest
- React Testing Library
- MSW (optional for API simulation)

## Folder Structure

```
tests/
  unit/
  integration/
```

## What to Test

### Unit Tests

- Repository functions
- Validation logic
- Utility functions (pagination, formatting)

### Integration Tests

- Todo list page:
  - Load + render
  - Pagination
  - Filters
  - Search
- Todo detail page:
  - Edit form
  - Delete confirmation

### E2E Test

- Playwright: Create → Paginate → Edit → Delete.

## Test Rules

- No snapshot tests
- Use `userEvent` for interactions
- Test what the user sees, not implementation details

## Example Unit Test

```ts
test("decodes todo from storage", () => {
  const result = TodoSchema.safeParse(data);
  expect(result.success).toBe(true);
});
```

## Example Integration Test

```
render(<TodoList />);

await waitFor(() =>
  expect(screen.getByText("My Todo")).toBeInTheDocument()
);
```

# 7. Coding Conventions & Patterns

## TypeScript Rules

- Strict mode enabled
- No `any` except with justification
- Use discriminated unions for results

## Naming Conventions

- Components: PascalCase
- Hooks: useCamelCase
- Files: kebab-case
- Types/interfaces: PascalCase
- Zod Schema: PascalCase

## React Query Rules

- One hook per API action
- Query keys must come from a central factory
- Always use `keepPreviousData` on pagination queries

## Zustand Store Pattern

```ts
export const useUIStore = create((set) => ({
  toasts: [],
  addToast: (msg) => set(...),
  modal: null,
  openModal: () => ...,
  closeModal: () => ...
}));
```

## Error Handling

- Use ts-pattern for all result branching

```ts
match(result)
  .with({ type: "success" }, ...)
  .with({ type: "error" }, ...)
  .exhaustive();
```

## Form Handling

- Use react-hook-form
- All forms validated via codecs before submission

## Code Style

- Prettier enforced
- ESLint with Next.js preset
