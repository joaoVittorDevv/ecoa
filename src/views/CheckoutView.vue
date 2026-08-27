<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useCustomerStore } from '@/stores/customer'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import ImpactMetrics from '@/components/checkout/ImpactMetrics.vue'

const router = useRouter()
const cartStore = useCartStore()
const customerStore = useCustomerStore()

// Current checkout step: 1 = Identificação & Endereço | 2 = Frete & Revisão | 3 = Pagamento
const currentStep = ref(1)

const formData = ref({
  name: customerStore.profile.name || '',
  email: customerStore.profile.email || '',
  phone: customerStore.profile.phone || '',
  zipCode: cartStore.shippingCep || customerStore.profile.address?.zipCode || '',
  street: cartStore.shippingAddress?.street || customerStore.profile.address?.street || '',
  number: customerStore.profile.address?.number || '',
  neighborhood: cartStore.shippingAddress?.neighborhood || customerStore.profile.address?.neighborhood || '',
  city: cartStore.shippingAddress?.city || customerStore.profile.address?.city || '',
  state: cartStore.shippingAddress?.state || customerStore.profile.address?.state || '',
  complement: customerStore.profile.address?.complement || ''
})

// Credit card form state
const cardData = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: '',
  installments: 1
})

const selectedPayment = ref('pix') // 'pix' | 'credit' | 'boleto'
const isSubmitting = ref(false)
const orderCreated = ref(null)
const step1Error = ref('')
const step3Error = ref('')
const pixCopied = ref(false)

const isCartEmpty = computed(() => cartStore.items.length === 0 && !orderCreated.value)

onMounted(() => {
  if (customerStore.profile.name) {
    formData.value.name = customerStore.profile.name
  }
  
  // Traz o CEP e endereço simulados na sacola para o checkout automaticamente
  if (cartStore.shippingCep) {
    formData.value.zipCode = cartStore.shippingCep
  }
  if (cartStore.shippingAddress) {
    formData.value.street = cartStore.shippingAddress.street || formData.value.street
    formData.value.neighborhood = cartStore.shippingAddress.neighborhood || formData.value.neighborhood
    formData.value.city = cartStore.shippingAddress.city || formData.value.city
    formData.value.state = cartStore.shippingAddress.state || formData.value.state
  }
})

// Formatting functions
function formatZipCode(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 8) val = val.slice(0, 8)
  if (val.length > 5) {
    formData.value.zipCode = val.replace(/^(\d{5})(\d{1,3})/, '$1-$2')
  } else {
    formData.value.zipCode = val
  }

  // Auto trigger ViaCEP lookup when 8 digits entered
  if (val.length === 8) {
    searchAddressByZip(val)
  }
}

function formatPhoneInput(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 11) val = val.slice(0, 11)
  
  if (val.length > 10) {
    formData.value.phone = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  } else if (val.length > 6) {
    formData.value.phone = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
  } else if (val.length > 2) {
    formData.value.phone = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2')
  } else {
    formData.value.phone = val
  }
}

async function searchAddressByZip(cleanedZip) {
  const result = await cartStore.calculateShipping(cleanedZip)
  if (result.success && result.address) {
    formData.value.street = result.address.street || formData.value.street
    formData.value.neighborhood = result.address.neighborhood || formData.value.neighborhood
    formData.value.city = result.address.city || formData.value.city
    formData.value.state = result.address.state || formData.value.state
    step1Error.value = ''
  }
}

function formatCardNumber(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 16) val = val.slice(0, 16)
  cardData.value.number = val.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatCardExpiry(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 4) val = val.slice(0, 4)
  if (val.length > 2) {
    cardData.value.expiry = val.replace(/^(\d{2})(\d{1,2})/, '$1/$2')
  } else {
    cardData.value.expiry = val
  }
}

function formatCardCvv(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 4) val = val.slice(0, 4)
  cardData.value.cvv = val
}

function copyPixKey() {
  navigator.clipboard?.writeText('00020126580014br.gov.bcb.pix0136ecoa-sustentavel-pix-chave-aleatoria-20265204000053039865802BR5919ECOA MODA CIRCULAR6009SAO PAULO62070503***6304')
  pixCopied.value = true
  setTimeout(() => {
    pixCopied.value = false
  }, 3000)
}

