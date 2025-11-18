export const en = {
  common: {
    appName: "Next.js TODO App",
    caseStudyTag: "Case Study",
    language: "Language",
    languages: {
      en: "English",
      ar: "العربية",
    },
    themeToggle: "Toggle theme",
    buttons: {
      add: "Add",
      back: "Back",
      delete: "Delete",
      save: "Save",
      previous: "Previous",
      next: "Next",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    aria: {
      loading: "Loading",
      updating: "Updating…",
      toggle: {
        markActive: "Mark as active",
        markCompleted: "Mark as completed",
      },
    },
  },
  landing: {
    intro: [
      "Built as a front-end hiring case study, this project showcases how to pair the Next.js App Router with a resilient client-side data layer powered by React Query, Zod validation, and ts-pattern result handling.",
      "The TODO experience mirrors a production-grade workflow with optimistic updates, persistent cache, and shareable filters through URL parameters.",
    ],
    cards: {
      projectOverview: {
        title: "About This Project",
        items: [
          "CRUD todos with optimistic updates",
          "Search, filter, and paginate via URL params",
          "Detail & edit page with guarded deletes",
          "Validation powered by Zod and ts-pattern",
        ],
      },
      techStack: {
        title: "Tech Stack",
        items: [
          "Next.js App Router + React Query",
          "Zustand for UI state",
          "Zod + ts-pattern + react-hook-form",
          "Tailwind CSS with dark mode",
        ],
      },
      architecture: {
        title: "Architecture Notes",
        items: [
          "Repository abstraction over async localStorage",
          "Result<T, E> modeling with exhaustive matches",
          "React Query cache keys bound to filter state",
          "Feature-first directory structure",
        ],
      },
    },
    cta: "Open TODO App",
    footer: {
      text: "Built for the FE Hiring Case Study — ",
      repo: "GitHub Repository",
    },
  },
  controls: {
    languageLabel: "Language",
    themeLabel: "Theme",
  },
  todos: {
    page: {
      title: "Todos",
      description:
        "Create, filter, and manage your tasks. Pagination is shareable via the URL.",
      sectionTitle: "Your Todos",
    },
    detailPage: {
      sectionTitle: "Todo Details",
    },
    filters: {
      searchLabel: "Search",
      searchPlaceholder: "Search todos...",
      searchHelp: "Filter by title. Updates results instantly.",
      statusLabel: "Status",
      options: {
        all: "All",
        active: "Active",
        completed: "Completed",
      },
    },
    form: {
      ariaLabel: "Create todo form",
      label: "New Todo",
      placeholder: "e.g. Buy groceries",
      helper: "Press “Add” to create. Title cannot be empty.",
      error: "Title is required",
    },
    list: {
      emptyTitle: "No todos yet.",
      emptyDescription: "Use the form above to create your first task.",
      pagination: "Page {current} of {total}",
    },
    detail: {
      titleLabel: "Title",
      helper: "Update the title and click save.",
      deleteTitle: "Delete todo?",
      deleteDescription: "This action cannot be undone.",
    },
    errors: {
      list: "Failed to load todos",
      detail: "Failed to load todo",
    },
  },
  toasts: {
    createSuccess: "Todo created",
    createError: "Failed to create todo",
    updateSuccess: "Todo updated",
    updateError: "Failed to update todo",
    deleteSuccess: "Todo deleted",
    deleteError: "Failed to delete todo",
  },
  errorBoundary: {
    title: "Something went wrong",
    message: "We couldn't load your todos. Please try again.",
    retry: "Try again",
  },
  loading: {
    title: "Todos",
    message: "Loading your tasks…",
  },
};

export type Messages = typeof en;
