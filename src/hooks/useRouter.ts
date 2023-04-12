import { getRoutersAsync } from "@/api/user";
import { RouterRecord } from "@/types/user";
import ComponentNotExit from "@/components/ComponNotExist/index.vue";
import { State } from "@/enums/code";
import { tokenValid } from "@/utils/token";
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
  const component: string = router.component as string;

  if (typeof component != "string") {
    return component;
  }

  const isExt = FILESUF_REG.test(component);
  
  const componetName = (isExt ? component : component + ".vue").replace(
    PATH_REG,
    "",
  );

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
  function componentReplace(router: RouterRecord, module?: ImportModule) {
    if (!module) {
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

  function buildTree(data: RouterRecord[]): RouterRecord[] {
    const map: { [key: number]: number } = {};
    let node: RouterRecord;
    const tree: RouterRecord[] = [];

    data.forEach((item, index) => {
      map[item.id] = index;
      item.children = [];

      Object.assign(item.meta, {
        pid: item.pid,
        id: item.id,
        sort: item.sort,
      });
      const component = searchModuleComponent(item, modules)
      componentReplace(item, component);
    });

    for (let i = 0; i < data.length; i += 1) {
      node = data[i];
      if (node.pid !== 0) {
        data[map[node.pid]].children?.push(node);
      } else {
        tree.push(node);
      }
    }

    return tree;
  }

  return buildTree(routers);
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

  if (!tokenValid()) {
    // console.log("没有登录执行登录请求");
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
