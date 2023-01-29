<template>
  <div class="p-3 flex items-center justify-center flex-col">
    <div
      :class="[
        'w-50 h-50 m-15 flex items-center justify-center rounded border dark:border-gray-100 border-gray-900 border-dashed cursor-pointer',
        { 'border-red-900 border-double bg-gray-300': isOverDropZone },
      ]"
      ref="dropZoneRef"
    >
      <span>拖拽上传</span>
      <span>{{ index }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { fileSplit } from "@/utils/file";
import { ref } from "vue";
import { useDropZone } from "@vueuse/core";

const dropZoneRef = ref();
const index = ref(0);

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

async function onDrop(files: File[] | null) {
  if (!files) {
    return;
  }
  const [file] = files;

  const filearr = await fileSplit(file, {
    quantity: 3,
    onChanged(indx) {
      index.value = indx;
    },
  });

  console.log(filearr);
}
</script>
<style lang="scss"></style>
