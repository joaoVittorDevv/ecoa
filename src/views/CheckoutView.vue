<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useCustomerStore } from '@/stores/customer'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import ImpactMetrics from '@/components/checkout/ImpactMetrics.vue'

const router = useRouter()
const cartStore = useCartStore()
const customerStore = useCustomerStore()

const formData = ref({
  name: customerStore.profile.name,
  email: customerStore.profile.email,
  phone: customerStore.profile.phone,
  zipCode: customerStore.profile.address.zipCode,
  street: customerStore.profile.address.street,
  neighborhood: customerStore.profile.address.neighborhood,
  city: customerStore.profile.address.city,
  state: customerStore.profile.address.state,
  complement: customerStore.profile.address.complement
})

const selectedPayment = ref('pix') // 'pix' | 'credit' | 'boleto'
const isSubmitting = ref(false)
const orderCreated = ref(null)

const isCartEmpty = computed(() => cartStore.items.length === 0 && !orderCreated.value)

function handleFinalizeOrder() {
  if (cartStore.items.length === 0) return

  isSubmitting.value = true

  setTimeout(() => {
    const paymentNames = {
      pix: 'PIX Consciente',
      credit: 'Cartão de Crédito',
      boleto: 'Boleto Sustentável'
    }

    const newOrder = customerStore.createOrder({
      items: cartStore.items,
      subtotal: cartStore.subtotal,
      total: cartStore.total,
      shippingMethod: 'Frete Neutro de Carbono',
      paymentMethod: paymentNames[selectedPayment.value],
      impact: {
        waterSavedLiters: cartStore.totalWaterSaved,
        co2AvoidedKg: cartStore.totalCo2Avoided
      }
    })

    orderCreated.value = newOrder
    cartStore.clearCart()
    isSubmitting.value = false
  }, 1200)
}

function goToProfile() {
  router.push({ name: 'profile' })
}
</script>

