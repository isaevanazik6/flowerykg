import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { CartItem } from "@/types/CartItem";

export const useCartStore = defineStore("cart", () => {
  const key = "flower:cart";

  const items = ref<CartItem[]>(loadInitial());

  function loadInitial(): CartItem[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  const add = (bouquetId: number) => {
    const item = items.value.find(i => i.bouquetId === bouquetId);
    if (item) item.quantity++;
    else items.value.push({ bouquetId, quantity: 1 });
  };

  const remove = (bouquetId: number) => {
    items.value = items.value.filter(i => i.bouquetId !== bouquetId);
  };

  const decrease = (bouquetId: number) => {
    const item = items.value.find(i => i.bouquetId === bouquetId);
    if (!item) return;
    item.quantity--;
    if (item.quantity <= 0) remove(bouquetId);
  };

  const count = () =>
    items.value.reduce((sum, i) => sum + i.quantity, 0);

  // сохраняем в localStorage
  watch(
    items,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val));
    },
    { deep: true }
  );

  return {
    items,
    add,
    remove,
    decrease,
    count
  };
});
