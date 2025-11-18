"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useI18n } from "@/i18n/I18nProvider";

export function GlobalControls() {
  const { direction, t } = useI18n();

  const positionStyle =
    direction === "rtl"
      ? { left: "1rem", right: "auto" }
      : { right: "1rem", left: "auto" };

  return (
    <div
      className="fixed bottom-4 z-50 flex flex-row gap-3 rounded-xl border border-slate-200 bg-white/90 p-3 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
      style={positionStyle}
    >
      <div className="flex flex-col gap-1 text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {t("controls.themeLabel")}
        </span>
        <ThemeToggle />
      </div>
      <div className="inline-block w-0.5 self-stretch bg-slate-200 dark:bg-slate-700"></div>
      <LanguageSwitcher />
    </div>
  );
}
