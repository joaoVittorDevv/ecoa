<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import anime from 'animejs'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/common/ProductCard.vue'

const productsStore = useProductsStore()

const isFilterDrawerOpen = ref(false)

function animateProductGrid() {
  nextTick(() => {
    anime({
      targets: '.catalog-grid-item',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(80),
      easing: 'easeOutQuad'
    })
  })
}

onMounted(() => {
  animateProductGrid()
})

watch(() => productsStore.filteredProducts, () => {
  animateProductGrid()
})
</script>

<template>
  <div class="min-h-screen py-8 md:py-12">
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop">
      <!-- Title & Search Bar -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-primary/10">
        <div>
          <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
            Acervo Completo
          </span>
          <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold">
            Catálogo de Peças Únicas
          </h1>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <input
            v-model="productsStore.searchQuery"
            type="text"
            placeholder="Buscar por nome, história, tecido..."
            class="w-full pl-10 pr-4 py-2.5 bg-raw-linen border border-primary/20 rounded-full text-sm focus:outline-none focus:border-primary text-walnut placeholder-walnut/50"
          />
          <span class="material-symbols-outlined absolute left-3 top-3 text-walnut/50 text-[18px]">search</span>
          <button
            v-if="productsStore.searchQuery"
            @click="productsStore.searchQuery = ''"
            class="absolute right-3 top-3 text-walnut/50 hover:text-walnut text-[18px]"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      <!-- Controls Row: Filter Trigger & Sort Options -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <!-- Filter Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Category Select -->
          <div class="relative">
            <select
              v-model="productsStore.selectedCategory"
              class="appearance-none bg-raw-linen border border-primary/15 rounded-full pl-4 pr-9 py-2 text-xs font-label uppercase tracking-wider text-walnut focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="all">Todas as Curadorias</option>
              <option v-for="cat in productsStore.categories" :key="cat.id" :value="cat.slug">
                {{ cat.name }}
              </option>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-walnut/60">expand_more</span>
          </div>

          <!-- Era Select -->
          <div class="relative">
            <select
              v-model="productsStore.selectedEra"
              class="appearance-none bg-raw-linen border border-primary/15 rounded-full pl-4 pr-9 py-2 text-xs font-label uppercase tracking-wider text-walnut focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="all">Todas as Décadas</option>
              <option value="Anos 70">Anos 70</option>
              <option value="Anos 80">Anos 80</option>
              <option value="Anos 90">Anos 90</option>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-walnut/60">expand_more</span>
          </div>

          <!-- Reset Button if filters active -->
          <button
            v-if="productsStore.selectedCategory !== 'all' || productsStore.selectedEra !== 'all' || productsStore.searchQuery"
            @click="productsStore.resetFilters"
            class="text-xs font-label text-terracotta hover:underline uppercase tracking-wider font-bold inline-flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-[14px]">refresh</span> Limpar Filtros
          </button>
        </div>

        <!-- Sort Select -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-label text-on-surface-variant uppercase hidden sm:inline">Ordenar:</span>
          <div class="relative">
            <select
              v-model="productsStore.sortBy"
              class="appearance-none bg-raw-linen border border-primary/15 rounded-full pl-4 pr-9 py-2 text-xs font-label uppercase tracking-wider text-walnut focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="impact">Maior Impacto Poupado</option>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-walnut/60">sort</span>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-6">
        Exibindo {{ productsStore.filteredProducts.length }} de {{ productsStore.products.length }} peças únicas
      </div>

      <!-- Products Grid -->
      <main
        v-if="productsStore.filteredProducts.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-20"
      >
        <div
          v-for="product in productsStore.filteredProducts"
          :key="product.id"
          class="catalog-grid-item opacity-0"
        >
          <ProductCard :product="product" />
        </div>
      </main>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20 bg-raw-linen/60 rounded-3xl border border-primary/10 my-8 flex flex-col items-center"
      >
        <span class="material-symbols-outlined text-5xl text-terracotta mb-3">search_off</span>
        <h3 class="font-headline text-xl font-bold text-primary mb-2">Nenhuma peça corresponde aos filtros</h3>
        <p class="text-sm text-on-surface-variant max-w-md mb-6">
          Tente remover filtros de época ou buscar por termos mais genéricos como "denim", "seda" ou "blazer".
        </p>
        <button
          @click="productsStore.resetFilters"
          class="bg-primary text-raw-linen px-8 py-3 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-colors"
        >
          Ver Todo o Catálogo
        </button>
      </div>
    </div>
  </div>
</template>
