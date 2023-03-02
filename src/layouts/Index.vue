<template>
	<component :is="LayoutName">
		<template #layout-logo>
			<Logo />
		</template>
		<template #layout-menus>
			<Menus />
		</template>
		<template #header-upper-left-corner>
			<CollapseButton />
		</template>
		<template #header-upper-right-corner>
			<RightCorner />
		</template>
		<template #layout-tabs>
			<Tabs />
		</template>
		<CustomView />
	</component>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
// 布局组件
import DefaultLayout from "./Default/index.vue"
// ------------------自定义组件------------------
import CustomView from "@/components/CustomView/index.vue"
import Menus from "@/layouts/common/Menus/index.vue";
import Logo from "@/layouts/common/Logo/index.vue";
import Tabs from "@/layouts/common/Tabs/index.vue";
import CollapseButton from '@/layouts/common/Collapsed/index.vue'
import RightCorner from '@/layouts/common/RightCorner/index.vue'

export default defineComponent({
	components: {
		DefaultLayout,
		CustomView,
		Menus,
		Logo,
		Tabs,
		CollapseButton,
		RightCorner
	},
	props: {
		LayoutName: {
			type: String,
			default: 'DefaultLayout'
		}
	},
	name: "LayoutContianer"
})

</script>
<style lang='scss'>
.app-main-container {
	background-color: var(--app-main-container-bg-color);
}

.app-header-container {
	height: var(--app-header-height);
}
</style>