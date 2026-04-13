<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useCartStore } from "@/stores/cart-store";
import { useBouquetsStore } from "@/stores/bouquets-store";
import { useToastStore } from "@/stores/toast-store";
import { createOrder } from "@/api/orders-api";

const cartStore = useCartStore();
const bouquetsStore = useBouquetsStore();
const toastStore = useToastStore();

onMounted(() => {
  bouquetsStore.load();
});

const cartItems = computed(() => {
  return cartStore.items
    .map(item => {
      const bouquet = bouquetsStore.list.find(b => b.id === item.bouquetId);
      return {
        ...item,
        bouquet
      };
    })
    .filter(i => i.bouquet);
});

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + item.quantity * item.bouquet!.price;
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

const isOrderModalOpen = ref(false);
const isSubmitting = ref(false);
const submitError = ref("");

const customerName = ref("");
const customerPhone = ref("");
const mainPhone = ref("");
const deliveryDate = ref("");
const deliveryTime = ref("");
const deliveryAddress = ref("");
const noteText = ref("");

const canSubmit = computed(() => {
  return !!customerName.value.trim()
    && !!customerPhone.value.trim()
    && !!mainPhone.value.trim()
    && !!deliveryDate.value
    && !!deliveryTime.value
    && !!deliveryAddress.value.trim()
    && cartItems.value.length > 0
    && !isSubmitting.value;
});

function openOrderModal() {
  submitError.value = "";
  isOrderModalOpen.value = true;
}

function closeOrderModal() {
  if (isSubmitting.value) return;
  isOrderModalOpen.value = false;
  submitError.value = "";
}

function buildDeliveryDateTime(): string {
  return `${deliveryDate.value}T${deliveryTime.value}:00`;
}

async function submitOrder() {
  if (!canSubmit.value) return;

  submitError.value = "";
  isSubmitting.value = true;

  try {
    await createOrder({
      customerName: customerName.value.trim(),
      customerPhone: customerPhone.value.trim(),
      mainPhone: mainPhone.value.trim(),
      deliveryDateTime: buildDeliveryDateTime(),
      deliveryAddress: deliveryAddress.value.trim(),
      comment: noteText.value.trim() ? noteText.value.trim() : null,
      items: cartStore.items.map(item => ({
        bouquetId: item.bouquetId,
        quantity: item.quantity
      }))
    });

    isOrderModalOpen.value = false;
    cartStore.clear();

    customerName.value = "";
    customerPhone.value = "";
    mainPhone.value = "";
    deliveryDate.value = "";
    deliveryTime.value = "";
    deliveryAddress.value = "";
    noteText.value = "";

    setTimeout(() => {
      toastStore.show("Заказ успешно оформлен, ожидайте звонка");
    }, 180);
  } catch (error) {
    submitError.value = error instanceof Error
      ? error.message
      : "Не удалось оформить заказ";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold text-center mb-6">
      Корзина
    </h1>

    <div v-if="bouquetsStore.isLoading">Загрузка...</div>

    <div v-else-if="cartItems.length === 0">
      <p>Ваша корзина пустая.</p>
    </div>

    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.bouquetId"
        class="flex justify-between items-center border border-gray-300 p-5 rounded-xl mb-5 bg-white/80"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.bouquet!.image"
            class="w-20 h-20 object-cover rounded-lg"
            :alt="item.bouquet!.name"
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
            class="px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-50 transition"
          >
            −
          </button>

          <span class="text-lg w-8 text-center">
            {{ item.quantity }}
          </span>

          <button
            @click="cartStore.add(item.bouquetId)"
            class="px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-50 transition"
          >
            +
          </button>

          <button
            @click="cartStore.remove(item.bouquetId)"
            class="ml-3 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"
          >
            Удалить
          </button>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-between gap-6 flex-wrap">
        <h2 class="text-2xl font-semibold">
          Итого: <strong>{{ animatedTotal }} c.</strong>
        </h2>

        <button
          @click="openOrderModal"
          class="px-6 py-3 rounded-2xl bg-[#b08a72] text-white text-lg font-medium shadow-md hover:bg-[#9d7861] transition"
        >
          Оформить заказ
        </button>
      </div>
    </div>

    <transition name="order-modal">
      <div
        v-if="isOrderModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[0.3rem] px-4"
        @click.self="closeOrderModal"
      >
        <div
          class="w-full max-w-[36rem] rounded-[1.5rem] border border-black/10 bg-[#f8f3ee] shadow-[0_1.2rem_3rem_rgba(0,0,0,0.22)] px-8 py-7"
        >
          <div class="mb-6">
            <h2 class="text-[1.35rem] font-semibold leading-snug text-[#2f241d]">
              🚕💐  Чтобы оформить заказ на доставку, пожалуйста, заполните следующую информацию:
            </h2>
          </div>

          <form class="space-y-4" @submit.prevent="submitOrder">
            <input
              v-model="customerName"
              type="text"
              placeholder="Имя получателя"
              class="w-full rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
            />

            <input
              v-model="customerPhone"
              type="tel"
              placeholder="Номер получателя"
              class="w-full rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
            />

            <input
              v-model="mainPhone"
              type="tel"
              placeholder="Ваш номер для связи"
              class="w-full rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
            />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="deliveryDate"
                type="date"
                class="w-full rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
              />

              <input
                v-model="deliveryTime"
                type="time"
                class="w-full rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
              />
            </div>

            <textarea
              v-model="deliveryAddress"
              rows="3"
              placeholder="Адрес доставки"
              class="w-full resize-none rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
            />

            <textarea
              v-model="noteText"
              rows="3"
              placeholder="Текст записки к букету (по желанию)"
              class="w-full resize-none rounded-[1rem] border border-[#d8c8bb] bg-white/90 px-5 py-4 text-base outline-none transition focus:border-[#b08a72] focus:ring-2 focus:ring-[#b08a72]/20"
            />

            <p v-if="submitError" class="text-sm text-red-600">
              {{ submitError }}
            </p>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                @click="closeOrderModal"
                class="px-5 py-3 rounded-[1rem] border border-[#cfbeb1] text-[#5f4b3f] hover:bg-white/60 transition"
              >
                Отмена
              </button>

              <button
                type="submit"
                :disabled="!canSubmit"
                class="px-6 py-3 rounded-[1rem] bg-[#b08a72] text-white font-medium shadow-md transition enabled:hover:bg-[#9d7861] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? "Оформление..." : "Оформить" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.order-modal-enter-active,
.order-modal-leave-active {
  transition: opacity 0.28s ease;
}

.order-modal-enter-active > div,
.order-modal-leave-active > div {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.order-modal-enter-from,
.order-modal-leave-to {
  opacity: 0;
}

.order-modal-enter-from > div,
.order-modal-leave-to > div {
  opacity: 0;
  transform: translateY(0.8rem) scale(0.98);
}
</style>
