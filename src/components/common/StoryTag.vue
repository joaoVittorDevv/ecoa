<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isFlipped = ref(false)

function toggleFlip() {
  isFlipped.value = !isFlipped.value
}
</script>

<template>
  <div class="w-full max-w-md mx-auto my-6 perspective-1000">
    <div
      @click="toggleFlip"
      class="relative w-full min-h-[300px] cursor-pointer transition-transform duration-700 transform-style-3d group"
      :class="{ 'rotate-y-180': isFlipped }"
      title="Clique para virar a tag"
    >
      <!-- Front of Tag (Frente da Tag) -->
      <div
        class="absolute inset-0 backface-hidden bg-raw-linen border-2 border-primary/20 rounded-2xl p-6 flex flex-col justify-between tactile-shadow texture-overlay select-none"
      >
        <!-- Tag Eyelet and Thread -->
        <div class="flex justify-between items-center pb-4 border-b border-primary/10">
          <div class="w-4 h-4 rounded-full border-2 border-primary/40 bg-surface shadow-inner"></div>
          <span class="font-label text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
            Etiqueta de Memória
          </span>
          <span class="material-symbols-outlined text-primary text-[18px]">waves</span>
        </div>

        <div class="my-auto text-center py-4">
          <div class="inline-block px-3 py-1 bg-terracotta/15 text-terracotta rounded-full font-label text-xs uppercase font-bold tracking-widest mb-3">
            O que esta peça ecoa?
          </div>
          <h3 class="font-display text-xl font-bold text-primary mb-2">
            {{ product.name }}
          </h3>
          <p class="font-slogan text-base italic text-walnut/80 line-clamp-3">
            "{{ product.story }}"
          </p>
        </div>

        <div class="flex justify-between items-center pt-4 border-t border-primary/10 text-xs font-label">
          <span class="text-on-surface-variant">Origem: <strong class="text-walnut">{{ product.origin }}</strong></span>
          <span class="text-terracotta flex items-center gap-1 font-bold group-hover:underline">
            Ver detalhes da tag <span class="material-symbols-outlined text-[14px]">sync</span>
          </span>
        </div>
      </div>

      <!-- Back of Tag (Verso da Tag / Especificações do Garimpo) -->
      <div
        class="absolute inset-0 backface-hidden rotate-y-180 bg-surface-container border-2 border-dashed border-primary/25 rounded-2xl p-6 flex flex-col justify-between tactile-shadow select-none"
      >
        <div class="flex justify-between items-center pb-3 border-b border-primary/15">
          <span class="font-label text-[11px] uppercase tracking-widest text-primary font-bold">
            Registro de Curadoria Ecoa
          </span>
          <span class="text-xs font-label bg-primary/10 text-deep-forest px-2 py-0.5 rounded font-bold">
            {{ product.era }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 my-2 text-xs font-label">
          <div class="p-2.5 bg-raw-linen rounded-lg border border-primary/10">
            <span class="text-[10px] text-on-surface-variant uppercase block">Composição</span>
            <strong class="text-walnut font-medium text-[11px]">{{ product.material }}</strong>
          </div>
          <div class="p-2.5 bg-raw-linen rounded-lg border border-primary/10">
            <span class="text-[10px] text-on-surface-variant uppercase block">Condição</span>
            <strong class="text-walnut font-medium text-[11px]">{{ product.condition }}</strong>
          </div>
          <div class="p-2.5 bg-raw-linen rounded-lg border border-primary/10">
            <span class="text-[10px] text-on-surface-variant uppercase block">Água Poupada</span>
            <strong class="text-deep-forest font-bold text-[11px]">{{ product.impact?.waterSavedLiters || 2500 }} L</strong>
          </div>
          <div class="p-2.5 bg-raw-linen rounded-lg border border-primary/10">
            <span class="text-[10px] text-on-surface-variant uppercase block">CO2 Evitado</span>
            <strong class="text-terracotta font-bold text-[11px]">{{ product.impact?.co2AvoidedKg || 6.0 }} kg</strong>
          </div>
        </div>

        <div class="p-2.5 bg-raw-linen rounded-lg border border-primary/10">
          <span class="text-[10px] text-on-surface-variant uppercase block mb-1">Medidas da Peça</span>
          <div class="grid grid-cols-3 gap-1 text-[11px] text-walnut">
            <div>Busto: <strong>{{ product.measurements?.bust || 'N/A' }}</strong></div>
            <div>Cintura: <strong>{{ product.measurements?.waist || 'N/A' }}</strong></div>
            <div>Comp.: <strong>{{ product.measurements?.length || 'N/A' }}</strong></div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-2 text-[10px] font-label text-on-surface-variant">
          <span>ID: {{ product.id }}</span>
          <span class="text-terracotta font-medium">Toque para desvirar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
