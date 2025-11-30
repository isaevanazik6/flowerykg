<script setup lang="ts">
</script>

<template>
  <footer class="bg-white border-t mt-16">
    <div class="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

      <div>
        <h2 class="text-2xl font-semibold tracking-wide mb-3">Flowery KG</h2>
        <p class="text-gray-600 leading-relaxed">
          Цветы - это эмоции. Мы создаём букеты с любовью и вниманием к деталям.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-3">Меню</h3>
        <ul class="space-y-2 text-gray-600">
          <li><router-link to="/" class="hover:text-pink-500 transition">Главная</router-link></li>
          <li><router-link to="/catalog" class="hover:text-pink-500 transition">Каталог</router-link></li>
          <li><router-link to="/about" class="hover:text-pink-500 transition">О нас</router-link></li>
          <li><router-link to="/delivery" class="hover:text-pink-500 transition">Доставка</router-link></li>
          <li><router-link to="/contacts" class="hover:text-pink-500 transition">Контакты</router-link></li>
        </ul>
      </div>

    </div>

    <div class="border-t py-4 text-center text-gray-500 text-sm">
      © {{ new Date().getFullYear() }} FlowerStore
    </div>
  </footer>
</template>
