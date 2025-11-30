<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {getAverageBrightness} from "@/utils/brightness.ts";

const props = defineProps<{
  title: string;
  subtitle: string;
  buttonText: string;
  routeTo?: string;
  images?: string[];
}>();

const current = ref(0);
let interval: any = null;

const hasCarousel = computed(() => props.images && props.images.length > 1);

const brightness = ref(0.5);

watch(() => current.value, async () => {
  const img = props.images?.[current.value];
  if (!img) return;

  brightness.value = await getAverageBrightness(img);
});

onMounted(() => {
  if (hasCarousel.value) {
    interval = setInterval(() => {
      current.value = (current.value + 1) % props.images!.length;
    }, 5000);
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <section
    class="relative w-full h-[450px] md:h-[520px] rounded-xl overflow-hidden flex items-center justify-center"
  >
    <div v-if="props.images?.length" class="absolute inset-0">

      <transition-group name="hero-fade" tag="div" class="w-full h-full">

        <div
          v-for="(img, index) in props.images"
          :key="img + index"
          v-show="index === current"
          class="absolute inset-0 bg-cover bg-center blur-sm brightness-75
         transition-opacity duration-[1200ms]"
          :style="{
                  backgroundImage: `url('${img}')`,
                  animation: 'parallaxSlide 8s ease-in-out infinite, zoomSlow 5s ease-in-out forwards'
                }"
        ></div>

      </transition-group>
    </div>

    <div
      class="absolute inset-0 transition-all duration-300"
      :style="{
              backgroundColor: `rgba(0,0,0,${1 - brightness})`
            }"
    ></div>

    <div class="relative z-10 text-center text-white px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        {{ title }}
      </h1>

      <p class="text-lg md:text-xl mb-6 max-w-xl mx-auto drop-shadow">
        {{ subtitle }}
      </p>

      <router-link v-if="routeTo" :to="routeTo">
        <BaseButton size="lg">
          {{ buttonText }}
        </BaseButton>
      </router-link>

      <BaseButton v-else size="lg">
        {{ buttonText }}
      </BaseButton>
    </div>
  </section>
</template>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

@keyframes zoomSlow {
  0% {
    transform: scale(0.10);
  }
  100% {
    transform: scale(1.20);
  }
}

@keyframes parallaxSlide {
  0% {
    background-position: center;
  }
  50% {
    background-position: calc(50% + 12px) center;
  }
  100% {
    background-position: center;
  }
}
</style>
