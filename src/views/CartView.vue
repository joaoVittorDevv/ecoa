<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'

const router = useRouter()
const cartStore = useCartStore()

const inputCep = ref('')
const inputCoupon = ref('')
const couponMessage = ref('')
const couponSuccess = ref(false)

onMounted(() => {
  if (cartStore.shippingCep) {
    inputCep.value = cartStore.shippingCep
  }
  if (cartStore.couponCode) {
    inputCoupon.value = cartStore.couponCode
    couponMessage.value = cartStore.couponMessage
    couponSuccess.value = true
  }
})

function formatCepInput(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 8) val = val.slice(0, 8)
  if (val.length > 5) {
    inputCep.value = val.replace(/^(\d{5})(\d{1,3})/, '$1-$2')
  } else {
    inputCep.value = val
  }
  
  if (val.length === 8) {
    handleCalculateShipping()
  }
}

async function handleCalculateShipping() {
  if (!inputCep.value) return
  await cartStore.calculateShipping(inputCep.value)
}

function handleApplyCoupon() {
  if (!inputCoupon.value) return
  const result = cartStore.applyCoupon(inputCoupon.value)
  couponMessage.value = result.message
  couponSuccess.value = result.success
}

function handleRemoveCoupon() {
  cartStore.removeCoupon()
  inputCoupon.value = ''
  couponMessage.value = ''
  couponSuccess.value = false
}

function proceedToCheckout() {
  if (cartStore.items.length > 0) {
    router.push({ name: 'checkout' })
  }
}
</script>

