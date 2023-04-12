import { Login } from "@/api/user";
import { LoginInfo, User } from "@/types/user";
import { defineStore } from "pinia";
import md5 from "md5-es";
import { Message } from "@arco-design/web-vue";
import { State } from "@/enums/code";
import { useLocalStorage } from "@vueuse/core";
import { useToken } from "./token";
import { useAuthorities } from "./authoritie";
import { USER_INFO_KEY } from "@/utils/keys";
import { tokenValid } from "@/utils/token";

function useLogin() {
  const tokeninfo = useToken();
  const auths = useAuthorities();
  const user = useLocalStorage<User | {}>(USER_INFO_KEY, {});

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

      const { user: u, authorization } = data;
      const { token, issued_at, express_at } = authorization;
      tokeninfo.setTokenInfo(token, issued_at, express_at);
      auths.setAuthorities(u.authorities);
      user.value = u;
      Message.success("登录成功");

      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

  const LoginOut = () => {
    user.value = {};
    tokeninfo.clearTokenInfo();
    auths.clearAuthorities();
  };

  return {
    token: tokeninfo.token,
    user,
    logined: () => {
      return tokenValid();
    },
    login,
    LoginOut,
  };
}

export const useUserStore = defineStore("user", useLogin);
