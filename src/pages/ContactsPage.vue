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
    error.value = null;

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
  <section class="relative overflow-hidden bg-[#fffaf4]">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute -top-24 right-[-5rem] h-80 w-80 rounded-full bg-[#f3dbc8] blur-3xl opacity-50"
      />
      <div
        class="absolute bottom-[-4rem] left-[-4rem] h-72 w-72 rounded-full bg-[#efe2d4] blur-3xl opacity-60"
      />
      <div
        class="absolute top-1/3 left-1/3 h-56 w-56 rounded-full bg-[#f8eee4] blur-3xl opacity-60"
      />
    </div>

    <div class="relative mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <div
        class="mx-auto mb-10 max-w-4xl rounded-[2rem] border border-[#eadaca] bg-white/75 px-7 py-8 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:px-10 md:py-10"
      >
        <p
          class="mb-3 inline-flex rounded-full border border-[#e7d5c4] bg-[#fff7ee] px-4 py-1 text-sm font-medium tracking-wide text-[#9b6f4f]"
        >
          FLOWERY KG
        </p>

        <h1 class="mb-4 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
          Контакты
        </h1>

        <p class="mx-auto max-w-2xl text-base leading-7 text-[#6f5646] md:text-lg">
          Мы всегда на связи, чтобы помочь с выбором букета, уточнить детали доставки
          и быстро ответить на вопросы по заказу.
        </p>
      </div>

      <div v-if="isLoading" class="space-y-6">
        <div
          class="h-40 animate-pulse rounded-[2rem] border border-[#eddccf] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
        <div
          class="h-52 animate-pulse rounded-[2rem] border border-[#eddccf] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
        <div
          class="h-72 animate-pulse rounded-[2rem] border border-[#eddccf] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
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

      <div v-else class="space-y-10">
        <div
          class="grid gap-4 rounded-[1.75rem] border border-[#eadaca] bg-white/70 p-5 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)] backdrop-blur-sm md:grid-cols-3"
        >
          <div class="rounded-[1.4rem] bg-[#fff7ee] px-5 py-5 text-center">
            <div class="mb-2 text-2xl font-bold text-[#9f7655]">Быстро</div>
            <div class="text-sm text-[#6f5646]">
              Отвечаем на вопросы и помогаем с заказом
            </div>
          </div>

          <div class="rounded-[1.4rem] bg-[#fcf2e8] px-5 py-5 text-center">
            <div class="mb-2 text-2xl font-bold text-[#9f7655]">Удобно</div>
            <div class="text-sm text-[#6f5646]">
              Связаться можно любым комфортным способом
            </div>
          </div>

          <div class="rounded-[1.4rem] bg-[#fff7ee] px-5 py-5 text-center">
            <div class="mb-2 text-2xl font-bold text-[#9f7655]">Надежно</div>
            <div class="text-sm text-[#6f5646]">
              Подскажем по доставке, оплате и наличию букетов
            </div>
          </div>
        </div>

        <div class="pt-4">
          <div class="mb-8 text-center">
            <h2 class="mb-3 text-3xl font-semibold tracking-tight text-[#3c2a20] md:text-4xl">
              Наши магазины
            </h2>

            <p class="mx-auto max-w-2xl text-base leading-7 text-[#6f5646]">
              Выбирайте удобную точку, уточняйте наличие и приезжайте за букетами
              или оформляйте доставку.
            </p>
          </div>

          <div v-if="store.isLoading" class="text-center text-[#6f5646]">
            Загрузка магазинов...
          </div>

          <div v-else-if="store.error" class="text-center text-red-600">
            {{ store.error }}
          </div>

          <div v-else class="grid gap-6 md:grid-cols-2">
            <article
              v-for="s in store.list"
              :key="s.id"
              class="group relative overflow-hidden rounded-[2rem] border border-[#eadaca] bg-white/78 p-6 shadow-[0_1rem_2.8rem_rgba(96,68,44,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.6rem_3.5rem_rgba(96,68,44,0.12)]"
            >
              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-[#f6e4d3]/30 opacity-80"
              />

              <div class="relative z-10">
                <div class="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p class="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-[#a27b5e]">
                      Магазин
                    </p>
                    <h3 class="text-2xl font-semibold text-[#3f2d22]">
                      {{ s.city }}
                    </h3>
                  </div>

                  <div class="rounded-full bg-[#fff4e8] px-4 py-1.5 text-sm font-medium text-[#9f7655]">
                    Flowery KG
                  </div>
                </div>

                <div class="space-y-3 text-[1rem] leading-7 text-[#5f4a3e]">
                  <p>
                    <span class="font-semibold text-[#8f6a4f]">Адрес:</span>
                    {{ s.address }}
                  </p>

                  <p>
                    <span class="font-semibold text-[#8f6a4f]">Время работы:</span>
                    {{ s.workTime }}
                  </p>

                  <p>
                    <span class="font-semibold text-[#8f6a4f]">Телефон:</span>
                    {{ s.phone }}
                  </p>

                  <p v-if="s.instagram">
                    <span class="font-semibold text-[#8f6a4f]">Instagram:</span>
                    {{ s.instagram }}
                  </p>

                  <p v-if="s.whatsapp">
                    <span class="font-semibold text-[#8f6a4f]">WhatsApp:</span>
                    {{ s.whatsapp }}
                  </p>
                </div>

                <div class="mt-6 flex flex-wrap gap-3">
                  <a
                    v-if="s.mapLink"
                    :href="s.mapLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center rounded-full bg-[#b48b6e] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#9f7655]"
                  >
                    Открыть на карте
                  </a>

                  <a
                    v-if="s.phone"
                    :href="`tel:${s.phone}`"
                    class="inline-flex items-center rounded-full border border-[#d7c2b1] bg-white/75 px-5 py-2.5 text-sm font-medium text-[#6a5244] transition hover:bg-[#fff7ee]"
                  >
                    Позвонить
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
