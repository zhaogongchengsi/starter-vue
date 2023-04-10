<template>
  <a-menu @menu-item-click="menuItmeClick" @sub-menu-click="subMenuClick" :collapse="setting.themeSetting.collapsed"
    :theme="setting.themeMode" :selectedKeys="selectedKeys" accordion>
    <base-menu :menus="menus"></base-menu>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import { RouteRecordNormalized, RouteRecordRaw, useRouter } from "vue-router";
import { MenuInfo, RouterMeTa } from "@/types/user";
import BaseMenu from "./BaseMenu.vue";
import { useThemeStore } from "@/store";

export default defineComponent({
  name: "Menu",
  components: { IconCalendar, BaseMenu },
  setup() {
    const router = useRouter();
    const setting = useThemeStore();

    const selectedKeys = ref<string[]>([]);

    // 路由变化 切换高亮
    watch(router.currentRoute, (newRouter) => {
      selectedKeys.value = [newRouter.path];
    });

    const menuTree = (routers: readonly RouteRecordRaw[]): MenuInfo[] => {
      const cloneRouters = routers?.map((router): MenuInfo | null => {
        const { path, name, meta, children } = router;
        if (!meta?.isMenu) {
          return null;
        }
        const { icon, title } = meta as unknown as RouterMeTa;
        return {
          icon,
          title,
          path,
          name: name as string,
          children: children ? menuTree(children) : [],
        };
      });

      return cloneRouters?.filter(Boolean) as MenuInfo[];
    };

    function filterSubRoute(rs: RouteRecordNormalized[]) {
      return rs
        .map(r => {
          const paths = r.path.split("/").filter(Boolean)
          if (paths.length <= 1) {
            return r
          }
          // 若 路由 为 a/b 直接的路径 则判断 pid 是否为 0 不为0 则代表有父菜单 则代表为 子菜单 
          if (r.meta.pid === 0) {
            return r
          }
        }).filter(Boolean)
        .sort((a, b) => {
          // 排序
          const { sort: s1 } = a?.meta || { sort: 2 }
          const { sort: s2 } = b?.meta || { sort: 1 }
          return Number(s1) - Number(s2)
        })
    }

    const menus = computed(() => {
      const r = router.getRoutes()
      return menuTree(filterSubRoute(r) as readonly RouteRecordRaw[]);
    });

    const menuItmeClick = (key: string) => {
      router.push(key)
    };

    const subMenuClick = (key: string) => {
      // console.log(key);
    };

    return {
      menus,
      menuItmeClick,
      subMenuClick,
      setting,
      selectedKeys,
    };
  },
});
</script>
