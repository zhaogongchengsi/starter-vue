import { RouterAsyncRow } from "@/types/user";
import NotFound from "@/components/NotFound.vue";
import DefaultPage from "@/views/index.vue";
import LayoutPage from "@/layouts/Index.vue";

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
        title: "router.title.abnormal",
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
    title: "router.title.abnormal",
    auth: false,
    isMenu: false,
  },
};

export const DEFAULT_PAGE = {
  path: "/home",
  name: "home",
  component: DefaultPage,
  meta: {
    title: "router.title.home",
    auth: false,
    isMenu: false,
  },
};

export function createDefaultRouter(children?: RouterAsyncRow[]): RouterAsyncRow {
  return {
    path: "/",
    component: LayoutPage,
    name: "root",
    redirect: "/home",
    meta: {
      title: "router.title.home",
      isMenu: false,
      auth: true,
      icon: "icon-home"
    },
    children: ([DEFAULT_PAGE] as RouterAsyncRow[]).concat(children || []),
  };
}
