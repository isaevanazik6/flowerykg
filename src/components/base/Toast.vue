<script setup lang="ts">
import { useToastStore } from "@/stores/toast-store";

const toast = useToastStore();
</script>

<template>
  <transition name="toast-slide">
    <div
      v-if="toast.message"
      class="fixed bottom-6 left-1/2 -translate-x-1/2
             bg-black/90 text-white px-5 py-3 rounded-xl shadow-xl
             text-base font-medium tracking-wide
             max-w-[80%] text-center z-50"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
