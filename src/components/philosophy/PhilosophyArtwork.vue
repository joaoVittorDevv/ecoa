<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import anime from 'animejs'

const props = defineProps({
  chapter: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['trigger-advance'])

const artworkContainer = ref(null)
let currentAnimations = []
let parallaxAnim = null

let targetMouseX = 0
let targetMouseY = 0

function onMouseMove(e) {
  if (!artworkContainer.value) return
  const rect = artworkContainer.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  targetMouseX = (e.clientX - centerX) / (rect.width / 2)
  targetMouseY = (e.clientY - centerY) / (rect.height / 2)

  if (parallaxAnim) parallaxAnim.pause()
  parallaxAnim = anime({
    targets: '.artwork-interactive-group',
    translateX: targetMouseX * 12,
    translateY: targetMouseY * 12,
    duration: 500,
    easing: 'easeOutQuad'
  })
}

function onMouseLeave() {
  if (parallaxAnim) parallaxAnim.pause()
  parallaxAnim = anime({
    targets: '.artwork-interactive-group',
    translateX: 0,
    translateY: 0,
    duration: 700,
    easing: 'easeOutCubic'
  })
}

function handleArtworkClick() {
  // Feedback elástico ao clique/toque
  anime({
    targets: '.artwork-interactive-group',
    scale: [
      { value: 0.93, duration: 100, easing: 'easeOutQuad' },
      { value: 1.06, duration: 250, easing: 'easeOutBack' },
      { value: 1.0, duration: 180, easing: 'easeOutQuad' }
    ],
    complete: () => {
      emit('trigger-advance')
    }
  })
}

function stopAllAnimations() {
  currentAnimations.forEach(anim => anim && anim.pause())
  currentAnimations = []
  if (parallaxAnim) parallaxAnim.pause()
}

function startChapterAnimations(chapterNumber) {
  stopAllAnimations()

  // Animação de entrada do capítulo ativo
  const enterAnim = anime({
    targets: `.chapter-artwork-${chapterNumber}`,
    opacity: [0, 1],
    scale: [0.88, 1],
    duration: 700,
    easing: 'easeOutCubic'
  })
  currentAnimations.push(enterAnim)

  // -------------------------------------------------------------
  // CAPÍTULO 1: A FIBRA E O SOLO (Brotação & Ondulação Botânica)
  // -------------------------------------------------------------
  if (chapterNumber === 1) {
    const stemsAnim = anime({
      targets: '.sprout-stem',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 2400,
      easing: 'easeInOutSine',
      delay: anime.stagger(220),
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(stemsAnim)

    const swayAnim = anime({
      targets: '.sprout-branch',
      rotate: [-3.5, 3.5],
      duration: 3200,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      delay: anime.stagger(350)
    })
    currentAnimations.push(swayAnim)

    const soilPulse = anime({
      targets: '.soil-core-glow',
      scale: [0.94, 1.12],
      opacity: [0.3, 0.7],
      duration: 2400,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(soilPulse)

    const pollenAnim = anime({
      targets: '.pollen-dot',
      translateY: [15, -25],
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.8, duration: 1000 },
        { value: 0, duration: 1200 }
      ],
      delay: anime.stagger(280),
      duration: 3400,
      easing: 'easeOutSine',
      loop: true
    })
    currentAnimations.push(pollenAnim)
  }

  // -------------------------------------------------------------
  // CAPÍTULO 2: ARQUEOLOGIA DO TEMPO (Lentes & Cabide Vintage)
  // -------------------------------------------------------------
  else if (chapterNumber === 2) {
    const ringRot1 = anime({
      targets: '.curation-lens-1',
      rotate: 360,
      duration: 18000,
      easing: 'linear',
      loop: true
    })
    currentAnimations.push(ringRot1)

    const ringRot2 = anime({
      targets: '.curation-lens-2',
      rotate: -360,
      duration: 22000,
      easing: 'linear',
      loop: true
    })
    currentAnimations.push(ringRot2)

    const hangerSway = anime({
      targets: '.vintage-hanger-element',
      translateY: [-7, 7],
      rotate: [-2, 2],
      duration: 3000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(hangerSway)

    const focalPulse = anime({
      targets: '.focal-discovery-sparkle',
      scale: [0.75, 1.25],
      opacity: [0.2, 0.85],
      duration: 1800,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(focalPulse)
  }

  // -------------------------------------------------------------
  // CAPÍTULO 3: O CUIDADO E A CURA (Gota de Ozônio & Vórtice)
  // -------------------------------------------------------------
  else if (chapterNumber === 3) {
    const dropPulse = anime({
      targets: '.ozone-droplet-main',
      scale: [0.95, 1.05],
      duration: 2200,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(dropPulse)

    const wavesAnim = anime({
      targets: '.ozone-clean-wave',
      scale: [0.75, 1.8],
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.5, duration: 500 },
        { value: 0, duration: 2200 }
      ],
      delay: anime.stagger(850),
      duration: 3000,
      easing: 'easeOutQuad',
      loop: true
    })
    currentAnimations.push(wavesAnim)

    const bubblesAnim = anime({
      targets: '.ozone-microbubble',
      translateY: () => [anime.random(15, 50), anime.random(-50, -15)],
      translateX: () => [anime.random(-25, 25), anime.random(-25, 25)],
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.8, duration: 700 },
        { value: 0, duration: 1100 }
      ],
      delay: anime.stagger(200),
      duration: 2600,
      easing: 'easeOutSine',
      loop: true
    })
    currentAnimations.push(bubblesAnim)
  }

  // -------------------------------------------------------------
  // CAPÍTULO 4: A PERMANÊNCIA INFINITA (Fita Contínua Möbius)
  // -------------------------------------------------------------
  else if (chapterNumber === 4) {
    const ribbonFlow = anime({
      targets: '.infinity-ribbon-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3800,
      easing: 'linear',
      loop: true
    })
    currentAnimations.push(ribbonFlow)

    const infinityRotate = anime({
      targets: '.infinity-loop-group',
      rotate: [-5, 5],
      scale: [0.97, 1.03],
      duration: 3400,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(infinityRotate)

    const cycleRings = anime({
      targets: '.cycle-orbit-ring',
      rotate: 360,
      duration: 12000,
      easing: 'linear',
      loop: true
    })
    currentAnimations.push(cycleRings)
  }

  // -------------------------------------------------------------
  // CAPÍTULO 5: O MANIFESTO ECOA (Monólito & Portal de Ressonância)
  // -------------------------------------------------------------
  else if (chapterNumber === 5) {
    const echoRings = anime({
      targets: '.manifesto-echo-ring',
      scale: [0.75, 2.2],
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.5, duration: 550 },
        { value: 0, duration: 2600 }
      ],
      delay: anime.stagger(800),
      duration: 3600,
      easing: 'easeOutSine',
      loop: true
    })
    currentAnimations.push(echoRings)

    const portalGlow = anime({
      targets: '.manifesto-core-glow',
      scale: [0.92, 1.1],
      opacity: [0.4, 0.8],
      duration: 2000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    })
    currentAnimations.push(portalGlow)

    const portalRingsRot = anime({
      targets: '.manifesto-portal-orbit',
      rotate: 360,
      duration: 16000,
      easing: 'linear',
      loop: true
    })
    currentAnimations.push(portalRingsRot)
  }
}

watch(() => props.chapter, (newChap) => {
  startChapterAnimations(newChap)
})

onMounted(() => {
  startChapterAnimations(props.chapter)
})

onUnmounted(() => {
  stopAllAnimations()
})
</script>

<template>
  <div
    ref="artworkContainer"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="handleArtworkClick"
    class="w-full h-full relative cursor-pointer flex items-center justify-center select-none touch-none group p-4 sm:p-8"
    title="Toque na arte para avançar a história"
  >
    <!-- Halo Luminoso de Fundo com Transição Suave ao Hover -->
    <div
      class="absolute inset-4 rounded-3xl bg-gradient-radial from-terracotta/15 via-primary/5 to-transparent opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
    ></div>

    <svg
      viewBox="0 0 500 500"
      class="w-full h-full max-w-[420px] max-h-[420px] overflow-visible relative z-10"
    >
      <g class="artwork-interactive-group" transform-origin="250 250">
        
        <!-- ============================================================= -->
        <!-- CAPÍTULO 1: A FIBRA E O SOLO (Arte Botânica & Tecido) -->
        <!-- ============================================================= -->
        <g v-if="chapter === 1" class="chapter-artwork-1">
          <!-- Núcleo Radiante do Solo -->
          <circle cx="250" cy="360" r="80" fill="#C86D51" opacity="0.35" class="soil-core-glow" />
          <ellipse cx="250" cy="380" rx="140" ry="35" fill="#3A4D39" opacity="0.15" />

          <!-- Linhas do Solo e Raízes -->
          <path d="M 120 380 Q 250 350 380 380" stroke="#3A4D39" stroke-width="2.5" fill="none" opacity="0.4" />
          <path d="M 160 400 Q 250 375 340 400" stroke="#C86D51" stroke-width="1.8" fill="none" opacity="0.3" />

          <!-- Casulo / Semente Orgânica Central -->
          <path
            d="M 250 310 C 220 310, 205 350, 250 390 C 295 350, 280 310, 250 310 Z"
            fill="#3A4D39"
            opacity="0.85"
          />
          <path
            d="M 250 325 C 235 325, 225 350, 250 375 C 275 350, 265 325, 250 325 Z"
            fill="#C86D51"
            opacity="0.9"
          />

          <!-- Filamentos de Linho e Algodão Brotando (Sprouts) -->
          <g class="sprout-branch" transform-origin="250 340">
            <path
              d="M 250 320 C 230 260, 170 200, 160 120"
              fill="none"
              stroke="#3A4D39"
              stroke-width="3"
              stroke-linecap="round"
              class="sprout-stem"
            />
            <!-- Folha / Flor de Algodão 1 -->
            <circle cx="160" cy="120" r="14" fill="#F4EFEA" stroke="#3A4D39" stroke-width="2" />
            <circle cx="160" cy="120" r="6" fill="#C86D51" />
          </g>

          <g class="sprout-branch" transform-origin="250 340">
            <path
              d="M 250 320 C 250 230, 250 160, 250 80"
              fill="none"
              stroke="#C86D51"
              stroke-width="3.5"
              stroke-linecap="round"
              class="sprout-stem"
            />
            <!-- Casulo Principal de Linho Superior -->
            <circle cx="250" cy="80" r="18" fill="#F4EFEA" stroke="#C86D51" stroke-width="2.5" />
            <circle cx="250" cy="80" r="8" fill="#3A4D39" />
          </g>

          <g class="sprout-branch" transform-origin="250 340">
            <path
              d="M 250 320 C 270 260, 330 200, 340 120"
              fill="none"
              stroke="#3A4D39"
              stroke-width="3"
              stroke-linecap="round"
              class="sprout-stem"
            />
            <!-- Folha / Flor de Algodão 2 -->
            <circle cx="340" cy="120" r="14" fill="#F4EFEA" stroke="#3A4D39" stroke-width="2" />
            <circle cx="340" cy="120" r="6" fill="#C86D51" />
          </g>

          <!-- Ondas Suaves de Fios de Tecelagem Flutuantes -->
          <path
            d="M 130 240 Q 250 190 370 240"
            fill="none"
            stroke="#C86D51"
            stroke-width="1.5"
            stroke-dasharray="6,6"
            opacity="0.65"
          />
          <path
            d="M 150 280 Q 250 230 350 280"
            fill="none"
            stroke="#3A4D39"
            stroke-width="1.5"
            stroke-dasharray="4,4"
            opacity="0.5"
          />

          <!-- Partículas de Pólen e Fibra em Levitação -->
          <circle cx="190" cy="220" r="3.5" fill="#C86D51" class="pollen-dot" />
          <circle cx="310" cy="200" r="4.0" fill="#3A4D39" class="pollen-dot" />
          <circle cx="210" cy="150" r="3.0" fill="#C86D51" class="pollen-dot" />
          <circle cx="290" cy="140" r="3.5" fill="#3A4D39" class="pollen-dot" />
        </g>

        <!-- ============================================================= -->
        <!-- CAPÍTULO 2: ARQUEOLOGIA DO TEMPO (Garimpo & Alfaiataria) -->
        <!-- ============================================================= -->
        <g v-if="chapter === 2" class="chapter-artwork-2">
          <!-- Lentes Arqueológicas de Curadoria Concêntricas -->
          <g class="curation-lens-1" transform-origin="250 250">
            <circle cx="250" cy="250" r="160" fill="none" stroke="#3A4D39" stroke-width="1.5" stroke-dasharray="10,14" opacity="0.45" />
            <circle cx="410" cy="250" r="6" fill="#3A4D39" opacity="0.6" />
            <circle cx="90" cy="250" r="6" fill="#3A4D39" opacity="0.6" />
          </g>

          <g class="curation-lens-2" transform-origin="250 250">
            <circle cx="250" cy="250" r="125" fill="none" stroke="#C86D51" stroke-width="1.8" stroke-dasharray="8,10" opacity="0.55" />
            <circle cx="250" cy="125" r="5" fill="#C86D51" opacity="0.8" />
            <circle cx="250" cy="375" r="5" fill="#C86D51" opacity="0.8" />
          </g>

          <!-- Halo de Descoberta Central -->
          <circle cx="250" cy="250" r="85" fill="#C86D51" opacity="0.18" class="focal-discovery-sparkle" />

          <!-- Elemento Escultural: Cabide Vintage de Alfaiataria Nobre -->
          <g class="vintage-hanger-element" transform-origin="250 230">
            <!-- Gancho em Latão -->
            <path
              d="M 250 170 C 250 125, 290 125, 290 155 C 290 175, 270 185, 250 200"
              fill="none"
              stroke="#C86D51"
              stroke-width="5"
              stroke-linecap="round"
            />
            
            <!-- Barra Curva de Madeira Nobre -->
            <path
              d="M 120 280 Q 250 200 380 280"
              fill="none"
              stroke="#3A4D39"
              stroke-width="10"
              stroke-linecap="round"
            />
            <path
              d="M 130 280 L 370 280"
              fill="none"
              stroke="#3A4D39"
              stroke-width="4"
              stroke-linecap="round"
              opacity="0.8"
            />

            <!-- Peça de Alfaiataria & Botão de Osso Suspenso -->
            <polygon points="250,250 285,305 250,360 215,305" fill="#F4EFEA" stroke="#3A4D39" stroke-width="2.5" />
            <circle cx="250" cy="305" r="9" fill="#C86D51" />
            <circle cx="247" cy="303" r="2" fill="#F4EFEA" />
            <circle cx="253" cy="303" r="2" fill="#F4EFEA" />
            <circle cx="247" cy="307" r="2" fill="#F4EFEA" />
            <circle cx="253" cy="307" r="2" fill="#F4EFEA" />
          </g>
        </g>

        <!-- ============================================================= -->
        <!-- CAPÍTULO 3: O CUIDADO E A CURA (Gota de Ozônio & Purificação) -->
        <!-- ============================================================= -->
        <g v-if="chapter === 3" class="chapter-artwork-3">
          <!-- Ondas Circulares de Higienização de Ozônio Expandindo -->
          <circle cx="250" cy="250" r="90" fill="none" stroke="#3A4D39" stroke-width="2" class="ozone-clean-wave" />
          <circle cx="250" cy="250" r="130" fill="none" stroke="#C86D51" stroke-width="1.8" class="ozone-clean-wave" />
          <circle cx="250" cy="250" r="170" fill="none" stroke="#3A4D39" stroke-width="1.2" class="ozone-clean-wave" />

          <!-- Gota Escultural Facetada de Ozônio Central -->
          <g class="ozone-droplet-main" transform-origin="250 250">
            <!-- Halo de Luz Protetora -->
            <circle cx="250" cy="250" r="75" fill="#3A4D39" opacity="0.2" />

            <!-- Corpo da Gota -->
            <path
              d="M 250 140 C 190 220, 175 270, 195 315 C 220 360, 280 360, 305 315 C 325 270, 310 220, 250 140 Z"
              fill="#3A4D39"
              opacity="0.88"
            />
            <!-- Faceta Interna Terracota -->
            <path
              d="M 250 180 C 215 235, 205 275, 220 305 C 235 335, 265 335, 280 305 C 295 275, 285 235, 250 180 Z"
              fill="#C86D51"
              opacity="0.85"
            />
            <!-- Núcleo Radiante Branco / Linho -->
            <circle cx="250" cy="285" r="16" fill="#F4EFEA" opacity="0.95" />
            <circle cx="250" cy="285" r="8" fill="#3A4D39" />
          </g>

          <!-- Micropartículas Efervescentes de Ozônio em Órbita -->
          <circle cx="210" cy="180" r="4.5" fill="#C86D51" class="ozone-microbubble" />
          <circle cx="290" cy="170" r="5.0" fill="#3A4D39" class="ozone-microbubble" />
          <circle cx="170" cy="260" r="4.0" fill="#3A4D39" class="ozone-microbubble" />
          <circle cx="330" cy="250" r="5.5" fill="#C86D51" class="ozone-microbubble" />
          <circle cx="200" cy="330" r="4.0" fill="#C86D51" class="ozone-microbubble" />
          <circle cx="300" cy="340" r="4.5" fill="#3A4D39" class="ozone-microbubble" />
        </g>

        <!-- ============================================================= -->
        <!-- CAPÍTULO 4: A PERMANÊNCIA INFINITA (Fita Möbius Zaha Hadid) -->
        <!-- ============================================================= -->
        <g v-if="chapter === 4" class="chapter-artwork-4">
          <!-- Anéis Orbitais do Ciclo Circular -->
          <g class="cycle-orbit-ring" transform-origin="250 250">
            <circle cx="250" cy="250" r="165" fill="none" stroke="#3A4D39" stroke-width="1.2" stroke-dasharray="12,12" opacity="0.4" />
            <circle cx="250" cy="85" r="6" fill="#3A4D39" opacity="0.7" />
            <circle cx="250" cy="415" r="6" fill="#C86D51" opacity="0.7" />
          </g>

          <!-- Fita Contínua do Infinito (Möbius Ribbon) -->
          <g class="infinity-loop-group" transform-origin="250 250">
            <!-- Fundo da Fita Verde Floresta -->
            <path
              d="M 160 250 C 160 190, 210 190, 250 250 C 290 310, 340 310, 340 250 C 340 190, 290 190, 250 250 C 210 310, 160 310, 160 250 Z"
              fill="none"
              stroke="#3A4D39"
              stroke-width="18"
              stroke-linecap="round"
              stroke-linejoin="round"
              opacity="0.9"
            />

            <!-- Fita Secundária Terracota Entrelaçada -->
            <path
              d="M 160 250 C 160 190, 210 190, 250 250 C 290 310, 340 310, 340 250 C 340 190, 290 190, 250 250 C 210 310, 160 310, 160 250 Z"
              fill="none"
              stroke="#C86D51"
              stroke-width="7"
              stroke-linecap="round"
              class="infinity-ribbon-path"
            />

            <!-- Núcleo Central de Cruzamento -->
            <circle cx="250" cy="250" r="10" fill="#F4EFEA" stroke="#3A4D39" stroke-width="3" />
            <circle cx="160" cy="250" r="7" fill="#C86D51" />
            <circle cx="340" cy="250" r="7" fill="#3A4D39" />
          </g>
        </g>

        <!-- ============================================================= -->
        <!-- CAPÍTULO 5: O MANIFESTO ECOA (Monólito & Portal do Garimpo) -->
        <!-- ============================================================= -->
        <g v-if="chapter === 5" class="chapter-artwork-5">
          <!-- Anéis de Reverberação e Eco Concéntricos -->
          <circle cx="250" cy="250" r="90" fill="none" stroke="#3A4D39" stroke-width="2.2" class="manifesto-echo-ring" />
          <circle cx="250" cy="250" r="130" fill="none" stroke="#C86D51" stroke-width="1.8" class="manifesto-echo-ring" />
          <circle cx="250" cy="250" r="170" fill="none" stroke="#3A4D39" stroke-width="1.4" class="manifesto-echo-ring" />
          <circle cx="250" cy="250" r="210" fill="none" stroke="#C86D51" stroke-width="1.0" class="manifesto-echo-ring" />

          <!-- Anéis Orbitais Inclinados do Portal -->
          <g class="manifesto-portal-orbit" transform-origin="250 250">
            <ellipse cx="250" cy="250" rx="160" ry="55" fill="none" stroke="#C86D51" stroke-width="1.5" stroke-dasharray="14,14" opacity="0.6" />
            <ellipse cx="250" cy="250" rx="135" ry="45" fill="none" stroke="#3A4D39" stroke-width="1.5" stroke-dasharray="8,10" opacity="0.5" />
          </g>

          <!-- Halo Central de Luz Quente do Manifesto -->
          <circle cx="250" cy="250" r="85" fill="#C86D51" opacity="0.3" class="manifesto-core-glow" />

          <!-- Monólito Escultural Central Ecoa -->
          <g transform-origin="250 250">
            <rect x="210" y="150" width="80" height="200" rx="12" fill="#3A4D39" opacity="0.95" />
            <!-- Fenda de Luz Terracota Cortando o Monólito -->
            <rect x="206" y="240" width="88" height="20" rx="4" fill="#C86D51" />
            <!-- Ponto Focal Dourado / Cru -->
            <circle cx="250" cy="250" r="14" fill="#F4EFEA" stroke="#C86D51" stroke-width="3" />
            <circle cx="250" cy="250" r="6" fill="#3A4D39" />
          </g>
        </g>

      </g>
    </svg>
  </div>
</template>

<style scoped>
.touch-none {
  touch-action: none;
}
.artwork-interactive-group {
  will-change: transform;
}
</style>
