<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customer'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const customerStore = useCustomerStore()
const cartStore = useCartStore()

const isFav = computed(() => customerStore.isFavorite(props.product.id))

function toggleFav(e) {
  e.stopPropagation()
  customerStore.toggleFavorite(props.product.id)
}

function quickAddToCart(e) {
  e.stopPropagation()
  cartStore.addItem(props.product)
}

function goToDetail() {
  router.push({ name: 'product-detail', params: { id: props.product.id } })
}
</script>

<template>
  <article
    @click="goToDetail"
    class="product-card group cursor-pointer flex flex-col bg-raw-linen/60 rounded-xl overflow-hidden tactile-border tactile-hover transition-all duration-300"
  >
    <!-- Product Image Container -->
    <div class="relative aspect-[3/4] bg-surface-container overflow-hidden flex items-center justify-center">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      <!-- "História Ecoa" Badge -->
      <div
        v-if="product.hasStoryBadge"
        class="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1.5 tactile-shadow border border-primary/10"
      >
        <span class="material-symbols-outlined text-[14px] text-terracotta">history_edu</span>
        <span class="font-label text-[10px] uppercase text-walnut font-bold tracking-wider">História Ecoa</span>
      </div>

      <!-- Era Chip -->
      <div
        class="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-walnut font-label text-[10px] uppercase tracking-wider font-semibold border border-primary/10"
      >
        {{ product.era }}
      </div>

      <!-- Quick Action Buttons on Hover -->
      <div class="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          @click="toggleFav"
          class="w-9 h-9 bg-surface rounded-full flex items-center justify-center tactile-shadow text-walnut hover:text-terracotta transition-transform active:scale-90"
          :title="isFav ? 'Remover dos favoritos' : 'Favoritar peça'"
        >
          <span
            class="material-symbols-outlined text-[18px]"
            :class="{ 'text-terracotta font-fill': isFav }"
          >
            favorite
          </span>
        </button>

        <button
          @click="quickAddToCart"
          class="w-9 h-9 bg-primary text-raw-linen rounded-full flex items-center justify-center tactile-shadow hover:bg-primary-container transition-all active:scale-90 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          title="Adicionar à Sacola"
        >
          <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div class="p-4 flex flex-col justify-between flex-grow">
      <div>
        <span class="text-[11px] font-label text-on-surface-variant uppercase tracking-wider block mb-1">
          {{ product.material }}
        </span>
        <h4 class="font-headline text-base text-primary font-semibold group-hover:text-terracotta transition-colors line-clamp-1">
          {{ product.name }}
        </h4>
      </div>

      <div class="flex justify-between items-end mt-3 pt-3 border-t border-primary/10">
        <div class="flex flex-col">
          <span class="text-[11px] font-label text-on-surface-variant uppercase">Tamanho {{ product.size }}</span>
          <span class="font-headline text-lg font-bold text-walnut">
            R$ {{ product.price.toFixed(2).replace('.', ',') }}
          </span>
        </div>
        <span class="text-[10px] font-label text-deep-forest bg-primary/10 px-2 py-0.5 rounded-full font-medium">
          {{ product.condition }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.font-fill {
  font-variation-settings: 'FILL' 1;
}
</style>
