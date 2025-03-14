<template>
  <div class="flex flex-col gap-4 items-center">
    <input type="file" @change="onFileChange" />
    <div v-if="imageSrc" class="w-[300px] h-[300px] border">
      <img :src="imageSrc" class="w-full h-full object-contain" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageSrc = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
