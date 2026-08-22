<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'
import HeroSection from '@/components/home/HeroSection.vue'
import EraCurations from '@/components/home/EraCurations.vue'
import SustainableImpactBanner from '@/components/home/SustainableImpactBanner.vue'
import ProductCard from '@/components/common/ProductCard.vue'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const productsStore = useProductsStore()

const latestProducts = productsStore.products.slice(0, 4)

onMounted(() => {
  anime({
    targets: '.product-stagger-item',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: anime.stagger(150, { start: 200 }),
    easing: 'easeOutQuad'
  })
})

function viewAllProducts() {
  router.push({ name: 'products' })
}

function goToPhilosophy() {
  // Animação de transição fluida antes da troca de página
  anime({
    targets: '#home-root-container',
    opacity: [1, 0],
    translateY: [0, -15],
    duration: 400,
    easing: 'easeInOutQuad',
    complete: () => {
      router.push({ name: 'philosophy' })
    }
  })
}
</script>

<template>
  <div id="home-root-container" class="flex flex-col min-h-screen transition-opacity duration-300">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Era Curations (Bento Grid) -->
    <EraCurations />

    <!-- Latest Arrivals (Últimos Ecos) -->
    <section class="bg-surface-container-low py-16 md:py-24 border-y border-primary/10">
      <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div class="flex items-end justify-between mb-10">
          <div>
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
              Recém-Garimpados
            </span>
            <h3 class="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold">
              Últimos Ecos
            </h3>
          </div>
          <button
            @click="viewAllProducts"
            class="text-xs font-label uppercase tracking-wider text-secondary hover:text-terracotta transition-colors font-bold inline-flex items-center gap-1"
          >
            Ver todos <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div
            v-for="product in latestProducts"
            :key="product.id"
            class="product-stagger-item opacity-0"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- Collective Impact Banner -->
    <SustainableImpactBanner />

    <!-- Manifesto / How Circular Works -->
    <section class="py-16 md:py-24 max-w-container-max mx-auto px-4 md:px-margin-desktop">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-2">
          Nossa Filosofia
        </span>
        <h3 class="font-display text-2xl sm:text-3xl md:text-4xl text-primary font-bold mb-4">
          Como o Ciclo Ecoa Funciona
        </h3>
        <p class="font-body text-base text-on-surface-variant leading-relaxed">
          Comprar de segunda mão é um ato de preservação cultural e ambiental. Cuidamos de cada etapa com maestria.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="p-8 rounded-2xl bg-raw-linen border border-primary/10 flex flex-col items-center text-center tactile-shadow">
          <div class="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[28px]">search_hands_free</span>
          </div>
          <h4 class="font-headline text-lg font-bold text-primary mb-2">1. Garimpo Afetivo</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            Localizamos peças com identidade única, tecidos nobres e acabamentos artesanais que atravessaram décadas.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-raw-linen border border-primary/10 flex flex-col items-center text-center tactile-shadow">
          <div class="w-14 h-14 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[28px]">local_laundry_service</span>
          </div>
          <h4 class="font-headline text-lg font-bold text-primary mb-2">2. Cuidado &amp; Memória</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            Higienização ecológica especializada, checagem minuciosa de cada costura e resgate da história original da peça.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-raw-linen border border-primary/10 flex flex-col items-center text-center tactile-shadow">
          <div class="w-14 h-14 rounded-full bg-deep-forest/10 text-deep-forest flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[28px]">cycle</span>
          </div>
          <h4 class="font-headline text-lg font-bold text-primary mb-2">3. O Novo Ciclo</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            A peça chega em suas mãos em embalagem sustentável para continuar escrevendo novas memórias memoráveis.
          </p>
        </div>
      </div>

      <!-- Highlighted Call-to-Action Button to Learn More -->
      <div class="flex justify-center">
        <button
          @click="goToPhilosophy"
          class="group bg-primary text-raw-linen hover:bg-primary-container active:scale-95 transition-all duration-300 px-8 py-4 rounded-full font-label text-sm uppercase tracking-wider inline-flex items-center gap-3 shadow-lg shadow-primary/20 font-bold border border-primary/20"
        >
          <span class="material-symbols-outlined text-[20px] text-terracotta group-hover:rotate-12 transition-transform duration-300">auto_stories</span>
          <span>Conhecer Nossa Filosofia &amp; Valores</span>
          <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
        </button>
      </div>
    </section>
  </div>
</template>
