<template>
  <router-view v-slot="{ Component, route }">
    <transition name="flash" mode="out-in">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.flash-enter-active,
.flash-leave-active {
  transition: opacity 0.3s ease;
}

.flash-enter-from,
.flash-leave-to {
  opacity: 0;
}

.jump-enter-active,
.jump-leave-active {
  transition: 0.2s ease;
}

.jump-enter-from {
  -webkit-transform: translateX(1000);
  transform: translateX(1000);
  opacity: 0;
}

.jump-enter-to {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  opacity: 1;
}

.jump-leave-from {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  opacity: 1;
}

.jump-leave-to {
  -webkit-transform: translateX(-1000px);
  transform: translateX(-1000px);
  opacity: 0;
}
</style>
