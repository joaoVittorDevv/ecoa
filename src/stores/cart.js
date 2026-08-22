import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const CART_STORAGE_KEY = 'ecoa_cart_items_v1'

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
  const isNeutralCarbonShipping = ref(true)

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
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

  const shippingCost = computed(() => {
    if (subtotal.value >= 300 || items.value.length === 0) return 0
    return 22.00
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
  }

  function removeItem(productId, size) {
    items.value = items.value.filter(item => !(item.id === productId && item.size === size))
    saveCart()
  }

  function updateQuantity(productId, size, newQty) {
    const item = items.value.find(item => item.id === productId && item.size === size)
    if (item) {
      if (newQty <= 0) {
        removeItem(productId, size)
      } else {
        item.quantity = newQty
        saveCart()
      }
    }
  }

  function applyCoupon(code) {
    const formatted = code.trim().toUpperCase()
    if (formatted === 'ECOA10' || formatted === 'HISTORIA10') {
      couponCode.value = formatted
      discountPercent.value = 10
      return { success: true, message: 'Cupom de 10% aplicado com sucesso!' }
    } else if (formatted === 'CIRCULAR20') {
      couponCode.value = formatted
      discountPercent.value = 20
      return { success: true, message: 'Cupom de 20% aplicado com sucesso!' }
    }
    return { success: false, message: 'Cupom inválido ou expirado.' }
  }

  function clearCart() {
    items.value = []
    couponCode.value = ''
    discountPercent.value = 0
    saveCart()
  }

  return {
    items,
    couponCode,
    discountPercent,
    isNeutralCarbonShipping,
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    carbonOffsetCost,
    total,
    totalWaterSaved,
    totalCo2Avoided,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    clearCart
  }
})
