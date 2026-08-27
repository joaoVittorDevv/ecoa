<script setup>
import { useRouter } from 'vue-router'
import categoriesData from '@/data/categories.json'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const router = useRouter()

function navigateToCategory(slug) {
  emit('close')
  router.push({ name: 'category-detail', params: { slug } })
}

function navigateToAll() {
  emit('close')
  router.push({ name: 'products' })
}
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform scale-95 opacity-0 -translate-y-2"
    enter-to-class="transform scale-100 opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform scale-100 opacity-100 translate-y-0"
    leave-to-class="transform scale-95 opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#243624]/20 p-4 z-50 animate-fadeIn text-[#2C1D11]"
      style="background-color: #FAF6F0 !important;"
      @click.stop
    >
      <div class="flex items-center justify-between px-1 pb-3 mb-3 border-b border-[#243624]/10">
        <span class="text-[11px] font-label uppercase tracking-widest text-terracotta font-bold">
          Curadoria por Épocas &amp; Estilos
        </span>
        <button
          @click="navigateToAll"
          class="text-[11px] font-label uppercase tracking-wider text-deep-forest hover:text-terracotta font-bold underline transition-colors cursor-pointer"
        >
          Ver Catálogo Completo
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <button
          v-for="cat in categoriesData"
          :key="cat.id"
          @click="navigateToCategory(cat.slug)"
          class="flex items-center gap-3 p-2.5 rounded-xl bg-[#F2EDE6] hover:bg-[#E7DFD5] transition-all text-left group cursor-pointer border border-[#243624]/5 hover:border-[#243624]/15"
        >
          <div class="w-12 h-12 rounded-lg overflow-hidden bg-[#E2D9CE] shrink-0 border border-primary/10">
            <img
              :src="cat.image"
              :alt="cat.name"
              class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div class="flex flex-col flex-grow min-w-0">
            <div class="flex items-center justify-between gap-1">
              <h4 class="font-display text-sm font-bold text-walnut group-hover:text-primary transition-colors truncate">
                {{ cat.name }}
              </h4>
              <span class="text-[10px] font-label px-2 py-0.5 rounded-full bg-[#EAE2D7] text-terracotta font-bold shrink-0 border border-[#243624]/10">
                {{ cat.tag }}
              </span>
            </div>
            <p class="text-xs text-on-surface-variant font-body truncate">
              {{ cat.headline }}
            </p>
          </div>
        </button>
      </div>
    </div>
  </transition>
</template>