<template>
  <div class="min-h-screen py-8 md:py-16">
    <div class="max-w-container-max mx-auto px-4 md:px-margin-desktop">
      <!-- Page Header -->
      <header class="mb-10 pb-4 border-b border-primary/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
            Moda Circular em Ação
          </span>
          <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold">
            Sua Sacola Consciente
          </h1>
        </div>
        <span class="text-sm font-label text-on-surface-variant">
          {{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'peça única pronta para novo ciclo' : 'peças prontas para novo ciclo' }}
        </span>
      </header>

      <!-- Main Cart Content -->
      <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
        <!-- Left: Item List -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          <article
            v-for="item in cartStore.items"
            :key="`${item.id}-${item.size}`"
            class="flex flex-col sm:flex-row gap-5 p-5 bg-raw-linen/60 rounded-2xl border border-primary/10 tactile-shadow transition-all"
          >
            <!-- Thumbnail -->
            <div class="w-full sm:w-32 aspect-[3/4] sm:aspect-auto rounded-xl overflow-hidden bg-surface-container shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover mix-blend-multiply" />
            </div>

            <!-- Details -->
            <div class="flex flex-col justify-between flex-grow">
              <div>
                <div class="flex justify-between items-start gap-2 mb-1">
                  <h3 class="font-headline text-base font-bold text-primary">{{ item.name }}</h3>
                  <button
                    @click="cartStore.removeItem(item.id, item.size)"
                    class="text-on-surface-variant hover:text-error p-1 transition-colors cursor-pointer"
                    title="Remover da sacola"
                  >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <span class="text-xs font-label text-on-surface-variant block mb-2">
                  Tamanho: <strong class="text-walnut">{{ item.size }}</strong> &bull; Origem: {{ item.origin }}
                </span>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-xs font-label text-deep-forest bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                    {{ item.material }}
                  </span>
                </div>
              </div>

              <!-- Price & Quantity Controls -->
              <div class="mt-4 pt-3 border-t border-primary/10">
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-1.5 bg-surface rounded-full border border-primary/20 px-3 py-1.5 text-xs font-label font-bold text-deep-forest">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                    Peça única · 1 unidade
                  </div>

                  <div class="text-right">
                    <span class="text-base font-bold text-walnut">
                      R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </article>

          <!-- Environmental Impact Banner for the Cart -->
          <div class="p-5 bg-deep-forest text-raw-linen rounded-2xl flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[28px] text-terracotta">water_drop</span>
              <div>
                <span class="text-xs uppercase font-label tracking-wider text-primary-fixed-dim block font-bold">
                  Impacto Sustentável da Sacola
                </span>
                <span class="text-sm font-medium">
                  Você está poupando <strong><AnimatedCounter :value="cartStore.totalWaterSaved" />L</strong> de água e <strong>{{ cartStore.totalCo2Avoided.toFixed(1) }}kg</strong> de CO2!
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary & Shipping Calculator -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="bg-surface-container rounded-2xl p-6 border border-primary/15 tactile-shadow flex flex-col gap-5">
            <h3 class="font-headline text-lg font-bold text-primary pb-3 border-b border-primary/10">
              Resumo da Compra
            </h3>

            <!-- Shipping Calculator via ViaCEP -->
            <div class="flex flex-col gap-3 pb-3 border-b border-primary/10">
              <label class="text-xs font-label uppercase text-on-surface-variant font-bold flex items-center justify-between">
                <span>Cálculo de Frete &amp; Entrega</span>
                <span class="text-[10px] text-terracotta lowercase font-normal">via ViaCEP</span>
              </label>
              
              <div class="flex gap-2">
                <input
                  v-model="inputCep"
                  @input="formatCepInput"
                  type="text"
                  placeholder="00000-000"
                  maxlength="9"
                  class="flex-1 px-4 py-2 bg-surface rounded-xl border border-primary/20 text-xs font-label uppercase text-walnut focus:outline-none focus:border-primary"
                />
                <button
                  @click="handleCalculateShipping"
                  :disabled="cartStore.isCalculatingShipping"
                  class="px-4 py-2 bg-primary text-raw-linen rounded-xl text-xs font-label uppercase font-bold hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer inline-flex items-center gap-1"
                >
                  <span v-if="cartStore.isCalculatingShipping" class="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                  <span v-else>Calcular</span>
                </button>
              </div>

              <!-- Shipping Error -->
              <span v-if="cartStore.shippingError" class="text-xs text-error font-label">
                {{ cartStore.shippingError }}
              </span>

              <!-- Address Display & Shipping Method Selector -->
              <div v-if="cartStore.shippingAddress" class="mt-2 flex flex-col gap-2.5 bg-raw-linen p-3 rounded-xl border border-primary/10 text-xs font-label animate-fadeIn">
                <div class="flex items-start gap-1.5 text-on-surface-variant">
                  <span class="material-symbols-outlined text-[16px] text-deep-forest shrink-0 mt-0.5">location_on</span>
                  <span>
                    <strong>{{ cartStore.shippingAddress.neighborhood ? cartStore.shippingAddress.neighborhood + ', ' : '' }}{{ cartStore.shippingAddress.city }} / {{ cartStore.shippingAddress.state }}</strong>
                    <span v-if="cartStore.shippingAddress.street" class="block text-[11px] text-walnut/70">{{ cartStore.shippingAddress.street }}</span>
                  </span>
                </div>

                <!-- Shipping Options Radio -->
                <div class="flex flex-col gap-2 pt-2 border-t border-primary/10">
                  <label
                    class="flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all"
                    :class="cartStore.shippingMethod === 'eco' ? 'border-primary bg-surface font-semibold text-primary' : 'border-primary/10 hover:bg-surface-variant text-walnut'"
                  >
                    <div class="flex items-center gap-2">
                      <input
                        type="radio"
                        value="eco"
                        v-model="cartStore.shippingMethod"
                        class="text-primary focus:ring-primary h-3.5 w-3.5"
                      />
                      <span>Frete Ecológico Neutro <span class="text-[10px] text-on-surface-variant block font-normal">(4 a 6 dias úteis)</span></span>
                    </div>
                    <span class="font-bold text-deep-forest">
                      {{ cartStore.isFreeShippingEligible ? 'GRÁTIS' : 'R$ 14,90' }}
                    </span>
                  </label>

                  <label
                    class="flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all"
                    :class="cartStore.shippingMethod === 'express' ? 'border-primary bg-surface font-semibold text-primary' : 'border-primary/10 hover:bg-surface-variant text-walnut'"
                  >
                    <div class="flex items-center gap-2">
                      <input
                        type="radio"
                        value="express"
                        v-model="cartStore.shippingMethod"
                        class="text-primary focus:ring-primary h-3.5 w-3.5"
                      />
                      <span>Frete Expresso Verde <span class="text-[10px] text-on-surface-variant block font-normal">(2 a 3 dias úteis)</span></span>
                    </div>
                    <span class="font-bold text-walnut">
                      {{ cartStore.isFreeShippingEligible ? 'R$ 10,00' : 'R$ 24,90' }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Coupon Input -->
            <div>
              <label class="text-xs font-label uppercase text-on-surface-variant block mb-1.5 font-bold">
                Cupom de Desconto
              </label>
              <div class="flex gap-2">
                <input
                  v-model="inputCoupon"
                  type="text"
                  placeholder="insira seu cupom aqui"
                  class="flex-1 px-4 py-2 bg-surface rounded-xl border border-primary/20 text-xs font-label uppercase text-walnut focus:outline-none focus:border-primary placeholder:normal-case"
                />
                <button
                  v-if="!cartStore.couponCode"
                  @click="handleApplyCoupon"
                  class="px-4 py-2 bg-primary text-raw-linen rounded-xl text-xs font-label uppercase font-bold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
                <button
                  v-else
                  @click="handleRemoveCoupon"
                  class="px-3 py-2 bg-error/10 text-error hover:bg-error/20 rounded-xl text-xs font-label uppercase font-bold transition-colors cursor-pointer"
                  title="Remover cupom"
                >
                  Remover
                </button>
              </div>
              <span
                v-if="couponMessage"
                class="text-xs font-label mt-1.5 block"
                :class="couponSuccess ? 'text-deep-forest font-bold' : 'text-error'"
              >
                {{ couponMessage }}
              </span>
            </div>

            <!-- Carbon Offset Toggle -->
            <label class="p-3.5 bg-raw-linen rounded-xl border border-primary/10 flex items-start gap-3 cursor-pointer select-none">
              <input
                v-model="cartStore.isNeutralCarbonShipping"
                type="checkbox"
                class="mt-1 rounded text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              />
              <div class="text-xs text-on-surface-variant">
                <strong class="text-primary block font-medium">Compensação de Frete (+ R$ 4,50)</strong>
                Neutraliza 100% da pegada de carbono do transporte através de plantio de mudas nativas.
              </div>
            </label>

            <!-- Line Items -->
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
                <span>Frete ({{ cartStore.shippingMethod === 'express' ? 'Expresso' : 'Ecológico' }})</span>
                <span class="font-medium text-walnut">
                  {{ cartStore.shippingCost === 0 ? 'Grátis (acima de R$ 300)' : `R$ ${cartStore.shippingCost.toFixed(2).replace('.', ',')}` }}
                </span>
              </div>

              <div v-if="cartStore.isNeutralCarbonShipping" class="flex justify-between text-xs text-on-surface-variant">
                <span>Neutralização de Carbono</span>
                <span class="text-deep-forest font-medium">R$ {{ cartStore.carbonOffsetCost.toFixed(2).replace('.', ',') }}</span>
              </div>

              <div class="flex justify-between text-lg font-bold text-primary pt-3 border-t border-primary/15">
                <span>Total</span>
                <span>R$ {{ cartStore.total.toFixed(2).replace('.', ',') }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToCheckout"
              class="w-full bg-primary text-raw-linen hover:bg-primary-container active:scale-98 transition-all py-4 rounded-full font-label text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
            >
              <span>Finalizar Compra Consciente</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20 bg-raw-linen/60 rounded-3xl border border-primary/10 max-w-xl mx-auto my-12 flex flex-col items-center p-8"
      >
        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <span class="material-symbols-outlined text-3xl">shopping_bag</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-primary mb-2">Sua sacola está vazia</h2>
        <p class="font-slogan text-base text-walnut/70 mb-8 italic">
          "Cada peça que você resgata inicia um novo ciclo de histórias."
        </p>
        <router-link
          to="/garimpo"
          class="bg-primary text-raw-linen px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-colors"
        >
          Explorar Peças do Garimpo
        </router-link>
      </div>
    </div>
  </div>
</template>
