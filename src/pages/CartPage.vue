<script setup lang="ts">
import { computed, onMounted } from "vue";

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
</script>

<template>
  <div style="padding: 40px">

    <h1 style="font-size: 28px; margin-bottom: 20px">Корзина</h1>

    <div v-if="bouquetsStore.isLoading">Загрузка...</div>

    <div v-else-if="cartItems.length === 0">
      <p>Корзина пустая.</p>
    </div>

    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.bouquetId"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        "
      >
        <div>
          <h3 style="font-size: 20px; margin-bottom: 8px">
            {{ item!.bouquet!.name }}
          </h3>

          <p style="color: #555">
            Цена: {{ item!.bouquet!.price }} с.
          </p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center">

          <button
            @click="cartStore.decrease(item.bouquetId)"
            style="padding: 6px 12px; border: 1px solid #ccc"
          >−</button>

          <span style="font-size: 18px; width: 30px; text-align: center">
            {{ item.quantity }}
          </span>

          <button
            @click="cartStore.add(item.bouquetId)"
            style="padding: 6px 12px; border: 1px solid #ccc"
          >+</button>

          <button
            @click="cartStore.remove(item.bouquetId)"
            style="margin-left: 20px; padding: 6px 12px; border: 1px solid red; color: red"
          >Удалить</button>

        </div>
      </div>

      <div style="margin-top: 20px">
        <h2 style="font-size: 24px">
          Итого: <strong>{{ total }} с.</strong>
        </h2>
      </div>
    </div>

  </div>
</template>
