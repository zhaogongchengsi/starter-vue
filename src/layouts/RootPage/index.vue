<template>
  <a-layout class="h-screen">
    <a-layout-sider :theme="theme.themeMode" :width="theme.themeSetting.asiderWidth"
      :collapsed="theme.themeSetting.collapsed" collapsible breakpoint="lg" @collapse="onCollapse">
      <Logo />
      <Menus />
    </a-layout-sider>
    <a-layout>
      <div class="app-header-container" :style="{ '--app-header-height': theme.themeSetting.headerHeight + 30 }">
        <Header />
        <Tabs />
      </div>
      <a-layout class="overflow-auto app-scrollbar app-main-container"
        :style="{ height: `calc(100vh - ${theme.themeSetting.headerHeight || 60}px)` }">
        <a-layout-content class="scrollbar"> <custom-router-view /> </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import Header from "@/layouts/common/Header/index.vue";
import Tabs from "@/layouts/common/Tabs/index.vue";
import Menus from "@/layouts/common/Menus/index.vue";
import Logo from "@/layouts/common/Logo/index.vue";
import CustomRouterView from '@/components/CustomView/index.vue'

import { useThemeStore } from "@/store";

const theme = useThemeStore();
const onCollapse = (val: boolean) => {
  theme.themeSetting.collapsed = val;
};
</script>
<style lang="scss">
.app-main-container {
  background-color: var(--app-main-container-bg-color);
}

.app-header-container {
  height: var(--app-header-height);
}
</style>
