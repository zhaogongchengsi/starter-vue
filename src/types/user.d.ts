import type { RouteRecordRaw, RawRouteComponent } from "vue-router";

export interface LoginInfo {
  account: string;
  password: string;
  remember: boolean;
  captcha: {
    id: string;
    text: string;
  };
}

export interface UserInfo {
  avatar: string;
  account: string;
  nickName: string;
  language: "zn" | "cn";
  rule: "admin" | "user";
}

export interface RouterMeTa {
  title: string;
  isMenu: boolean;
  icon?: string;
  auth?: boolean;
}

export type RouterAsyncRow = {
  pid?: number;
  id?: number;
  meta: RouterMeTa;
  children?: RouterAsyncRow[];
  component: string | RawRouteComponent;
} & RouteRecordRaw;

interface MenuInfo {
  icon?: string;
  title: string;
  path: string;
  name?: string;
  children: MenuInfo[];
}
