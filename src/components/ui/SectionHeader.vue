<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="text-center">
    <h2 class="mb-3 text-3xl font-bold tracking-tight text-[#3c2a20] md:text-4xl">
      {{ title }}
    </h2>

    <p
      v-if="subtitle"
      class="mx-auto max-w-2xl text-[1rem] leading-7 text-[#6f5646] md:text-[1.05rem]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
