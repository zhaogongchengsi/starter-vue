<template>
	<div class="p-3 h-full">
		<FullScroll v-slot="{ height }">
			<a-table :loading="isLoading" :columns="columns" :data="data" :scroll="{ y: height }" />
		</FullScroll>
	</div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import FullScroll from '@/components/FullScroll/index.vue'
import { authoritiesTree, getAuthorities } from '@/api/authorities'
import { Authority } from '@/types/user';

const columns = [{
	title: 'ID',
	dataIndex: 'id',
},
{
	title: '角色名',
	dataIndex: 'authorityName',
},
{
	title: '创建时间',
	dataIndex: 'createAt',
}]

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

</script>
<style lang='scss'></style>