<template>
  <div class="min-h-screen py-8 md:py-16">
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop">
      <!-- Success State Screen after Order Completion -->
      <div
        v-if="orderCreated"
        class="max-w-2xl mx-auto bg-raw-linen rounded-3xl p-8 md:p-12 border border-primary/20 tactile-shadow text-center flex flex-col items-center animate-fadeIn"
      >
        <div class="w-20 h-20 rounded-full bg-deep-forest text-raw-linen flex items-center justify-center mb-6 shadow-md">
          <span class="material-symbols-outlined text-4xl">eco</span>
        </div>

        <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold mb-2">
          Ciclo Confirmado com Sucesso
        </span>
        <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold mb-3">
          A história agora continuará com você.
        </h1>
        <p class="font-slogan text-lg text-walnut/80 mb-6 italic">
          Pedido <strong>#{{ orderCreated.id }}</strong> registrado com sucesso em seu perfil.
        </p>

        <!-- Environmental Impact of this order -->
        <div class="w-full my-6">
          <ImpactMetrics
            :water-saved="orderCreated.impact.waterSavedLiters"
            :co2-avoided="orderCreated.impact.co2AvoidedKg"
            :pieces-count="orderCreated.items.length"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <button
            @click="goToProfile"
            class="bg-primary text-raw-linen px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-colors"
          >
            Ver no Meu Perfil &amp; Rastreio
          </button>
          <router-link
            to="/garimpo"
            class="bg-surface text-walnut border border-primary/20 px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold hover:bg-surface-variant transition-colors"
          >
            Continuar Garimpando
          </router-link>
        </div>
      </div>

      <!-- Checkout Form Canvas -->
      <div v-else-if="!isCartEmpty">
        <header class="mb-10 pb-4 border-b border-primary/10">
          <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
            Etapa Final
          </span>
          <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold">
            Finalização da Compra
          </h1>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <!-- Left: Checkout Forms -->
          <form @submit.prevent="handleFinalizeOrder" class="lg:col-span-7 flex flex-col gap-8">
            <!-- 1. Shipping Address -->
            <div class="bg-surface-container rounded-2xl p-6 border border-primary/15 tactile-shadow flex flex-col gap-4">
              <div class="flex items-center gap-2 pb-3 border-b border-primary/10">
                <span class="w-6 h-6 rounded-full bg-primary text-raw-linen text-xs font-bold flex items-center justify-center">1</span>
                <h3 class="font-headline text-lg font-bold text-primary">Endereço de Entrega</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-label">
                <div class="sm:col-span-2">
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Nome Completo</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">E-mail</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Telefone / WhatsApp</label>
                  <input
                    v-model="formData.phone"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">CEP</label>
                  <input
                    v-model="formData.zipCode"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Bairro</label>
                  <input
                    v-model="formData.neighborhood"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Endereço (Rua e Número)</label>
                  <input
                    v-model="formData.street"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Cidade</label>
                  <input
                    v-model="formData.city"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Estado</label>
                  <input
                    v-model="formData.state"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <!-- 2. Payment Method -->
            <div class="bg-surface-container rounded-2xl p-6 border border-primary/15 tactile-shadow flex flex-col gap-4">
              <div class="flex items-center gap-2 pb-3 border-b border-primary/10">
                <span class="w-6 h-6 rounded-full bg-primary text-raw-linen text-xs font-bold flex items-center justify-center">2</span>
                <h3 class="font-headline text-lg font-bold text-primary">Forma de Pagamento</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <!-- PIX -->
                <label
                  class="p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition-all"
                  :class="selectedPayment === 'pix' ? 'border-primary bg-raw-linen font-bold text-primary' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <input type="radio" value="pix" v-model="selectedPayment" class="sr-only" />
                  <span class="material-symbols-outlined text-[26px] text-deep-forest">qr_code_2</span>
                  <span class="text-xs font-label">PIX Instantâneo</span>
                  <span class="text-[10px] text-deep-forest bg-primary/10 px-2 py-0.5 rounded-full font-bold">5% OFF</span>
                </label>

                <!-- Cartão de Crédito -->
                <label
                  class="p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition-all"
                  :class="selectedPayment === 'credit' ? 'border-primary bg-raw-linen font-bold text-primary' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <input type="radio" value="credit" v-model="selectedPayment" class="sr-only" />
                  <span class="material-symbols-outlined text-[26px] text-terracotta">credit_card</span>
                  <span class="text-xs font-label">Cartão de Crédito</span>
                  <span class="text-[10px] text-on-surface-variant">Até 6x sem juros</span>
                </label>

                <!-- Boleto -->
                <label
                  class="p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition-all"
                  :class="selectedPayment === 'boleto' ? 'border-primary bg-raw-linen font-bold text-primary' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <input type="radio" value="boleto" v-model="selectedPayment" class="sr-only" />
                  <span class="material-symbols-outlined text-[26px] text-walnut">receipt_long</span>
                  <span class="text-xs font-label">Boleto Verde</span>
                  <span class="text-[10px] text-on-surface-variant">Compensação em 24h</span>
                </label>
              </div>

              <!-- Payment Simulation Context -->
              <div v-if="selectedPayment === 'pix'" class="p-4 bg-raw-linen rounded-xl border border-primary/10 text-xs text-on-surface-variant flex items-center gap-3">
                <span class="material-symbols-outlined text-deep-forest text-[24px]">verified</span>
                <span>O QR Code será gerado automaticamente com confirmação instantânea da compra.</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary text-raw-linen hover:bg-primary-container active:scale-98 transition-all py-4 rounded-full font-label text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">refresh</span>
              <span v-else class="material-symbols-outlined">lock</span>
              <span>{{ isSubmitting ? 'Processando Ciclo...' : 'Confirmar e Finalizar Compra' }}</span>
            </button>
          </form>

          <!-- Right: Order Summary -->
          <div class="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
      </div>

      <!-- Empty Redirect State -->
      <div v-else class="text-center py-20">
        <h3 class="font-display text-2xl font-bold text-primary mb-4">Sua sacola está vazia para finalizar</h3>
        <router-link to="/garimpo" class="bg-primary text-raw-linen px-8 py-3 rounded-full font-label text-xs uppercase tracking-wider font-bold">
          Ir ao Garimpo
        </router-link>
      </div>
    </div>
  </div>
</template>
