<template>
  <a-layout-header :style="{ height: setting.themeSetting.headerHeight + 'px' }"
    :class="['shadow', `header-${setting.themeMode}-bg`]">
    <div class="h-full flex justify-between items-center border-box pl-5 pr-10">
      <div class="cursor-pointer" @click="setsider">
        <div :class="[
          setting.themeSetting.collapsed
            ? 'i-tabler-arrows-right'
            : 'i-tabler-arrows-left',
          'icon',
          'w-8 h-8',
        ]" />
      </div>
      <div class="right-header">
        <a-space size="large">
          <a-dropdown @select="handleSelect">
            <a-button type="text" shape="round">
              {{ language?.label }}
            </a-button>
            <template #content>
              <a-doption v-for="item of options" :value="item.value">{{
                item.label
              }}</a-doption>
            </template>
          </a-dropdown>
          <Mode />
          <a-dropdown trigger="hover">
            <div class="w-20 flex justify-center">
              <a-avatar>
                <img :src="userInfo?.avatar" alt="avatar" />
              </a-avatar>
            </div>
            <template #content>
              <a-doption>
                <template #icon>
                  <div class="icon i-tabler-settings w-5 h-5" />
                </template>
                {{ $("header.right.setting") }}
              </a-doption>
              <a-doption @click="outLogin">
                <template #icon>
                  <div class="icon i-tabler-logout w-5 h-5" />
                </template>
                {{ $("header.right.logout") }}
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </div>
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import { useThemeStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import Mode from "@/layouts/Mode.vue";
import { computed } from "vue";
import { UserInfo } from "@/types/user";
import { useLocal } from "@/locale/useLocale";

const setting = useThemeStore();
const user = useUserStore();
const router = useRouter();
const { options, language, setLocal, $ } = useLocal();

const handleSelect = (v: any) => {
  setLocal(v);
};

const userInfo = computed(() => {
  if (user.logined) {
    return user.user as UserInfo;
  }
});

const outLogin = () => {
  user.LoginOut();
  router.push("/login");
};

const setsider = () => {
  setting.themeSetting.collapsed = !setting.themeSetting.collapsed;
};
</script>
<style lang="scss">
.header-light-bg {
  background-color: var(--color-menu-light-bg);
}

.header-dark-bg {
  background-color: var(--color-menu-dark-bg);
}
</style>
