<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'
import HangerRippleAnimation from '@/components/animations/HangerRippleAnimation.vue'

const router = useRouter()

onMounted(() => {
  // Staggered reveal of hero text elements
  anime({
    targets: '.hero-reveal',
    opacity: [0, 1],
    translateY: [25, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: anime.stagger(200, { start: 300 })
  })
})

function goToGarimpo() {
  router.push({ name: 'garimpo' })
}

function goToProducts() {
  router.push({ name: 'products' })
}
</script>

<template>
  <section class="relative min-h-[580px] md:min-h-[640px] flex items-center justify-center overflow-hidden px-4 md:px-margin-desktop py-16 bg-gradient-to-b from-background via-surface-container-low to-background">
    <!-- Anime.js Hanger Ripple SVG Background Overlay -->
    <div class="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
      <HangerRippleAnimation />
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
      <!-- Tag / Pill -->
      <div class="hero-reveal opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-raw-linen border border-primary/15 text-xs font-label uppercase tracking-widest text-primary font-bold mb-6 tactile-shadow">
        <span class="material-symbols-outlined text-[16px] text-terracotta">recycling</span>
        Moda Circular &amp; Sustentável
      </div>

      <!-- Main Headline -->
      <h1 class="hero-reveal opacity-0 font-display text-4xl sm:text-5xl md:text-6xl text-primary font-bold tracking-tight mb-6 leading-tight">
        Quando você compra roupa usada, <br class="hidden sm:inline" />
        <span class="text-terracotta font-serif italic font-normal">a história ecoa.</span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-reveal opacity-0 font-slogan text-lg sm:text-xl text-walnut/80 mb-10 max-w-2xl mx-auto leading-relaxed">
        Curadoria autêntica de peças de segunda mão com passado nobre e futuro consciente. Vista narrativas atemporais.
      </p>

      <!-- Action Buttons -->
      <div class="hero-reveal opacity-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button
          @click="goToGarimpo"
          class="w-full sm:w-auto bg-deep-forest text-raw-linen hover:bg-primary-container active:scale-95 transition-all duration-300 px-8 py-4 rounded-full font-label text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20 font-bold"
        >
          <span>Explorar Garimpo</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          @click="goToProducts"
          class="w-full sm:w-auto bg-raw-linen text-walnut hover:bg-surface-variant active:scale-95 transition-all duration-300 px-8 py-4 rounded-full font-label text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 border border-primary/20 font-semibold"
        >
          <span>Ver Catálogo Completo</span>
        </button>
      </div>
    </div>
  </section>
</template>