// Step navigation validation
function goToStep2() {
  step1Error.value = ''
  
  // 1. Validação de Nome
  if (!formData.value.name.trim() || formData.value.name.trim().length < 2) {
    step1Error.value = 'Por favor, preencha seu nome completo para identificação.'
    return
  }

  // 2. Validação rigorosa de E-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email.trim() || !emailRegex.test(formData.value.email.trim())) {
    step1Error.value = 'Por favor, insira um e-mail válido para rastreio do pedido (ex: seuemail@exemplo.com).'
    return
  }

  // 3. Validação rigorosa de Telefone
  const rawPhone = formData.value.phone.replace(/\D/g, '')
  if (rawPhone.length < 10) {
    step1Error.value = 'Por favor, insira um número de telefone com DDD válido (ex: (11) 98765-4321).'
    return
  }

  // 4. Validação de CEP
  const rawZip = formData.value.zipCode.replace(/\D/g, '')
  if (rawZip.length !== 8) {
    step1Error.value = 'Por favor, informe um CEP válido com 8 dígitos para entrega.'
    return
  }

  // 5. Validação de Logradouro, Bairro e Cidade
  if (!formData.value.street.trim() || !formData.value.neighborhood.trim() || !formData.value.city.trim()) {
    step1Error.value = 'Por favor, preencha os dados de rua, bairro e cidade.'
    return
  }

  // 6. Validação de Número do Imóvel
  if (!formData.value.number.trim()) {
    step1Error.value = 'Por favor, informe o número da residência (ou "S/N" caso não haja).'
    return
  }

  currentStep.value = 2
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToStep3() {
  currentStep.value = 3
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleFinalizeOrder() {
  step3Error.value = ''

  if (selectedPayment.value === 'credit') {
    const rawCard = cardData.value.number.replace(/\s/g, '')
    if (rawCard.length < 13 || rawCard.length > 19) {
      step3Error.value = 'Por favor, digite um número de cartão de crédito válido (16 dígitos).'
      return
    }
    if (!cardData.value.name.trim()) {
      step3Error.value = 'Informe o nome impresso no cartão de crédito.'
      return
    }
    if (cardData.value.expiry.length < 5) {
      step3Error.value = 'Informe a validade do cartão no formato MM/AA.'
      return
    }
    if (cardData.value.cvv.length < 3) {
      step3Error.value = 'Informe o código de segurança (CVV).'
      return
    }
  }

  isSubmitting.value = true

  setTimeout(() => {
    const paymentNames = {
      pix: 'PIX Instantâneo (5% OFF)',
      credit: `Cartão de Crédito (${cardData.value.installments}x)`,
      boleto: 'Boleto Sustentável'
    }

    const pixDiscount = selectedPayment.value === 'pix' ? (Math.max(0, cartStore.subtotal - cartStore.discountAmount) * 0.05) : 0
    const calculatedTotal = Math.max(0, cartStore.total - pixDiscount)

    const newOrder = customerStore.createOrder({
      items: cartStore.items,
      subtotal: cartStore.subtotal,
      total: calculatedTotal,
      shippingMethod: cartStore.shippingMethod === 'express' ? 'Frete Expresso Verde' : 'Frete Ecológico Neutro',
      paymentMethod: paymentNames[selectedPayment.value],
      impact: {
        waterSavedLiters: cartStore.totalWaterSaved,
        co2AvoidedKg: cartStore.totalCo2Avoided
      }
    })

    // Update profile address with entered data
    customerStore.updateProfile({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      address: {
        zipCode: formData.value.zipCode,
        street: formData.value.street,
        neighborhood: formData.value.neighborhood,
        city: formData.value.city,
        state: formData.value.state,
        complement: formData.value.complement
      }
    })

    orderCreated.value = newOrder
    cartStore.clearCart()
    isSubmitting.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            class="bg-primary text-raw-linen px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-colors cursor-pointer"
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

      <!-- Checkout Flow Canvas with 3-Step Timeline -->
      <div v-else-if="!isCartEmpty">
        <header class="mb-8 pb-4 border-b border-primary/10">
          <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
            Etapa Final &bull; 3 Passos Simples
          </span>
          <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold">
            Finalização Consciente da Compra
          </h1>
        </header>

        <!-- Timeline Steps Navigation Bar -->
        <div class="mb-10 p-3 sm:p-4 bg-surface-container rounded-2xl border border-primary/15 tactile-shadow">
          <div class="grid grid-cols-3 gap-2 sm:gap-4 items-center text-center">
            <!-- Step 1 Trigger -->
            <button
              @click="currentStep = 1"
              class="flex flex-col sm:flex-row items-center justify-center gap-2 p-2 rounded-xl transition-all cursor-pointer"
              :class="currentStep === 1 ? 'bg-primary text-raw-linen font-bold shadow-sm' : currentStep > 1 ? 'text-deep-forest hover:bg-raw-linen font-medium' : 'text-on-surface-variant opacity-60'"
            >
              <span
                class="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                :class="currentStep === 1 ? 'bg-raw-linen text-primary' : currentStep > 1 ? 'bg-deep-forest text-raw-linen' : 'bg-primary/20 text-walnut'"
              >
                <span v-if="currentStep > 1" class="material-symbols-outlined text-[14px]">check</span>
                <span v-else>1</span>
              </span>
              <span class="text-xs font-label uppercase tracking-wider">Identificação &amp; Endereço</span>
            </button>

            <!-- Step 2 Trigger -->
            <button
              @click="currentStep > 1 ? currentStep = 2 : null"
              class="flex flex-col sm:flex-row items-center justify-center gap-2 p-2 rounded-xl transition-all"
              :class="currentStep === 2 ? 'bg-primary text-raw-linen font-bold shadow-sm' : currentStep > 2 ? 'text-deep-forest hover:bg-raw-linen font-medium cursor-pointer' : 'text-on-surface-variant opacity-60'"
            >
              <span
                class="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                :class="currentStep === 2 ? 'bg-raw-linen text-primary' : currentStep > 2 ? 'bg-deep-forest text-raw-linen' : 'bg-primary/20 text-walnut'"
              >
                <span v-if="currentStep > 2" class="material-symbols-outlined text-[14px]">check</span>
                <span v-else>2</span>
              </span>
              <span class="text-xs font-label uppercase tracking-wider">Frete &amp; Revisão</span>
            </button>

            <!-- Step 3 Trigger -->
            <button
              @click="currentStep > 2 ? currentStep = 3 : null"
              class="flex flex-col sm:flex-row items-center justify-center gap-2 p-2 rounded-xl transition-all"
              :class="currentStep === 3 ? 'bg-terracotta text-raw-linen font-bold shadow-sm' : 'text-on-surface-variant opacity-60'"
            >
              <span
                class="w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                :class="currentStep === 3 ? 'bg-raw-linen text-terracotta' : 'bg-primary/20 text-walnut'"
              >
                3
              </span>
              <span class="text-xs font-label uppercase tracking-wider">Forma de Pagamento</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <!-- Left Column: Steps Form Content -->
          <div class="lg:col-span-7 flex flex-col gap-8">
            <!-- ================= STEP 1: IDENTIFICAÇÃO & ENDEREÇO ================= -->
            <section
              v-if="currentStep === 1"
              class="bg-surface-container rounded-2xl p-6 sm:p-8 border border-primary/15 tactile-shadow flex flex-col gap-6 animate-fadeIn"
            >
              <div class="flex items-center justify-between pb-3 border-b border-primary/10">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-full bg-primary text-raw-linen text-xs font-bold flex items-center justify-center">1</span>
                  <h3 class="font-headline text-lg font-bold text-primary">Identificação &amp; Endereço de Entrega</h3>
                </div>
                <span class="text-[11px] font-label text-terracotta font-medium">Integração ViaCEP Ativa</span>
              </div>

              <!-- Personal Info -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-label">
                <div class="sm:col-span-2">
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Nome Completo *</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">E-mail para Rastreio *</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Telefone / WhatsApp *</label>
                  <input
                    v-model="formData.phone"
                    @input="formatPhoneInput"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    maxlength="15"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <!-- CEP with auto-complete -->
                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">CEP * (Busca Automática)</label>
                  <div class="relative">
                    <input
                      v-model="formData.zipCode"
                      @input="formatZipCode"
                      type="text"
                      required
                      placeholder="00000-000"
                      maxlength="9"
                      class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                    />
                    <span
                      v-if="cartStore.isCalculatingShipping"
                      class="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-primary animate-spin"
                    >
                      refresh
                    </span>
                  </div>
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Bairro *</label>
                  <input
                    v-model="formData.neighborhood"
                    type="text"
                    required
                    placeholder="Bairro"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Logradouro (Rua, Avenida) *</label>
                  <input
                    v-model="formData.street"
                    type="text"
                    required
                    placeholder="Rua ou Avenida"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Número *</label>
                  <input
                    v-model="formData.number"
                    type="text"
                    placeholder="Número"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Complemento (Opcional)</label>
                  <input
                    v-model="formData.complement"
                    type="text"
                    placeholder="Apto, Bloco, etc."
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Cidade *</label>
                  <input
                    v-model="formData.city"
                    type="text"
                    required
                    placeholder="Cidade"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Estado (UF) *</label>
                  <input
                    v-model="formData.state"
                    type="text"
                    required
                    placeholder="UF (ex: SP)"
                    maxlength="2"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut uppercase focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <!-- Step 1 Error if any -->
              <span v-if="step1Error" class="text-xs text-error font-label">
                {{ step1Error }}
              </span>

              <!-- Step 1 Navigation CTA -->
              <div class="pt-3 border-t border-primary/10 flex justify-end">
                <button
                  type="button"
                  @click="goToStep2"
                  class="bg-primary text-raw-linen px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Avançar para Frete &amp; Revisão</span>
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </section>

            <!-- ================= STEP 2: FRETE & REVISÃO ================= -->
            <section
              v-else-if="currentStep === 2"
              class="bg-surface-container rounded-2xl p-6 sm:p-8 border border-primary/15 tactile-shadow flex flex-col gap-6 animate-fadeIn"
            >
              <div class="flex items-center justify-between pb-3 border-b border-primary/10">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-full bg-primary text-raw-linen text-xs font-bold flex items-center justify-center">2</span>
                  <h3 class="font-headline text-lg font-bold text-primary">Modalidade de Frete &amp; Revisão</h3>
                </div>
                <button
                  type="button"
                  @click="currentStep = 1"
                  class="text-xs font-label text-secondary hover:underline font-bold"
                >
                  Editar Endereço
                </button>
              </div>

              <!-- Selected Address Confirmation Card -->
              <div class="p-4 bg-raw-linen rounded-xl border border-primary/10 text-xs font-label flex items-start justify-between">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-deep-forest text-[18px] mt-0.5">home_pin</span>
                  <div>
                    <strong class="text-walnut block text-sm">{{ formData.name }}</strong>
                    <span class="text-on-surface-variant block">{{ formData.street }}{{ formData.number ? ', ' + formData.number : '' }} {{ formData.complement ? '(' + formData.complement + ')' : '' }}</span>
                    <span class="text-on-surface-variant block">{{ formData.neighborhood }} &bull; {{ formData.city }} - {{ formData.state }} &bull; CEP {{ formData.zipCode }}</span>
                  </div>
                </div>
              </div>

              <!-- Shipping Methods Selection -->
              <div class="flex flex-col gap-3">
                <label class="text-xs font-label uppercase text-on-surface-variant font-bold">
                  Escolha o Tipo de Entrega Sustentável
                </label>

                <label
                  class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all"
                  :class="cartStore.shippingMethod === 'eco' ? 'border-primary bg-raw-linen font-bold text-primary' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <div class="flex items-center gap-3">
                    <input
                      type="radio"
                      value="eco"
                      v-model="cartStore.shippingMethod"
                      class="text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-headline">Frete Ecológico Neutro</span>
                        <span class="text-[10px] bg-deep-forest/10 text-deep-forest px-2 py-0.5 rounded-full font-bold">Embalagem 100% Compostável</span>
                      </div>
                      <span class="text-xs text-on-surface-variant font-normal block mt-0.5">Prazo de 4 a 6 dias úteis</span>
                    </div>
                  </div>
                  <span class="text-sm font-bold text-deep-forest">
                    {{ cartStore.isFreeShippingEligible ? 'GRÁTIS' : 'R$ 14,90' }}
                  </span>
                </label>

                <label
                  class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all"
                  :class="cartStore.shippingMethod === 'express' ? 'border-primary bg-raw-linen font-bold text-primary' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <div class="flex items-center gap-3">
                    <input
                      type="radio"
                      value="express"
                      v-model="cartStore.shippingMethod"
                      class="text-primary focus:ring-primary h-4 w-4"
                    />
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-headline">Frete Expresso Verde</span>
                        <span class="text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full font-bold">Prioritário</span>
                      </div>
                      <span class="text-xs text-on-surface-variant font-normal block mt-0.5">Prazo de 2 a 3 dias úteis</span>
                    </div>
                  </div>
                  <span class="text-sm font-bold text-walnut">
                    {{ cartStore.isFreeShippingEligible ? 'R$ 10,00' : 'R$ 24,90' }}
                  </span>
                </label>
              </div>

              <!-- Step 2 Navigation CTA -->
              <div class="pt-4 border-t border-primary/10 flex items-center justify-between">
                <button
                  type="button"
                  @click="currentStep = 1"
                  class="text-xs font-label uppercase tracking-wider text-walnut hover:text-primary font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  @click="goToStep3"
                  class="bg-primary text-raw-linen px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Avançar para Pagamento</span>
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </section>

            <!-- ================= STEP 3: FORMA DE PAGAMENTO ================= -->
            <section
              v-else-if="currentStep === 3"
              class="bg-surface-container rounded-2xl p-6 sm:p-8 border border-primary/15 tactile-shadow flex flex-col gap-6 animate-fadeIn"
            >
              <div class="flex items-center justify-between pb-3 border-b border-primary/10">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-full bg-terracotta text-raw-linen text-xs font-bold flex items-center justify-center">3</span>
                  <h3 class="font-headline text-lg font-bold text-primary">Forma de Pagamento</h3>
                </div>
                <span class="text-xs font-label text-on-surface-variant">Ambiente Criptografado &bull; 100% Seguro</span>
              </div>

              <!-- Privacy & Security Notice from João -->
              <div class="p-4 bg-[#F2EDE6] rounded-2xl border border-primary/20 flex items-start gap-3.5 text-xs text-walnut/90 animate-fadeIn">
                <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span class="material-symbols-outlined text-[20px] text-terracotta">lock</span>
                </div>
                <div class="leading-relaxed">
                  <span class="font-bold text-primary block mb-0.5 font-headline text-sm">Privacidade &amp; Ambiente de Simulação</span>
                  Eu, João, não vou ter acesso a nenhum dos seus dados, pois esses dados ficam armazenados somente no seu navegador. Porém, não coloque dados sensíveis. Para cadastrar um cartão, digite qualquer número e qualquer nome, o sistema vai aceitar.
                </div>
              </div>

              <!-- Payment Method Selector Tabs -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <!-- PIX -->
                <label
                  class="p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition-all"
                  :class="selectedPayment === 'pix' ? 'border-primary bg-raw-linen font-bold text-primary shadow-sm' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <input type="radio" value="pix" v-model="selectedPayment" class="sr-only" />
                  <span class="material-symbols-outlined text-[26px] text-deep-forest">qr_code_2</span>
                  <span class="text-xs font-label">PIX Instantâneo</span>
                  <span class="text-[10px] text-deep-forest bg-primary/10 px-2 py-0.5 rounded-full font-bold">5% OFF EXTRA</span>
                </label>

                <!-- Cartão de Crédito -->
                <label
                  class="p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition-all"
                  :class="selectedPayment === 'credit' ? 'border-primary bg-raw-linen font-bold text-primary shadow-sm' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <input type="radio" value="credit" v-model="selectedPayment" class="sr-only" />
                  <span class="material-symbols-outlined text-[26px] text-terracotta">credit_card</span>
                  <span class="text-xs font-label">Cartão de Crédito</span>
                  <span class="text-[10px] text-on-surface-variant">Até 6x sem juros</span>
                </label>

                <!-- Boleto -->
                <label
                  class="p-4 rounded-xl border-2 cursor-pointer flex flex-col items-center text-center gap-2 transition-all"
                  :class="selectedPayment === 'boleto' ? 'border-primary bg-raw-linen font-bold text-primary shadow-sm' : 'border-primary/15 bg-surface text-walnut hover:bg-surface-variant'"
                >
                  <input type="radio" value="boleto" v-model="selectedPayment" class="sr-only" />
                  <span class="material-symbols-outlined text-[26px] text-walnut">receipt_long</span>
                  <span class="text-xs font-label">Boleto Verde</span>
                  <span class="text-[10px] text-on-surface-variant">Compensação em 24h</span>
                </label>
              </div>

              <!-- PIX Details Block with High-Quality QR Code -->
              <div v-if="selectedPayment === 'pix'" class="p-6 bg-raw-linen rounded-2xl border border-primary/15 flex flex-col items-center text-center gap-4 animate-fadeIn">
                <div class="flex items-center gap-2 text-deep-forest font-bold text-xs font-label bg-deep-forest/10 px-3 py-1.5 rounded-full">
                  <span class="material-symbols-outlined text-[18px]">bolt</span>
                  <span>5% de desconto automático aplicado no PIX</span>
                </div>

                <!-- Stylized High-Fidelity QR Code Card -->
                <div class="p-4 bg-white rounded-2xl shadow-md border-2 border-primary/15 relative group">
                  <svg class="w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Background -->
                    <rect width="200" height="200" rx="8" fill="#FFFFFF"/>
                    
                    <!-- Top-Left Finder Pattern -->
                    <rect x="14" y="14" width="48" height="48" rx="8" fill="#243624"/>
                    <rect x="22" y="22" width="32" height="32" rx="4" fill="#FFFFFF"/>
                    <rect x="28" y="28" width="20" height="20" rx="4" fill="#C86D51"/>
                    
                    <!-- Top-Right Finder Pattern -->
                    <rect x="138" y="14" width="48" height="48" rx="8" fill="#243624"/>
                    <rect x="146" y="22" width="32" height="32" rx="4" fill="#FFFFFF"/>
                    <rect x="152" y="28" width="20" height="20" rx="4" fill="#C86D51"/>
                    
                    <!-- Bottom-Left Finder Pattern -->
                    <rect x="14" y="138" width="48" height="48" rx="8" fill="#243624"/>
                    <rect x="22" y="146" width="32" height="32" rx="4" fill="#FFFFFF"/>
                    <rect x="28" y="152" width="20" height="20" rx="4" fill="#C86D51"/>
                    
                    <!-- Data Pattern Grid Matrix -->
                    <g fill="#243624">
                      <!-- Timing strips -->
                      <rect x="68" y="30" width="8" height="8" rx="2"/>
                      <rect x="84" y="30" width="8" height="8" rx="2"/>
                      <rect x="100" y="30" width="8" height="8" rx="2"/>
                      <rect x="116" y="30" width="8" height="8" rx="2"/>
                      
                      <rect x="30" y="68" width="8" height="8" rx="2"/>
                      <rect x="30" y="84" width="8" height="8" rx="2"/>
                      <rect x="30" y="100" width="8" height="8" rx="2"/>
                      <rect x="30" y="116" width="8" height="8" rx="2"/>
                      
                      <!-- Central & Random high density modules -->
                      <rect x="68" y="48" width="8" height="8" rx="2"/>
                      <rect x="84" y="48" width="16" height="8" rx="2"/>
                      <rect x="116" y="48" width="8" height="8" rx="2"/>
                      <rect x="138" y="68" width="16" height="8" rx="2"/>
                      <rect x="162" y="68" width="8" height="16" rx="2"/>
                      <rect x="178" y="68" width="8" height="8" rx="2"/>
                      
                      <rect x="48" y="68" width="8" height="8" rx="2"/>
                      <rect x="68" y="68" width="16" height="8" rx="2"/>
                      <rect x="100" y="68" width="8" height="16" rx="2"/>
                      <rect x="116" y="68" width="8" height="8" rx="2"/>
                      
                      <rect x="48" y="84" width="16" height="8" rx="2"/>
                      <rect x="68" y="84" width="8" height="8" rx="2"/>
                      <rect x="124" y="84" width="16" height="8" rx="2"/>
                      <rect x="148" y="84" width="8" height="8" rx="2"/>
                      <rect x="164" y="84" width="16" height="8" rx="2"/>
                      
                      <rect x="48" y="100" width="8" height="16" rx="2"/>
                      <rect x="68" y="108" width="8" height="8" rx="2"/>
                      <rect x="124" y="100" width="8" height="16" rx="2"/>
                      <rect x="140" y="100" width="8" height="8" rx="2"/>
                      <rect x="156" y="100" width="16" height="8" rx="2"/>
                      <rect x="180" y="100" width="6" height="16" rx="2"/>
                      
                      <rect x="48" y="124" width="16" height="8" rx="2"/>
                      <rect x="68" y="124" width="8" height="8" rx="2"/>
                      <rect x="84" y="124" width="16" height="8" rx="2"/>
                      <rect x="108" y="124" width="8" height="8" rx="2"/>
                      <rect x="124" y="124" width="8" height="16" rx="2"/>
                      <rect x="140" y="124" width="16" height="8" rx="2"/>
                      <rect x="164" y="124" width="16" height="8" rx="2"/>
                      
                      <rect x="68" y="140" width="8" height="16" rx="2"/>
                      <rect x="84" y="140" width="8" height="8" rx="2"/>
                      <rect x="100" y="140" width="16" height="8" rx="2"/>
                      <rect x="138" y="140" width="8" height="8" rx="2"/>
                      <rect x="154" y="140" width="16" height="16" rx="2"/>
                      <rect x="178" y="140" width="8" height="8" rx="2"/>
                      
                      <rect x="68" y="164" width="16" height="8" rx="2"/>
                      <rect x="92" y="156" width="8" height="16" rx="2"/>
                      <rect x="108" y="164" width="16" height="8" rx="2"/>
                      <rect x="132" y="156" width="8" height="16" rx="2"/>
                      <rect x="148" y="164" width="8" height="8" rx="2"/>
                      <rect x="164" y="164" width="16" height="8" rx="2"/>
                      
                      <rect x="68" y="178" width="8" height="8" rx="2"/>
                      <rect x="84" y="178" width="16" height="8" rx="2"/>
                      <rect x="108" y="178" width="8" height="8" rx="2"/>
                      <rect x="124" y="178" width="16" height="8" rx="2"/>
                      <rect x="148" y="178" width="8" height="8" rx="2"/>
                      <rect x="172" y="178" width="14" height="8" rx="2"/>
                    </g>
                    
                    <!-- Center Eco Logo Badge -->
                    <circle cx="100" cy="100" r="18" fill="#FAF6F0" stroke="#243624" stroke-width="2.5"/>
                    <circle cx="100" cy="100" r="14" fill="#243624"/>
                    <path d="M100 91C96 95 94 99 96 103C98 107 102 109 104 106C106 103 105 97 100 91Z" fill="#FAF6F0"/>
                    <path d="M100 109C98 106 97 101 100 97" stroke="#C86D51" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  
                  <div class="mt-2 text-[10px] font-label font-bold text-walnut uppercase tracking-widest flex items-center justify-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-deep-forest animate-pulse"></span>
                    <span>PIX Banco Central</span>
                  </div>
                </div>

                <div class="w-full flex flex-col gap-1.5 max-w-sm">
                  <span class="text-[11px] text-on-surface-variant font-label uppercase font-semibold">Chave Copia e Cola</span>
                  <button
                    type="button"
                    @click="copyPixKey"
                    class="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-primary/20 text-xs font-mono text-walnut truncate hover:border-primary transition-colors flex items-center justify-between cursor-pointer shadow-sm"
                  >
                    <span class="truncate">00020126580014br.gov.bcb.pix0136ecoa-sustentavel-2026...</span>
                    <span class="material-symbols-outlined text-[18px] text-primary shrink-0 ml-2">
                      {{ pixCopied ? 'check' : 'content_copy' }}
                    </span>
                  </button>
                  <span v-if="pixCopied" class="text-[11px] text-deep-forest font-bold font-label animate-fadeIn">
                    Chave PIX copiada para a área de transferência!
                  </span>
                </div>
              </div>

              <!-- Credit Card Form -->
              <div v-else-if="selectedPayment === 'credit'" class="flex flex-col gap-4 p-5 bg-raw-linen rounded-2xl border border-primary/15 animate-fadeIn text-xs font-label">
                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Número do Cartão de Crédito *</label>
                  <input
                    v-model="cardData.number"
                    @input="formatCardNumber"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxlength="19"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Nome Impresso no Cartão *</label>
                  <input
                    v-model="cardData.name"
                    type="text"
                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut uppercase focus:outline-none focus:border-primary"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Validade (MM/AA) *</label>
                    <input
                      v-model="cardData.expiry"
                      @input="formatCardExpiry"
                      type="text"
                      placeholder="MM/AA"
                      maxlength="5"
                      class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut font-mono focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label class="block uppercase text-on-surface-variant mb-1 font-semibold">CVV / Código *</label>
                    <input
                      v-model="cardData.cvv"
                      @input="formatCardCvv"
                      type="text"
                      placeholder="123"
                      maxlength="4"
                      class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut font-mono focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label class="block uppercase text-on-surface-variant mb-1 font-semibold">Parcelamento</label>
                  <select
                    v-model="cardData.installments"
                    class="w-full px-4 py-2.5 bg-surface rounded-xl border border-primary/20 text-sm text-walnut focus:outline-none focus:border-primary"
                  >
                    <option :value="1">1x de R$ {{ cartStore.total.toFixed(2).replace('.', ',') }} sem juros</option>
                    <option :value="2">2x de R$ {{ (cartStore.total / 2).toFixed(2).replace('.', ',') }} sem juros</option>
                    <option :value="3">3x de R$ {{ (cartStore.total / 3).toFixed(2).replace('.', ',') }} sem juros</option>
                    <option :value="4">4x de R$ {{ (cartStore.total / 4).toFixed(2).replace('.', ',') }} sem juros</option>
                    <option :value="5">5x de R$ {{ (cartStore.total / 5).toFixed(2).replace('.', ',') }} sem juros</option>
                    <option :value="6">6x de R$ {{ (cartStore.total / 6).toFixed(2).replace('.', ',') }} sem juros</option>
                  </select>
                </div>
              </div>

              <!-- Boleto Details Block -->
              <div v-else-if="selectedPayment === 'boleto'" class="p-5 bg-raw-linen rounded-2xl border border-primary/15 flex flex-col gap-3 animate-fadeIn text-xs font-label">
                <div class="flex items-center gap-2 text-walnut font-bold">
                  <span class="material-symbols-outlined text-[20px] text-terracotta">receipt_long</span>
                  <span>Boleto Bancário Sustentável (Sem papel &bull; 100% Digital)</span>
                </div>
                <p class="text-on-surface-variant font-body">
                  O boleto digital será emitido após a confirmação. O prazo de compensação bancária é de até 24 horas úteis.
                </p>
                <div class="p-3 bg-surface rounded-xl border border-primary/20 font-mono text-[11px] text-walnut text-center">
                  23793.38128 60083.012015 12000.860303 1 96540000057000
                </div>
              </div>

              <!-- Step 3 Error if any -->
              <span v-if="step3Error" class="text-xs text-error font-label">
                {{ step3Error }}
              </span>

              <!-- Final Confirmation Action Buttons -->
              <div class="pt-4 border-t border-primary/10 flex items-center justify-between">
                <button
                  type="button"
                  @click="currentStep = 2"
                  class="text-xs font-label uppercase tracking-wider text-walnut hover:text-primary font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  @click="handleFinalizeOrder"
                  :disabled="isSubmitting"
                  class="bg-primary text-raw-linen hover:bg-primary-container active:scale-98 transition-all py-4 px-8 rounded-full font-label text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 cursor-pointer"
                >
                  <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">refresh</span>
                  <span v-else class="material-symbols-outlined">lock</span>
                  <span>{{ isSubmitting ? 'Processando Ciclo...' : 'Confirmar e Finalizar Compra' }}</span>
                </button>
              </div>
            </section>
          </div>

          <!-- Right Column: Order Summary with Payment Method Sync -->
          <div class="lg:col-span-5">
            <OrderSummary :payment-method="selectedPayment" />
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
