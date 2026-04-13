<script setup lang="ts">
import { onMounted, ref } from "vue";

import BaseSection from "@/components/base/BaseSection.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import FlowerGrid from "@/components/ui/FlowerGrid.vue";
import HomeHero from "@/components/ui/HomeHero.vue";
import WhyUsSection from "@/components/ui/WhyUsSection.vue";

import { useBouquetsStore } from "@/stores/bouquets-store";
import { fetchHomePage } from "@/api/pages-api";
import type { HomePage } from "@/types/HomePage";

const store = useBouquetsStore();

const homeData = ref<HomePage | null>(null);
const isHomeLoading = ref(true);
const homeError = ref<string | null>(null);

onMounted(async () => {
  await store.load();

  try {
    isHomeLoading.value = true;
    homeError.value = null;
    homeData.value = await fetchHomePage();
  } catch (err: unknown) {
    if (err instanceof Error) homeError.value = err.message;
    else homeError.value = "Ошибка загрузки главной страницы";
  } finally {
    isHomeLoading.value = false;
  }
});
</script>

<template>
  <div class="relative overflow-hidden bg-[#fffaf4]">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#f5dfcb] blur-3xl opacity-60"
      />
      <div
        class="absolute top-[22rem] -right-20 h-80 w-80 rounded-full bg-[#ead2bd] blur-3xl opacity-45"
      />
      <div
        class="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-[#f3e7d8] blur-3xl opacity-50"
      />
    </div>

    <div class="relative">
      <BaseSection>
        <div
          class="rounded-[2rem] border border-[#eadaca] bg-white/78 p-3 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:p-4"
        >
          <HomeHero
            v-if="homeData"
            :title="homeData.hero.title"
            :subtitle="homeData.hero.subtitle"
            :buttonText="homeData.hero.buttonText"
            :route-to="homeData.hero.routeTo"
            :images="homeData.hero.images"
          />

          <div
            v-else-if="isHomeLoading"
            class="h-[24rem] animate-pulse rounded-[1.6rem] bg-gradient-to-br from-[#fff7ee] to-[#f5e8da]"
          />

          <div
            v-else
            class="rounded-[1.6rem] border border-[#efc9c2] bg-[#fff3f1] px-6 py-10 text-center text-[#8f4b42]"
          >
            <p class="mb-2 text-lg font-semibold">Не удалось загрузить главный блок</p>
            <p class="text-sm">{{ homeError }}</p>
          </div>
        </div>
      </BaseSection>

      <BaseSection>
        <div
          class="mb-6 rounded-[1.75rem] border border-[#eadaca] bg-white/72 px-6 py-6 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)] backdrop-blur-sm"
        >
          <SectionHeader title="Популярные букеты" subtitle="Лучшие композиции" />
        </div>

        <div
          v-if="store.isLoading"
          class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="h-[22rem] animate-pulse rounded-[1.8rem] border border-[#eadaca] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
          />
        </div>

        <div
          v-else-if="store.error"
          class="rounded-[1.75rem] border border-[#efc9c2] bg-[#fff3f1] px-6 py-5 text-center text-[#8f4b42] shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        >
          {{ store.error }}
        </div>

        <div
          v-else
          class="rounded-[2rem] border border-[#eadaca] bg-white/72 p-5 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm"
        >
          <FlowerGrid
            :items="store.popular"
            @open="(id) => console.log('open', id)"
          />
        </div>
      </BaseSection>

      <BaseSection>
        <div
          class="mb-6 rounded-[1.75rem] border border-[#eadaca] bg-white/72 px-6 py-6 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)] backdrop-blur-sm"
        >
          <SectionHeader title="Почему выбирают нас?" />
        </div>

        <div
          v-if="isHomeLoading"
          class="grid gap-6 md:grid-cols-3"
        >
          <div
            v-for="n in 3"
            :key="n"
            class="h-44 animate-pulse bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
          />
        </div>

        <div
          v-else-if="homeError"
          class="rounded-[1.75rem] border border-[#efc9c2] bg-[#fff3f1] px-6 py-5 text-center text-[#8f4b42] shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        >
          {{ homeError }}
        </div>

        <div
          v-else-if="homeData"
          class="rounded-[2rem] border border-[#eadaca] bg-white/72 p-5 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm"
        >
          <WhyUsSection :items="homeData.whyUs" />
        </div>
      </BaseSection>
    </div>
  </div>
</template>
