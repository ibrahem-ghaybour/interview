<template>
  <Transition name="overlay">
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="close"
      >
        <div
          v-if="isOpen"
          :class="[
            `bg-primary ov p-8 rounded-xl relative overflow-y-auto shadow-lg ${
              parentClass ? '' : 'max-w-[90%] max-h-[90vh]'
            }`,
            parentClass,
          ]"
        >
          <CoreCloseButton
            class="rounded-full border w-7 h-7 text-[14px] flex justify-center items-center"
            @click="close"
          ></CoreCloseButton>
          <slot></slot>
        </div></div
    ></Teleport>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  parentClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:isOpen", "close"]);

const close = () => {
  emit("update:isOpen", false);
  emit("close");
};
</script>

<style lang="scss" scoped>
// Background overlay transitions
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
