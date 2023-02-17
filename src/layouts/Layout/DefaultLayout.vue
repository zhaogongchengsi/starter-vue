<template>
	<a-layout class="h-screen">
		<LayuotSider>
			<slot name="layout-sider"></slot>
		</LayuotSider>
		<a-layout>
			<div class="app-header-container">
				<LayoutHeader>
					<template #upper-left-corner>
						<slot name="header-upper-left-corner"></slot>
					</template>
					<template #upper-right-corner>
						<slot name="header-upper-right-corner"></slot>
					</template>
				</LayoutHeader>
				<slot name="layout-header"></slot>
			</div>
			<a-layout class="overflow-auto app-scrollbar app-main-container" :style="{ height: `calc(100vh - 60px)` }">
				<a-layout-content class="scrollbar">
					<slot></slot>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
</template>
<script setup lang='ts'>
import LayuotSider from '@/layouts/common/Sider/index.vue'
import LayoutHeader from '@/layouts/common/Header/index.vue'

</script>
<style lang='scss'></style>