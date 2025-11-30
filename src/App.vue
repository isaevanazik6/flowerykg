<script setup lang="ts">
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import {onMounted} from "vue";
import {useContactsStore} from "@/stores/contacts-store.ts";
import Toast from "@/components/base/Toast.vue";

const contactsStore = useContactsStore();

onMounted(() => {
  contactsStore.load();
});
</script>

<template>
  <Navbar />
  <main class="min-h-screen bg-[#faf7f4]">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>
  <Footer />
  <Toast />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
