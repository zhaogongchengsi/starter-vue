import { getRoutersAsync } from "@/api/user";
import { RouterRecord } from "@/types/user";
import ComponentNotExit from "@/components/ComponNotExist/index.vue";
import { State } from "@/enums/code";
import { EXPRESS_AT_KEY } from "@/store/user";
import { TOKEN_KEY } from "@/utils/http";

const modules = import.meta.glob("../views/**/*.vue");

// 匹配路径前缀 ./ ../ ..\ .\
const PATH_REG = /^(\.{0,2}[\/\\])/gm;
const FILESUF_REG = /.*(\.vue|js|jsx|ts|tsx)$/;

export type ImportModule = () => Promise<unknown>;
export type Modules = Record<string, ImportModule>;
export type ModulesMap = Map<string, ImportModule>;

export function searchModuleComponent(
  router: RouterRecord,
  modules: ModulesMap,
): ImportModule | undefined {
  if (typeof router === "function") {
    return router;
  }
  const component: string = router.component as string;
  const isExt = FILESUF_REG.test(component);
  const componetName = (isExt ? component : component + ".vue").replace(PATH_REG,"");
  let module = modules.get(componetName);

  if (!module) {
    if (isExt) {
      // 文件没找到
      return undefined;
    } else {
      const newName = [component, "index.vue"].join("/").replace(PATH_REG, "");
      let module = modules.get(newName);
      if (module) {
        return module;
      } else {
        // 文件没找到
        return undefined;
      }
    }
  }

  return module;
}

export function modulesOrganize(modules: Modules) {
  const modulesMap = new Map<string, ImportModule>();
  Object.entries(modules).forEach(([name, module]) => {
    modulesMap.set(name.replace(PATH_REG, ""), module);
  });
  return modulesMap;
}

export function routerTravel(routers: RouterRecord[], modules: ModulesMap) {
  // todo: 格式化路由 的路径参数 路由排序

  const _router = routers.map((r) => {
    const component = searchModuleComponent(r, modules);
    componentReplace(r, component);
    return r;
  });

  const roorRouter = _router.filter(({ pid }) => {
    return pid === 0;
  });
  const childRouter = _router.filter(({ pid }) => {
    return pid != 0;
  });

  function componentReplace(router: RouterRecord, module?: ImportModule) {
    if (!module) {
      // 路由不存在替换为 异常组件
      const comp = router.component;
      router.props = {
        componentPath: comp,
        modules: Array.from(modules.keys()),
      };
      router.component = ComponentNotExit;
    } else {
      router.component = module;
    }
  }

  function toTree(prouter: RouterRecord[], crouter: RouterRecord[]) {
    prouter.forEach((pitem) => {
      // 将 自身id 记录在meta 里面 后续判断权限有用
      pitem.meta["pid"] = 0
      pitem.meta["id"] = pitem.id
      crouter.forEach((citem) => {
        citem.meta["id"] = citem.id
        citem.meta["pid"] = pitem.id
        if (pitem.id === citem.pid) {
          toTree([citem], crouter);
          if (pitem.children) {
            pitem.children.push(citem);
          } else {
            pitem.children = [citem];
          }
        }
      });
    });

    return prouter;
  }

  return toTree(roorRouter, childRouter);
}

export type UseRouterState = {
  isSuccess: boolean;
  data: RouterRecord[];
  message?: string;
};

/**
 * @description 将后端请求过来的扁平化路由数据 转化为真实的路由树形数据 并且将组件替换为真实的组件, 实际上是一个普通函数
 */
export async function useRouterAsync(): Promise<UseRouterState> {
  const state: UseRouterState = {
    isSuccess: false,
    data: [],
    message: "",
  };

  const token = localStorage.getItem(TOKEN_KEY);
  const express_at = localStorage.getItem(EXPRESS_AT_KEY);

  if (
    !token ||
    (express_at && new Date(express_at) <= new Date())
  ) {
    console.log("没有登录执行登录请求");
    state.message = "登录过期";
    return state;
  }

  try {
    const { code, data, message } = await getRoutersAsync();

    if (code === State.Failed) {
      state.isSuccess = false;
      state.message = message;
    }

    if (code === State.Ok) {
      const routerRec = routerTravel(data, modulesOrganize(modules));
      state.isSuccess = true;
      state.message = "成功";
      state.data = routerRec;
    }

    return state;
  } catch (err) {
    throw err;
  }
}
