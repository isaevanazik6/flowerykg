<script setup lang="ts">
defineProps<{
  size?: "sm" | "md" | "lg";
}>();
</script>

<template>
  <h2
    :class="{
      'text-xl font-semibold mb-4': size === 'sm',
      'text-2xl font-bold mb-6': size === 'md' || !size,
      'text-3xl font-bold mb-8': size === 'lg'
    }"
  >
    <slot />
  </h2>
</template>
