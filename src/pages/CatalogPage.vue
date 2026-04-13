<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

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

const activeCategoryName = computed(() => {
  if (activeCategory.value === null) return "Все букеты";
  return categories.list.find(c => c.id === activeCategory.value)?.name ?? "Категория";
});
</script>

<template>
  <section class="relative overflow-hidden bg-[#fffaf4]">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#f5dfcb] blur-3xl opacity-60"
      />
      <div
        class="absolute top-52 -right-20 h-80 w-80 rounded-full bg-[#ead2bd] blur-3xl opacity-45"
      />
      <div
        class="absolute bottom-12 left-1/3 h-64 w-64 rounded-full bg-[#f3e7d8] blur-3xl opacity-50"
      />
    </div>

    <div class="relative mx-auto w-full max-w-[110rem] px-5 py-10 md:px-8 md:py-14">
      <div
        class="mx-auto mb-8 max-w-4xl rounded-[2rem] border border-[#eadaca] bg-white/75 px-7 py-8 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:px-10 md:py-10"
      >
        <p
          class="mb-3 inline-flex rounded-full border border-[#e7d5c4] bg-[#fff7ee] px-4 py-1 text-sm font-medium tracking-wide text-[#9b6f4f]"
        >
          FLOWERY KG
        </p>

        <h1 class="mb-4 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
          Каталог букетов
        </h1>

        <p class="mx-auto max-w-2xl text-base leading-7 text-[#6f5646] md:text-lg">
          Выберите композицию для особенного повода, тёплого жеста или просто красивого настроения.
        </p>
      </div>

      <div
        class="mb-8 rounded-[1.75rem] border border-[#eadaca] bg-white/72 p-5 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)] backdrop-blur-sm"
      >
        <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight text-[#3c2a20]">
              {{ activeCategoryName }}
            </h2>
            <p class="text-sm leading-6 text-[#6f5646]">
              Найдено букетов: {{ filtered.length }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            @click="activeCategory = null"
            class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
            :class="activeCategory === null
              ? 'bg-[#c89a7b] text-white shadow-sm'
              : 'border border-[#dcc8b7] bg-[#fff8f0] text-[#6a5244] hover:bg-[#f8eee4]'"
          >
            Все
          </button>

          <button
            v-for="cat in categories.list"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
            :class="activeCategory === cat.id
              ? 'bg-[#c89a7b] text-white shadow-sm'
              : 'border border-[#dcc8b7] bg-[#fff8f0] text-[#6a5244] hover:bg-[#f8eee4]'"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <div
        v-if="bouquets.isLoading"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="h-[25rem] animate-pulse rounded-[1.8rem] border border-[#eadaca] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
      </div>

      <div
        v-else-if="bouquets.error"
        class="rounded-[1.75rem] border border-[#efc9c2] bg-[#fff3f1] px-6 py-5 text-center text-[#8f4b42] shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
      >
        {{ bouquets.error }}
      </div>

      <div
        v-else-if="filtered.length === 0"
        class="rounded-[1.75rem] border border-[#eadaca] bg-white/72 px-6 py-10 text-center shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
      >
        <h3 class="mb-2 text-2xl font-semibold text-[#3c2a20]">
          Пока ничего не найдено
        </h3>
        <p class="text-[#6f5646]">
          Попробуйте выбрать другую категорию.
        </p>
      </div>

      <transition name="fade" mode="out-in">
        <div
          v-if="!bouquets.isLoading && filtered.length > 0"
          :key="activeCategory ?? 'all'"
          class="rounded-[2rem] border border-[#eadaca] bg-white/72 p-5 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm"
        >
          <FlowerGrid
            :items="filtered"
            @open="(id) => console.log('open details:', id)"
          />
        </div>
      </transition>
    </div>
  </section>
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
