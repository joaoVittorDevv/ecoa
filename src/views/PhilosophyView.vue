<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'
import EcoaLogo from '@/components/common/EcoaLogo.vue'
import PhilosophyArtwork from '@/components/philosophy/PhilosophyArtwork.vue'

const router = useRouter()
const currentChapter = ref(1)
const totalChapters = 5
const isTraveling = ref(false)

const chapters = [
  {
    id: 1,
    side: 'right',
    theme: 'matéria',
    pill: 'A Fibra e o Solo',
    headline: 'Toda roupa começa no solo sagrado da Terra.',
    quote: 'O linho que brotou, a chuva que nutriu o algodão. Ao descartar uma peça precocemente, silenciamos a vida investida nela.',
    metricNum: '7.500 L',
    metricLabel: 'de água limpa poupados ao escolher o reuso em vez da produção virgem.'
  },
  {
    id: 2,
    side: 'left',
    theme: 'garimpo',
    pill: 'Arqueologia do Tempo',
    headline: 'Arqueologia afetiva contra o descarte rápido.',
    quote: 'Em um mundo sufocado por tendências de 7 dias, garimpamos cortes nobres, lãs puras e botões de osso que atravessaram décadas.',
    metricNum: '< 1%',
    metricLabel: 'das roupas no mundo são recicladas. A Ecoa resgata os 5% mais raros e autênticos.'
  },
  {
    id: 3,
    side: 'right',
    theme: 'cuidado',
    pill: 'O Cuidado e a Cura',
    headline: 'O afeto se expressa no respeito ao tempo.',
    quote: 'Higienização ecológica com ozônio, livre de solventes fósseis. Restauramos pontos invisíveis honrando a pátina de dignidade da peça.',
    metricNum: '+9 Meses',
    metricLabel: 'de uso estendido reduzem a pegada de carbono da roupa em 30%.'
  },
  {
    id: 4,
    side: 'left',
    theme: 'ciclo',
    pill: 'A Permanência Infinita',
    headline: 'A roupa não tem fim, ela tem continuidade.',
    quote: 'Ela viveu suas memórias e continuará escrevendo novas histórias em outros ombros. A verdadeira moda nunca morre.',
    metricNum: '17 kg CO₂',
    metricLabel: 'evitados por peça reintroduzida no ecossistema circular.'
  },
  {
    id: 5,
    side: 'center',
    theme: 'manifesto',
    pill: 'O Manifesto Ecoa',
    headline: '"Quando você compra roupa usada, a história ecoa."',
    quote: 'A história já começou há décadas. O próximo capítulo é você quem veste com sustentabilidade, poesia e consciência.',
    metricNum: 'Eterno',
    metricLabel: 'é o impacto de uma escolha consciente.'
  }
]

let activeAnimations = []

function runChapterAmbience(chapterId) {
  activeAnimations.forEach(a => a && a.pause())
  activeAnimations = []

  nextTick(() => {
    // Aparição com stagger dos blocos narrativos
    const textAnim = anime({
      targets: '.spatial-text-reveal',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 900,
      easing: 'easeOutCubic',
      delay: anime.stagger(140, { start: 150 })
    })
    activeAnimations.push(textAnim)
  })
}

// Transição fluida de capítulo com Anime.js
function advanceChapter(targetChapter) {
  if (isTraveling.value) return
  if (targetChapter > totalChapters) {
    goToGarimpoShop()
    return
  }
  if (targetChapter < 1) return

  isTraveling.value = true

  anime({
    targets: '#world-viewport-stage',
    opacity: [1, 0],
    translateY: [0, -20],
    scale: [1, 0.94],
    duration: 450,
    easing: 'easeInOutCubic',
    complete: () => {
      currentChapter.value = targetChapter

      anime({
        targets: '#world-viewport-stage',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [1.06, 1],
        duration: 800,
        easing: 'easeOutCubic',
        complete: () => {
          isTraveling.value = false
        }
      })

      runChapterAmbience(targetChapter)
    }
  })
}

