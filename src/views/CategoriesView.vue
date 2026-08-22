<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import anime from 'animejs'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/common/ProductCard.vue'

const props = defineProps({
  slug: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const currentSlug = computed(() => props.slug || route.params.slug || 'all')

const activeCategory = computed(() => {
  if (currentSlug.value === 'all') return null
  return productsStore.getCategoryBySlug(currentSlug.value)
})

const categoryProducts = computed(() => {
  if (currentSlug.value === 'all') {
    return productsStore.products
  }
  return productsStore.products.filter(p => p.categorySlug === currentSlug.value)
})

function animateCards() {
  nextTick(() => {
    anime({
      targets: '.category-card-item',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: anime.stagger(100),
      easing: 'easeOutQuad'
    })
  })
}

onMounted(() => {
  animateCards()
})

watch(currentSlug, () => {
  animateCards()
})

function selectCategory(slug) {
  if (slug === 'all') {
    router.push({ name: 'garimpo' })
  } else {
    router.push({ name: 'category-detail', params: { slug } })
  }
}
</script>

<template>
  <div class="min-h-screen py-8 md:py-12">
    <!-- Category Hero Header with Unique Visual Identity -->
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop mb-10">
      <!-- Active Category Custom Banner -->
      <div
        v-if="activeCategory"
        class="relative rounded-3xl overflow-hidden p-8 md:p-14 min-h-[300px] flex flex-col justify-end tactile-shadow texture-overlay transition-all duration-500"
        :style="{ backgroundColor: activeCategory.color }"
      >
        <img
          :src="activeCategory.image"
          :alt="activeCategory.name"
          class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/40 to-transparent"></div>

        <div class="relative z-10 max-w-2xl text-raw-linen">
          <span class="inline-block bg-raw-linen text-walnut px-3 py-1 rounded-full font-label text-xs uppercase font-bold tracking-widest mb-3">
            {{ activeCategory.tag }}
          </span>
          <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            {{ activeCategory.name }}
          </h1>
          <p class="font-slogan text-lg sm:text-xl text-raw-linen/90 mb-3 italic">
            "{{ activeCategory.headline }}"
          </p>
          <p class="font-body text-sm sm:text-base text-raw-linen/80 max-w-xl">
            {{ activeCategory.description }}
          </p>
        </div>
      </div>

      <!-- General Garimpo Header -->
      <div
        v-else
        class="bg-raw-linen rounded-3xl p-8 md:p-12 border border-primary/15 tactile-shadow text-center flex flex-col items-center"
      >
        <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold mb-2">
          Curadoria Geral
        </span>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl text-primary font-bold mb-3">
          Nosso Garimpo Completo
        </h1>
        <p class="font-slogan text-lg text-walnut/80 max-w-xl italic">
          Cada peça deste acervo é uma história preservada aguardando continuidade.
        </p>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-6">
        <button
          @click="selectCategory('all')"
          class="shrink-0 px-5 py-2.5 rounded-full font-label text-xs uppercase tracking-wider transition-all duration-200"
          :class="currentSlug === 'all' ? 'bg-primary text-raw-linen shadow-md font-bold' : 'bg-surface-container text-walnut hover:bg-surface-variant border border-primary/10'"
        >
          Todas as Épocas
        </button>

        <button
          v-for="cat in productsStore.categories"
          :key="cat.id"
          @click="selectCategory(cat.slug)"
          class="shrink-0 px-5 py-2.5 rounded-full font-label text-xs uppercase tracking-wider transition-all duration-200"
          :class="currentSlug === cat.slug ? 'bg-primary text-raw-linen shadow-md font-bold' : 'bg-surface-container text-walnut hover:bg-surface-variant border border-primary/10'"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Product Grid for Selected Category -->
    <main class="max-w-container-max mx-auto px-4 md:px-margin-desktop mb-16">
      <div class="flex justify-between items-center mb-6 pb-3 border-b border-primary/10 text-sm font-label text-on-surface-variant">
        <span>{{ categoryProducts.length }} {{ categoryProducts.length === 1 ? 'peça única encontrada' : 'peças únicas encontradas' }}</span>
        <router-link to="/produtos" class="text-terracotta hover:underline font-bold text-xs uppercase">
          Ver com filtros avançados
        </router-link>
      </div>

      <div
        v-if="categoryProducts.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
      >
        <div
          v-for="product in categoryProducts"
          :key="product.id"
          class="category-card-item opacity-0"
        >
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-16 bg-raw-linen/50 rounded-2xl border border-primary/10 my-6"
      >
        <span class="material-symbols-outlined text-4xl text-terracotta mb-2">search_off</span>
        <h4 class="font-headline text-lg font-bold text-primary mb-1">Nenhuma peça nesta curadoria no momento</h4>
        <p class="text-sm text-on-surface-variant mb-6">Novas peças são integradas ao acervo semanalmente.</p>
        <button
          @click="selectCategory('all')"
          class="bg-primary text-raw-linen px-6 py-2.5 rounded-full font-label text-xs uppercase tracking-wider font-bold"
        >
          Ver Todas as Peças
        </button>
      </div>
    </main>
  </div>
</template>
