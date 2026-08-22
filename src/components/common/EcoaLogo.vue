<script setup>
import symbolPng from '@/assets/images/ecoa-symbol.png'

defineProps({
  variant: {
    type: String,
    default: 'reduced', // 'reduced' (symbol + text) | 'symbol' (icon only) | 'full' (symbol + text + slogan)
  },
  size: {
    type: String,
    default: 'md' // 'sm' | 'md' | 'lg'
  }
})
</script>

<template>
  <div class="inline-flex items-center gap-2.5 select-none group" :class="{ 'flex-col text-center': variant === 'full' }">
    <!-- Official Master Symbol Crop from Brand Identity Board -->
    <img
      :src="symbolPng"
      alt="Símbolo Oficial Ecoa"
      class="object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
      :class="{
        'w-6 h-6': size === 'sm',
        'w-8 h-8 md:w-9 md:h-9': size === 'md',
        'w-14 h-14': size === 'lg'
      }"
    />

    <!-- Wordmark & Slogan -->
    <div v-if="variant !== 'symbol'" class="flex flex-col text-left justify-center">
      <span
        class="font-display font-bold tracking-tight text-primary leading-none"
        :class="{
          'text-lg': size === 'sm',
          'text-2xl md:text-3xl': size === 'md',
          'text-4xl': size === 'lg'
        }"
      >
        ECOA
      </span>
      <span
        v-if="variant === 'full'"
        class="font-slogan text-xs italic text-walnut/80 mt-1"
      >
        Quando você compra roupa usada, a história ecoa
      </span>
    </div>
  </div>
</template>
