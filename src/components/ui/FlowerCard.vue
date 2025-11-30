<script setup lang="ts">
import type { Bouquet } from "@/types/Bouquet";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {useCartStore} from "@/stores/cart-store.ts";
import {useFavoritesStore} from "@/stores/favorites-store.ts";
import {computed} from "vue";
import {useToastStore} from "@/stores/toast-store.ts";

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
  toast.show("Цветы добавлены в корзину");
};

const toggleFavorite = () => {
  favoritesStore.toggle(props.bouquet.id);

  toast.show(
    isFav.value
      ? "Удалено из избранного"
      : "Добавлено в избранное"
  );
};
</script>

<template>
  <BaseCard padding>
    <div class="cursor-pointer" @click="emit('open', bouquet.id)">
      <img
        :src="bouquet.image"
        :alt="bouquet.name"
        class="w-full h-64 object-cover rounded-md"
      />

      <h3 class="text-lg font-semibold mt-3">
        {{ bouquet.name }}
      </h3>

      <p class="text-sm text-gray-600">
        {{ bouquet.shortDescription }}
      </p>

      <p class="text-lg font-bold mt-2">
        {{ bouquet.price }} c.
      </p>
    </div>

    <div class="flex gap-2 mt-4 justify-end">
      <BaseButton size="md" @click="addToCart">
        В корзину
      </BaseButton>

      <BaseButton size="md" variant="outline" @click="toggleFavorite">
        {{ isFav ? "💔" : "❤️" }}
      </BaseButton>
    </div>
  </BaseCard>
</template>
