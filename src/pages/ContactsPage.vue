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
  <div style="padding: 40px">

    <h1 style="font-size: 28px; margin-bottom: 20px">Контакты</h1>

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

    <div style="margin-top: 40px">
      <h2 style="font-size: 24px; margin-bottom: 15px">Наши магазины</h2>

      <div v-if="store.isLoading">Загрузка магазинов…</div>
      <div v-else-if="store.error">{{ store.error }}</div>

      <div v-else>
        <div
          v-for="s in store.list"
          :key="s.id"
          style="
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
          "
        >
          <p><strong>Город:</strong> {{ s.city }}</p>
          <p><strong>Адрес:</strong> {{ s.address }}</p>
          <p><strong>Время работы:</strong> {{ s.workTime }}</p>
          <p><strong>Телефон:</strong> {{ s.phone }}</p>
          <p v-if="s.instagram"><strong>Instagram:</strong> {{ s.instagram }}</p>
          <p v-if="s.whatsapp"><strong>WhatsApp:</strong> {{ s.whatsapp }}</p>

          <a
            v-if="s.mapLink"
            :href="s.mapLink"
            target="_blank"
            style="color: blue; text-decoration: underline; display: inline-block; margin-top: 10px"
          >
            Открыть на карте
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
