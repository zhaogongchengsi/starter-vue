<template>
	<component :is="props.name" />
</template>
<script setup lang='ts'>

interface Props {
	name?: string
}

const props = withDefaults(defineProps<Props>(), {
	name: "icon-right"
})

</script>
<style lang='scss'></style>