<script setup>
import { ref, onMounted } from 'vue'
import { useCustomerStore } from '@/stores/customer'

const customerStore = useCustomerStore()
const isVisible = ref(false)
const userNameInput = ref('')
const inputError = ref('')

onMounted(() => {
  // Verifica se o usuário já possui nome salvo no store / localStorage
  if (!customerStore.hasCustomName) {
    setTimeout(() => {
      isVisible.value = true
    }, 400)
  }
})

function handleSubmit() {
  const trimmed = userNameInput.value.trim()
  if (!trimmed) {
    inputError.value = 'Por favor, digite seu nome para continuar.'
    return
  }
  
  customerStore.setCustomerName(trimmed)
  isVisible.value = false
}
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-walnut/60 backdrop-blur-sm animate-fadeIn"
      @click.self="() => {}"
    >
      <div
        class="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-primary/20 shadow-2xl relative text-walnut transform transition-all"
        style="background-color: #FAF6F0 !important;"
      >
        <!-- Eco Header Icon -->
        <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 mx-auto border border-primary/15">
          <span class="material-symbols-outlined text-[30px] text-deep-forest">spa</span>
        </div>

        <div class="text-center mb-6">
          <span class="text-[11px] font-label uppercase tracking-widest text-terracotta font-bold block mb-1">
            Moda Circular &bull; Peças Únicas
          </span>
          <h2 class="font-display text-2xl sm:text-3xl font-bold text-primary mb-2">
            Boas-vindas ao ECOA
          </h2>
          <p class="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Cada peça do nosso acervo é um exemplar exclusivo. Como podemos te chamar durante sua visita?
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-label uppercase text-on-surface-variant font-bold mb-1.5">
              Seu Nome ou Apelido
            </label>
            <input
              v-model="userNameInput"
              type="text"
              placeholder="Digite seu nome aqui..."
              required
              autofocus
              class="w-full px-4 py-3 bg-surface rounded-xl border border-primary/25 text-sm font-label text-walnut focus:outline-none focus:border-primary shadow-inner"
            />
            <span v-if="inputError" class="text-xs text-error font-label mt-1 block">
              {{ inputError }}
            </span>
          </div>

          <button
            type="submit"
            class="w-full bg-primary text-raw-linen hover:bg-primary-container active:scale-98 transition-all py-3.5 rounded-full font-label text-xs uppercase tracking-wider font-bold shadow-lg shadow-primary/20 cursor-pointer inline-flex items-center justify-center gap-2 mt-2"
          >
            <span>Começar a Garimpar</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </form>

        <p class="text-[11px] text-center text-on-surface-variant/70 font-body mt-4">
          Seus dados são salvos localmente em seu navegador.
        </p>
      </div>
    </div>
  </transition>
</template>