function handleThreeTrigger() {
  if (currentChapter.value < totalChapters) {
    advanceChapter(currentChapter.value + 1)
  } else {
    goToGarimpoShop()
  }
}

function goToGarimpoShop() {
  anime({
    targets: '#philosophy-root-stage',
    opacity: [1, 0],
    duration: 400,
    easing: 'easeInOutQuad',
    complete: () => {
      router.push({ name: 'garimpo' })
    }
  })
}

function returnToStore() {
  anime({
    targets: '#philosophy-root-stage',
    opacity: [1, 0],
    duration: 350,
    easing: 'easeInOutQuad',
    complete: () => {
      router.push({ name: 'home' })
    }
  })
}

function onKeyDown(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    if (currentChapter.value < totalChapters) advanceChapter(currentChapter.value + 1)
  } else if (e.key === 'ArrowLeft') {
    if (currentChapter.value > 1) advanceChapter(currentChapter.value - 1)
  }
}

// 📱 Suporte a Gestos de Deslizar (Touch Swipe) para Mobile
let touchStartX = 0
let touchStartY = 0

function onTouchStart(e) {
  if (e.touches && e.touches.length > 0) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }
}

function onTouchEnd(e) {
  if (e.changedTouches && e.changedTouches.length > 0) {
    const deltaX = e.changedTouches[0].clientX - touchStartX
    const deltaY = e.changedTouches[0].clientY - touchStartY

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        if (currentChapter.value < totalChapters) {
          advanceChapter(currentChapter.value + 1)
        } else {
          goToGarimpoShop()
        }
      } else {
        if (currentChapter.value > 1) {
          advanceChapter(currentChapter.value - 1)
        }
      }
    }
  }
}

