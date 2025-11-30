import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchBouquets } from "@/api/bouquets-api";
import type { Bouquet } from "@/types/Bouquet";

export const useBouquetsStore = defineStore("bouquets", () => {
  const list = ref<Bouquet[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    if (list.value.length > 0) return;

    try {
      isLoading.value = true;
      error.value = null;

      list.value = await fetchBouquets();
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message;
      else error.value = "Неизвестная ошибка";
    } finally {
      isLoading.value = false;
    }
  };

  const getById = (id: number) =>
    list.value.find(b => b.id === id) ?? null;

  const popular = computed(() =>
    list.value.filter(b => b.isPopular)
  );

  return {
    list,
    isLoading,
    error,

    load,
    getById,
    popular
  };
});
