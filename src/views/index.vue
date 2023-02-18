<template>
  <HelloWorld :msg="translate('hello')" />
</template>
<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { useLocal } from "@/locale/useLocale";
const { translate } = useLocal();
</script>
<style lang="scss"></style>
