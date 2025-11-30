<script setup lang="ts">
defineProps<{
  title?: string;
  text?: string;
  image?: string;
}>();
</script>

<template>
  <div style="margin-bottom: 40px">
    <h2 v-if="title" style="font-size: 24px; margin-bottom: 10px">
      {{ title }}
    </h2>

    <p v-if="text" style="margin-bottom: 20px; max-width: 600px; line-height: 1.6">
      {{ text }}
    </p>

    <img
      v-if="image"
      :src="image"
      alt="section image"
      style="max-width: 100%; border-radius: 12px"
    />
  </div>
</template>
