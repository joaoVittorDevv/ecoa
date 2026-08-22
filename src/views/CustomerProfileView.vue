<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs'
import { useCustomerStore } from '@/stores/customer'
import { useProductsStore } from '@/stores/products'
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'
import ProductCard from '@/components/common/ProductCard.vue'

const router = useRouter()
const customerStore = useCustomerStore()
const productsStore = useProductsStore()

const activeTab = ref('orders') // 'orders' | 'favorites' | 'personal'
const editSuccess = ref(false)

const favoriteProducts = computed(() => {
  return productsStore.products.filter(p => customerStore.isFavorite(p.id))
})

onMounted(() => {
  anime({
    targets: '.profile-metric-card',
    scale: [0.95, 1],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(150),
    easing: 'easeOutBack'
  })
})

function saveProfileChanges() {
  customerStore.updateProfile(customerStore.profile)
  editSuccess.value = true
  setTimeout(() => {
    editSuccess.value = false
  }, 3000)
}

function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen py-8 md:py-16">
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop">
      <!-- Profile Header & Avatar -->
      <section class="max-w-3xl mx-auto flex flex-col items-center text-center mb-10">
        <div class="relative mb-4">
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/20 tactile-shadow">
            <img
              :src="customerStore.profile.avatar"
              :alt="customerStore.profile.name"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-deep-forest text-raw-linen flex items-center justify-center text-xs shadow-sm" title="Consumidora Consciente">
            🌿
          </span>
        </div>

        <h1 class="font-display text-2xl sm:text-3xl font-bold text-primary">
          {{ customerStore.profile.name }}
        </h1>
        <p class="text-sm font-label text-on-surface-variant flex items-center justify-center gap-1 mt-1">
          <span class="material-symbols-outlined text-[16px] text-terracotta">location_on</span>
          {{ customerStore.profile.address.city }}, {{ customerStore.profile.address.state }}
        </p>
      </section>

      <!-- Personal Positive Environmental Impact Dashboard -->
      <section class="max-w-3xl mx-auto bg-surface-container rounded-3xl p-6 sm:p-8 border border-primary/15 tactile-shadow mb-12">
        <div class="flex items-center justify-between mb-6 pb-3 border-b border-primary/10">
          <div>
            <span class="text-[11px] font-label uppercase tracking-widest text-terracotta font-bold block">
              Seu Legado
            </span>
            <h2 class="font-headline text-lg sm:text-xl font-bold text-primary">
              Impacto Positivo Acumulado
            </h2>
          </div>
          <span class="material-symbols-outlined text-deep-forest text-[26px]">eco</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Metric 1: Water -->
          <div class="profile-metric-card p-4 bg-raw-linen rounded-2xl border border-primary/10 flex flex-col items-center text-center">
            <span class="material-symbols-outlined text-terracotta text-[24px] mb-1">water_drop</span>
            <span class="font-display text-2xl sm:text-3xl font-bold text-primary">
              <AnimatedCounter :value="customerStore.profile.impactMetrics.waterSavedLiters" suffix=" L" />
            </span>
            <span class="text-[11px] font-label text-on-surface-variant uppercase mt-1 font-semibold">
              Água Poupada
            </span>
          </div>

          <!-- Metric 2: CO2 -->
          <div class="profile-metric-card p-4 bg-raw-linen rounded-2xl border border-primary/10 flex flex-col items-center text-center">
            <span class="material-symbols-outlined text-deep-forest text-[24px] mb-1">co2</span>
            <span class="font-display text-2xl sm:text-3xl font-bold text-primary">
              <AnimatedCounter :value="customerStore.profile.impactMetrics.co2AvoidedKg" :decimals="1" suffix=" kg" />
            </span>
            <span class="text-[11px] font-label text-on-surface-variant uppercase mt-1 font-semibold">
              CO2 Evitado
            </span>
          </div>

          <!-- Metric 3: Circular Pieces -->
          <div class="profile-metric-card p-4 bg-raw-linen rounded-2xl border border-primary/10 flex flex-col items-center text-center">
            <span class="material-symbols-outlined text-primary text-[24px] mb-1">cyclone</span>
            <span class="font-display text-2xl sm:text-3xl font-bold text-primary">
              <AnimatedCounter :value="customerStore.profile.impactMetrics.circularPiecesAdopted" />
            </span>
            <span class="text-[11px] font-label text-on-surface-variant uppercase mt-1 font-semibold">
              Peças no Ciclo
            </span>
          </div>
        </div>
      </section>

      <!-- Navigation Tabs -->
      <div class="max-w-4xl mx-auto mb-8 border-b border-primary/10 flex justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-label uppercase tracking-wider">
        <button
          @click="activeTab = 'orders'"
          class="pb-3 transition-colors relative font-bold"
          :class="activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'"
        >
          Histórico de Pedidos ({{ customerStore.orders.length }})
        </button>

        <button
          @click="activeTab = 'favorites'"
          class="pb-3 transition-colors relative font-bold"
          :class="activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'"
        >
          Peças Salvas ({{ favoriteProducts.length }})
        </button>

        <button
          @click="activeTab = 'personal'"
          class="pb-3 transition-colors relative font-bold"
          :class="activeTab === 'personal' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'"
        >
          Dados Pessoais
        </button>
      </div>

      <!-- Tab 1: Orders History -->
      <main v-if="activeTab === 'orders'" class="max-w-4xl mx-auto flex flex-col gap-5">
        <div
          v-for="order in customerStore.orders"
          :key="order.id"
          class="bg-raw-linen/70 rounded-2xl p-5 sm:p-6 border border-primary/15 tactile-shadow flex flex-col gap-4"
        >
          <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-primary/10 text-xs font-label">
            <div>
              <span class="font-bold text-primary text-sm sm:text-base">#{{ order.id }}</span>
              <span class="text-on-surface-variant ml-2">&bull; {{ formatDate(order.date) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-deep-forest/10 text-deep-forest rounded-full font-bold">
                {{ order.status }}
              </span>
              <span class="font-bold text-walnut text-sm sm:text-base">
                R$ {{ order.total.toFixed(2).replace('.', ',') }}
              </span>
            </div>
          </div>

          <!-- Items in order -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="item in order.items"
              :key="`${order.id}-${item.productId}`"
              class="flex items-center gap-3 p-2.5 bg-surface rounded-xl border border-primary/5"
            >
              <img :src="item.image" :alt="item.name" class="w-12 h-16 object-cover rounded-md bg-raw-linen shrink-0 mix-blend-multiply" />
              <div class="min-w-0">
                <h4 class="text-xs font-bold text-primary truncate">{{ item.name }}</h4>
                <span class="text-[11px] font-label text-on-surface-variant block">
                  Tam: {{ item.size }} &bull; R$ {{ item.price.toFixed(2).replace('.', ',') }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-2 text-xs font-label text-on-surface-variant">
            <span>Pagamento: <strong>{{ order.paymentMethod }}</strong></span>
            <span class="text-deep-forest font-semibold">
              {{ order.impact?.waterSavedLiters || 2500 }}L poupados neste pedido
            </span>
          </div>
        </div>
      </main>

      <!-- Tab 2: Saved Favorites -->
      <section v-else-if="activeTab === 'favorites'" class="max-w-4xl mx-auto">
        <div v-if="favoriteProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          <ProductCard
            v-for="product in favoriteProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <div v-else class="text-center py-16 bg-raw-linen/50 rounded-2xl border border-primary/10">
          <span class="material-symbols-outlined text-4xl text-terracotta mb-2">favorite_border</span>
          <h4 class="font-headline text-lg font-bold text-primary mb-1">Nenhuma peça favoritada</h4>
          <p class="text-sm text-on-surface-variant mb-4">Clique no coração de qualquer peça para salvá-la aqui.</p>
          <router-link to="/garimpo" class="bg-primary text-raw-linen px-6 py-2 rounded-full font-label text-xs uppercase font-bold">
            Explorar Garimpo
          </router-link>
        </div>
      </section>

      <!-- Tab 3: Personal Data -->
      <section v-else-if="activeTab === 'personal'" class="max-w-2xl mx-auto bg-surface-container rounded-2xl p-6 sm:p-8 border border-primary/15 tactile-shadow">
        <form @submit.prevent="saveProfileChanges" class="flex flex-col gap-4 text-xs font-label">
          <div>
            <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Nome Completo</label>
            <input
              v-model="customerStore.profile.name"
              type="text"
              class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block uppercase text-on-surface-variant mb-1 font-semibold">E-mail</label>
              <input
                v-model="customerStore.profile.email"
                type="email"
                class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Telefone</label>
              <input
                v-model="customerStore.profile.phone"
                type="text"
                class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Endereço Principal</label>
            <input
              v-model="customerStore.profile.address.street"
              type="text"
              class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Cidade</label>
              <input
                v-model="customerStore.profile.address.city"
                type="text"
                class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Estado</label>
              <input
                v-model="customerStore.profile.address.state"
                type="text"
                class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div v-if="editSuccess" class="p-3 bg-deep-forest text-raw-linen rounded-xl text-xs font-bold text-center">
            Dados atualizados com sucesso!
          </div>

          <button
            type="submit"
            class="bg-primary text-raw-linen py-3 px-8 rounded-full font-label text-xs uppercase font-bold tracking-wider hover:bg-primary-container transition-colors mt-2"
          >
            Salvar Alterações
          </button>
        </form>
      </section>
    </div>
  </div>
</template>
