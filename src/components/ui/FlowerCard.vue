<script setup lang="ts">
import type { Bouquet } from "@/types/Bouquet";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps<{
  bouquet: Bouquet;
}>();

const emit = defineEmits(["add-to-cart", "toggle-favorite", "open"]);
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

    <div class="flex gap-2 mt-4">
      <BaseButton size="sm" @click="emit('add-to-cart', bouquet.id)">
        В корзину
      </BaseButton>

      <BaseButton size="sm" variant="outline"
                  @click="emit('toggle-favorite', bouquet.id)">
        ❤
      </BaseButton>
    </div>
  </BaseCard>
</template>
