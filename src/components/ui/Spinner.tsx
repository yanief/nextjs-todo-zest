"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function Spinner() {
  const { t } = useI18n();
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-label={t("Loading", {
        key: "common.aria.loading",
      })}
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-slate-600 dark:border-t-blue-400" />
    </div>
  );
}
