<script setup lang="ts">
const props = defineProps<{
  items: { title: string; text: string }[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div
      v-for="(i, idx) in items"
      :key="idx"
      class="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <h3 class="text-xl font-semibold mb-2">{{ i.title }}</h3>
      <p class="text-gray-600">{{ i.text }}</p>
    </div>
  </div>
</template>
