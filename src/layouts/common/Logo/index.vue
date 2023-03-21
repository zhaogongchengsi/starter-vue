<template>
  <div
    class="w-full h-15 flex items-center px-8px"
    :style="{ height: theme.themeSetting.headerHeight + 'px' }"
  >
    <img class="border-rd w-10 h-10 mr-5" src="/vite.svg" alt="logo" />
    <h5 class="text-2xl dark:text-white">Anya</h5>
  </div>
</template>
<script lang="ts">
export default {
	name: "Logo"
}
</script>
<script setup lang="ts">
import { useThemeStore } from "@/store";
const theme = useThemeStore();
</script>
<style lang="scss"></style>
