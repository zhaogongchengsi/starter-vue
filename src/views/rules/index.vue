<template>
	<div class="p-3 h-full">
		<FullScroll v-slot="{ width, height }">
			<a-table :columns="columns" :data="data" :scroll="{ y: height }" />
		</FullScroll>
	</div>
</template>
<script setup lang='ts'>
import { reactive } from 'vue';
import FullScroll from '@/components/FullScroll/index.vue'

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Salary',
		dataIndex: 'salary',
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
];

const data = reactive([]);


</script>
<style lang='scss'></style>