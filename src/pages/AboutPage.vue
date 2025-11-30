<script setup lang="ts">
import { ref, onMounted } from "vue";

import StaticSection from "@/components/ui/StaticSection.vue";
import { fetchAboutPage } from "@/api/pages-api";
import type { StaticPage } from "@/types/StaticPage";

const page = ref<StaticPage | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    isLoading.value = true;
    page.value = await fetchAboutPage();
  } catch (err: unknown) {
    if (err instanceof Error) error.value = err.message;
    else error.value = "Неизвестная ошибка";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div style="padding: 40px">
    <h1 class="text-4xl font-bold text-center mb-6">
      О нас
    </h1>

    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <StaticSection
        v-for="(section, idx) in page?.sections"
        :key="idx"
        :title="section.title"
        :text="section.text"
        :image="section.image"
      />
    </div>
  </div>
</template>
