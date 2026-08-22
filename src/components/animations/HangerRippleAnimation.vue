<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import anime from 'animejs'
import symbolPng from '@/assets/images/ecoa-symbol.png'

const svgContainer = ref(null)

let ripplePropagationTimeline = null
let mouseAnim = null

let targetMouseX = 0
let targetMouseY = 0
let scrollOffset = 0
let isTicking = false

function onMouseMove(e) {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  targetMouseX = (e.clientX - centerX) / centerX
  targetMouseY = (e.clientY - centerY) / centerY

  applyParallax()
}

function onScroll() {
  scrollOffset = window.scrollY || window.pageYOffset || 0
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      applyParallax()
      isTicking = false
    })
    isTicking = true
  }
}

function applyParallax() {
  const scrollFactor = scrollOffset * 0.03

  mouseAnim = anime({
    targets: '#ecoa-unified-scene',
    translateX: targetMouseX * 3.5,
    translateY: targetMouseY * 3.5 + scrollFactor,
    duration: 600,
    easing: 'easeOutQuad'
  })
}

onMounted(() => {
  if (!svgContainer.value) return

  // 🌊 Propagação de Ondas em Cadeia:
  // Cada anel inicia invisível (opacity: 0). Conforme o anel anterior se expande e o atinge,
  // o próximo círculo surge suavemente (fade in), reverberando e propagando a onda para o seguinte.
  ripplePropagationTimeline = anime({
    targets: '.echo-wave-ring',
    scale: [
      { value: 0.75, duration: 0 },
      { value: 2.8, duration: 4800, easing: 'easeOutSine' }
    ],
    opacity: [
      { value: 0, duration: 0 },
      { value: 0.42, duration: 700, easing: 'easeInQuad' },
      { value: 0, duration: 4100, easing: 'easeOutQuad' }
    ],
    delay: anime.stagger(950),
    loop: true
  })

  // 🖱️ Event Listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  if (ripplePropagationTimeline) ripplePropagationTimeline.pause()
  if (mouseAnim) mouseAnim.pause()

  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    ref="svgContainer"
    class="relative w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
  >
    <svg
      viewBox="0 0 600 600"
      class="w-full h-full max-w-[850px] max-h-[850px] overflow-visible pointer-events-none"
    >
      <g id="ecoa-unified-scene">
        
        <!-- 🌊 Anéis de Reverberação em Cascata Progressiva (Iniciam invisíveis: opacity: 0) -->
        <g transform="translate(300, 300)">
          <!-- Anel 1 (Origem / Primeira onda que nasce) -->
          <circle class="echo-wave-ring" r="150" fill="none" stroke="#3A4D39" stroke-width="1.8" opacity="0" />
          <!-- Anel 2 (Desperta quando o Anel 1 o atinge) -->
          <circle class="echo-wave-ring" r="185" fill="none" stroke="#3A4D39" stroke-width="1.5" opacity="0" />
          <!-- Anel 3 (Desperta na sequência) -->
          <circle class="echo-wave-ring" r="225" fill="none" stroke="#C86D51" stroke-width="1.3" opacity="0" />
          <!-- Anel 4 (Propaga a onda adiante) -->
          <circle class="echo-wave-ring" r="265" fill="none" stroke="#3A4D39" stroke-width="1.0" opacity="0" />
          <!-- Anel 5 (Última onda em expansão ampla) -->
          <circle class="echo-wave-ring" r="305" fill="none" stroke="#3A4D39" stroke-width="0.8" opacity="0" />
        </g>

        <!-- 🌿 Logo Oficial: Centro dos arcos alinhado em (300, 300) -->
        <g opacity="0.38" class="transition-opacity duration-500 hover:opacity-55">
          <image
            :href="symbolPng"
            x="180"
            y="151.4"
            width="240"
            height="254.85"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

      </g>
    </svg>
  </div>
</template>

<style scoped>
.echo-wave-ring {
  transform-origin: 0 0;
}
#ecoa-unified-scene {
  will-change: transform;
}
</style>
