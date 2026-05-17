import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "ar", "en", "fa", "ru", "de", "tk", "uz"],
  defaultLocale: "tr",
});

export type Locale = (typeof routing.locales)[number];

export const rtlLocales: Locale[] = ["ar", "fa"];

export function isRTL(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}