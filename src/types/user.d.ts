import { Component } from "vue";
import type {
  RawRouteComponent,
  RouteLocationMatched,
  RouteRecordRaw,
} from "vue-router";

export interface LoginInfo {
  account: string;
  password: string;
  remember: boolean;
  captcha: {
    id: string;
    text: string;
  };
}

export interface User {
  avatarUrl: string;
  createAt: string;
  email: string;
  enable: number;
  id: number;
  mode: string;
  nickname: string;
  phone: string;
  updateAt: string;
  username: string;
  uuid: string;
  authorities: Authority[]
}

export interface Authority {
  authorityName: string;
  createAt: string;
  id: number;
  pid: number;
  routerRecords: null;
  updateAt: string;
}

type DataString = string;
export interface Authorization {
  issued_at: DataString;
  express_at: DataString;
  token: string;
}

export interface RouterMeTa {
  auth: boolean;
  icon: string;
  isMenu: boolean;
  keepAlive: boolean;
  title: string;
}

type _Props = boolean | Record<string, any> | ((to: RouteLocationNormalized) => Record<string, any>)

export type RouterRecord = {
  component: string | RawRouteComponent;
  createAt: string;
  hidden: boolean;
  id: number;
  meta: Meta;
  name: string;
  props?: _Props;
  path: string;
  pid: number;
  sort: number;
  redirect: string;
  updateAt: string;
  children?: RouterRecord[];
};

interface MenuInfo {
  icon?: string;
  title: string;
  path: string;
  name?: string;
  children: MenuInfo[];
}

export interface AppRouteLocationMatched extends RouteLocationMatched {
  meta: RouterMeTa;
}
