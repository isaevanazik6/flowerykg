<script setup lang="ts">
import { useCartStore } from "@/stores/cart-store";
import { useFavoritesStore } from "@/stores/favorites-store";
import {ROUTE_PATHS} from "@/router/paths.ts";

const cartStore = useCartStore();
const favouriteStore = useFavoritesStore();
</script>

<template>
  <nav class="w-full border-b bg-white shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">

      <router-link
        to="/"
        class="text-2xl font-bold tracking-wide hover:opacity-80 transition"
      >
        Flowery KG
      </router-link>

      <div class="hidden md:flex gap-8 text-lg">
        <router-link
          :to="ROUTE_PATHS.HOME"
          class="hover:text-pink-500 transition"
        >
          Главная
        </router-link>

        <router-link
          :to="ROUTE_PATHS.CATALOG"
          class="hover:text-pink-500 transition"
        >
          Каталог
        </router-link>

        <router-link
          :to="ROUTE_PATHS.ABOUT"
          class="hover:text-pink-500 transition"
        >
          О нас
        </router-link>

        <router-link
          :to="ROUTE_PATHS.DELIVERY"
          class="hover:text-pink-500 transition"
        >
          Доставка
        </router-link>

        <router-link
          :to="ROUTE_PATHS.CONTACTS"
          class="hover:text-pink-500 transition"
        >
          Контакты
        </router-link>
      </div>

      <div class="flex items-center gap-6 text-lg">

        <router-link :to="ROUTE_PATHS.FAVORITES" class="relative hover:text-pink-500 transition">
          ❤
          <span
            v-if="favouriteStore.ids.length > 0"
            class="absolute -top-2 -right-3 text-xs bg-pink-500 text-white rounded-full px-2 py-0.5"
          >
            {{ favouriteStore.ids.length }}
          </span>
        </router-link>

        <router-link :to="ROUTE_PATHS.CART" class="relative hover:text-pink-500 transition">
          🛒
          <span
            v-if="cartStore.count() > 0"
            class="absolute -top-2 -right-3 text-xs bg-pink-500 text-white rounded-full px-2 py-0.5"
          >
            {{ cartStore.count() }}
          </span>
        </router-link>

      </div>

    </div>
  </nav>
</template>
