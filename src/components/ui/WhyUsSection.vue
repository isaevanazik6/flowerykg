<script setup lang="ts">
defineProps<{
  items: { title: string; text: string }[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <article
      v-for="(i, idx) in items"
      :key="idx"
      class="group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#fffaf5] via-[#fff7ef] to-[#f7ecdf] px-6 py-7 text-center shadow-[0_1rem_2.5rem_rgba(96,68,44,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.5rem_3rem_rgba(96,68,44,0.11)]"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-[#f2deca]/30 opacity-80"
      />

      <div class="relative z-10">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3e6] text-[1.35rem] font-semibold text-[#a67a58] shadow-sm"
        >
          {{ idx + 1 }}
        </div>

        <h3 class="mb-3 text-[1.3rem] font-semibold tracking-tight text-[#3f2d22]">
          {{ i.title }}
        </h3>

        <p class="text-[0.98rem] leading-7 text-[#6a5244]">
          {{ i.text }}
        </p>
      </div>
    </article>
  </div>
</template>
