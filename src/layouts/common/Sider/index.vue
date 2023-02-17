<template>
	<a-layout-sider :theme="theme.themeMode" :width="theme.themeSetting.asiderWidth"
		:collapsed="theme.themeSetting.collapsed" collapsible breakpoint="lg" @collapse="onCollapse">
		<slot></slot>
	</a-layout-sider>
</template>
<script setup lang='ts'>
import { useThemeStore } from "@/store";
const theme = useThemeStore();
const onCollapse = (val: boolean) => {
	theme.themeSetting.collapsed = val;
};
</script>
<style lang='scss'></style>