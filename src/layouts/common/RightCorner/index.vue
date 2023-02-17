<template>
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
</template>
<script setup lang='ts'>
import { useThemeStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import Mode from "@/layouts/Mode.vue";
import { computed } from "vue";
import { UserInfo } from "@/types/user";
import { useLocal } from "@/locale/useLocale";

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

</script>
<style lang='scss'>
.header-light-bg {
	background-color: var(--color-menu-light-bg);
}
</style>