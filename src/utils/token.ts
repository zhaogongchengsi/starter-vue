import { EXPRESS_AT_KEY, ISSUED_AT_KEY, TOKEN_KEY } from "./keys";

// 从 localStorage 取出来的值可能不是空字符 而是 undefined
function IsInvalidString(str: string | undefined | null): boolean {
  if (!Boolean(str) || typeof str != "string") {
    return false;
  }
  if (str.replace(/\s/gm, "").length < 1) {
    return false;
  }
  return true;
}

export function tokenValid(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  const express_at = localStorage.getItem(EXPRESS_AT_KEY);
  const issued_at = localStorage.getItem(ISSUED_AT_KEY);
  return valid(token, express_at, issued_at);
}

type Str = string | null | undefined;

export function valid(t?: Str, e?: Str, i?: Str): boolean {
  const now = new Date();
  if (!IsInvalidString(t) || !IsInvalidString(e) || !IsInvalidString(i)) {
    return false;
  }
  // 现在 大于 过期时间(过期了) || 现在 小于 签发时间(还未生效)
  if (now >= new Date(e!) || now < new Date(i!)) {
    return false;
  }
  return true;
}
