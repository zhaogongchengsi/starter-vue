import { useRouterAsync } from "@/hooks/useRouter";
import type { App } from "vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { createDefaultRouter, LOGIN_PAGE, LOGIN_PAGE_PRO, NOT_FOUND_PAGE } from "./base";
import { tokenValid } from "@/utils/token";

export async function createAppRouters(app: App) {
  // 初始路由，如果请求路由失败，将只会在首页出现登陆页面

  let baseRouter: RouteRecordRaw[] = [LOGIN_PAGE];
  try {
    const { isSuccess, data } = await useRouterAsync();
    if (isSuccess) {
      // 刷新时，替换掉初始路由
      baseRouter = [LOGIN_PAGE_PRO, NOT_FOUND_PAGE, createDefaultRouter(data)];
    }
  } catch (err) {
    console.error(err);
  }

  const router = createRouter({
    history: createWebHistory(),
    routes: baseRouter,
  });

  router.beforeEach((to, from) => {
    if ((to?.meta.auth != undefined && to?.meta.auth == false) || to.name === "login") {
      return true;
    }

    // 会验证token 是否有效

    if (!tokenValid()) {
      return { path: "/login" };
    }

    return true;
  });

  app.use(router);
}
