"use client";

import { useI18n, type Locale } from "@/i18n/I18nProvider";
import { Select } from "../ui/Select";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex flex-col gap-1 text-xs">
      <span className="font-medium text-center text-slate-600 dark:text-slate-300">
        {t("Language", {
          key: "controls.languageLabel",
        })}
      </span>
      <Select
        aria-label={t("Language", {
          key: "controls.languageLabel",
        })}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="text-sm"
      >
        <option value="en">
          {t("English", {
            key: "common.languages.en",
          })}
        </option>
        <option value="ar">
          {t("\u0627\u0644\u0639\u0631\u0628\u064A\u0629", {
            key: "common.languages.ar",
          })}
        </option>
      </Select>
    </div>
  );
}
