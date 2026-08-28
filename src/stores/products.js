import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import initialProducts from '@/data/products.json'
import initialCategories from '@/data/categories.json'

const SOLD_STORAGE_KEY = 'ecoa_sold_product_ids_v1'

export const useProductsStore = defineStore('products', () => {
  let savedSoldIds = []
  try {
    const parsed = JSON.parse(localStorage.getItem(SOLD_STORAGE_KEY) || '[]')
    savedSoldIds = Array.isArray(parsed) ? parsed : []
  } catch (e) {
    localStorage.removeItem(SOLD_STORAGE_KEY)
    console.error('Erro ao ler peças vendidas do localStorage:', e)
  }

  const soldProductIds = ref(savedSoldIds)
  const products = computed(() => initialProducts.filter(product => !soldProductIds.value.includes(product.id)))
  const categories = ref(initialCategories)
  const searchQuery = ref('')
  const selectedCategory = ref('all')
  const selectedEra = ref('all')
  const selectedMaterial = ref('all')
  const selectedCondition = ref('all')
  const sortBy = ref('featured') // 'featured' | 'price-asc' | 'price-desc' | 'impact'

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      // Search text match
      const query = searchQuery.value.toLowerCase().trim()
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) ||
        product.story.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query)

      // Category match
      const matchesCategory = selectedCategory.value === 'all' || product.categorySlug === selectedCategory.value

      // Era match
      const matchesEra = selectedEra.value === 'all' || product.era === selectedEra.value

      // Material match
      const matchesMaterial = selectedMaterial.value === 'all' || product.material.toLowerCase().includes(selectedMaterial.value.toLowerCase())

      // Condition match
      const matchesCondition = selectedCondition.value === 'all' || product.condition.toLowerCase().includes(selectedCondition.value.toLowerCase())

      return matchesSearch && matchesCategory && matchesEra && matchesMaterial && matchesCondition
    }).sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price
      if (sortBy.value === 'price-desc') return b.price - a.price
      if (sortBy.value === 'impact') return b.impact.waterSavedLiters - a.impact.waterSavedLiters
      return 0
    })
  })

  function getProductById(id) {
    return products.value.find(p => p.id === id) || null
  }

  function getProductIncludingSold(id) {
    return initialProducts.find(p => p.id === id) || null
  }

  function isSold(id) {
    return soldProductIds.value.includes(id)
  }

  function markAsSold(items) {
    const ids = items.map(item => item.id || item.productId).filter(Boolean)
    soldProductIds.value = [...new Set([...soldProductIds.value, ...ids])]
    localStorage.setItem(SOLD_STORAGE_KEY, JSON.stringify(soldProductIds.value))
  }

  function getProductBySlug(slug) {
    return products.value.find(p => p.slug === slug) || null
  }

  function getCategoryBySlug(slug) {
    return categories.value.find(c => c.slug === slug) || null
  }

  function getRelatedProducts(currentId, limit = 3) {
    const current = getProductById(currentId)
    if (!current) return products.value.slice(0, limit)
    
    return products.value
      .filter(p => p.id !== currentId && (p.categorySlug === current.categorySlug || p.era === current.era))
      .slice(0, limit)
  }

  function resetFilters() {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    selectedEra.value = 'all'
    selectedMaterial.value = 'all'
    selectedCondition.value = 'all'
    sortBy.value = 'featured'
  }

  return {
    products,
    categories,
    searchQuery,
    selectedCategory,
    selectedEra,
    selectedMaterial,
    selectedCondition,
    sortBy,
    filteredProducts,
    getProductById,
    getProductIncludingSold,
    isSold,
    getProductBySlug,
    getCategoryBySlug,
    getRelatedProducts,
    markAsSold,
    resetFilters
  }
})
