import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import initialCustomer from '@/data/customer.json'
import initialOrders from '@/data/orders.json'

const CUSTOMER_STORAGE_KEY = 'ecoa_customer_profile_v1'
const ORDERS_STORAGE_KEY = 'ecoa_customer_orders_v1'

export const useCustomerStore = defineStore('customer', () => {
  // Carrega cliente do localStorage
  let savedCustomer = null
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Se for o mock antigo da Mariana Silva, limpa para novo usuário
      if (parsed.name === 'Mariana Silva' || parsed.id === 'cust-001') {
        localStorage.removeItem(CUSTOMER_STORAGE_KEY)
        localStorage.removeItem(ORDERS_STORAGE_KEY)
      } else {
        savedCustomer = parsed
      }
    }
  } catch (e) {
    console.error('Erro ao ler customer do localStorage:', e)
  }

  const profile = ref(savedCustomer || {
    id: `cust-${Date.now()}`,
    name: '',
    email: '',
    phone: '',
    avatar: '',
    address: {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      complement: ''
    },
    impactMetrics: {
      waterSavedLiters: 0,
      co2AvoidedKg: 0,
      circularPiecesAdopted: 0
    },
    favorites: []
  })

  // Carrega pedidos do localStorage
  let savedOrders = []
  try {
    const rawOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (rawOrders) {
      savedOrders = JSON.parse(rawOrders)
    }
  } catch (e) {
    console.error('Erro ao ler orders do localStorage:', e)
  }

  const orders = ref(savedOrders || [])

  const hasCustomName = computed(() => {
    return Boolean(profile.value.name && profile.value.name.trim().length > 0)
  })

  function saveProfile() {
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(profile.value))
  }

  function saveOrders() {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders.value))
  }

  function setCustomerName(name) {
    profile.value.name = (name || '').trim()
    saveProfile()
  }

  function updateProfile(newData) {
    profile.value = {
      ...profile.value,
      ...newData,
      address: {
        ...profile.value.address,
        ...(newData.address || {})
      },
      impactMetrics: {
        ...profile.value.impactMetrics,
        ...(newData.impactMetrics || {})
      }
    }
    saveProfile()
  }

  function toggleFavorite(productId) {
    if (!profile.value.favorites) {
      profile.value.favorites = []
    }
    const index = profile.value.favorites.indexOf(productId)
    if (index > -1) {
      profile.value.favorites.splice(index, 1)
    } else {
      profile.value.favorites.push(productId)
    }
    saveProfile()
  }

  function isFavorite(productId) {
    return (profile.value.favorites || []).includes(productId)
  }

  function createOrder({ items, subtotal, total, shippingMethod, paymentMethod, impact }) {
    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000)
    const newOrder = {
      id: `ECOA-${randomIdSuffix}`,
      date: new Date().toISOString(),
      status: 'Confirmado',
      statusColor: 'deep-forest',
      subtotal,
      total,
      shipping: 0.00,
      shippingMethod: shippingMethod || 'Frete Ecológico Neutro',
      paymentMethod: paymentMethod || 'PIX Instantâneo',
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image
      })),
      impact: {
        waterSavedLiters: impact?.waterSavedLiters || 2500,
        co2AvoidedKg: impact?.co2AvoidedKg || 6.0
      }
    }

    // Add order to the beginning of the list
    orders.value.unshift(newOrder)
    saveOrders()

    // Update customer cumulative positive impact metrics
    profile.value.impactMetrics.waterSavedLiters += (impact?.waterSavedLiters || 2500)
    profile.value.impactMetrics.co2AvoidedKg = parseFloat(
      (profile.value.impactMetrics.co2AvoidedKg + (impact?.co2AvoidedKg || 6.0)).toFixed(1)
    )
    profile.value.impactMetrics.circularPiecesAdopted += items.reduce((acc, i) => acc + i.quantity, 0)
    saveProfile()

    return newOrder
  }

  return {
    profile,
    orders,
    hasCustomName,
    setCustomerName,
    updateProfile,
    toggleFavorite,
    isFavorite,
    createOrder
  }
})

