import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const key = "flower:favorites";

  const ids = ref<number[]>(loadInitial());

  function loadInitial(): number[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  const toggle = (id: number) => {
    if (ids.value.includes(id)) {
      ids.value = ids.value.filter(x => x !== id);
    } else {
      ids.value.push(id);
    }
  };

  const isFavorite = (id: number) => ids.value.includes(id);

  // синхронизация с localStorage
  watch(
    ids,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val));
    },
    { deep: true }
  );

  return {
    ids,
    toggle,
    isFavorite
  };
});
