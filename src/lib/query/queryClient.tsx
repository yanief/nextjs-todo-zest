"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactNode, useMemo, useState } from "react";

let client: QueryClient | null = null;

function createClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function getQueryClient() {
  if (!client) {
    client = createClient();
  }
  return client;
}

function useSessionStoragePersister() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return createSyncStoragePersister({
      storage: window.sessionStorage,
      key: "todo-query-cache",
      throttleTime: 1000,
    });
  }, []);
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  const persister = useSessionStoragePersister();

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60, // 1 hour
        buster: "v1",
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.state.status === "success",
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
