import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchStores } from "@/api/stores-api";
import type { Store } from "@/types/Store";

export const useShopsStore = defineStore("shops", () => {
  const list = ref<Store[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    if (list.value.length > 0) return;

    try {
      isLoading.value = true;
      error.value = null;

      list.value = await fetchStores();
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message;
      else error.value = "Неизвестная ошибка";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    list,
    isLoading,
    error,
    load
  };
});
