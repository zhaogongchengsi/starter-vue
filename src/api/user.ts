import { LoginInfo, RouterAsyncRow, UserInfo } from "@/types/user";
import { Get, HttpParams, Post } from "@/utils/http";

export async function getCaptcha<T>(params?: HttpParams) {
  return await Get<T>(`user/captcha`, params);
}

export async function Login(userinfo: LoginInfo) {
  return await Post<{ user: UserInfo; token: string }>(`user/login`, userinfo);
}

export async function getRoutersAsync() {
  return await Get<RouterAsyncRow[]>("router/routers");
}
