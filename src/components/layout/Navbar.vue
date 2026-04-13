<script setup lang="ts">
import { useRoute } from "vue-router";

import { useCartStore } from "@/stores/cart-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import { ROUTE_PATHS } from "@/router/paths.ts";

const cartStore = useCartStore();
const favouriteStore = useFavoritesStore();
const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
  <nav
    class="w-full border-b border-[#eadaca] bg-[#fffaf4]/95 shadow-[0_0.35rem_1.2rem_rgba(96,68,44,0.05)] backdrop-blur-sm"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
      <router-link
        :to="ROUTE_PATHS.HOME"
        class="text-2xl font-bold tracking-wide text-[#3f2d22] transition hover:text-[#9f7655]"
      >
        Flowery KG
      </router-link>

      <div class="hidden items-center gap-8 text-[1.05rem] md:flex">
        <router-link
          :to="ROUTE_PATHS.HOME"
          class="transition"
          :class="isActive(ROUTE_PATHS.HOME) ? 'text-[#9f7655]' : 'text-[#5f4a3e] hover:text-[#a67858]'"
        >
          Главная
        </router-link>

        <router-link
          :to="ROUTE_PATHS.CATALOG"
          class="transition"
          :class="isActive(ROUTE_PATHS.CATALOG) ? 'text-[#9f7655]' : 'text-[#5f4a3e] hover:text-[#a67858]'"
        >
          Каталог
        </router-link>

        <router-link
          :to="ROUTE_PATHS.ABOUT"
          class="transition"
          :class="isActive(ROUTE_PATHS.ABOUT) ? 'text-[#9f7655]' : 'text-[#5f4a3e] hover:text-[#a67858]'"
        >
          О нас
        </router-link>

        <router-link
          :to="ROUTE_PATHS.DELIVERY"
          class="transition"
          :class="isActive(ROUTE_PATHS.DELIVERY) ? 'text-[#9f7655]' : 'text-[#5f4a3e] hover:text-[#a67858]'"
        >
          Доставка
        </router-link>

        <router-link
          :to="ROUTE_PATHS.CONTACTS"
          class="transition"
          :class="isActive(ROUTE_PATHS.CONTACTS) ? 'text-[#9f7655]' : 'text-[#5f4a3e] hover:text-[#a67858]'"
        >
          Контакты
        </router-link>
      </div>

      <div class="flex items-center gap-5 text-[1.25rem] text-[#6a5244]">
        <router-link
          :to="ROUTE_PATHS.FAVORITES"
          class="relative transition hover:text-[#c97d95]"
        >
          ❤
          <span
            class="absolute -top-2 -right-3 min-w-[1.15rem] rounded-full bg-[#d98aa1] px-1.5 py-[0.1rem] text-center text-[0.68rem] font-medium leading-none text-white shadow-sm"
          >
            {{ favouriteStore.ids.length }}
          </span>
        </router-link>

        <router-link
          :to="ROUTE_PATHS.CART"
          class="relative transition hover:text-[#a67858]"
        >
          🛒
          <span
            class="absolute -top-2 -right-3 min-w-[1.15rem] rounded-full bg-[#c89a7b] px-1.5 py-[0.1rem] text-center text-[0.68rem] font-medium leading-none text-white shadow-sm"
          >
            {{ cartStore.count() }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>
