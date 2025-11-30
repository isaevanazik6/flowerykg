<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

import FlowerGrid from "@/components/ui/FlowerGrid.vue";
import { useBouquetsStore } from "@/stores/bouquets-store";
import { useCategoriesStore } from "@/stores/categories-store";

const bouquets = useBouquetsStore();
const categories = useCategoriesStore();

const activeCategory = ref<number | null>(null);

onMounted(() => {
  bouquets.load();
  categories.load();
});

const filtered = computed(() => {
  if (!activeCategory.value) return bouquets.list;
  return bouquets.list.filter(
    (b) => b.categoryId === activeCategory.value
  );
});
</script>

<template>
  <div class="p-6">
    <h1>Каталог букетов</h1>

    <div class="flex gap-3 mt-4 mb-6">
      <button
        @click="activeCategory = null"
        :style="{
          padding: '8px 12px',
          border: '1px solid #ccc',
          background: activeCategory === null ? '#eee' : 'white',
        }"
      >
        Все
      </button>

      <button
        v-for="cat in categories.list"
        :key="cat.id"
        @click="activeCategory = cat.id"
        :style="{
          padding: '8px 12px',
          border: '1px solid #ccc',
          background: activeCategory === cat.id ? '#eee' : 'white',
        }"
      >
        {{ cat.name }}
      </button>
    </div>

    <div v-if="bouquets.isLoading">Загрузка...</div>
    <div v-else-if="bouquets.error">{{ bouquets.error }}</div>

    <FlowerGrid
      v-else
      :items="filtered"
      @open="(id) => console.log('open details:', id)"
    />
  </div>
</template>
