import { defineStore } from 'pinia'
import { ref } from 'vue'
import initialCustomer from '@/data/customer.json'
import initialOrders from '@/data/orders.json'

const CUSTOMER_STORAGE_KEY = 'ecoa_customer_profile_v1'
const ORDERS_STORAGE_KEY = 'ecoa_customer_orders_v1'

export const useCustomerStore = defineStore('customer', () => {
  const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY)
  const profile = ref(savedCustomer ? JSON.parse(savedCustomer) : initialCustomer)

  const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
  const orders = ref(savedOrders ? JSON.parse(savedOrders) : initialOrders)

  function saveProfile() {
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(profile.value))
  }

  function saveOrders() {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders.value))
  }

  function updateProfile(newData) {
    profile.value = { ...profile.value, ...newData }
    saveProfile()
  }

  function toggleFavorite(productId) {
    const index = profile.value.favorites.indexOf(productId)
    if (index > -1) {
      profile.value.favorites.splice(index, 1)
    } else {
      profile.value.favorites.push(productId)
    }
    saveProfile()
  }

  function isFavorite(productId) {
    return profile.value.favorites.includes(productId)
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
      shippingMethod: shippingMethod || 'Frete Neutro de Carbono',
      paymentMethod: paymentMethod || 'PIX Consciente',
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
    profile.value.impactMetrics.co2AvoidedKg += parseFloat((impact?.co2AvoidedKg || 6.0).toFixed(1))
    profile.value.impactMetrics.circularPiecesAdopted += items.reduce((acc, i) => acc + i.quantity, 0)
    saveProfile()

    return newOrder
  }

  return {
    profile,
    orders,
    updateProfile,
    toggleFavorite,
    isFavorite,
    createOrder
  }
})
