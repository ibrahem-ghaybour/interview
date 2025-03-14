<template>
  <Transition name="overlay">
    <div
      v-show="isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <Transition name="popup">
        <div
          v-if="isOpen"
          :class="[
            `bg-primary ov p-8 rounded-xl relative overflow-y-auto shadow-lg ${
              parentClass ? '' : 'max-w-[90%] max-h-[90vh]'
            }`,
            parentClass,
          ]"
        >
          <!-- <button
            @click="close"
            class="absolute top-2 right-2 text-2xl leading-none hover:opacity-40 opacity-60 text-primaryText transition-colors duration-200"
          >
            <font-awesome-icon icon="circle-xmark" />
          </button> -->
          <CoreCloseButton
            class="rounded-full border w-7 h-7 text-[14px] flex justify-center items-center"
            @click="close"
          ></CoreCloseButton>
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
// <i class="fa-regular fa-circle-xmark"></i>
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCircleXmark);
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

// Popup content transitions
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(2);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
