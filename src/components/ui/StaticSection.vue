<script setup lang="ts">
defineProps<{
  title?: string;
  text?: string;
  image?: string;
}>();
</script>

<template>
  <section class="mb-12 text-center">
    <p
      v-if="text"
      class="text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed text-lg"
    >
      {{ text }}
    </p>

    <div v-if="image" class="flex justify-center">
      <img
        :src="image"
        alt="section image"
        class="rounded-xl shadow-md max-w-xl w-full transition-transform duration-500 hover:scale-105"
      />
    </div>

  </section>
</template>
