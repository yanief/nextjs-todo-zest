import { cookies } from "next/headers";
import { ar } from "./ar";
import { en } from "./en";
import type { Locale } from "./I18nProvider";

export async function getServerLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get("locale")?.value;
  if (cookieLocale === "ar") return "ar";
  return "en";
}

export function getDictionary(locale: Locale) {
  return locale === "ar" ? ar : en;
}
