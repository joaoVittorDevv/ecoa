<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useCustomerStore } from '@/stores/customer'
import StoryTag from '@/components/common/StoryTag.vue'
import ProductCard from '@/components/common/ProductCard.vue'
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const customerStore = useCustomerStore()

const productId = computed(() => props.id || route.params.id)
const product = computed(() => productsStore.getProductById(productId.value) || productsStore.products[0])

const activeImage = ref('')
const selectedSize = ref('')
const addedToast = ref(false)

onMounted(() => {
  if (product.value) {
    activeImage.value = product.value.image
    selectedSize.value = product.value.size
  }
})

const relatedProducts = computed(() => {
  return productsStore.getRelatedProducts(product.value.id, 3)
})

const isFavorite = computed(() => {
  return customerStore.isFavorite(product.value.id)
})

function toggleFavorite() {
  customerStore.toggleFavorite(product.value.id)
}

function addToCart() {
  cartStore.addItem(product.value, selectedSize.value, 1)
  addedToast.value = true
  setTimeout(() => {
    addedToast.value = false
  }, 3000)
}

function buyNow() {
  cartStore.addItem(product.value, selectedSize.value, 1)
  router.push({ name: 'cart' })
}
</script>

<template>
  <div class="min-h-screen py-8 md:py-16">
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs font-label text-on-surface-variant mb-8">
        <router-link to="/" class="hover:text-primary transition-colors">Início</router-link>
        <span>/</span>
        <router-link to="/produtos" class="hover:text-primary transition-colors">Catálogo</router-link>
        <span>/</span>
        <span class="text-walnut font-medium truncate max-w-xs">{{ product.name }}</span>
      </nav>

      <!-- Main Product Canvas (2 Columns on Desktop) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
        <!-- Left Column: Gallery -->
        <div class="lg:col-span-6 flex flex-col gap-4">
          <!-- Main Active Image -->
          <div class="relative aspect-[3/4] bg-raw-linen rounded-2xl overflow-hidden tactile-border tactile-shadow flex items-center justify-center">
            <img
              :src="activeImage || product.image"
              :alt="product.name"
              class="w-full h-full object-cover mix-blend-multiply opacity-95 transition-all duration-500"
            />

            <!-- Badge -->
            <div class="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 tactile-shadow border border-primary/10">
              <span class="material-symbols-outlined text-[16px] text-terracotta">history_edu</span>
              <span class="font-label text-xs uppercase text-walnut font-bold tracking-wider">Peça Única &bull; {{ product.era }}</span>
            </div>

            <!-- Favorite Button -->
            <button
              @click="toggleFavorite"
              class="absolute top-4 right-4 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center tactile-shadow text-walnut hover:text-terracotta transition-transform active:scale-90"
              title="Favoritar"
            >
              <span class="material-symbols-outlined text-[20px]" :class="{ 'text-terracotta font-fill': isFavorite }">
                favorite
              </span>
            </button>
          </div>

          <!-- Thumbnails (if gallery has multiple images) -->
          <div v-if="product.gallery && product.gallery.length > 1" class="flex gap-3 overflow-x-auto no-scrollbar">
            <button
              v-for="(img, idx) in product.gallery"
              :key="idx"
              @click="activeImage = img"
              class="w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-raw-linen"
              :class="activeImage === img ? 'border-primary shadow-md' : 'border-primary/15 opacity-70 hover:opacity-100'"
            >
              <img :src="img" :alt="`${product.name} ${idx + 1}`" class="w-full h-full object-cover mix-blend-multiply" />
            </button>
          </div>
        </div>

        <!-- Right Column: Product Information & Purchase Area -->
        <div class="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
              {{ product.material }}
            </span>
            <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold mb-3">
              {{ product.name }}
            </h1>
            <div class="flex items-center gap-4 text-sm font-label">
              <span class="text-deep-forest bg-primary/10 px-3 py-1 rounded-full font-medium">
                Condição: {{ product.condition }}
              </span>
              <span class="text-on-surface-variant">
                Origem: <strong class="text-walnut">{{ product.origin }}</strong>
              </span>
            </div>
          </div>

          <!-- Price -->
          <div class="p-4 bg-raw-linen rounded-2xl border border-primary/10 flex items-baseline justify-between">
            <div>
              <span class="text-xs font-label text-on-surface-variant block mb-0.5">Valor Consciente</span>
              <div class="flex items-baseline gap-3">
                <span class="font-display text-3xl font-bold text-walnut">
                  R$ {{ product.price.toFixed(2).replace('.', ',') }}
                </span>
                <span v-if="product.originalPrice" class="text-sm font-label line-through text-on-surface-variant">
                  R$ {{ product.originalPrice.toFixed(2).replace('.', ',') }}
                </span>
              </div>
            </div>
            <span class="text-xs font-label text-deep-forest bg-deep-forest/10 px-2.5 py-1 rounded-md font-bold">
              Peça Exclusiva (1 em estoque)
            </span>
          </div>

          <!-- Size Selector & Measurements Table -->
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center text-xs font-label">
              <span class="uppercase tracking-wider text-walnut font-bold">Tamanho da Etiqueta: {{ product.size }}</span>
              <span class="text-terracotta">Peça vintage: confira medidas abaixo</span>
            </div>

            <!-- Real Measurements Badge Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-surface-container rounded-xl border border-primary/10 text-xs font-label">
              <div>
                <span class="text-[10px] text-on-surface-variant uppercase block">Busto / Tórax</span>
                <strong class="text-walnut">{{ product.measurements?.bust || '104 cm' }}</strong>
              </div>
              <div>
                <span class="text-[10px] text-on-surface-variant uppercase block">Cintura</span>
                <strong class="text-walnut">{{ product.measurements?.waist || '98 cm' }}</strong>
              </div>
              <div>
                <span class="text-[10px] text-on-surface-variant uppercase block">Comprimento</span>
                <strong class="text-walnut">{{ product.measurements?.length || '112 cm' }}</strong>
              </div>
              <div>
                <span class="text-[10px] text-on-surface-variant uppercase block">Manga</span>
                <strong class="text-walnut">{{ product.measurements?.sleeve || '62 cm' }}</strong>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              @click="addToCart"
              class="flex-1 bg-primary text-raw-linen hover:bg-primary-container active:scale-98 transition-all py-4 px-6 rounded-full font-label text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-md shadow-primary/20"
            >
              <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Adicionar à Sacola</span>
            </button>

            <button
              @click="buyNow"
              class="sm:w-auto bg-terracotta text-raw-linen hover:opacity-90 active:scale-98 transition-all py-4 px-8 rounded-full font-label text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-md shadow-terracotta/20"
            >
              <span>Comprar Agora</span>
            </button>
          </div>

          <!-- Toast Notification upon adding -->
          <div
            v-if="addedToast"
            class="p-3 bg-deep-forest text-raw-linen rounded-xl flex items-center justify-between text-xs font-label shadow-lg animate-fadeIn"
          >
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">check_circle</span>
              Peça adicionada à sua sacola com sucesso!
            </span>
            <router-link to="/sacola" class="underline font-bold">Ver Sacola</router-link>
          </div>

          <!-- Environmental Savings of this Item -->
          <div class="p-4 bg-raw-linen/60 rounded-xl border border-primary/10 flex items-center justify-between text-xs font-label">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-deep-forest text-[20px]">water_drop</span>
              <span><strong><AnimatedCounter :value="product.impact?.waterSavedLiters || 2700" /> Litros</strong> de água economizados</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-terracotta text-[20px]">eco</span>
              <span><strong>{{ product.impact?.co2AvoidedKg || 6.8 }} kg</strong> de CO2 evitados</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Storytelling Tag Section (Verso da Tag) -->
      <section class="py-12 border-t border-primary/10">
        <div class="text-center max-w-xl mx-auto mb-6">
          <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
            Narrativa do Garimpo
          </span>
          <h2 class="font-display text-2xl sm:text-3xl text-primary font-bold">
            A História Desta Peça
          </h2>
          <p class="text-xs text-on-surface-variant mt-1 font-body">
            Toque na tag abaixo para conferir o verso com a certidão de procedência da peça.
          </p>
        </div>

        <StoryTag :product="product" />
      </section>

      <!-- Related Products Section -->
      <section class="py-14 border-t border-primary/10">
        <div class="flex justify-between items-end mb-8">
          <div>
            <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
              Curadoria Relacionada
            </span>
            <h3 class="font-display text-2xl text-primary font-bold">
              Peças que Ecoam no Mesmo Tom
            </h3>
          </div>
          <router-link to="/produtos" class="text-xs font-label uppercase text-secondary hover:underline font-bold">
            Ver catálogo completo
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="rel in relatedProducts"
            :key="rel.id"
            :product="rel"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.font-fill {
  font-variation-settings: 'FILL' 1;
}
</style>
