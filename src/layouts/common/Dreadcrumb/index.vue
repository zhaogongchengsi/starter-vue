<template>
	<div class="py-1">
		<a-breadcrumb>
			<a-breadcrumb-item v-for="item in matched" :key="item.path">
				<DreaIcon class="mr-3" :name="item.meta.icon" />
				<span>{{ translate(item.meta.title) }}</span>
			</a-breadcrumb-item>
		</a-breadcrumb>
	</div>
</template>
<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { AppRouteLocationMatched } from '#/user'
import { watch, ref } from 'vue'
import DreaIcon from './DreaIcon.vue'
import { useLocal } from "@/locale/useLocale";

defineOptions({
	name: 'Dreadcrumd',
})

const { translate } = useLocal();
const router = useRoute()
const matched = ref<AppRouteLocationMatched[]>(router.matched as unknown as AppRouteLocationMatched[])

watch(() => router.matched, (newValue) => {
	matched.value = newValue as unknown as AppRouteLocationMatched[]
})

</script>
<style lang='scss'></style>