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
    <router-view />
  </main>
  <Footer />
  <Toast />
</template>
