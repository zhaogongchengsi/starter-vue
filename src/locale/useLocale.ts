import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { LOCALE_OPTIONS, LOCALE_KEY } from ".";
import { useI18n } from "vue-i18n";
import type { LocalType } from ".";

export function useLocal() {
  const local = useLocalStorage<LocalType>(LOCALE_KEY, "zh-CN");

  const i18n = useI18n();

  function setLocal(type: LocalType) {
    local.value = type;
    i18n.locale.value = type;
  }

  const language = computed(() => {
    return LOCALE_OPTIONS.find(({ value }) => {
      return value === local.value;
    });
  });

  return {
    local,
    options: LOCALE_OPTIONS,
    setLocal,
    i18n,
    $: i18n.t,
    language,
  };
}
