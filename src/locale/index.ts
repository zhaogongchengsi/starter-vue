import { createI18n } from "vue-i18n";
import cn from "./Languages/zh-CN";
import en from "./Languages/en-US";
import { App } from "vue";

export const LOCALE_OPTIONS: { label: string; value: LocalType }[] = [
  { label: "中文", value: "zh-CN" },
  { label: "English", value: "en-US" },
];

export const LOCALE_KEY = "rapid-locale";

export type LocalType = "zh-CN" | "en-US";

export function createAppI18n(app: App) {
  const defaultLocale = localStorage.getItem(LOCALE_KEY) || "zh-CN";

  const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: "en-US",
    allowComposition: true,
    messages: {
      "en-US": en,
      "zh-CN": cn,
    },
  });

  app.use(i18n);
}
