import { defineStore } from "pinia";
import { Ref, ref, watch, isRef, computed, unref } from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";

const routerFormat = (router: Ref<RouteLocationNormalizedLoaded> | RouteLocationNormalizedLoaded) => {
  const { path, meta, name } = isRef<RouteLocationNormalizedLoaded>(router) ? router.value : router;
  return { path, name: name as string | undefined, title: meta.title as string, icon: meta.icon as string };
};

export type HistoryRecord = ReturnType<typeof routerFormat>;

export const useHistory = defineStore("routerHistory", () => {
  const router = useRouter();
  const routerHistory = ref<HistoryRecord[]>([routerFormat(router.currentRoute)]);
  const currentPointer = ref<number>(0);
  const currentRoute = computed(() => {
    const his = routerHistory.value[currentPointer.value];

    if (!his) {
      return undefined;
    }

    return his;
  });

  /**
   *
   * @param name 路由名字
   * @param path 路由路径
   * @desc 在历史记录中查找符合条件的路由
   */
  const findRecord = (name?: string, path?: string) => {
    return routerHistory.value.find((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  /**
   *
   * @param name 路由名字
   * @param path 路由路径
   * @desc 在历史记录中查找符合条件的路由的索引
   */
  const findRecordIndex = (name?: string, path?: string) => {
    return routerHistory.value.findIndex((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  /**
   * @desc 查找此历史记录是否存在
   */
  const hasRouter = ({ name, path }: HistoryRecord) => {
    const rec = findRecord(name, path);
    if (rec) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @desc 设置当前激活路由的指针
   */
  const setCurrentPointer = (index: number) => {
    currentPointer.value = index;
  };

  /**
   * @desc 添加一条历史记录
   */
  const pushHistory = (router: RouteLocationNormalizedLoaded) => {
    const _router = routerFormat(router);
    if (!hasRouter(_router)) {
      routerHistory.value = routerHistory.value.concat([_router]);
    }
    setCurrentPointer(findRecordIndex(_router.name, _router.path));
  };

  // 删除逻辑待开发
  const deleteTab = (name: string, path: string) => {
    let deleteIndex: number;
    let activeIndex: number = currentPointer.value;

    const currentPath = unref(currentRoute);

    const newHistory = routerHistory.value.filter((item, index) => {
      if (!currentPath) {
        return true;
      }
      if (item.name === currentPath.name && item.path === currentPath.path) {
        activeIndex = index;
      }
      if (item.name !== name && item.path != path) {
        return true;
      }
      deleteIndex = index;
      return false;
    });

    /**
     * 判断删除的 记录 在 激活记录的左边还是右边
     */
    if (deleteIndex! > activeIndex) {
      // console.log(`删除右边`);
      setCurrentPointer(deleteIndex! - 1);
    } else {
      // console.log(`删除左边`);
      setCurrentPointer(activeIndex - 1);
    }

    routerHistory.value = newHistory;

    if (currentPath) router.push(currentPath.path);
  };

  watch(router.currentRoute, (newRouter) => {
    pushHistory(newRouter);
  });

  return {
    routerHistory,
    currentRoute,
    currentPointer,
    pushHistory,
    hasRouter,
    findRecord,
    deleteTab,
    setCurrentPointer,
  };
});
