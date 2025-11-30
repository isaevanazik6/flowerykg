<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}>();

const variantClass = computed(() => {
  switch (props.variant) {
    case "outline":
      return "border border-black text-black bg-transparent hover:bg-black hover:text-white";
    case "ghost":
      return "bg-transparent text-black hover:bg-gray-100";
    default:
      return "bg-black text-white hover:bg-gray-800";
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-4 py-2";
  }
});
</script>

<template>
  <button
    :disabled="disabled || loading"
    class="transition-all duration-200 rounded-md font-medium
         hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
    :class="[
    variantClass,
    sizeClass,
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ]"
  >
    <span v-if="!loading">
      <slot />
    </span>
    <span v-else>
      Загрузка...
    </span>
  </button>
</template>

<style scoped>
</style>
