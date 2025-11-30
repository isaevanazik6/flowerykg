<script setup lang="ts">
import { ref, onMounted } from "vue";

import StaticSection from "@/components/ui/StaticSection.vue";
import { fetchContactsPage } from "@/api/pages-api";
import type { StaticPage } from "@/types/StaticPage";

import { useShopsStore } from "@/stores/stores-store";

const page = ref<StaticPage | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const store = useShopsStore();

onMounted(async () => {
  try {
    isLoading.value = true;

    page.value = await fetchContactsPage();

    await store.load();

  } catch (err: unknown) {
    if (err instanceof Error) error.value = err.message;
    else error.value = "Неизвестная ошибка";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="p-10">

    <h1 class="text-4xl font-bold text-center mb-10">
      Контакты
    </h1>

    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>

    <div v-else>
      <StaticSection
        v-for="(section, idx) in page?.sections"
        :key="idx"
        :title="section.title"
        :text="section.text"
        :image="section.image"
        class="mt-8"
      />
    </div>

    <div class="mt-16">
      <h2 class="text-3xl font-semibold text-center mb-8">
        Наши магазины
      </h2>

      <div v-if="store.isLoading" class="text-center">Загрузка магазинов…</div>
      <div v-else-if="store.error" class="text-red-600 text-center">{{ store.error }}</div>

      <div v-else class="grid gap-6 md:grid-cols-2">
        <div
          v-for="s in store.list"
          :key="s.id"
          class="border p-6 rounded-xl shadow-sm hover:shadow-lg transition-all"
        >
          <p><strong>Город:</strong> {{ s.city }}</p>
          <p><strong>Адрес:</strong> {{ s.address }}</p>
          <p><strong>Время работы:</strong> {{ s.workTime }}</p>
          <p><strong>Телефон:</strong> {{ s.phone }}</p>

          <p v-if="s.instagram">
            <strong>Instagram:</strong> {{ s.instagram }}
          </p>

          <p v-if="s.whatsapp">
            <strong>WhatsApp:</strong> {{ s.whatsapp }}
          </p>

          <a
            v-if="s.mapLink"
            :href="s.mapLink"
            target="_blank"
            class="inline-block mt-4 text-pink-600 underline hover:text-pink-700 transition"
          >
            Открыть на карте
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
