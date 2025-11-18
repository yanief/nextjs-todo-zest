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
  t: (key: string, values?: Record<string, string | number>) => string;
  tList: (key: string, values?: Record<string, string | number>) => string[];
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "todo-app-locale";

function getNestedValue(
  obj: MessageValue,
  path: string[],
): MessageValue | undefined {
  return path.reduce<MessageValue | undefined>((acc, part) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return acc[part];
    }
    return undefined;
  }, obj);
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
    (key: string, values?: Record<string, string | number>) => {
      const dictionary: Messages = dictionaries[locale];
      const parts = key.split(".");
      const raw = getNestedValue(dictionary as MessageValue, parts);
      if (typeof raw === "string") {
        return formatMessage(raw, values);
      }
      return key;
    },
    [locale],
  );

  const tList = useCallback(
    (key: string, values?: Record<string, string | number>) => {
      const dictionary: Messages = dictionaries[locale];
      const parts = key.split(".");
      const raw = getNestedValue(dictionary as MessageValue, parts);
      if (Array.isArray(raw)) {
        return raw.map((item) => formatMessage(item, values));
      }
      return [];
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
