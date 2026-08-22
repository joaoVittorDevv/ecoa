<script setup>
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'
</script>

<template>
  <section class="bg-primary text-raw-linen py-14 md:py-18 relative overflow-hidden">
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <span class="text-xs font-label uppercase tracking-widest text-primary-fixed-dim font-bold block mb-2">
          Transparência &amp; Propósito
        </span>
        <h2 class="font-display text-2xl sm:text-3xl md:text-4xl text-raw-linen font-bold">
          O Impacto Coletivo da Comunidade Ecoa
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
        <!-- Metric 1 -->
        <div class="p-6 rounded-2xl bg-primary-container/70 border border-primary-fixed-dim/20 flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-full bg-raw-linen/10 flex items-center justify-center text-terracotta mb-4">
            <span class="material-symbols-outlined text-[26px]">water_drop</span>
          </div>
          <div class="font-display text-3xl sm:text-4xl text-raw-linen font-bold mb-1">
            <AnimatedCounter :value="142800" suffix=" L" />
          </div>
          <span class="text-xs font-label uppercase tracking-wider text-primary-fixed-dim font-semibold">
            De água potável poupada
          </span>
          <p class="text-xs text-raw-linen/70 mt-2 font-body">
            Equivalente a mais de 900 banhos conscientes evitados em processos de tecelagem nova.
          </p>
        </div>

        <!-- Metric 2 -->
        <div class="p-6 rounded-2xl bg-primary-container/70 border border-primary-fixed-dim/20 flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-full bg-raw-linen/10 flex items-center justify-center text-primary-fixed-dim mb-4">
            <span class="material-symbols-outlined text-[26px]">eco</span>
          </div>
          <div class="font-display text-3xl sm:text-4xl text-raw-linen font-bold mb-1">
            <AnimatedCounter :value="385" :decimals="1" suffix=" kg" />
          </div>
          <span class="text-xs font-label uppercase tracking-wider text-primary-fixed-dim font-semibold">
            De CO2 não emitido
          </span>
          <p class="text-xs text-raw-linen/70 mt-2 font-body">
            Ao reutilizar peças existentes em vez de produzir novas matérias sintéticas.
          </p>
        </div>

        <!-- Metric 3 -->
        <div class="p-6 rounded-2xl bg-primary-container/70 border border-primary-fixed-dim/20 flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-full bg-raw-linen/10 flex items-center justify-center text-terracotta mb-4">
            <span class="material-symbols-outlined text-[26px]">history_edu</span>
          </div>
          <div class="font-display text-3xl sm:text-4xl text-raw-linen font-bold mb-1">
            <AnimatedCounter :value="1250" suffix=" +" />
          </div>
          <span class="text-xs font-label uppercase tracking-wider text-primary-fixed-dim font-semibold">
            Histórias em Novo Ciclo
          </span>
          <p class="text-xs text-raw-linen/70 mt-2 font-body">
            Peças atemporais resgatadas, restauradas e reintegradas ao cotidiano.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
