<script setup lang="ts">
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps<{
  title: string;
  subtitle: string;
  buttonText: string;
}>();
</script>

<template>
  <div class="text-center py-20 bg-[#faf7f4] rounded-xl">
    <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
    <p class="text-lg text-gray-700 mb-6">{{ subtitle }}</p>
    <BaseButton size="lg">
      {{ buttonText }}
    </BaseButton>
  </div>
</template>
