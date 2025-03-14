<template>
  <div>
    <NuxtLayout>
      <Transition name="fade" mode="out-in">
        <div>
          <NuxtPage />
        </div>
      </Transition>
    </NuxtLayout>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
