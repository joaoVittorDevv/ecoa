import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const CART_STORAGE_KEY = 'ecoa_cart_items_v1'
const CEP_STORAGE_KEY = 'ecoa_cart_cep_v1'

export const useCartStore = defineStore('cart', () => {
  let savedCart = []
  let savedCepData = null
  try {
    const parsedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
    const parsedCep = JSON.parse(localStorage.getItem(CEP_STORAGE_KEY) || 'null')
    savedCart = Array.isArray(parsedCart) ? parsedCart : []
    savedCepData = parsedCep && typeof parsedCep === 'object' && !Array.isArray(parsedCep) ? parsedCep : null
  } catch (e) {
    localStorage.removeItem(CART_STORAGE_KEY)
    localStorage.removeItem(CEP_STORAGE_KEY)
    console.error('Erro ao ler carrinho do localStorage:', e)
  }
  // Cada produto do catálogo é um exemplar único: remove duplicatas e normaliza quantidade.
  const items = ref(savedCart.reduce((unique, item) => {
    if (!item?.id || unique.some(saved => saved.id === item.id)) return unique
    unique.push({ ...item, quantity: 1 })
    return unique
  }, []))

  const couponCode = ref('')
  const discountPercent = ref(0)
  const couponMessage = ref('')
  const isNeutralCarbonShipping = ref(true)

  // Shipping state
  const shippingCep = ref(savedCepData?.cep || '')
  const shippingAddress = ref(savedCepData?.address || null)
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

  function addItem(product, size = null) {
    if (items.value.some(item => item.id === product.id)) {
      return { success: false, message: 'Esta peça única já está na sua sacola.' }
    }

    items.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size || product.size || 'M',
      quantity: 1,
      image: product.image,
      origin: product.origin,
      material: product.material,
      waterSavedLiters: product.impact?.waterSavedLiters || 2000,
      co2AvoidedKg: product.impact?.co2AvoidedKg || 5.0
    })
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


    item.quantity = 1
    saveCart()
    return { success: false, message: 'Peça única: limite de 1 unidade.' }
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
