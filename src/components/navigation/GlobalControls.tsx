"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useI18n } from "@/i18n/I18nProvider";

export function GlobalControls() {
  const { t } = useI18n();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-3 border-b border-slate-200 bg-white/90 shadow-md backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
    >
      <div className="flex flex-col gap-1 text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {t("Theme", {
            key: "controls.themeLabel",
          })}
        </span>
        <ThemeToggle />
      </div>
      
      <div className="inline-block w-0.5 self-stretch bg-slate-200 dark:bg-slate-700 mx-4"></div>
      
      <LanguageSwitcher />
    </div>
  );
}