onMounted(() => {
  runChapterAmbience(1)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  activeAnimations.forEach(a => a && a.pause())
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <div
    id="philosophy-root-stage"
    class="min-h-screen bg-background text-walnut flex flex-col relative overflow-hidden select-none selection:bg-terracotta/20"
  >
    
    <!-- 🧭 Top Navigation Minimalista (Sem loja) -->
    <header class="w-full px-6 md:px-12 py-4 flex items-center justify-between z-30 bg-background/85 backdrop-blur-md border-b border-primary/10">
      <button
        @click="returnToStore"
        class="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-primary/70 hover:text-primary transition-all duration-300 group py-1.5 px-3.5 rounded-full hover:bg-raw-linen"
      >
        <span class="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span class="font-bold">Voltar à Loja</span>
      </button>

      <!-- Constelação de Capítulos -->
      <div class="flex items-center gap-2 sm:gap-4">
        <button
          v-for="ch in chapters"
          :key="ch.id"
          @click="advanceChapter(ch.id)"
          class="group flex items-center gap-1.5 py-1 px-2.5 rounded-full transition-all duration-300"
          :class="currentChapter === ch.id ? 'bg-primary text-raw-linen font-bold shadow-sm' : 'text-walnut/50 hover:text-primary'"
        >
          <span
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentChapter === ch.id ? 'bg-terracotta scale-125' : currentChapter > ch.id ? 'bg-terracotta/70' : 'bg-primary/20'"
          ></span>
          <span class="text-[11px] font-label uppercase tracking-wider hidden md:inline">{{ ch.pill }}</span>
        </button>
      </div>

      <router-link to="/" class="opacity-80 hover:opacity-100 transition-opacity">
        <EcoaLogo variant="reduced" size="sm" />
      </router-link>
    </header>

    <!-- 🌌 Palco Narrativo com Arte Vetorial Interativa Anime.js -->
    <main
      id="world-viewport-stage"
      class="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 md:px-12 py-6 md:py-10 w-full relative z-10"
    >
      
      <!-- ========================================================================= -->
      <!-- 1: A FIBRA E O SOLO -->
      <!-- ========================================================================= -->
      <div v-if="currentChapter === 1" class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        <div class="md:col-span-6 flex flex-col gap-5 text-left order-2 md:order-1">
          <div class="spatial-text-reveal opacity-0">
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold px-3.5 py-1 rounded-full bg-raw-linen border border-primary/15 inline-flex items-center gap-1.5 tactile-shadow">
              <span class="material-symbols-outlined text-[14px]">spa</span>
              {{ chapters[0].pill }}
            </span>
          </div>

          <h1 class="spatial-text-reveal opacity-0 font-display text-3xl sm:text-5xl md:text-6xl text-primary font-bold tracking-tight leading-tight">
            {{ chapters[0].headline }}
          </h1>

          <p class="spatial-text-reveal opacity-0 font-slogan text-lg sm:text-xl text-walnut/80 leading-relaxed max-w-xl">
            {{ chapters[0].quote }}
          </p>

          <div class="spatial-text-reveal opacity-0 flex items-center gap-4 p-5 rounded-2xl bg-raw-linen/80 border border-primary/15 max-w-lg tactile-shadow">
            <div class="w-14 h-14 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[28px]">water_drop</span>
            </div>
            <div>
              <span class="font-display text-2xl sm:text-3xl font-bold text-terracotta">{{ chapters[0].metricNum }}</span>
              <p class="text-xs text-walnut/80 mt-0.5 leading-snug">{{ chapters[0].metricLabel }}</p>
            </div>
          </div>

          <!-- ✨ Indicativo Discreto de Navegação (Apenas no 1º Quadro - Desktop) -->
          <div class="spatial-text-reveal opacity-0 pt-1 hidden sm:block">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-raw-linen/70 border border-primary/10 text-[11px] font-label text-primary/70 tracking-wide">
              <span class="w-1.5 h-1.5 rounded-full bg-terracotta animate-ping"></span>
              <span>Clique na arte ou use as setas</span>
              <span class="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container border border-primary/10 text-[10px] font-mono font-bold text-walnut">→</span>
            </div>
          </div>
        </div>

        <!-- Arte Interativa Anime.js: Germinação de Linho -->
        <div class="md:col-span-6 flex flex-col items-center justify-center order-1 md:order-2">
          <div class="w-full h-72 sm:h-96 rounded-3xl bg-surface-container/60 border border-primary/15 p-2 shadow-2xl relative overflow-hidden backdrop-blur-sm group hover:border-terracotta transition-all duration-500">
            <PhilosophyArtwork :chapter="1" @trigger-advance="handleThreeTrigger" />

            <!-- ✨ Indicativo Flutuante Mobile (Visível imediatamente no topo da tela, sobreposto na arte) -->
            <div class="absolute bottom-3 inset-x-0 mx-auto text-center flex sm:hidden justify-center pointer-events-none z-20">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raw-linen/95 backdrop-blur-md border border-primary/15 text-[10px] font-label uppercase tracking-wider text-primary font-medium shadow-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse"></span>
                <span class="material-symbols-outlined text-[13px] text-terracotta">touch_app</span>
                <span>Toque na arte ou deslize</span>
                <span class="material-symbols-outlined text-[13px] text-primary/60">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 2: ARQUEOLOGIA DO TEMPO -->
      <!-- ========================================================================= -->
      <div v-if="currentChapter === 2" class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        <!-- Arte Interativa Anime.js: Lentes & Cabide Vintage -->
        <div class="md:col-span-6 flex flex-col items-center justify-center order-1">
            <div class="w-full h-72 sm:h-96 rounded-3xl bg-surface-container/60 border border-terracotta/30 p-2 shadow-2xl relative overflow-hidden backdrop-blur-sm group hover:border-primary transition-all duration-500">
              <PhilosophyArtwork :chapter="2" @trigger-advance="handleThreeTrigger" />
            </div>
        </div>

        <div class="md:col-span-6 flex flex-col gap-5 text-left order-2">
          <div class="spatial-text-reveal opacity-0">
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold px-3.5 py-1 rounded-full bg-raw-linen border border-primary/15 inline-flex items-center gap-1.5 tactile-shadow">
              <span class="material-symbols-outlined text-[14px]">search_hands_free</span>
              {{ chapters[1].pill }}
            </span>
          </div>

          <h2 class="spatial-text-reveal opacity-0 font-display text-3xl sm:text-5xl md:text-6xl text-primary font-bold tracking-tight leading-tight">
            {{ chapters[1].headline }}
          </h2>

          <p class="spatial-text-reveal opacity-0 font-slogan text-lg sm:text-xl text-walnut/80 leading-relaxed max-w-xl">
            {{ chapters[1].quote }}
          </p>

          <div class="spatial-text-reveal opacity-0 flex items-center gap-4 p-5 rounded-2xl bg-raw-linen/80 border border-primary/15 max-w-lg tactile-shadow">
            <div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <span class="font-display text-2xl sm:text-3xl font-bold text-primary">{{ chapters[1].metricNum }}</span>
              <p class="text-xs text-walnut/80 mt-0.5 leading-snug">{{ chapters[1].metricLabel }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 3: O CUIDADO E A CURA -->
      <!-- ========================================================================= -->
      <div v-if="currentChapter === 3" class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        <div class="md:col-span-6 flex flex-col gap-5 text-left order-2 md:order-1">
          <div class="spatial-text-reveal opacity-0">
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold px-3.5 py-1 rounded-full bg-raw-linen border border-primary/15 inline-flex items-center gap-1.5 tactile-shadow">
              <span class="material-symbols-outlined text-[14px]">local_laundry_service</span>
              {{ chapters[2].pill }}
            </span>
          </div>

          <h2 class="spatial-text-reveal opacity-0 font-display text-3xl sm:text-5xl md:text-6xl text-primary font-bold tracking-tight leading-tight">
            {{ chapters[2].headline }}
          </h2>

          <p class="spatial-text-reveal opacity-0 font-slogan text-lg sm:text-xl text-walnut/80 leading-relaxed max-w-xl">
            {{ chapters[2].quote }}
          </p>

          <div class="spatial-text-reveal opacity-0 flex items-center gap-4 p-5 rounded-2xl bg-raw-linen/80 border border-primary/15 max-w-lg tactile-shadow">
            <div class="w-14 h-14 rounded-xl bg-deep-forest/10 text-deep-forest flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[28px]">eco</span>
            </div>
            <div>
              <span class="font-display text-2xl sm:text-3xl font-bold text-deep-forest">{{ chapters[2].metricNum }}</span>
              <p class="text-xs text-walnut/80 mt-0.5 leading-snug">{{ chapters[2].metricLabel }}</p>
            </div>
          </div>
        </div>

        <!-- Arte Interativa Anime.js: Gota de Ozônio & Purificação -->
        <div class="md:col-span-6 flex flex-col items-center justify-center order-1 md:order-2">
          <div class="w-full h-72 sm:h-96 rounded-3xl bg-surface-container/60 border border-primary/15 p-2 shadow-2xl relative overflow-hidden backdrop-blur-sm group hover:border-primary transition-all duration-500">
            <PhilosophyArtwork :chapter="3" @trigger-advance="handleThreeTrigger" />
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 4: A PERMANÊNCIA INFINITA -->
      <!-- ========================================================================= -->
      <div v-if="currentChapter === 4" class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
        <!-- Arte Interativa Anime.js: Fita de Möbius -->
        <div class="md:col-span-6 flex flex-col items-center justify-center order-1">
          <div class="w-full h-72 sm:h-96 rounded-3xl bg-surface-container/60 border border-primary/25 p-2 shadow-2xl relative overflow-hidden backdrop-blur-sm group hover:border-terracotta transition-all duration-500">
            <PhilosophyArtwork :chapter="4" @trigger-advance="handleThreeTrigger" />
          </div>
        </div>

        <div class="md:col-span-6 flex flex-col gap-5 text-left order-2">
          <div class="spatial-text-reveal opacity-0">
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold px-3.5 py-1 rounded-full bg-raw-linen border border-primary/15 inline-flex items-center gap-1.5 tactile-shadow">
              <span class="material-symbols-outlined text-[14px]">cycle</span>
              {{ chapters[3].pill }}
            </span>
          </div>

          <h2 class="spatial-text-reveal opacity-0 font-display text-3xl sm:text-5xl md:text-6xl text-primary font-bold tracking-tight leading-tight">
            {{ chapters[3].headline }}
          </h2>

          <p class="spatial-text-reveal opacity-0 font-slogan text-lg sm:text-xl text-walnut/80 leading-relaxed max-w-xl">
            {{ chapters[3].quote }}
          </p>

          <div class="spatial-text-reveal opacity-0 flex items-center gap-4 p-5 rounded-2xl bg-raw-linen/80 border border-primary/15 max-w-lg tactile-shadow">
            <div class="w-14 h-14 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[28px]">co2</span>
            </div>
            <div>
              <span class="font-display text-2xl sm:text-3xl font-bold text-terracotta">{{ chapters[3].metricNum }}</span>
              <p class="text-xs text-walnut/80 mt-0.5 leading-snug">{{ chapters[3].metricLabel }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 5: O MANIFESTO ECOA -->
      <!-- ========================================================================= -->
      <div v-if="currentChapter === 5" class="flex flex-col items-center text-center max-w-3xl mx-auto relative py-4">
        
        <!-- Arte Interativa Anime.js: Monólito & Portal -->
        <div class="w-full h-72 sm:h-80 rounded-3xl p-2 relative overflow-hidden mb-4 flex items-center justify-center">
          <PhilosophyArtwork :chapter="5" @trigger-advance="handleThreeTrigger" />
        </div>

        <div class="spatial-text-reveal opacity-0 mb-3">
          <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold px-4 py-1.5 rounded-full bg-raw-linen border border-primary/15 inline-flex items-center gap-2 tactile-shadow">
            <span class="material-symbols-outlined text-[15px]">auto_stories</span>
            <span>{{ chapters[4].pill }}</span>
          </span>
        </div>

        <h2 class="spatial-text-reveal opacity-0 font-display text-3xl sm:text-5xl md:text-6xl text-primary font-bold tracking-tight mb-4 leading-tight">
          {{ chapters[4].headline }}
        </h2>

        <p class="spatial-text-reveal opacity-0 font-slogan text-lg sm:text-xl md:text-2xl text-walnut/85 max-w-2xl mx-auto mb-8 leading-relaxed">
          {{ chapters[4].quote }}
        </p>

        <!-- PORTAL MESTRE: Redirecionamento ao Garimpo -->
        <div class="spatial-text-reveal opacity-0 flex justify-center w-full">
          <button
            @click="goToGarimpoShop"
            class="group bg-primary text-raw-linen hover:bg-primary-container active:scale-95 transition-all duration-300 px-10 py-5 rounded-full font-label text-sm uppercase tracking-wider inline-flex items-center justify-center gap-3.5 shadow-2xl shadow-primary/30 font-bold border border-primary/20"
          >
            <span class="material-symbols-outlined text-[22px] text-terracotta group-hover:rotate-12 transition-transform">search_hands_free</span>
            <span>Explorar o Garimpo de Peças Únicas</span>
            <span class="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </button>
        </div>

      </div>

    </main>

  </div>
</template>

<style scoped>
.spatial-text-reveal {
  will-change: transform, opacity;
}
</style>
