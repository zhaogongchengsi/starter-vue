import type { App } from "vue";
import { createPinia } from "pinia";

export { useUserStore } from "./user";
export { useThemeStore } from "./theme";
export { useHistory } from "./usehistory";
export type { HistoryRecord } from "./usehistory";

export function createAppStore(app: App) {
  app.use(createPinia());
  return app;
}
