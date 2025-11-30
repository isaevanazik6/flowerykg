import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchCategories } from "@/api/categories-api";
import type { Category } from "@/types/Category";

export const useCategoriesStore = defineStore("categories", () => {
  const list = ref<Category[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    if (list.value.length > 0) return;

    try {
      isLoading.value = true;
      error.value = null;

      list.value = await fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message;
      else error.value = "Неизвестная ошибка";
    } finally {
      isLoading.value = false;
    }
  };

  const getById = (id: number) =>
    list.value.find(c => c.id === id) ?? null;

  return {
    list,
    isLoading,
    error,
    load,
    getById
  };
});
