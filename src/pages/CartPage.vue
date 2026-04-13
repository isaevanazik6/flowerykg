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
  <section class="relative overflow-hidden bg-[#fffaf4]">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#f5dfcb] blur-3xl opacity-60"
      />
      <div
        class="absolute top-52 -right-20 h-80 w-80 rounded-full bg-[#ead2bd] blur-3xl opacity-45"
      />
      <div
        class="absolute bottom-12 left-1/3 h-64 w-64 rounded-full bg-[#f3e7d8] blur-3xl opacity-50"
      />
    </div>

    <div class="relative mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div
        class="mx-auto mb-8 max-w-4xl rounded-[2rem] border border-[#eadaca] bg-white/75 px-7 py-8 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:px-10 md:py-10"
      >

        <h1 class="mb-4 text-4xl font-bold tracking-tight text-[#3c2a20] md:text-5xl">
          Корзина
        </h1>

      </div>

      <div v-if="bouquetsStore.isLoading" class="grid gap-5">
        <div
          v-for="n in 3"
          :key="n"
          class="h-36 animate-pulse rounded-[1.8rem] border border-[#eadaca] bg-white/70 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.06)]"
        />
      </div>

      <div
        v-else-if="cartItems.length === 0"
        class="mx-auto max-w-3xl rounded-[2rem] border border-[#eadaca] bg-white/72 px-8 py-12 text-center shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm"
      >
        <div
          class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e6] text-3xl"
        >
          🛒
        </div>

        <h2 class="mb-3 text-3xl font-semibold tracking-tight text-[#3c2a20]">
          Ваша корзина пока пуста
        </h2>

        <p class="mx-auto max-w-xl text-[1rem] leading-7 text-[#6f5646]">
          Добавьте понравившиеся букеты в корзину, и здесь появится список выбранных
          композиций для оформления заказа.
        </p>
      </div>

      <div v-else class="space-y-5">
        <article
          v-for="item in cartItems"
          :key="item.bouquetId"
          class="flex flex-col gap-5 rounded-[1.8rem] border border-[#eadaca] bg-white/76 p-5 shadow-[0_1rem_2.5rem_rgba(96,68,44,0.07)] backdrop-blur-sm transition duration-300 hover:shadow-[0_1.4rem_3rem_rgba(96,68,44,0.10)] md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center gap-4">
            <div class="overflow-hidden rounded-[1.2rem]">
              <img
                :src="item.bouquet!.image"
                class="h-24 w-24 object-cover md:h-28 md:w-28"
                :alt="item.bouquet!.name"
              />
            </div>

            <div>
              <h3 class="mb-2 text-[1.4rem] font-semibold tracking-tight text-[#3c2a20]">
                {{ item.bouquet!.name }}
              </h3>

              <p class="text-[0.98rem] leading-6 text-[#6f5646]">
                {{ item.bouquet!.shortDescription }}
              </p>

              <p class="mt-2 text-lg font-semibold text-[#8e6447]">
                {{ item.bouquet!.price }} c.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 md:justify-end">
            <div class="flex items-center gap-2 rounded-full bg-[#fff6ec] px-2 py-2">
              <button
                @click="cartStore.decrease(item.bouquetId)"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c4b3] bg-white text-[#6a5244] transition hover:bg-[#f8eee4]"
              >
                −
              </button>

              <span class="w-8 text-center text-lg font-medium text-[#4b392f]">
                {{ item.quantity }}
              </span>

              <button
                @click="cartStore.add(item.bouquetId)"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c4b3] bg-white text-[#6a5244] transition hover:bg-[#f8eee4]"
              >
                +
              </button>
            </div>

            <button
              @click="cartStore.remove(item.bouquetId)"
              class="rounded-full border border-[#e1bbb4] bg-[#fff5f3] px-4 py-2 text-sm font-medium text-[#b15e55] transition hover:bg-[#fdebe7]"
            >
              Удалить
            </button>
          </div>
        </article>

        <div
          class="mt-6 flex flex-col gap-4 rounded-[2rem] border border-[#eadaca] bg-white/76 px-6 py-6 shadow-[0_1.2rem_3rem_rgba(96,68,44,0.08)] backdrop-blur-sm md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p class="mb-1 text-sm uppercase tracking-[0.16em] text-[#a27b5e]">
              Итог заказа
            </p>
            <h2 class="text-3xl font-bold tracking-tight text-[#3c2a20]">
              {{ animatedTotal }} c.
            </h2>
          </div>

          <button
            @click="openOrderModal"
            class="inline-flex items-center justify-center rounded-full bg-[#b08a72] px-7 py-3 text-lg font-medium text-white shadow-md transition hover:bg-[#9d7861]"
          >
            Оформить заказ
          </button>
        </div>
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
              🚕💐 Чтобы оформить заказ на доставку, пожалуйста, заполните следующую информацию:
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

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
  </section>
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
