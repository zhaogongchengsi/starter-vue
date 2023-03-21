<template>
  <div class="app-header-container" :style="{ '--app-header-height': setting.themeSetting.headerHeight + 30 }">
    <a-layout-header :style="{ height: setting.themeSetting.headerHeight + 'px' }"
      :class="['shadow', `header-${setting.themeMode}-bg`]">
      <div class="h-full flex justify-between items-center border-box pl-5 pr-10">
        <div class="left-header">
          <slot name="upper-left-corner"></slot>
        </div>
        <div class="right-header">
          <slot name="upper-right-corner"></slot>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>
<script lang="ts">
export default {
	name: "DfHeader"
}
</script>
<script setup lang="ts">
import { useThemeStore } from "@/store";

const setting = useThemeStore();

</script>
<style lang="scss">
.header-light-bg {
  background-color: var(--color-menu-light-bg);
}

.header-dark-bg {
  background-color: var(--color-menu-dark-bg);
}
</style>
