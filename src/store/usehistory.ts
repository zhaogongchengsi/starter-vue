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

    if (deleteIndex! > activeIndex) {
      // 删除的记录在当前激活的记录的右边(后面) 删除后数组长度会减一 激活的记录索引不变
      // setCurrentPointer(deleteIndex! - 1);
    } else {
      // 删除的记录在当前激活的记录的左边(前面) 删除后数组长度会减一 激活的记录索引也应该减一 保持激活的记录不变
      // 当记录还剩两条时 删除第一条 第二条会自动变为激活的路由
      if (newHistory.length === 1) {
        setCurrentPointer(0);
      } else {
        setCurrentPointer(activeIndex - 1);
      }
    }

    routerHistory.value = newHistory;

    const activePath = unref(currentRoute);
    activePath && router.push(activePath.path);
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
