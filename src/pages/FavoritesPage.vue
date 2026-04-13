<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ROUTE_PATHS } from "@/router/paths.ts";

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
  <section class="relative overflow-hidden bg-[#fffaf4]">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#f5dfcb] blur-3xl opacity-60"
      />
      <div
        class="absolute top-44 -right-20 h-80 w-80 rounded-full bg-[#ead2bd] blur-3xl opacity-45"
      />
      <div
        class="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-[#f3e7d8] blur-3xl opacity-50"
      />
    </div>

    <div class="relative mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div
        class="mx-auto mb-8 max-w-4xl rounded-[2rem] border border-[#eadaca] bg-white/75 px-7 py-8 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:px-10 md:py-10"
      >

        <h1 class="mb-4 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
          Ваши избранные букеты
        </h1>

      </div>

      <div v-if="bouquetsStore.isLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="n in 6"
          :key="n"
          class="h-[25rem] animate-pulse rounded-[1.8rem] border border-[#eadaca] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
      </div>

      <div
        v-else-if="favoriteBouquets.length === 0"
        class="mx-auto max-w-3xl rounded-[2rem] border border-[#eadaca] bg-white/72 px-8 py-12 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm"
      >
        <div
          class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e6] text-3xl"
        >
          ♡
        </div>

        <h2 class="mb-3 text-3xl font-semibold tracking-tight text-[#3c2a20]">
          Пока пусто
        </h2>

        <p class="mx-auto mb-6 max-w-xl text-[1rem] leading-7 text-[#6f5646]">
          У Вас пока нет избранных букетов. Добавьте понравившиеся композиции, чтобы
          быстро вернуться к ним позже.
        </p>

        <router-link
          :to="ROUTE_PATHS.CATALOG"
          class="inline-flex items-center rounded-full bg-[#c89a7b] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#b28567]"
        >
          Перейти в каталог
        </router-link>
      </div>

      <div
        v-else
        class="rounded-[2rem] border border-[#eadaca] bg-white/72 p-5 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm"
      >
        <FlowerGrid
          :items="favoriteBouquets"
          @add-to-cart="(id) => console.log('add', id)"
          @toggle-favorite="(id) => favoritesStore.toggle(id)"
          @open="(id) => console.log('open', id)"
        />
      </div>
    </div>
  </section>
</template>
