import axios, { AxiosResponse } from "axios";

// token 的名称
export const TOKEN_KEY = "anya-token";
// 新token的名称
export const NEW_TOKEN_KEY = "new-token";

const OKCODE = 1;
const Failed = 0;

export interface HttpResponse<T extends any> {
  code: number;
  data: T;
  err?: string;
  message?: string;
}

export type HttpParams = Record<string, string | number>;

const http = axios.create({
  baseURL: import.meta.env.VITE_PROXY,
  timeout: 5000,
});

http.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem(TOKEN_KEY);
    config.headers && (config.headers["Authorization"] = `Bearer ${token}`);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    // token 续费
    const newToken = response.headers[NEW_TOKEN_KEY];
    if (newToken) {
      window.localStorage.setItem(TOKEN_KEY, newToken);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export function Get<T>(url: string, param?: HttpParams): Promise<T> {
  let paramString = "";
  if (param) {
    const stringArr = [];
    for (const [key, value] of Object.entries(param)) {
      stringArr.push(`${key}=${value}`);
      paramString = "?" + stringArr.join("&");
    }
  }
  return new Promise((resolve, reject) => {
    http
      .get<any, AxiosResponse<HttpResponse<T>, any>, any>(url + paramString)
      .then((res) => {
        const { data } = res;
        if (data.code === OKCODE) {
          resolve(data.data);
        } else {
          reject(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function Post<T>(url: string, data: any): Promise<T> {
  return new Promise((resolve, reject) => {
    http
      .post<any, AxiosResponse<HttpResponse<T>>>(url, data)
      .then((res) => {
        const { data } = res;
        if (data.code === OKCODE) {
          resolve(data.data);
        } else {
          reject(data.message);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
