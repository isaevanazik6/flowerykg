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
    <h1 class="text-4xl font-bold text-center mb-6">
      Каталог букетов
    </h1>

    <div class="flex gap-3 mt-4 mb-6 justify-center">
      <button
        @click="activeCategory = null"
        class="px-3 py-2 border rounded-lg transition-all duration-200
           hover:shadow-md"
        :class="activeCategory === null ? 'bg-gray-200' : 'bg-white'"
      >
        Все
      </button>

      <button
        v-for="cat in categories.list"
        :key="cat.id"
        @click="activeCategory = cat.id"
        class="px-3 py-2 border rounded-lg transition-all duration-200
           hover:shadow-md"
        :class="activeCategory === cat.id ? 'bg-gray-200' : 'bg-white'"
      >
        {{ cat.name }}
      </button>
    </div>

    <div v-if="bouquets.isLoading">Загрузка...</div>
    <div v-else-if="bouquets.error">{{ bouquets.error }}</div>

    <transition name="fade" mode="out-in">
      <FlowerGrid
        v-if="!bouquets.isLoading"
        :items="filtered"
        @open="(id) => console.log('open details:', id)"
        :key="activeCategory ?? 'all'"
      />
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
