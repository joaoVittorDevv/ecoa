<script setup>
import EcoaLogo from '@/components/common/EcoaLogo.vue'
</script>

<template>
  <footer class="bg-surface-container border-t border-primary/10 pt-16 pb-24 md:pb-12 text-walnut mt-auto">
    <div class="max-w-container-max mx-auto px-4 md:px-gutter">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14">
        <!-- Brand Column -->
        <div class="md:col-span-5 flex flex-col gap-4">
          <EcoaLogo variant="reduced" size="md" />
          <p class="font-slogan text-lg italic text-walnut/90 max-w-md">
            "Quando você compra roupa usada, a história ecoa."
          </p>
          <p class="text-sm text-on-surface-variant leading-relaxed max-w-md">
            Curadoria criteriosa de peças vintage e atemporais com propósito. Moda circular que valoriza o afeto, reduz o impacto ambiental e dá continuidade a memórias extraordinárias.
          </p>
          <div class="flex items-center gap-3 pt-2 text-primary">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raw-linen border border-primary/10 text-xs font-label uppercase tracking-wider">
              <span class="material-symbols-outlined text-[14px] text-deep-forest">eco</span>
              100% Circular
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raw-linen border border-primary/10 text-xs font-label uppercase tracking-wider">
              <span class="material-symbols-outlined text-[14px] text-terracotta">water_drop</span>
              Economia de Recursos
            </span>
          </div>
        </div>

        <!-- Navigation Links Column -->
        <div class="md:col-span-3 flex flex-col gap-3">
          <h4 class="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Curadorias</h4>
          <router-link to="/categoria/anos-90" class="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Anos 90 & Denim
          </router-link>
          <router-link to="/categoria/anos-70" class="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Anos 70 & Cores da Terra
          </router-link>
          <router-link to="/categoria/alfaiataria" class="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Alfaiataria Nobre
          </router-link>
          <router-link to="/categoria/seda-linho" class="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Seda Pura & Linho Cru
          </router-link>
          <router-link to="/categoria/minimalista" class="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Minimalismo Essencial
          </router-link>
        </div>

        <!-- Transparency & Newsletter -->
        <div class="md:col-span-4 flex flex-col gap-4">
          <h4 class="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Manifesto Circular</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            Cada peça do nosso catálogo passa por higienização profissional ecológica, autenticação de época e medição minuciosa para garantir caimento perfeito.
          </p>
          <div class="p-4 bg-raw-linen rounded-xl border border-primary/10 flex items-start gap-3">
            <span class="material-symbols-outlined text-deep-forest text-[22px] shrink-0 mt-0.5">local_shipping</span>
            <div class="text-xs text-on-surface-variant">
              <strong class="text-primary block font-medium mb-0.5">Frete Neutro em Carbono</strong>
              Todas as emissões de transporte são 100% compensadas via projetos de reflorestamento nacional.
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Credits -->
      <div class="pt-8 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
        <p>© 2026 Ecoa Moda Circular Ltda. Todos os direitos reservados.</p>
        <p class="flex items-center gap-1">
          Feito com afeto &amp; consciência sustentável 🌿
        </p>
      </div>
    </div>
  </footer>
</template>
