const prefix = "anya";
export const createKey = (name: string) => `${prefix}-${name}`;

export const USER_INFO_KEY = createKey("userInfo"); // 存储 用户信息
export const ISSUED_AT_KEY = createKey("issued_at"); // 存储token 签发时间
export const EXPRESS_AT_KEY = createKey("express_at"); // 存储token 过期时间
export const AUTHROITIES_KEY = createKey("authorities"); // 存储用户权限列表
export const TOKEN_KEY = createKey("token"); // 存储token
