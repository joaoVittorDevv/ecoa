<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const productsStore = useProductsStore()
const activeIndexes = ref([0, 0, 0])
const isPaused = ref(false)
let timer
let nextCarousel = 0

const curations = computed(() => [
  {
    slug: 'anos-90',
    badge: 'Década de Ouro',
    title: 'Anos 90 & Denim Autêntico',
    description: 'Cortes oversized, jeans com memória e vestidos slip com caimento atemporal.',
    transition: 'gear-right',
    products: productsStore.products.filter(product => product.categorySlug === 'anos-90')
  },
  {
    slug: 'anos-70',
    badge: 'Anos 70',
    title: 'Cores da Terra & Tricôs',
    transition: 'gear-left',
    products: productsStore.products.filter(product => product.categorySlug === 'anos-70')
  },
  {
    slug: 'minimalista',
    badge: 'Estilo Essencial',
    title: 'Minimalismo & Linho',
    description: 'Silhuetas puras que valorizam a textura orgânica e duram gerações.',
    transition: 'gear-up',
    products: productsStore.products.filter(product => product.categorySlug === 'minimalista')
  }
])

function currentProduct(index) {
  const products = curations.value[index].products
  return products[activeIndexes.value[index] % products.length]
}

function advanceCarousel() {
  if (isPaused.value || document.hidden) return
  const products = curations.value[nextCarousel].products
  if (products.length > 1) activeIndexes.value[nextCarousel] = (activeIndexes.value[nextCarousel] + 1) % products.length
  nextCarousel = (nextCarousel + 1) % curations.value.length
}

function viewProduct(product) {
  router.push({ name: 'product-detail', params: { id: product.id } })
}

function selectCategory(slug) {
  router.push({ name: 'category-detail', params: { slug } })
}

onMounted(() => {
  timer = window.setInterval(advanceCarousel, 4000)
})

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <section
    class="w-full max-w-container-max mx-auto px-4 md:px-margin-desktop py-14 md:py-20"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @focusin="isPaused = true"
    @focusout="isPaused = false"
  >
    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
      <div>
        <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">Navegue por Décadas</span>
        <h2 class="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-bold">Curadoria por Época</h2>
      </div>
      <router-link to="/garimpo" class="text-xs font-label uppercase tracking-wider text-terracotta hover:underline inline-flex items-center gap-1 font-bold">
        Ver todas as épocas <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
      <div class="md:col-span-8 relative aspect-[4/3] md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden tactile-border tactile-hover">
        <Transition :name="curations[0].transition">
          <button
            :key="currentProduct(0).id"
            type="button"
            class="absolute inset-0 w-full h-full text-left group"
            :aria-label="`Ver ${currentProduct(0).name}`"
            @click="viewProduct(currentProduct(0))"
          >
            <img :src="currentProduct(0).image" :alt="currentProduct(0).name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span class="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/25 to-transparent"></span>
            <span class="absolute bottom-6 left-6 right-6 text-raw-linen">
              <span class="inline-block bg-raw-linen/90 text-walnut px-3 py-1 rounded-full font-label text-[11px] uppercase font-bold tracking-wider mb-2.5">{{ curations[0].badge }}</span>
              <strong class="block font-display text-2xl sm:text-3xl text-white mb-1">{{ currentProduct(0).name }}</strong>
              <span class="block text-sm text-white/80 mb-2">{{ curations[0].description }}</span>
              <span class="font-label text-sm font-bold text-white">R$ {{ currentProduct(0).price.toFixed(2).replace('.', ',') }}</span>
            </span>
          </button>
        </Transition>
        <button type="button" class="absolute top-4 right-4 z-10 bg-raw-linen/90 text-walnut px-3 py-1.5 rounded-full font-label text-[10px] uppercase font-bold hover:bg-white" @click="selectCategory(curations[0].slug)">Ver curadoria</button>
      </div>

      <div class="md:col-span-4 flex flex-col gap-5 md:gap-6">
        <div
          v-for="(_, index) in curations.slice(1)"
          :key="curations[index + 1].slug"
          class="relative flex-1 aspect-[4/3] md:aspect-auto md:h-[200px] rounded-2xl overflow-hidden tactile-border tactile-hover"
        >
          <Transition :name="curations[index + 1].transition">
            <button
              :key="currentProduct(index + 1).id"
              type="button"
              class="absolute inset-0 w-full h-full text-left group"
              :aria-label="`Ver ${currentProduct(index + 1).name}`"
              @click="viewProduct(currentProduct(index + 1))"
            >
              <img :src="currentProduct(index + 1).image" :alt="currentProduct(index + 1).name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span class="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/25 to-transparent"></span>
              <span class="absolute bottom-4 left-4 right-4 text-raw-linen">
                <span class="inline-block text-[10px] font-label uppercase tracking-widest text-terracotta bg-raw-linen/90 px-2 py-0.5 rounded-full font-bold">{{ curations[index + 1].badge }}</span>
                <strong class="block font-display text-lg text-white mt-1 leading-tight">{{ currentProduct(index + 1).name }}</strong>
                <span class="font-label text-xs font-bold text-white/90">R$ {{ currentProduct(index + 1).price.toFixed(2).replace('.', ',') }}</span>
              </span>
            </button>
          </Transition>
          <button type="button" class="absolute top-3 right-3 z-10 bg-raw-linen/90 text-walnut px-2.5 py-1 rounded-full font-label text-[9px] uppercase font-bold hover:bg-white" @click="selectCategory(curations[index + 1].slug)">Ver curadoria</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gear-right-enter-active, .gear-right-leave-active,
.gear-left-enter-active, .gear-left-leave-active,
.gear-up-enter-active, .gear-up-leave-active {
  transition: opacity 1200ms ease-in-out, transform 1200ms cubic-bezier(.25, .1, .25, 1);
}
.gear-right-leave-active, .gear-left-leave-active, .gear-up-leave-active { position: absolute; }
.gear-right-enter-from { opacity: 0; transform: translateX(8px); }
.gear-right-leave-to { opacity: 0; transform: translateX(-8px); }
.gear-left-enter-from { opacity: 0; transform: translateX(-8px); }
.gear-left-leave-to { opacity: 0; transform: translateX(8px); }
.gear-up-enter-from { opacity: 0; transform: translateY(6px); }
.gear-up-leave-to { opacity: 0; transform: translateY(-6px); }

@media (prefers-reduced-motion: reduce) {
  .gear-right-enter-active, .gear-right-leave-active,
  .gear-left-enter-active, .gear-left-leave-active,
  .gear-up-enter-active, .gear-up-leave-active { transition: opacity 150ms linear; }
}
</style>
