<script setup lang="ts">
import { computed } from "vue";

import type { Bouquet } from "@/types/Bouquet";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useCartStore } from "@/stores/cart-store.ts";
import { useFavoritesStore } from "@/stores/favorites-store.ts";
import { useToastStore } from "@/stores/toast-store.ts";

const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const toast = useToastStore();

const props = defineProps<{
  bouquet: Bouquet;
}>();

const emit = defineEmits(["add-to-cart", "toggle-favorite", "open"]);

const isFav = computed(() => favoritesStore.isFavorite(props.bouquet.id));

const addToCart = () => {
  cartStore.add(props.bouquet.id);
  toast.show(`Цветы "${props.bouquet.name}" добавлены в Вашу корзину`);
};

const toggleFavorite = () => {
  favoritesStore.toggle(props.bouquet.id);

  toast.show(
    isFav.value
      ? `Цветы "${props.bouquet.name}" добавлены в Ваши избранные`
      : `Цветы "${props.bouquet.name}" удалены из Ваших избранных`
  );
};
</script>

<template>
    <article
      class="group h-full rounded-[1.75rem] border border-[#eadaca] bg-gradient-to-br from-[#fffaf5] via-[#fff7ef] to-[#f7ecdf] p-4 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.5rem_3rem_rgba(96,68,44,0.11)]"
    >
      <div
        class="cursor-pointer"
        @click="emit('open', bouquet.id)"
      >
        <div class="relative overflow-hidden rounded-[1.35rem]">
          <div
            class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#3f2d22]/10 via-transparent to-white/20"
          />

          <img
            :src="bouquet.image"
            :alt="bouquet.name"
            class="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div class="mt-4">
          <div class="mb-2 flex items-start justify-between gap-3">
            <h3 class="text-[2.1rem] font-semibold tracking-tight text-[#3f2d22]">
              {{ bouquet.name }}
            </h3>

            <span
              v-if="bouquet.isPopular"
              class="shrink-0 rounded-full bg-[#fff2e6] px-3 py-1 text-xl font-medium text-[#a67858]"
            >
              Популярный
            </span>
          </div>

          <p class="min-h-[3.25rem] text-sm leading-6 text-[#6a5244]">
            {{ bouquet.shortDescription }}
          </p>

          <div class="mt-4 flex items-end gap-2">
            <p class="text-[1.65rem] font-bold text-[#3c2a20]">
              {{ bouquet.price }} c.
            </p>

            <p
              v-if="bouquet.oldPrice"
              class="pb-[0.1rem] text-sm text-[#a58d7d] line-through"
            >
              {{ bouquet.oldPrice }} c.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-5 flex gap-2">
        <BaseButton
          size="md"
          class="flex-1"
          @click="addToCart"
        >
          В корзину
        </BaseButton>

        <BaseButton
          size="md"
          variant="outline"
          class="min-w-[3.2rem]"
          @click="toggleFavorite"
        >
          {{ isFav ? "💔" : "❤️" }}
        </BaseButton>
      </div>
    </article>
</template>
