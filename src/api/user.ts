import { Authorization, LoginInfo, RouterRecord, User } from "@/types/user";
import { Get, HttpParams, Post } from "@/utils/http";

export async function getCaptcha<T>(params?: HttpParams) {
  return await Get<T>(`base/captcha`, params);
}

export async function Login(userinfo: LoginInfo) {
  return await Post<{ user: User; authorization: Authorization }>(`user/login`, userinfo);
}

export async function getRoutersAsync() {
  return await Get<RouterRecord[]>("user/routers");
}
