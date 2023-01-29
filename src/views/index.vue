<template>
  <HelloWorld :msg="$('hello')" />
</template>
<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { useLocal } from "@/locale/useLocale";
const { $ } = useLocal();
</script>
<style lang="scss"></style>
