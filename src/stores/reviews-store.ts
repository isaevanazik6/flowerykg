import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchReviews } from "@/api/reviews-api";
import type { Review } from "@/types/Review";

export const useReviewsStore = defineStore("reviews", () => {
  const list = ref<Review[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    if (list.value.length > 0) return;

    try {
      isLoading.value = true;
      error.value = null;

      list.value = await fetchReviews();
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
