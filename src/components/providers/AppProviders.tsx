"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { I18nProvider, type Locale } from "@/i18n/I18nProvider";
import { QueryProvider } from "@/lib/query/queryClient";
import { GlobalControls } from "@/components/navigation/GlobalControls";
import { ModalHost } from "@/components/ui/Modal";
import { ToastHost } from "@/components/ui/Toast";

interface AppProvidersProps {
  initialLocale: Locale;
  children: ReactNode;
}

export function AppProviders({ initialLocale, children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <I18nProvider initialLocale={initialLocale}>
        <QueryProvider>
          {children}
          <GlobalControls />
          <ModalHost />
          <ToastHost />
        </QueryProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
