import { RouterAsyncRow } from "@/types/user";
import NotFound from "@/components/NotFound.vue";
import DefaultPage from "@/views/index.vue";

export const LOGIN_PAGE = {
  path: "/",
  component: () => import("../views/login/login.vue"),
  name: "login",
  meta: {
    title: "login",
    auth: false,
    isMenu: false,
  },
  children: [
    {
      path: "/:pathMatch(.*)*",
      meta: {
        title: "NotFound",
        auth: false,
        isMenu: false,
      },
      component: NotFound,
    },
  ],
};

export const NOT_FOUND_PAGE = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: NotFound,
  meta: {
    title: "NotFound",
    auth: false,
    isMenu: false,
  },
};

export const DEFAULT_PAGE = {
  path: "/home",
  name: "home",
  component: DefaultPage,
  meta: {
    title: "首页",
    auth: false,
    isMenu: false,
  },
};

export function createDefaultRouter(children?: RouterAsyncRow[]): RouterAsyncRow {
  return {
    path: "/",
    component: () => import("../layouts/RootPage/index.vue"),
    name: "root",
    redirect: "/home",
    meta: {
      title: "root",
      isMenu: false,
      auth: true,
    },
    children: ([DEFAULT_PAGE] as RouterAsyncRow[]).concat(children || []),
  };
}
