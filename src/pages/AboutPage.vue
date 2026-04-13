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
    error.value = null;
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
  <section class="relative overflow-hidden bg-[#fffaf4]">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#f5dfcb] blur-3xl opacity-60"
      />
      <div
        class="absolute top-32 -right-20 h-80 w-80 rounded-full bg-[#ead2bd] blur-3xl opacity-50"
      />
      <div
        class="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f3e7d8] blur-3xl opacity-50"
      />
    </div>

    <div class="relative mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <div
        class="mx-auto mb-10 max-w-3xl rounded-[2rem] border border-[#eadaca] bg-white/75 px-7 py-8 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:px-10 md:py-10"
      >

        <h1 class="mb-4 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
          О нас
        </h1>

        <p class="mx-auto max-w-2xl text-base leading-7 text-[#6f5646] md:text-lg">
          Мы создаём букеты с характером, теплом и вниманием к деталям, чтобы каждый
          подарок выглядел не просто красиво, а по-настоящему запоминался.
        </p>
      </div>

      <div v-if="isLoading" class="space-y-6">
        <div
          class="h-40 animate-pulse rounded-[2rem] border border-[#eddccf] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
        <div
          class="h-64 animate-pulse rounded-[2rem] border border-[#eddccf] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
        <div
          class="h-64 animate-pulse rounded-[2rem] border border-[#eddccf] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
      </div>

      <div v-else-if="error" class="mx-auto max-w-2xl">
        <div
          class="rounded-[1.75rem] border border-[#efc9c2] bg-[#fff3f1] px-6 py-5 text-center text-[#8f4b42] shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        >
          <p class="mb-1 text-lg font-semibold">Не удалось загрузить страницу</p>
          <p class="text-sm">{{ error }}</p>
        </div>
      </div>

      <div v-else class="space-y-8">
        <div
          class="grid gap-4 rounded-[1.75rem] border border-[#eadaca] bg-white/70 p-5 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)] backdrop-blur-sm md:grid-cols-3"
        >
          <div class="rounded-[1.4rem] bg-[#fff7ee] px-5 py-5 text-center">
            <div class="mb-2 text-2xl font-bold text-[#9f7655]">
              {{ page?.sections?.length || 0 }}
            </div>
            <div class="text-sm text-[#6f5646]">Историй о нас</div>
          </div>

          <div class="rounded-[1.4rem] bg-[#fcf2e8] px-5 py-5 text-center">
            <div class="mb-2 text-2xl font-bold text-[#9f7655]">Свежесть</div>
            <div class="text-sm text-[#6f5646]">
              Цветы, собранные с вниманием к качеству и подаче
            </div>
          </div>

          <div class="rounded-[1.4rem] bg-[#fff7ee] px-5 py-5 text-center">
            <div class="mb-2 text-2xl font-bold text-[#9f7655]">Забота</div>
            <div class="text-sm text-[#6f5646]">
              Оформление, доставка и настроение в одном заказе
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <div
            v-for="(section, idx) in page?.sections"
            :key="idx"
            class="rounded-[2rem] border border-[#eadaca] bg-white/72 p-3 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_1.5rem_3.5rem_rgba(96,68,44,0.12)] md:p-4"
          >
            <StaticSection
              :title="section.title"
              :text="section.text"
              :image="section.image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
