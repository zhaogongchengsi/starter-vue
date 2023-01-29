import { useRouterAsync } from "@/hooks/useRouter";
import { useUserStore } from "@/store";
import { RouterAsyncRow } from "@/types/user";
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { LOGIN_PAGE, createDefaultRouter, NOT_FOUND_PAGE } from "./base";

export async function createAppRouters(app: App) {
  let baseRouter: RouterAsyncRow[] = [LOGIN_PAGE];
  try {
    const asyncRouters = await useRouterAsync();
    baseRouter = [
      {
        ...LOGIN_PAGE,
        path: "/login",
      },
      NOT_FOUND_PAGE,
      createDefaultRouter(asyncRouters),
    ];
  } catch (err) {
    console.error(err)
  }

  const router = createRouter({
    history: createWebHistory(),
    routes: baseRouter,
  });

  router.beforeEach((to, from) => {
    if ((to?.meta.auth != undefined && to?.meta.auth != false) || to.name === "login") {
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
