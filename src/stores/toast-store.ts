import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const message = ref<string | null>(null);

  const show = (text: string, timeout = 4000) => {
    message.value = text;
    setTimeout(() => (message.value = null), timeout);
  };

  return { message, show };
});
