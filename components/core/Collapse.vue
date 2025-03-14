<template>
  <div>
    <div
      class="p-2 w-full relative bg-sidebar flex items-end font-bold h-[50px] overflow-hidden"
    >
      <slot name="header"></slot>
      <CoreCloseButton
        @click="emit('close')"
        class="absolute end-2 top-1 text-base"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);
</script>

<style lang="scss" scoped></style>
