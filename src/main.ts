import { createApp } from "vue";
import App from "./App.vue";

import ArcoVueIcon from "@arco-design/web-vue/es/icon";

import "./style";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";
import { createAppI18n } from "./locale";
import CustomRouterView from "./components/CustomView/index.vue";

const app = createApp(App);

async function bootstrap() {
  app.component("CustomRouterView", CustomRouterView);
  app.use(ArcoVueIcon);

  createAppStore(app);
  createAppI18n(app);
  await createAppRouters(app);
  app.mount("#app");
}

bootstrap();
