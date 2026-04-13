<script setup lang="ts">
interface Props {
  title?: string;
  text?: string;
  image?: string;
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: false,
});
</script>

<template>
  <section
    class="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#fffaf5] via-[#fff7ef] to-[#f9efe3] px-3 py-3 md:px-8 md:py-8"
  >
    <div
      v-if="image"
      class="pointer-events-none absolute inset-y-0 right-0 w-[34%] overflow-hidden rounded-r-[1.6rem] md:w-[100%]"
    >
      <img
        :src="image"
        :alt="title || 'section image'"
        class="section-image h-full w-full object-cover object-right opacity-35 blur-[2px]"
      />

      <div
        class="absolute inset-0 rounded-r-[1.6rem] bg-gradient-to-r from-[#f9efe3] via-[#f9efe3]/78 via-45% to-transparent"
      />
    </div>

    <div class="relative z-10 max-w-[44rem]">
      <h2
        v-if="showTitle && title"
        class="mb-4 text-[1.5rem] font-semibold tracking-tight text-[#3f2d22] md:text-[1.7rem]"
      >
        {{ title }}
      </h2>

      <p
        v-if="text"
        class="text-[1.02rem] leading-8 text-[#5f4a3e] md:text-[1.08rem]"
      >
        {{ text }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.section-image {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.15) 10%,
    rgba(0, 0, 0, 0.45) 22%,
    rgba(0, 0, 0, 0.75) 34%,
    rgba(0, 0, 0, 1) 48%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.15) 10%,
    rgba(0, 0, 0, 0.45) 22%,
    rgba(0, 0, 0, 0.75) 34%,
    rgba(0, 0, 0, 1) 48%
  );
}
</style>
