import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Ecoa — Moda Circular & Sustentável' }
  },
  {
    path: '/garimpo',
    name: 'garimpo',
    component: () => import('@/views/CategoriesView.vue'),
    meta: { title: 'Ecoa — Nosso Garimpo por Épocas' }
  },
  {
    path: '/categoria/:slug',
    name: 'category-detail',
    component: () => import('@/views/CategoriesView.vue'),
    props: true,
    meta: { title: 'Ecoa — Curadoria Temática' }
  },
  {
    path: '/produtos',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    meta: { title: 'Ecoa — Catálogo de Peças Únicas' }
  },
  {
    path: '/produto/:id',
    name: 'product-detail',
    component: () => import('@/views/ProductDetailView.vue'),
    props: true,
    meta: { title: 'Ecoa — Detalhe da Peça' }
  },
  {
    path: '/sacola',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Ecoa — Sua Sacola Consciente' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/CheckoutView.vue'),
    meta: { title: 'Ecoa — Finalização do Ciclo' }
  },
  {
    path: '/perfil',
    name: 'profile',
    component: () => import('@/views/CustomerProfileView.vue'),
    meta: { title: 'Ecoa — Perfil & Impacto Sustentável' }
  },
  {
    path: '/filosofia',
    name: 'philosophy',
    component: () => import('@/views/PhilosophyView.vue'),
    meta: { title: 'Ecoa — Nossa Filosofia & Valores' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página Não Encontrada — Ecoa' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
