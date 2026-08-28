<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import { useCustomerStore } from '@/stores/customer'
import EcoaLogo from '@/components/common/EcoaLogo.vue'
import CategoryDropdown from '@/components/common/CategoryDropdown.vue'

const router = useRouter()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const customerStore = useCustomerStore()

const isSearchOpen = ref(false)
const searchInput = ref('')
const isCategoryDropdownOpen = ref(false)
let dropdownTimeout = null

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

function handleCatalogMouseEnter() {
  if (dropdownTimeout) clearTimeout(dropdownTimeout)
  isCategoryDropdownOpen.value = true
}

function handleCatalogMouseLeave() {
  dropdownTimeout = setTimeout(() => {
    isCategoryDropdownOpen.value = false
  }, 250)
}

function toggleCategoryDropdown() {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value
}

function closeDropdown() {
  isCategoryDropdownOpen.value = false
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

      <!-- Center Desktop Navigation Links (Início, Garimpo, Catálogo com Dropdown) -->
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

        <!-- Catálogo Link with Category Dropdown -->
        <div
          class="relative py-1"
          @mouseenter="handleCatalogMouseEnter"
          @mouseleave="handleCatalogMouseLeave"
        >
          <div class="flex items-center gap-1">
            <router-link
              to="/produtos"
              class="font-label text-sm uppercase tracking-wider text-walnut hover:text-primary transition-colors inline-flex items-center gap-1"
              active-class="text-primary font-semibold border-b-2 border-primary"
            >
              <span>Catálogo</span>
            </router-link>
            <button
              @click.stop="toggleCategoryDropdown"
              class="p-0.5 text-walnut hover:text-primary transition-transform duration-200"
              :class="{ 'rotate-180 text-primary': isCategoryDropdownOpen }"
              aria-label="Abrir menu de categorias"
            >
              <span class="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>

          <!-- Dropdown Menu Component -->
          <CategoryDropdown
            :is-open="isCategoryDropdownOpen"
            @close="closeDropdown"
          />
        </div>
      </nav>

      <!-- Right Desktop Actions: Search, Meu Impacto, Favoritos & Sacola -->
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
          class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-label uppercase tracking-wider font-bold transition-all tactile-shadow"
          :class="$route.name === 'profile' ? 'bg-primary text-raw-linen border-primary' : 'bg-raw-linen text-primary border-primary/15 hover:bg-surface-variant hover:border-primary/30'"
          title="Ver meu impacto ambiental e pedidos"
        >
          <span class="material-symbols-outlined text-[18px]" :class="$route.name === 'profile' ? 'text-raw-linen' : 'text-deep-forest'">eco</span>
          <span>Meu Impacto</span>
        </router-link>

        <!-- Favoritos Button with Dynamic Badge -->
        <router-link
          to="/perfil"
          class="relative p-2 rounded-full text-walnut hover:bg-surface-variant hover:text-terracotta transition-colors flex items-center justify-center"
          title="Minhas Peças Favoritas"
        >
          <span class="material-symbols-outlined text-[22px]" :class="{ 'text-terracotta': customerStore.profile.favorites.length > 0 }">
            favorite
          </span>
          <span
            v-if="customerStore.profile.favorites.length > 0"
            class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-terracotta text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
          >
            {{ customerStore.profile.favorites.length }}
          </span>
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
            class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-raw-linen text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
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
