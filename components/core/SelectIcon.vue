<template>
  <div
    class="relative group rounded-sm w-full bg-input overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9] !border-none"
  >
    <select
      class="appearance-none relative bg-input !border-none ring-0 outline-none text-sm font-bold rounded-lg block w-full p-2.5"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
  <!-- <div class="relative w-full">
    <button
      @click="open = !open"
      class="w-full bg-input p-3 rounded-sm flex justify-between items-center"
    >
      {{ selectedOption || "Select an option" }}
      <span>
        <font-awesome-icon :icon="'caret-down'" />
      </span>
    </button>

    <div
      v-if="open"
      class="absolute w-full bg-[#2B2D31] rounded-md shadow-md mt-2 z-10"
    >
      <div
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        class="p-3 hover:bg-primary cursor-pointer text-white"
      >
        {{ option }}
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCaretDown);

const open = ref(false);
const selectedOption = ref("");
const options = ["Option 1", "Option 2", "Option 3"];
const emit = defineEmits(["select"]);
const selectOption = (option) => {
  selectedOption.value = option;
  emit("select", option);
  open.value = false;
};
</script>

<style></style>
