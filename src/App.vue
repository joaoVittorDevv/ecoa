<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import BottomNav from '@/components/common/BottomNav.vue'

const route = useRoute()
const isStoreView = computed(() => route.name !== 'philosophy')
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-on-background selection:bg-terracotta/20 selection:text-walnut">
    <!-- Main Top Navigation (Exibido apenas no fluxo da loja) -->
    <Header v-if="isStoreView" />

    <!-- Page Content View -->
    <main class="flex-grow" :class="{ 'pb-16 md:pb-0': isStoreView }">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer (Exibido apenas no fluxo da loja) -->
    <Footer v-if="isStoreView" />

    <!-- Mobile Bottom Navigation (Exibido apenas no fluxo da loja) -->
    <BottomNav v-if="isStoreView" />
  </div>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
