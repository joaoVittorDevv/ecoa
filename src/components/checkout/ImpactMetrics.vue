<script setup>
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'

const props = defineProps({
  waterSaved: {
    type: Number,
    default: 0
  },
  co2Avoided: {
    type: Number,
    default: 0
  },
  piecesCount: {
    type: Number,
    default: 1
  }
})
</script>

<template>
  <div class="bg-raw-linen rounded-2xl p-5 md:p-6 border border-primary/15 tactile-shadow">
    <div class="flex items-center gap-2 mb-4">
      <span class="material-symbols-outlined text-deep-forest text-[22px]">eco</span>
      <h4 class="font-headline text-base font-bold text-primary">
        Impacto Sustentável Desta Decisão
      </h4>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div class="p-3 bg-surface rounded-xl border border-primary/10 flex flex-col items-center text-center">
        <span class="material-symbols-outlined text-terracotta text-[22px] mb-1">water_drop</span>
        <span class="text-base sm:text-lg font-bold text-primary">
          <AnimatedCounter :value="waterSaved" suffix=" L" />
        </span>
        <span class="text-[10px] font-label uppercase text-on-surface-variant mt-0.5">
          Água Economizada
        </span>
      </div>

      <div class="p-3 bg-surface rounded-xl border border-primary/10 flex flex-col items-center text-center">
        <span class="material-symbols-outlined text-deep-forest text-[22px] mb-1">co2</span>
        <span class="text-base sm:text-lg font-bold text-primary">
          <AnimatedCounter :value="co2Avoided" :decimals="1" suffix=" kg" />
        </span>
        <span class="text-[10px] font-label uppercase text-on-surface-variant mt-0.5">
          CO2 Evitado
        </span>
      </div>

      <div class="col-span-2 sm:col-span-1 p-3 bg-surface rounded-xl border border-primary/10 flex flex-col items-center text-center">
        <span class="material-symbols-outlined text-primary text-[22px] mb-1">sync</span>
        <span class="text-base sm:text-lg font-bold text-primary">
          {{ piecesCount }} {{ piecesCount === 1 ? 'Peça' : 'Peças' }}
        </span>
        <span class="text-[10px] font-label uppercase text-on-surface-variant mt-0.5">
          No Ciclo Circular
        </span>
      </div>
    </div>
  </div>
</template>
