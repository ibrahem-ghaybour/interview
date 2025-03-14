<template>
  <div>
    <div
      class="relative group rounded-sm w-full !bg-sidebar overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9] !border-none"
    >
      <label :for="forId">{{ label }}</label>
      <select
        :id="forId"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="appearance-none relative bg-input !border-none ring-0 outline-none text-sm font-bold rounded-sm block w-full p-2.5"
      >
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCaretDown);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => ["Option 1", "Option 2", "Option 3"],
  },
  forId: String,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style></style>
