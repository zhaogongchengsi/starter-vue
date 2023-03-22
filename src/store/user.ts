import { Login } from "@/api/user";
import { TOKEN_KEY } from "@/utils/http";
import { LoginInfo, User } from "@/types/user";
import { defineStore } from "pinia";
import md5 from "md5-es";
import { Message } from "@arco-design/web-vue";
import { State } from "@/enums/code";
import { ref } from "vue";
import { createKey } from "@/utils";
import { useLocalStorage } from "@vueuse/core";

export const USER_INFO_KEY = createKey("userInfo");
export const ISSUED_AT_KEY = createKey("issued_at")
export const EXPRESS_AT_KEY = createKey("express_at")


function useLogin() {
  const token = useLocalStorage(TOKEN_KEY, "");
  const issued_at = useLocalStorage(ISSUED_AT_KEY, "");
  const express_at = useLocalStorage(EXPRESS_AT_KEY, "");

  const user = useLocalStorage(USER_INFO_KEY, {})

  const logined = ref(false)

  const login = async (userinfo: LoginInfo): Promise<boolean> => {
    try {
      const { code, message, data } = await Login({
        ...userinfo,
        password: md5.hash(userinfo.password),
      });

      if (code === State.Failed) {
        Message.error(message);
        return false;
      }

      if (code != State.Ok) {
        Message.error(message);
        return false;
      }

      const { user:u, authorization } = data;

      token.value = authorization.token;
      issued_at.value = authorization.issued_at
      express_at.value = authorization.express_at

      user.value = u
      logined.value = true;

      Message.success("登录成功");
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

  const LoginOut = () => {
    logined.value = false;
    user.value = {};
    token.value = "";
  }

  return {
    token,
    user,
    logined,
    login,
    LoginOut
  }
}

export const useUserStore = defineStore("user", useLogin);
