<template>
  <div class="cursor-pointer" @click="setting.setMode()">
    <div v-if="setting.themeMode === 'light'" class="i-tabler-moon-stars icon w-8 h-8"></div>
    <div v-if="setting.themeMode === 'dark'" class="i-tabler-sun-high icon w-8 h-8"></div>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store";
const setting = useThemeStore();
</script>
