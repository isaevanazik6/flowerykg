<script setup lang="ts">
defineProps<{
  padding?: boolean;
}>();
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
    :class="padding ? 'p-4' : ''"
  >
    <slot />
  </div>
</template>
