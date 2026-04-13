<script setup lang="ts">
import { ROUTE_PATHS } from "@/router/paths.ts";
</script>

<template>
  <footer class="relative overflow-hidden border-t border-[#eadaca] bg-[#fffaf4]">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-16 left-[-3rem] h-52 w-52 rounded-full bg-[#f4dfcc] blur-3xl opacity-50"
      />
      <div
        class="absolute bottom-[-3rem] right-[-2rem] h-56 w-56 rounded-full bg-[#efe0d2] blur-3xl opacity-60"
      />
    </div>

    <div class="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:px-8">
      <div class="max-w-md">
        <h2 class="mb-4 text-2xl font-semibold tracking-wide text-[#3f2d22]">
          Flowery KG
        </h2>

        <p class="leading-7 text-[#6f5646]">
          Цветы - это эмоции. Мы создаём букеты с любовью, вниманием к деталям и
          тёплым отношением к каждому заказу.
        </p>
      </div>

      <div class="md:justify-self-end">
        <h3 class="mb-4 text-lg font-medium text-[#3f2d22]">
          Меню
        </h3>

        <ul class="space-y-3 text-[#6f5646]">
          <li>
            <router-link :to="ROUTE_PATHS.HOME" class="transition hover:text-[#a67858]">
              Главная
            </router-link>
          </li>

          <li>
            <router-link :to="ROUTE_PATHS.CATALOG" class="transition hover:text-[#a67858]">
              Каталог
            </router-link>
          </li>

          <li>
            <router-link :to="ROUTE_PATHS.ABOUT" class="transition hover:text-[#a67858]">
              О нас
            </router-link>
          </li>

          <li>
            <router-link :to="ROUTE_PATHS.DELIVERY" class="transition hover:text-[#a67858]">
              Доставка
            </router-link>
          </li>

          <li>
            <router-link :to="ROUTE_PATHS.CONTACTS" class="transition hover:text-[#a67858]">
              Контакты
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="relative border-t border-[#eadaca]">
      <div class="mx-auto w-full max-w-7xl px-6 py-4 text-center text-sm text-[#8e7565] md:px-8">
        © {{ new Date().getFullYear() }} Flowery KG
      </div>
    </div>
  </footer>
</template>
