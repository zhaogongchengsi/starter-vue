<template>
   <div ref="contaienrRef">
      <slot :width="w" :height="h"></slot>
   </div>
</template>
<script setup lang='ts'>
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { useParentElement } from "@/hooks/useParentElement";
import { onMounted, ref } from 'vue'
const contaienrRef = ref<HTMLDivElement>()

const w = ref<number>(0)
const h = ref<number>(0)

const setSize = (width: number, height: number) => {
   w.value = width
   h.value = height
}

const getSize = (tooltipWrapper) => {
   const width = tooltipWrapper?.clientWidth!;
   const height = tooltipWrapper?.clientHeight!;

   return {
      width,
      height
   }
}

onMounted(() => {
   const tooltipWrapper = useParentElement(contaienrRef)

   const { width, height } = getSize()
   setSize(width, height)

   useResizeObserver(tooltipWrapper, ([entry]) => {
      const { width, height } = entry.contentRect
      setSize(width, height)
   })

})

useEventListener(window, 'resize', () => {
   const { width, height } = getSize()
   setSize(width, height)
})




</script>
<style lang='scss'></style>