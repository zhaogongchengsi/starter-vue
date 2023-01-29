import { createApp } from "vue";
import App from "./App.vue";

import ArcoVueIcon from "@arco-design/web-vue/es/icon";

import "./style";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";
import { createAppI18n } from "./locale";

const app = createApp(App);

async function bootstrap() {
  app.use(ArcoVueIcon);
  createAppStore(app);
  createAppI18n(app);
  await createAppRouters(app);
  app.mount("#app");
}

bootstrap();
