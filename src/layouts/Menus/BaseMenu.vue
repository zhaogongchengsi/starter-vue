<template>
  <template v-for="menu of menuTree" :key="menu.name">
    <template v-if="menu.children && menu.children.length > 0">
      <a-sub-menu :key="menu.path">
        <template #icon v-if="menu.icon">
          <component :is="menu.icon" />
        </template>
        <template #title>{{ menu.title }}</template>
        <base-menu :menus="menu.children" :parent-path="pathMerge(menu.path)" />
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="pathMerge(menu.path)">
        <template #icon v-if="menu.icon">
          <component :is="menu.icon" />
        </template>
        {{ menu.title }}
      </a-menu-item>
    </template>
  </template>
</template>
<script lang="ts">
import { MenuInfo } from "@/types/user";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "BaseMenu",
  props: {
    menus: {
      type: Array,
      default: [],
    },
    parentPath: {
      type: String,
      defaule: "/",
    },
  },
  setup(props) {
    const menuTree = computed(() => props.menus) as unknown as MenuInfo[];

    const pathMerge = (path: string) => {
      const newPath = [props.parentPath, path].join("/");
      return newPath;
    };

    return {
      menuTree: menuTree,
      pathMerge,
    };
  },
});
</script>
<style lang=""></style>
