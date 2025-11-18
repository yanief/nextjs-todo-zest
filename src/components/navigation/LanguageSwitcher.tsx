"use client";

import { useI18n, type Locale } from "@/i18n/I18nProvider";
import { Select } from "../ui/Select";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex flex-col gap-1 text-xs">
      <span className="font-medium text-slate-600 dark:text-slate-300">
        {t("controls.languageLabel")}
      </span>
      <Select
        aria-label={t("controls.languageLabel")}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="text-sm"
      >
        <option value="en">{t("common.languages.en")}</option>
        <option value="ar">{t("common.languages.ar")}</option>
      </Select>
    </div>
  );
}
