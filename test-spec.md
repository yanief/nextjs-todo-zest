# 🧪 **Testing Specification — Next.js TODO App**

(For Unit, Integration & E2E)

This document defines the full testing strategy for the TODO application, including the scope, tools, conventions, and specific test cases for each layer.

- - -

# 1. **Testing Philosophy**

The testing strategy follows a **“test behaviors, not implementation details”** approach.

Each test type focuses on a specific layer:

| Layer           | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Unit**        | Validate correctness of pure logic (repository, utilities, validation). |
| **Integration** | Verify components + React Query + mocked data layer.                    |
| **E2E**         | Validate real user flows in the browser.                                |

We emphasize:

* **Deterministic tests**

* **Minimal mocks**

* **Confidence over coverage numbers**

* **Critical-path flows only** for E2E

- - -

# 2. **Tools & Setup**

### 2.1 Unit & Integration (Vitest + React Testing Library)

* **Vitest** for test runner + assertions

* **React Testing Library** for component tests

* **MSW (Mock Service Worker)** for mocking the repository layer

### 2.2 E2E (Playwright)

* Cross-browser behavior

* UI state verification

* Form interactions

* Network/Storage interactions through the UI layer

### 2.3 Additional Libraries

* **Zod** for schema validation tests

* **ts-pattern** for result matching

* **Testing utils** (`renderWithQueryClient`, `createTestQueryClient`)

- - -

# 3. **Unit Tests**

Unit tests cover **pure logic**, not UI or network layers.

## 3.1 Components to Unit Test

### A. **Repository Layer**

Files: `features/todos/api/repository.ts`

Test the following behaviors:

#### 1. **getTodos**

* Applies `page`, `status`, and `q` filters correctly

* Returns paginated structure

* Decodes data with Zod

* Returns structured errors on invalid data

#### 2. **createTodo**

* Generates unique IDs

* Adds item to storage

* Returns validated todo

* Returns error on invalid input

#### 3. **updateTodo**

* Updates only the specified fields

* Returns error if item not found

* Maintains schema correctness

#### 4. **deleteTodo**

* Removes item from storage

* Errors when deleting a missing item

- - -

### B. **Validation Schemas**

Files: `features/todos/schemas/*.ts`

Test:

* That valid data passes

* Invalid data fails

* Type narrowing is correct

- - -

### C. **Utility Functions**

Files: `lib/utils/*.ts`

Examples:

* `applyFilters`

* `paginate`

* `simulateNetworkDelay`

Test:

* Correct output given specific inputs

* Edge cases (empty, null, invalid ranges)

- - -

# 4. **Integration Tests**

Integration tests verify:

* Components

* React Query cache

* Repository layer (mocked via MSW)

* User interactions

* URL searchParams behavior

## 4.1 Config

Use:

* **RTL**

* **MSW** for intercepting the repository API

* **custom render** wrapper that provides:

  * QueryClientProvider

  * Router context

  * Zustand store provider (if needed)

- - -

## 4.2 Integration Test Cases

### A. **Todo List Page (`/todo`)**

Tests:

#### 1. **Initial Load**

* Shows loading state

* Renders 10 items

* Renders pagination controls

#### 2. **Pagination Behavior**

* Clicking “Next Page” updates URL

* Keeps previous data during transition

* Correct items appear

#### 3. **Filtering**

* Switching status filter updates results

* Search query updates results

* URL reflects new params

#### 4. **Error State**

* Displays fallback when repository returns an error

* Retry button re-fetches

- - -

### B. **Todo Detail Page (`/todo/[id]`)**

#### 1. **Loads detail correctly**

* Shows loading

* Then todo fields

#### 2. **Edit Form**

* Editing the title updates the todo

* Optimistic update applied

* Rolls back on error

#### 3. **Delete Flow**

* Shows confirm modal (if applicable)

* After delete, redirects to `/todo`

* Invalidate query

- - -

### C. **Create Todo Modal / Form**

* Validates required fields

* Creates new todo

* Adds it to first page

* Clears form

- - -

# 5. **E2E Tests (Playwright)**

E2E tests validate the **actual user experience** end-to-end.

### 5.1 Primary User Flow:

**Create → Paginate → Edit → Delete**

#### 1. **Create Todo**

* Navigate to `/todo`

* Click “Add Todo”

* Fill form

* Submit

* See new todo in the list

#### 2. **Paginate**

* Navigate to page 2

* Items change

* URL changes

* State persists after reload

#### 3. **Edit Todo**

* Open detail page

* Modify title

* Save

* Confirm new title on list + detail

#### 4. **Delete Todo**

* Delete from detail page

* Confirm modal

* Redirect to `/todo`

* Item removed from list

- - -

### 5.2 Additional E2E Scenarios

#### **Filtering**

* Filter by completed/active/all

* Search text

* Combined with pagination

* URL persists state

#### **Error Recovery**

* Simulate failing repository operation

* UI shows appropriate error

* Retry works

#### **Mobile Layout Check**

* Viewport set to mobile size

* Ensure layout adapts

- - -

# 6. **Test Folder Structure**

```
tests/
  unit/
    repository.test.ts
    schemas.test.ts
    utils/
  integration/
    todo-list.test.tsx
    todo-detail.test.tsx
    create-todo.test.tsx
  e2e/
    todo-flow.spec.ts
    filters.spec.ts
    error-handling.spec.ts
```

- - -

# 7. **CI Integration**

On pull request or push to main:

1. Run unit tests

2. Run integration tests

3. Build app

4. Run Playwright E2E in headless mode