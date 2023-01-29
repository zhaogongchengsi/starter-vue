import { defineStore } from "pinia";
import { useColorMode, useStorageAsync } from "@vueuse/core";

export const THEME_STORAGE_KEY = "anya-theme";
export const SIDER_STORAGE_SETTING_KEY = "anya-sider-setting";

export type ThemeMode = "dark" | "light";

const defaultSetting = { asiderWidth: 220, collapsed: false, headerHeight: 60 };

export const useThemeStore = defineStore("theme", {
  state: () => {
    const mode = useColorMode({
      selector: "body",
      attribute: "class",
      storage: localStorage,
      storageKey: THEME_STORAGE_KEY,
      onChanged(mode) {
        if (mode === "dark") {
          document.body.setAttribute("arco-theme", "dark");
          document.body.classList.remove("light");
        } else {
          document.body.classList.remove("dark");
          document.body.removeAttribute("arco-theme");
        }
        document.body.classList.add(mode);
      },
    });

    const themeSetting = useStorageAsync(SIDER_STORAGE_SETTING_KEY, defaultSetting);

    return { mode, themeSetting };
  },

  actions: {
    setMode(value?: ThemeMode) {
      if (value && typeof value === "string") {
        this.mode = value;
        return;
      }
      if (this.mode === "dark") {
        this.mode = "light";
      } else if (this.mode === "light") {
        this.mode = "dark";
      }
    },
  },

  getters: {
    themeMode: (state): ThemeMode => {
      return state.mode as ThemeMode;
    },
  },
});
