import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error("Global Query Error:", error.message, query.queryKey);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error("Global Mutation Error:", error.message);
      },
    }),
  });
}

export function renderWithQueryClient(
  ui: ReactElement,
  {
    queryClient = createTestQueryClient(),
    ...options
  }: RenderOptions & { queryClient?: QueryClient } = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <I18nProvider initialLocale="en">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </I18nProvider>
      </ThemeProvider>
    );
  }

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}
