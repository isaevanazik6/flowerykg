<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import { useBouquetsStore } from "@/stores/bouquets-store";
import { useCartStore } from "@/stores/cart-store";
import { useFavoritesStore } from "@/stores/favorites-store";

const route = useRoute();
const bouquetsStore = useBouquetsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const id = computed(() => Number(route.params.id));

onMounted(() => {
  bouquetsStore.load();
});

const bouquet = computed(() =>
  bouquetsStore.list.find(b => b.id === id.value) ?? null
);

const isFav = computed(() =>
  bouquet.value ? favoritesStore.isFavorite(bouquet.value.id) : false
);
</script>

<template>
  <div class="container mx-auto px-4 py-10">

    <div v-if="bouquetsStore.isLoading" class="text-center py-10 text-gray-500">
      Загрузка...
    </div>

    <div v-else-if="!bouquet" class="text-center py-10 text-gray-600 text-xl">
      Букет не найден
    </div>

    <div v-else class="grid md:grid-cols-2 gap-12">

      <div>
        <img
          :src="bouquet.image"
          :alt="bouquet.name"
          class="w-full rounded-xl shadow-md"
        />

        <div
          v-if="bouquet.gallery?.length"
          class="flex gap-4 mt-6"
        >
          <img
            v-for="img in bouquet.gallery"
            :key="img"
            :src="img"
            class="w-24 h-24 object-cover rounded-lg shadow hover:ring-2 hover:ring-pink-400 transition cursor-pointer"
          />
        </div>
      </div>

      <div class="space-y-6 max-w-lg">

        <h1 class="text-4xl font-semibold text-gray-800">
          {{ bouquet.name }}
        </h1>

        <p class="text-gray-600 leading-relaxed text-lg">
          {{ bouquet.description }}
        </p>

        <div class="text-3xl font-bold text-gray-900">
          {{ bouquet.price }} с.
        </div>

        <div class="flex gap-4">
          <button
            @click="cartStore.add(bouquet.id)"
            class="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition text-lg"
          >
            Добавить в корзину
          </button>

          <button
            @click="favoritesStore.toggle(bouquet.id)"
            class="px-6 py-3 border rounded-lg text-lg hover:bg-gray-100 transition flex items-center gap-2"
          >
            <span v-if="isFav">♥</span>
            <span v-else>♡</span>
            Избранное
          </button>
        </div>

        <div v-if="bouquet.tags?.length" class="flex gap-2 mt-4 flex-wrap">
          <span
            v-for="tag in bouquet.tags"
            :key="tag"
            class="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
          >
            {{ tag }}
          </span>
        </div>

      </div>
    </div>
  </div>
</template>
