<template>
	<a-space size="large">
		<a-dropdown @select="handleSelect">
			<a-button type="text" shape="round">
				{{ language?.label }}
			</a-button>
			<template #content>
				<a-doption v-for="item of options" :value="item.value">{{ item.label }}</a-doption>
			</template>
		</a-dropdown>
		<Mode />
		<a-dropdown trigger="hover">
			<div class="w-20 flex justify-center">
				<a-avatar>
					<img :src="userInfo?.avatarUrl || '/avatar.jpg'" alt="avatar" />
				</a-avatar>
			</div>
			<template #content>
				<a-doption @click="visible = true">
					<template #icon>
						<div class="icon i-tabler-settings w-5 h-5" />
					</template>
					{{ translate("header.right.setting") }}
				</a-doption>
				<a-doption @click="outLogin">
					<template #icon>
						<div class="icon i-tabler-logout w-5 h-5" />
					</template>
					{{ translate("header.right.logout") }}
				</a-doption>
			</template>
		</a-dropdown>
	</a-space>
	<a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
		<template #title>
			Title
		</template>
		<div>You can customize modal body text by the current situation. This modal will be closed immediately once you
			press the OK button.</div>
	</a-modal>
</template>
<script setup lang='ts'>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import Mode from "@/layouts/Mode.vue";
import { computed } from "vue";
import { User } from "@/types/user";
import { useLocal } from "@/locale/useLocale";
import { ref } from "vue";
const user = useUserStore();
const router = useRouter();
const { options, language, setLocal, translate } = useLocal();

const visible = ref(false);

const handleSelect = (v: any) => {
	setLocal(v);
};

const userInfo = computed(() => {
	if (user.logined()) {
		return user.user as User;
	}
});

const outLogin = () => {
	user.LoginOut();
	router.push("/login");
};

const handleClick = () => {
	visible.value = true;
};
const handleOk = () => {
	visible.value = false;
};
const handleCancel = () => {
	visible.value = false;
}

</script>
<style lang='scss'>
.header-light-bg {
	background-color: var(--color-menu-light-bg);
}
</style>