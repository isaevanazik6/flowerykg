<script setup lang="ts">
import type { Bouquet } from "@/types/Bouquet";
import FlowerCard from "@/components/ui/FlowerCard.vue";

const props = defineProps<{
  items: Bouquet[];
}>();

const emit = defineEmits(["add-to-cart", "toggle-favorite", "open"]);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
