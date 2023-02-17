<template>
	<a-layout class="h-screen">
		<LayuotSider :theme="theme.themeMode" :width="theme.themeSetting.asiderWidth"
			:collapsed="theme.themeSetting.collapsed" collapsible breakpoint="lg" @collapse="onCollapse">
			<template #sider-logo>
				<slot name="layout-logo"></slot>
			</template>
			<template #sider-menus>
				<slot name="layout-menus"></slot>
			</template>
		</LayuotSider>
		<a-layout>
			<div class="app-header-container" :style="{ '--app-header-height': theme.themeSetting.headerHeight + 30 }">
				<LayoutHeader>
					<template #upper-left-corner>
						<slot name="header-upper-left-corner"></slot>
					</template>
					<template #upper-right-corner>
						<slot name="header-upper-right-corner"></slot>
					</template>
				</LayoutHeader>
				<slot name="layout-tabs"></slot>
			</div>
			<a-layout class="overflow-auto app-scrollbar app-main-container"
				:style="{ height: `calc(100vh - ${theme.themeSetting.headerHeight || 60}px)` }">
				<a-layout-content class="scrollbar">
					<slot></slot>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
</template>
<script setup lang='ts'>
import LayuotSider from './Sider/index.vue'
import LayoutHeader from './Header/index.vue'
import { useThemeStore } from "@/store";

const theme = useThemeStore();
const onCollapse = (val: boolean) => {
	theme.themeSetting.collapsed = val;
};
</script>
<style lang='scss'></style>