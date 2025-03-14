<template>
  <button
    @click="close"
    class="absolute top-2 right-2 text-2xl leading-none hover:opacity-40 opacity-60 text-primaryText transition-colors duration-200"
  >
    <font-awesome-icon icon="xmark" />
  </button>
</template>

<script setup>
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faXmark);
</script>

<style lang="scss" scoped></style>
