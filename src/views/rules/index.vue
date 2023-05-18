<template>
	<div class="p-3 h-full">
		<FullScroll v-slot="{ height }">
			<a-table :loading="isLoading" :data="data" :scroll="{ y: height }">
				<template #columns>
					<a-table-column title="ID" data-index="id"></a-table-column>
					<a-table-column title="角色名" data-index="authorityName"></a-table-column>
					<a-table-column title="创建时间" data-index="createAt">
						<template #cell="{ record }">
							{{ fromat(record.createAt) }}
						</template>
					</a-table-column>

				</template>
			</a-table>
		</FullScroll>
	</div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import FullScroll from '@/components/FullScroll/index.vue'
import { authoritiesTree, getAuthorities } from '@/api/authorities'
import { Authority } from '@/types/user';
import day from '@/utils/day'

const isLoading = ref(false)
const data = ref<Authority[]>([]);

const getData = async () => {
	isLoading.value = true
	const as = await getAuthorities()
	const tree = authoritiesTree(as.data)
	data.value = tree
	isLoading.value = false
}

onMounted(() => {
	getData()
})

const fromat = (time: string) => {
	return day(time).format("DD-MM-YYYY")
}

</script>
<style lang='scss'></style>