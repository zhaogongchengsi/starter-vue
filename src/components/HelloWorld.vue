<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);

const click = async () => {
  count.value = ++count.value;
};
</script>

<template>
  <div
    class="flex w-full h-full items-center justify-center flex-col dark:bg-#232324"
  >
    <h1 class="text-30 text-gray-800 dark:text-white font-semibold">
      {{ msg }}
    </h1>

    <img src="/vite.svg" class="w-50 my-10" alt="" />

    <div class="flex flex-col justify-center items-center my-10">
      <button
        type="button"
        class="px-5 py-3 text-5 border border-rd-2 border-green-600 text-green-600 hover:border-indigo-800 hover:text-indigo-800"
        @click="click"
      >
        count is {{ count }}
      </button>
      <p class="mt-10 text-blue-700">
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
  </div>
</template>
