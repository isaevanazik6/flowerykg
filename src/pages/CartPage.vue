<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";

import { useCartStore } from "@/stores/cart-store";
import { useBouquetsStore } from "@/stores/bouquets-store";

const cartStore = useCartStore();
const bouquetsStore = useBouquetsStore();

onMounted(() => {
  bouquetsStore.load();
});

const cartItems = computed(() => {
  return cartStore.items.map(item => {
    const bouquet = bouquetsStore.list.find(b => b.id === item.bouquetId);
    return {
      ...item,
      bouquet
    };
  }).filter(i => i.bouquet);
});

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + item.quantity * item!.bouquet!.price;
  }, 0);
});

const animatedTotal = ref(total.value);

watch(total, (newVal, oldVal) => {
  const start = oldVal ?? 0;
  const end = newVal;

  let current = start;
  animatedTotal.value = current;

  const step = () => {
    if (current === end) return;

    const distance = Math.abs(end - current);

    const diff = Math.max(30, Math.floor(distance * 0.18));

    if (current < end) {
      current = Math.min(current + diff, end);
    } else {
      current = Math.max(current - diff, end);
    }

    animatedTotal.value = current;

    setTimeout(step, 16);
  };

  step();
});
</script>

<template>
  <div class="p-10">

    <h1 class="text-3xl mb-6">Корзина</h1>

    <div v-if="bouquetsStore.isLoading">Загрузка...</div>

    <div v-else-if="cartItems.length === 0">
      <p>Ваша корзина пустая.</p>
    </div>

    <div v-else>

      <div
        v-for="item in cartItems"
        :key="item.bouquetId"
        class="flex justify-between items-center border border-gray-300 p-5 rounded-xl mb-5"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.bouquet!.image"
            class="w-20 h-20 object-cover rounded-lg"
          />

          <div>
            <h3 class="text-2xl font-semibold mb-2">
              {{ item.bouquet!.name }}
            </h3>

            <p class="text-lg text-gray-700">
              Цена: {{ item.bouquet!.price }} c.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">

          <button
            @click="cartStore.decrease(item.bouquetId)"
            class="px-3 py-1 border border-gray-400 rounded-md"
          >−</button>

          <span class="text-lg w-8 text-center">
            {{ item.quantity }}
          </span>

          <button
            @click="cartStore.add(item.bouquetId)"
            class="px-3 py-1 border border-gray-400 rounded-md"
          >+</button>

          <button
            @click="cartStore.remove(item.bouquetId)"
            class="ml-3 px-3 py-1 border border-red-500 text-red-500 rounded-md"
          >
            Удалить
          </button>

        </div>
      </div>

      <div class="mt-6 text-right">
        <h2 class="text-2xl font-semibold">
          Итого: <strong>{{ animatedTotal }} c.</strong>
        </h2>
      </div>
    </div>

  </div>
</template>
