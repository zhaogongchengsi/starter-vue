import axios, { AxiosResponse } from "axios";
import { TOKEN_KEY } from "./keys";

// 新token的名称
export const NEW_TOKEN_KEY = "new-token";

export interface HttpResponse<T extends any> {
  code: number;
  data: T;
  error: string;
  message: string;
}

export type HttpParams = Record<string, string | number>;

const http = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_PROXY
    : [import.meta.env.VITE_TARGET, import.meta.env.VITE_PROXY].join(""),
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
  }
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
  }
);

export function Get<T>(url: string, param?: HttpParams): Promise<HttpResponse<T>> {
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
        const { data, status } = res;
        if (status === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function Post<T, D = any>(url: string, data: D): Promise<HttpResponse<T>> {
  return new Promise((resolve, reject) => {
    http
      .post<HttpResponse<T>>(url, data)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
