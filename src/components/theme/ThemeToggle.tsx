"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "@/i18n/I18nProvider";

export function ThemeToggle() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Setting mounted to true ensures icons match the hydrated theme.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={t("Toggle theme", {
          key: "common.themeToggle",
        })}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("Toggle theme", {
        key: "common.themeToggle",
      })}
      className={clsx(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
      )}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
