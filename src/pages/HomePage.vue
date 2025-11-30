<script setup lang="ts">
import { onMounted, ref } from "vue";

import BaseSection from "@/components/base/BaseSection.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import FlowerGrid from "@/components/ui/FlowerGrid.vue";
import HomeHero from "@/components/ui/HomeHero.vue";
import WhyUsSection from "@/components/ui/WhyUsSection.vue";

import { useBouquetsStore } from "@/stores/bouquets-store";
import { fetchHomePage } from "@/api/pages-api";

const store = useBouquetsStore();

const homeData = ref<any>(null);
const isHomeLoading = ref(true);
const homeError = ref<string | null>(null);

onMounted(async () => {
  await store.load();

  try {
    isHomeLoading.value = true;
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
  <div>
    <BaseSection>
      <HomeHero
        v-if="homeData"
        :title="homeData.hero.title"
        :subtitle="homeData.hero.subtitle"
        :buttonText="homeData.hero.buttonText"
        :route-to="homeData.hero.routeTo"
      />
      <p v-else>Загрузка...</p>
    </BaseSection>

    <BaseSection>
      <SectionHeader title="Почему выбирают нас?" />
      <WhyUsSection v-if="homeData" :items="homeData.whyUs" />
    </BaseSection>

    <BaseSection>
      <SectionHeader title="Популярные букеты" subtitle="Лучшие композиции" />

      <div v-if="store.isLoading">Загрузка букетов...</div>
      <div v-else-if="store.error">{{ store.error }}</div>
      <FlowerGrid
        v-else
        :items="store.popular"
        @open="(id) => console.log('open', id)"
      />
    </BaseSection>

  </div>
</template>
