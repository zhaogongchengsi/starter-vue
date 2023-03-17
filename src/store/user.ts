import { Login } from "@/api/user";
import { TOKEN_KEY } from "@/utils/http";
import { LoginInfo, UserInfo } from "@/types/user";
import { defineStore } from "pinia";
import md5 from "md5-es";
import { Message } from "@arco-design/web-vue";
import { State } from "@/enums/code";

export const USER_INFO_KEY = "anya-userInfo";

export const useUserStore = defineStore("user", {
  state: () => {
    const userInfo = window.localStorage.getItem(USER_INFO_KEY);
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (userInfo && token && token != "") {
      const user: UserInfo = JSON.parse(userInfo);
      return { user, logined: true, token };
    }
    return { user: {}, token: "", logined: false };
  },

  actions: {
    async login(userinfo: LoginInfo): Promise<boolean> {
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
        
        const { user, token } = data;
        window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
        window.localStorage.setItem(TOKEN_KEY, token);
        this.token = token;
        this.user = user;
        this.logined = true;
        this.token = token;
        Message.success("登录成功");
        return true;
      } catch (err: any) {
        console.error(err);
        return false;
      }
    },

    LoginOut() {
      this.logined = false;
      this.user = {};
      this.token = "";
      window.localStorage.removeItem(USER_INFO_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    },
  },
});
