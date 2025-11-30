<script setup lang="ts">
import { computed, onMounted } from "vue";

import FlowerGrid from "@/components/ui/FlowerGrid.vue";

import { useBouquetsStore } from "@/stores/bouquets-store";
import { useFavoritesStore } from "@/stores/favorites-store";

const bouquetsStore = useBouquetsStore();
const favoritesStore = useFavoritesStore();

onMounted(() => {
  bouquetsStore.load();
});

const favoriteBouquets = computed(() =>
  bouquetsStore.list.filter(b => favoritesStore.ids.includes(b.id))
);
</script>

<template>
  <div style="padding: 40px">
    <h1 style="font-size: 28px; margin-bottom: 20px">Ваши избранные букеты</h1>

    <div v-if="bouquetsStore.isLoading">Загрузка...</div>

    <div v-else-if="favoriteBouquets.length === 0">
      <p>У Вас пока нет избранных букетов.</p>
    </div>

    <FlowerGrid
      v-else
      :items="favoriteBouquets"
      @add-to-cart="(id) => console.log('add', id)"
      @toggle-favorite="(id) => favoritesStore.toggle(id)"
      @open="(id) => console.log('open', id)"
    />
  </div>
</template>
