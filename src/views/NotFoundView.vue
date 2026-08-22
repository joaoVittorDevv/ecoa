<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
    <div class="w-20 h-20 rounded-full bg-raw-linen border border-primary/20 flex items-center justify-center text-primary mb-6 tactile-shadow">
      <span class="material-symbols-outlined text-4xl text-terracotta">waves</span>
    </div>
    <span class="text-xs font-label uppercase tracking-widest text-terracotta font-bold mb-2">Erro 404</span>
    <h1 class="font-display text-3xl sm:text-4xl text-primary font-bold mb-3">
      Esta página ecoou para outro lugar.
    </h1>
    <p class="font-slogan text-lg text-walnut/70 max-w-md mb-8 italic">
      A peça ou endereço que você procura não foi encontrada no nosso acervo.
    </p>
    <router-link
      to="/"
      class="bg-primary text-raw-linen px-8 py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary-container transition-colors"
    >
      Voltar para o Início
    </router-link>
  </div>
</template>
