import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchContacts } from "@/api/contacts-api";
import type {ContactInfo} from "@/types/ContactInfo.ts";

export const useContactsStore = defineStore("contacts", () => {
  const infos = ref<ContactInfo[] | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const load = async () => {
    if (infos.value) return;
    try {
      isLoading.value = true;
      error.value = null;

      const page = await fetchContacts();
      infos.value = page.sections ?? [];
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message;
      else error.value = "Неизвестная ошибка";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    infos,
    isLoading,
    error,
    load,
  };
});
