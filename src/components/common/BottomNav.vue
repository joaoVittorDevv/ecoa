<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low/95 backdrop-blur-lg border-t border-primary/10 shadow-[0_-4px_20px_rgba(44,29,17,0.08)] flex justify-around items-center h-16 px-2">
    <!-- Home -->
    <router-link
      to="/"
      class="flex flex-col items-center justify-center py-1 px-3 rounded-full text-on-surface-variant hover:text-primary transition-all active:scale-90"
      active-class="text-primary font-semibold"
    >
      <span class="material-symbols-outlined text-[22px]">home</span>
      <span class="text-[10px] font-label uppercase tracking-tight mt-0.5">Início</span>
    </router-link>

    <!-- Garimpo -->
    <router-link
      to="/garimpo"
      class="flex flex-col items-center justify-center py-1 px-3 rounded-full text-on-surface-variant hover:text-primary transition-all active:scale-90"
      active-class="text-primary font-semibold"
    >
      <span class="material-symbols-outlined text-[22px]">temp_preferences_custom</span>
      <span class="text-[10px] font-label uppercase tracking-tight mt-0.5">Garimpo</span>
    </router-link>

    <!-- Produtos -->
    <router-link
      to="/produtos"
      class="flex flex-col items-center justify-center py-1 px-3 rounded-full text-on-surface-variant hover:text-primary transition-all active:scale-90"
      active-class="text-primary font-semibold"
    >
      <span class="material-symbols-outlined text-[22px]">styler</span>
      <span class="text-[10px] font-label uppercase tracking-tight mt-0.5">Catálogo</span>
    </router-link>

    <!-- Sacola -->
    <router-link
      to="/sacola"
      class="relative flex flex-col items-center justify-center py-1 px-3 rounded-full text-on-surface-variant hover:text-primary transition-all active:scale-90"
      active-class="text-primary font-semibold"
    >
      <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
      <span
        v-if="cartStore.itemCount > 0"
        class="absolute top-0 right-2 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center"
      >
        {{ cartStore.itemCount }}
      </span>
      <span class="text-[10px] font-label uppercase tracking-tight mt-0.5">Sacola</span>
    </router-link>

    <!-- Perfil -->
    <router-link
      to="/perfil"
      class="flex flex-col items-center justify-center py-1 px-3 rounded-full text-on-surface-variant hover:text-primary transition-all active:scale-90"
      active-class="text-primary font-semibold"
    >
      <span class="material-symbols-outlined text-[22px]">person</span>
      <span class="text-[10px] font-label uppercase tracking-tight mt-0.5">Perfil</span>
    </router-link>
  </nav>
</template>
