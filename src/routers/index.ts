import { useRouterAsync } from "@/hooks/useRouter";
import { useUserStore } from "@/store";
import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { createDefaultRouter, LOGIN_PAGE, NOT_FOUND_PAGE } from "./base";

export async function createAppRouters(app: App) {
  let baseRouter: RouteRecordRaw[] = [LOGIN_PAGE];
  try {
    const { isSuccess, data } = await useRouterAsync();
    if (isSuccess) {
      baseRouter = [
        {
          component: () => import("@/views/login/login.vue"),
          path: "/login",
          name: "login",
          meta: {
            title: "login",
            auth: false,
            isMenu: false,
          },
        },
        NOT_FOUND_PAGE,
        createDefaultRouter(data),
      ];
    }
  } catch (err) {
    console.error(err);
  }

  const router = createRouter({
    history: createWebHistory(),
    routes: baseRouter,
  });

  router.beforeEach((to, from) => {
    if (
      (to?.meta.auth != undefined && to?.meta.auth == false) ||
      to.name === "login"
    ) {
      return true;
    }

    const user = useUserStore();

    if (!user.logined && !user.token) {
      return { path: "/login" };
    }

    return true;
  });

  app.use(router);
}
