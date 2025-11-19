"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ar } from "./ar";
import { en, type Messages } from "./en";
const dictionaries = {
  en,
  ar,
};
export type Locale = keyof typeof dictionaries;
export interface MessageObject {
  [key: string]: MessageValue;
}
export type MessageValue = string | string[] | MessageObject;
interface I18nContextValue {
  locale: Locale;
  direction: "ltr" | "rtl";
  t: (
    defaultTranslation: string,
    {
      key,
      values,
    }: {
      key: string;
      values?: Record<string, string | number>;
    },
  ) => string;
  tList: (
    defaultTranslations: string[],
    {
      key,
      values,
    }: {
      key: string;
      values?: Record<string, string | number>;
    },
  ) => string[];
  setLocale: (locale: Locale) => void;
}
const I18nContext = createContext<I18nContextValue | undefined>(undefined);
const STORAGE_KEY = "todo-app-locale";
function getTranslation(
  dictionary: {
    [key: string]: string | string[];
  },
  key: string,
) {
  if (key in dictionary) {
    return dictionary[key];
  }
  return undefined;
}
function formatMessage(
  message: string,
  values?: Record<string, string | number>,
) {
  if (!values) return message;
  return message.replace(/\{(\w+)\}/g, (_, key) => {
    if (values[key] === undefined) return `{${key}}`;
    return String(values[key]);
  });
}
export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored) {
      // Restore the previously chosen locale after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(stored);
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
  }, [locale]);
  const t = useCallback(
    (
      defaultTranslation: string,
      {
        key,
        values,
      }: {
        key: string;
        values?: Record<string, string | number>;
      },
    ) => {
      const dictionary: Messages = dictionaries[locale];
      const raw = getTranslation(dictionary, key);
      if (typeof raw === "string") {
        return formatMessage(raw, values);
      }
      return defaultTranslation;
    },
    [locale],
  );
  const tList = useCallback(
    (
      defaultTranslations: string[],
      {
        key,
        values,
      }: {
        key: string;
        values?: Record<string, string | number>;
      },
    ) => {
      const dictionary: Messages = dictionaries[locale];
      const raw = getTranslation(dictionary, key);
      if (Array.isArray(raw)) {
        return raw.map((item) => formatMessage(item, values));
      }
      return defaultTranslations;
    },
    [locale],
  );
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      direction: locale === "ar" ? "rtl" : "ltr",
      t,
      tList,
      setLocale,
    }),
    [locale, t, tList],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
