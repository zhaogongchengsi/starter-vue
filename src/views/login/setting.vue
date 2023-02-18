<template>
	<div class="fixed bottom-10 right-10">
		<a-trigger :trigger="['click']" clickToClose position="top" v-model:popupVisible="popupVisible">
			<div
				class="w-15 h-15 shadow-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center cursor-pointer rounded-full">
				<div class="icon i-tabler-settings-off w-8 h-8" v-if="popupVisible" />
				<div class="icon i-tabler-settings w-8 h8" v-else />
			</div>
			<template #content>
				<a-menu :style="{ marginBottom: '-4px' }" mode="popButton" :tooltipProps="{ position: 'left' }"
					showCollapseButton>
					<a-menu-item key="theme">
						<template #icon>
							<div class="cursor-pointer" @click="setting.setMode()">
								<div v-if="setting.themeMode === 'light'" class="i-tabler-moon-stars icon w-5 h-5"></div>
								<div v-if="setting.themeMode === 'dark'" class="i-tabler-sun-high icon w-5 h-5"></div>
							</div>
						</template>
						{{ setting.themeMode }}
					</a-menu-item>
					<a-sub-menu key="locale">
						<template #icon>
							<div class="i-tabler-language icon w-7 h-7" />
						</template>
						<template #title> local </template>
						<a-menu-item v-for="item in options" @click="setLocal(item.value)" :key="item.value">{{
							item.label
						}}</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</template>
		</a-trigger>
	</div>
</template>
<script setup lang='ts'>
import { ref } from "vue";
import { useThemeStore } from "@/store";
import { useLocal } from "@/locale/useLocale";
const { options, setLocal } = useLocal();
const setting = useThemeStore();
const popupVisible = ref(false);
</script>
<style lang='scss'></style>