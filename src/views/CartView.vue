<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import AnimatedCounter from '@/components/animations/AnimatedCounter.vue'

const router = useRouter()
const cartStore = useCartStore()

const inputCoupon = ref('')
const couponMessage = ref('')
const couponSuccess = ref(false)

function handleApplyCoupon() {
  if (!inputCoupon.value) return
  const result = cartStore.applyCoupon(inputCoupon.value)
  couponMessage.value = result.message
  couponSuccess.value = result.success
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
          {{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'história pronta para novo ciclo' : 'histórias prontas para novo ciclo' }}
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
                    class="text-on-surface-variant hover:text-error p-1 transition-colors"
                    title="Remover da sacola"
                  >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <span class="text-xs font-label text-on-surface-variant block mb-2">
                  Tamanho: <strong class="text-walnut">{{ item.size }}</strong> &bull; Origem: {{ item.origin }}
                </span>
                <span class="text-xs font-label text-deep-forest bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                  {{ item.material }}
                </span>
              </div>

              <!-- Price & Quantity Controls -->
              <div class="flex justify-between items-center mt-4 pt-3 border-t border-primary/10">
                <div class="flex items-center gap-2 bg-surface rounded-full border border-primary/20 px-2 py-1">
                  <button
                    @click="cartStore.updateQuantity(item.id, item.size, item.quantity - 1)"
                    class="w-6 h-6 rounded-full flex items-center justify-center text-walnut hover:bg-surface-variant text-sm font-bold"
                  >
                    -
                  </button>
                  <span class="text-xs font-label font-bold px-2">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.updateQuantity(item.id, item.size, item.quantity + 1)"
                    class="w-6 h-6 rounded-full flex items-center justify-center text-walnut hover:bg-surface-variant text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <div class="text-right">
                  <span class="text-base font-bold text-walnut">
                    R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
                  </span>
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

        <!-- Right: Order Summary & Actions -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="bg-surface-container rounded-2xl p-6 border border-primary/15 tactile-shadow flex flex-col gap-5">
            <h3 class="font-headline text-lg font-bold text-primary pb-3 border-b border-primary/10">
              Resumo da Compra
            </h3>

            <!-- Coupon Input -->
            <div>
              <label class="text-xs font-label uppercase text-on-surface-variant block mb-1.5 font-bold">
                Cupom de Desconto
              </label>
              <div class="flex gap-2">
                <input
                  v-model="inputCoupon"
                  type="text"
                  placeholder="Ex: ECOA10 ou CIRCULAR20"
                  class="flex-1 px-4 py-2 bg-surface rounded-xl border border-primary/20 text-xs font-label uppercase text-walnut focus:outline-none focus:border-primary"
                />
                <button
                  @click="handleApplyCoupon"
                  class="px-4 py-2 bg-primary text-raw-linen rounded-xl text-xs font-label uppercase font-bold hover:bg-primary-container transition-colors"
                >
                  Aplicar
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
                class="mt-1 rounded text-primary focus:ring-primary h-4 w-4"
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
                <span>Frete Sustentável</span>
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
              class="w-full bg-primary text-raw-linen hover:bg-primary-container active:scale-98 transition-all py-4 rounded-full font-label text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
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
