<template>
  <a-menu
    @menu-item-click="menuItmeClick"
    @sub-menu-click="subMenuClick"
    :collapse="setting.themeSetting.collapsed"
    :theme="setting.themeMode"
    :selectedKeys="selectedKeys"
    accordion
  >
    <base-menu :menus="menus"></base-menu>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import { RouteRecordRaw, useRouter } from "vue-router";
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

    const getRoutes = computed(() => {
      const rootRouters = router.options.routes.find((item) => {
        return item.path === "/";
      });
      if (!rootRouters) {
        return [];
      }
      return rootRouters.children;
    });

    const menus = computed(() => {
      return menuTree(getRoutes.value!);
    });

    const menuItmeClick = (key: string) => {
      router.push(key);
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
