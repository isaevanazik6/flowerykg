<script setup lang="ts">
import type { Bouquet } from "@/types/Bouquet";
import FlowerCard from "@/components/ui/FlowerCard.vue";

defineProps<{
  items: Bouquet[];
}>();

const emit = defineEmits(["add-to-cart", "toggle-favorite", "open"]);
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <FlowerCard
      v-for="item in items"
      :key="item.id"
      :bouquet="item"
      @add-to-cart="emit('add-to-cart', $event)"
      @toggle-favorite="emit('toggle-favorite', $event)"
      @open="emit('open', $event)"
    />
  </div>
</template>
