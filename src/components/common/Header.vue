<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import { useCustomerStore } from '@/stores/customer'
import EcoaLogo from '@/components/common/EcoaLogo.vue'

const router = useRouter()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const customerStore = useCustomerStore()

const isSearchOpen = ref(false)
const searchInput = ref('')

function handleSearchSubmit() {
  if (searchInput.value.trim()) {
    productsStore.searchQuery = searchInput.value.trim()
    router.push({ name: 'products' })
    isSearchOpen.value = false
  }
}

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
}
</script>

<template>
  <header class="w-full top-0 sticky z-40 bg-background/95 backdrop-blur-md border-b border-primary/10 transition-all duration-300">
    <div class="flex justify-between items-center px-4 md:px-gutter py-3.5 max-w-container-max mx-auto">
      <!-- Left Logo with Official Hanger Ripple Symbol -->
      <div class="flex items-center gap-3">
        <router-link
          to="/"
          class="flex items-center text-primary hover:opacity-85 transition-opacity group"
          title="Ecoa Moda Circular"
        >
          <EcoaLogo variant="reduced" size="md" />
        </router-link>
      </div>

      <!-- Center Desktop Navigation Links (Início, Garimpo, Catálogo) -->
      <nav class="hidden md:flex items-center gap-8">
        <router-link
          to="/"
          class="font-label text-sm uppercase tracking-wider text-walnut hover:text-primary transition-colors py-1"
          active-class="text-primary font-semibold border-b-2 border-primary"
        >
          Início
        </router-link>
        <router-link
          to="/garimpo"
          class="font-label text-sm uppercase tracking-wider text-walnut hover:text-primary transition-colors py-1"
          active-class="text-primary font-semibold border-b-2 border-primary"
        >
          Garimpo
        </router-link>
        <router-link
          to="/produtos"
          class="font-label text-sm uppercase tracking-wider text-walnut hover:text-primary transition-colors py-1"
          active-class="text-primary font-semibold border-b-2 border-primary"
        >
          Catálogo
        </router-link>
      </nav>

      <!-- Right Desktop Actions: Search, Meu Impacto & Sacola -->
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Search Trigger -->
        <button
          @click="toggleSearch"
          class="p-2 rounded-full text-walnut hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"
          title="Buscar peças"
        >
          <span class="material-symbols-outlined text-[22px]">search</span>
        </button>

        <!-- Desktop 'Meu Impacto' Button with Eco Icon -->
        <router-link
          to="/perfil"
          class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-raw-linen border border-primary/15 text-xs font-label uppercase tracking-wider text-primary font-bold hover:bg-surface-variant hover:border-primary/30 transition-all tactile-shadow"
          title="Ver meu impacto ambiental e pedidos"
          active-class="bg-primary text-raw-linen border-primary"
        >
          <span class="material-symbols-outlined text-[18px] text-deep-forest">eco</span>
          <span>Meu Impacto</span>
        </router-link>

        <!-- Sacola Button with Dynamic Badge -->
        <router-link
          to="/sacola"
          class="relative p-2 rounded-full text-walnut hover:bg-surface-variant hover:text-primary transition-colors flex items-center justify-center"
          title="Sacola de Compras"
        >
          <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
          <span
            v-if="cartStore.itemCount > 0"
            class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-terracotta text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
          >
            {{ cartStore.itemCount }}
          </span>
        </router-link>
      </div>
    </div>

    <!-- Collapsible Search Bar -->
    <div
      v-if="isSearchOpen"
      class="border-t border-primary/10 bg-raw-linen px-4 py-3 max-w-container-max mx-auto transition-all animate-fadeIn"
    >
      <form @submit.prevent="handleSearchSubmit" class="flex items-center gap-2 max-w-xl mx-auto">
        <div class="relative flex-1">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Buscar por peça, década, tecido ou história..."
            class="w-full pl-10 pr-4 py-2 bg-surface rounded-full border border-primary/20 text-sm focus:outline-none focus:border-primary text-walnut placeholder-walnut/50"
            autofocus
          />
          <span class="material-symbols-outlined absolute left-3 top-2.5 text-walnut/50 text-[18px]">search</span>
        </div>
        <button
          type="submit"
          class="bg-primary text-raw-linen px-5 py-2 rounded-full text-xs font-label uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          Buscar
        </button>
        <button
          type="button"
          @click="isSearchOpen = false"
          class="text-walnut/60 hover:text-walnut p-1"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </form>
    </div>
  </header>
</template>
