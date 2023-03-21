<template>
	<div class="cursor-pointer" @click="setsider">
		<div :class="[
			setting.themeSetting.collapsed
				? 'i-tabler-arrows-right'
				: 'i-tabler-arrows-left',
			'icon',
			'w-8 h-8',
		]" />
	</div>
</template>
<script lang="ts">
export default {
	name: "Collapsed"
}
</script>
<script setup lang='ts'>
import { useThemeStore } from "@/store";
const setting = useThemeStore();
const setsider = () => {
	setting.themeSetting.collapsed = !setting.themeSetting.collapsed;
};

</script>
<style lang='scss'></style>