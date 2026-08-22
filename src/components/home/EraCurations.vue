<script setup>
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const productsStore = useProductsStore()

function selectCategory(slug) {
  router.push({ name: 'category-detail', params: { slug } })
}
</script>

<template>
  <section class="max-w-container-max mx-auto px-4 md:px-margin-desktop py-14 md:py-20">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
      <div>
        <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
          Navegue por Décadas
        </span>
        <h2 class="font-headline text-2xl sm:text-3xl md:text-4xl text-primary font-bold">
          Curadoria por Época
        </h2>
      </div>
      <router-link
        to="/garimpo"
        class="text-xs font-label uppercase tracking-wider text-terracotta hover:underline inline-flex items-center gap-1 font-bold"
      >
        Ver todas as épocas <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </router-link>
    </div>

    <!-- Bento Grid of Eras -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
      <!-- Big Bento Item: Anos 90 -->
      <div
        @click="selectCategory('anos-90')"
        class="md:col-span-8 relative aspect-[4/3] md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden group cursor-pointer tactile-border tactile-hover"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_u77AIpW4mvFwyZUFmT2ehQ37r9w58bfeP3bwUV0VwveLYeOSRIm8Yl2tEHmryPggb6UCYTNNyKdzhCFMjWCe7HPICkA6cGU9eVbe92JdEFRpR4wIoC9eHVJVCcrd0ujU16h-ELab6cy3j6C5_ROezak22T40VblWu3Ntwm2aYlKltYkwX_kHngJkctngVDeGtjdyWoGdlS09RJP3XUfkKqnHmXbPFoSkMXkohWVqml_3cjDr_Dsw"
          alt="Curadoria Anos 90"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-walnut/80 via-walnut/20 to-transparent"></div>
        
        <div class="absolute bottom-6 left-6 right-6 text-raw-linen">
          <span class="inline-block bg-raw-linen/90 backdrop-blur-sm text-walnut px-3 py-1 rounded-full font-label text-[11px] uppercase font-bold tracking-wider mb-2.5">
            Década de Ouro
          </span>
          <h3 class="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
            Anos 90 &amp; Denim Autêntico
          </h3>
          <p class="text-sm text-white/80 font-body max-w-md hidden sm:block">
            Cortes oversized, jeans com memória e vestidos slip com caimento atemporal.
          </p>
        </div>
      </div>

      <!-- Right Column: 2 Stacked Bento Items -->
      <div class="md:col-span-4 flex flex-col gap-5 md:gap-6">
        <!-- Item: Anos 70 -->
        <div
          @click="selectCategory('anos-70')"
          class="relative flex-1 aspect-[4/3] md:aspect-auto md:h-[200px] rounded-2xl overflow-hidden group cursor-pointer tactile-border tactile-hover"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxSHjQBc_t8uxxf_cM4Oj014lyDUkdfLkq0z5Qg7eWnFAFJXRcoWSrP9uR4ZaL6q8MnDqdr632H_f0GAkLyDp8wDLvE_JRTANLr1NIvghNfczNjMpyk2LCJT0RYzZhqKeYhvvgj4sCA0dRmt-J8rQQqDQ0UJKtJpsFwoXJ3kMvlPyzXJfx9l9P2nQ57a0eugX2wnakoXqfz6U--NAR-2R2j6BdITQFSQdw6XN5Q0xsKxlWfH0zicO7"
            alt="Curadoria Anos 70"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-walnut/80 via-walnut/30 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-raw-linen">
            <span class="text-[10px] font-label uppercase tracking-widest text-terracotta bg-raw-linen/90 px-2 py-0.5 rounded-full font-bold">
              Anos 70
            </span>
            <h4 class="font-display text-lg font-bold text-white mt-1">Cores da Terra &amp; Tricôs</h4>
          </div>
        </div>

        <!-- Item: Minimalismo -->
        <div
          @click="selectCategory('minimalista')"
          class="relative flex-1 aspect-[4/3] md:aspect-auto md:h-[195px] rounded-2xl overflow-hidden group cursor-pointer bg-surface-container flex flex-col justify-between p-5 text-left tactile-border tactile-hover"
        >
          <div class="flex justify-between items-start">
            <span class="inline-block bg-terracotta/10 text-terracotta px-2.5 py-1 rounded-full font-label text-[10px] uppercase font-bold tracking-wider">
              Estilo Essencial
            </span>
            <span class="material-symbols-outlined text-terracotta text-[20px]">auto_awesome</span>
          </div>
          <div>
            <h4 class="font-display text-lg font-bold text-primary mb-1">Minimalismo &amp; Linho</h4>
            <p class="font-body text-xs text-on-surface-variant line-clamp-2">
              Silhuetas puras que valorizam a textura orgânica e duram gerações.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
