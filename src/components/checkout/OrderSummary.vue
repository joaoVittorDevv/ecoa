<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'

const props = defineProps({
  paymentMethod: {
    type: String,
    default: 'pix'
  }
})

const cartStore = useCartStore()

const pixDiscount = computed(() => {
  if (props.paymentMethod === 'pix') {
    // 5% additional discount on the subtotal after coupon
    const base = Math.max(0, cartStore.subtotal - cartStore.discountAmount)
    return base * 0.05
  }
  return 0
})

const finalTotal = computed(() => {
  return Math.max(0, cartStore.total - pixDiscount.value)
})
</script>

<template>
  <div class="bg-surface-container rounded-2xl p-6 border border-primary/15 tactile-shadow flex flex-col gap-6">
    <h3 class="font-headline text-lg font-bold text-primary pb-3 border-b border-primary/10 flex items-center justify-between">
      <span>Resumo do Pedido</span>
      <span class="text-xs font-label text-on-surface-variant font-normal">
        {{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'peça única' : 'peças únicas' }}
      </span>
    </h3>

    <!-- Item Mini List -->
    <div class="flex flex-col gap-3 max-h-60 overflow-y-auto no-scrollbar pr-1">
      <div
        v-for="item in cartStore.items"
        :key="`${item.id}-${item.size}`"
        class="flex items-center gap-3 py-2 border-b border-primary/5 last:border-none"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="w-12 h-16 object-cover rounded-md bg-raw-linen shrink-0 mix-blend-multiply"
        />
        <div class="flex-grow min-w-0">
          <h5 class="text-xs font-semibold text-primary truncate">{{ item.name }}</h5>
          <span class="text-[11px] font-label text-on-surface-variant block">
            Tam. {{ item.size }} &bull; Qtd: {{ item.quantity }} &bull; {{ item.origin }}
          </span>
          <span class="text-xs font-bold text-walnut">
            R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Impact Mini Card -->
    <div class="p-3.5 bg-raw-linen rounded-xl border border-primary/10 flex items-center justify-around text-center">
      <div>
        <span class="text-[10px] font-label uppercase text-on-surface-variant block">Água Poupada</span>
        <span class="text-xs font-bold text-deep-forest">
          <AnimatedCounter :value="cartStore.totalWaterSaved" suffix=" L" />
        </span>
      </div>
      <div class="w-px h-8 bg-primary/10"></div>
      <div>
        <span class="text-[10px] font-label uppercase text-on-surface-variant block">CO2 Evitado</span>
        <span class="text-xs font-bold text-terracotta">
          <AnimatedCounter :value="cartStore.totalCo2Avoided" :decimals="1" suffix=" kg" />
        </span>
      </div>
    </div>

    <!-- Coupon Applied Pill if exists -->
    <div
      v-if="cartStore.couponCode"
      class="p-3 bg-deep-forest/10 rounded-xl border border-deep-forest/20 text-xs font-label"
    >
      <div class="flex items-center justify-between text-deep-forest font-bold mb-0.5">
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">local_offer</span>
          Cupom {{ cartStore.couponCode }} Ativo (-{{ cartStore.discountPercent }}%)
        </span>
      </div>
      <p class="text-[11px] text-walnut/80 italic font-body">
        {{ cartStore.couponMessage }}
      </p>
    </div>

    <!-- Calculations -->
    <div class="flex flex-col gap-2.5 text-sm pt-3 border-t border-primary/10">
      <div class="flex justify-between text-on-surface-variant">
        <span>Subtotal</span>
        <span class="font-medium text-walnut">R$ {{ cartStore.subtotal.toFixed(2).replace('.', ',') }}</span>
      </div>

      <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-deep-forest font-medium">
        <span>Desconto Especial ({{ cartStore.couponCode }})</span>
        <span>- R$ {{ cartStore.discountAmount.toFixed(2).replace('.', ',') }}</span>
      </div>

      <div class="flex justify-between text-on-surface-variant">
        <span class="flex items-center gap-1">
          Frete ({{ cartStore.shippingMethod === 'express' ? 'Expresso' : 'Ecológico Neutro' }})
          <span class="material-symbols-outlined text-[14px] text-deep-forest">eco</span>
        </span>
        <span class="font-medium text-walnut">
          {{ cartStore.shippingCost === 0 ? 'Grátis' : `R$ ${cartStore.shippingCost.toFixed(2).replace('.', ',')}` }}
        </span>
      </div>

      <div v-if="cartStore.isNeutralCarbonShipping" class="flex justify-between text-xs text-on-surface-variant">
        <span>Compensação de Carbono</span>
        <span class="text-deep-forest font-medium">R$ {{ cartStore.carbonOffsetCost.toFixed(2).replace('.', ',') }}</span>
      </div>

      <!-- PIX Discount Highlight -->
      <div v-if="pixDiscount > 0" class="flex justify-between text-deep-forest font-medium text-xs">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">bolt</span>
          Desconto PIX Instantâneo (5%)
        </span>
        <span>- R$ {{ pixDiscount.toFixed(2).replace('.', ',') }}</span>
      </div>

      <div class="flex justify-between text-base font-bold text-primary pt-3 border-t border-primary/15">
        <span>Total a Pagar</span>
        <span class="text-lg">R$ {{ finalTotal.toFixed(2).replace('.', ',') }}</span>
      </div>
    </div>
  </div>
</template>
