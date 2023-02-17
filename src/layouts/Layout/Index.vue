<template>
	<component :is="LayoutName">
		<template #header-upper-left-corner>
			<CollapseButton />
		</template>
		<template #header-upper-right-corner>
			<RightCorner />
		</template>
		<template #layout-header>
			<Tabs />
		</template>
		<template #layout-sider>
			<Logo />
			<Menus />
		</template>
		<CustomView />
	</component>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import DefaultLayout from "./DefaultLayout.vue"
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
	setup() {

	}
})


</script>
<style lang='scss'></style>