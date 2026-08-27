import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const CART_STORAGE_KEY = 'ecoa_cart_items_v1'
const CEP_STORAGE_KEY = 'ecoa_cart_cep_v1'

export const useCartStore = defineStore('cart', () => {
  // Load initial cart from localStorage if available, or default with 2 curated items
  const savedCart = localStorage.getItem(CART_STORAGE_KEY)
  const items = ref(savedCart ? JSON.parse(savedCart) : [
    {
      id: 'prod-7',
      name: 'Blusa Pérola de Seda Natural',
      price: 260.00,
      size: 'M',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoUs6q0b7nh0YxlWG0PEa1aAkJ2iJGHPLXbWmUZWVzIig-2EuREWFgVBjPNtjZnLpsDiOCeQAoX6ECI70BGYRHxA18VFqlOcMkn6EF4Gqr41QqQvd1C-iyhVlwaXgIHCQmh3ifqmDS9nqU-WAoK9kywBa_j2RL_mGnU3iOhOqzsGaumEW790CQW8kHegvXyTDrPGbCdsBpAe9kodgRNBYDCa9HVUrNuyNI4TF5yqeVKr5klEEZa60G',
      origin: 'Florença, Itália',
      material: '100% Crepe de Seda',
      waterSavedLiters: 2100,
      co2AvoidedKg: 4.5
    },
    {
      id: 'prod-8',
      name: 'Blazer Linho Cru Minimalista',
      price: 310.00,
      size: 'M',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9sGaNvvwHr-QRRie9c7PH3q6XSr8iKzk9rwEn-Az8Ruo5F-8PoXoXXwIGge27ZLizDnn6W8gNPYb4BCm6ep5ssAKtdA47EFBMhEKDa4x04QsXGaTg78WyR5c86aQkruyK82pPo6SGvo3JNU3G5aekhHoCCgjmLRJIZ6a_ay_79kn48mWMyd0UOvjAFqN3-LZzHkqTIbq6xBe_v4Jfly6GzRvMHLaPODcSjXMXhcB-7NWzus1M8cJV',
      origin: 'Porto, Portugal',
      material: '100% Linho Europeu Puro',
      waterSavedLiters: 3400,
      co2AvoidedKg: 7.0
    }
  ])

  const couponCode = ref('')
  const discountPercent = ref(0)
  const couponMessage = ref('')
  const isNeutralCarbonShipping = ref(true)

  // Shipping state
  const savedCepData = localStorage.getItem(CEP_STORAGE_KEY)
  const shippingCep = ref(savedCepData ? JSON.parse(savedCepData).cep : '')
  const shippingAddress = ref(savedCepData ? JSON.parse(savedCepData).address : null)
  const shippingMethod = ref('eco') // 'eco' | 'express'
  const isCalculatingShipping = ref(false)
  const shippingError = ref('')

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
  }

  function saveShipping() {
    if (shippingAddress.value) {
      localStorage.setItem(CEP_STORAGE_KEY, JSON.stringify({
        cep: shippingCep.value,
        address: shippingAddress.value
      }))
    }
  }

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const discountAmount = computed(() => {
    return (subtotal.value * discountPercent.value) / 100
  })

  const isFreeShippingEligible = computed(() => {
    return subtotal.value >= 300
  })

  const shippingCost = computed(() => {
    if (items.value.length === 0) return 0
    if (shippingMethod.value === 'express') {
      return isFreeShippingEligible.value ? 10.00 : 24.90
    }
    // 'eco' default
    return isFreeShippingEligible.value ? 0 : 14.90
  })

  const carbonOffsetCost = computed(() => {
    return isNeutralCarbonShipping.value && items.value.length > 0 ? 4.50 : 0
  })

  const total = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value + shippingCost.value + carbonOffsetCost.value)
  })

  const totalWaterSaved = computed(() => {
    return items.value.reduce((acc, item) => acc + ((item.waterSavedLiters || 2000) * item.quantity), 0)
  })

  const totalCo2Avoided = computed(() => {
    return items.value.reduce((acc, item) => acc + ((item.co2AvoidedKg || 5.0) * item.quantity), 0)
  })

  function addItem(product, size = null, quantity = 1) {
    const chosenSize = size || product.size || 'M'
    const existingIndex = items.value.findIndex(item => item.id === product.id && item.size === chosenSize)

    if (existingIndex > -1) {
      items.value[existingIndex].quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: chosenSize,
        quantity,
        image: product.image,
        origin: product.origin,
        material: product.material,
        waterSavedLiters: product.impact?.waterSavedLiters || 2000,
        co2AvoidedKg: product.impact?.co2AvoidedKg || 5.0
      })
    }
    saveCart()
    return { success: true, message: 'Peça adicionada com sucesso à sua sacola!' }
  }

  function removeItem(productId, size) {
    items.value = items.value.filter(item => !(item.id === productId && item.size === size))
    saveCart()
  }

  function updateQuantity(productId, size, newQty) {
    const item = items.value.find(item => item.id === productId && item.size === size)
    if (!item) return { success: false }

    if (newQty <= 0) {
      removeItem(productId, size)
      return { success: true, removed: true }
    }


    item.quantity = newQty
    saveCart()
    return { success: true }
  }

  function applyCoupon(code) {
    const formatted = (code || '').trim().toUpperCase()
    
    // Cupons Oficiais da Filosofia ECOA Moda Circular
    const validCoupons = {
      'ECOA10': {
        percent: 10,
        message: 'Cupom Ecoa: 10% OFF para iniciar seu novo ciclo na moda circular.'
      },
      'CIRCULAR20': {
        percent: 20,
        message: 'Cupom Circular: 20% OFF pelo seu compromisso com o consumo consciente.'
      },
      'RESGATE15': {
        percent: 15,
        message: 'Cupom Resgate: 15% OFF para resgatar e estender a história de peças nobres.'
      },
      'GARIMPO25': {
        percent: 25,
        message: 'Cupom Garimpo: 25% OFF em curadoria exclusiva e atemporal.'
      },
      'SEGUNDAVIDA10': {
        percent: 10,
        message: 'Cupom Segunda Vida: 10% OFF para poupar recursos e preservar o planeta.'
      }
    }

    if (validCoupons[formatted]) {
      couponCode.value = formatted
      discountPercent.value = validCoupons[formatted].percent
      couponMessage.value = validCoupons[formatted].message
      return { success: true, message: validCoupons[formatted].message, percent: validCoupons[formatted].percent }
    }

    return { success: false, message: 'Cupom inválido ou expirado.' }
  }

  function removeCoupon() {
    couponCode.value = ''
    discountPercent.value = 0
    couponMessage.value = ''
  }

  async function calculateShipping(cepInput) {
    const cleaned = (cepInput || '').replace(/\D/g, '')
    shippingError.value = ''

    if (cleaned.length !== 8) {
      shippingError.value = 'Por favor, digite um CEP válido com 8 dígitos.'
      return { success: false, message: shippingError.value }
    }

    isCalculatingShipping.value = true

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
      const data = await response.json()

      if (data.erro) {
        shippingError.value = 'CEP não encontrado. Verifique os números digitados.'
        isCalculatingShipping.value = false
        return { success: false, message: shippingError.value }
      }

      shippingCep.value = cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
      shippingAddress.value = {
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
        zipCode: shippingCep.value
      }

      saveShipping()
      isCalculatingShipping.value = false
      return { success: true, address: shippingAddress.value }
    } catch (err) {
      shippingError.value = 'Não foi possível consultar o CEP no momento. Tente novamente.'
      isCalculatingShipping.value = false
      return { success: false, message: shippingError.value }
    }
  }

  function clearCart() {
    items.value = []
    couponCode.value = ''
    discountPercent.value = 0
    couponMessage.value = ''
    saveCart()
  }

  return {
    items,
    couponCode,
    discountPercent,
    couponMessage,
    isNeutralCarbonShipping,
    shippingCep,
    shippingAddress,
    shippingMethod,
    isCalculatingShipping,
    shippingError,
    itemCount,
    subtotal,
    discountAmount,
    isFreeShippingEligible,
    shippingCost,
    carbonOffsetCost,
    total,
    totalWaterSaved,
    totalCo2Avoided,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    calculateShipping,
    clearCart
  }
})
