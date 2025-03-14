<template>
  <div class="w-full">
    <label class="block w-full mb-1 font-semibold !text-[0.7rem]" :for="forId">
      {{ label }}
    </label>
    <input
      class="bg-input w-full"
      :id="forId"
      :type="typeInput"
      :maxlength="`${typeInput === 'text' ? '30' : '124'}`"
      minlength="3"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  typeInput: {
    type: String,
    default: "text",
  },
  forId: String,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>
