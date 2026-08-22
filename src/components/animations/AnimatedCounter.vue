<script setup>
import { ref, watch, onMounted } from 'vue'
import anime from 'animejs'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 1800
  },
  decimals: {
    type: Number,
    default: 0
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})

const displayValue = ref(0)
const counterObject = { val: 0 }

function animateNumber() {
  anime({
    targets: counterObject,
    val: props.value,
    round: props.decimals > 0 ? Math.pow(10, props.decimals) : 1,
    easing: 'easeOutExpo',
    duration: props.duration,
    update: () => {
      displayValue.value = props.decimals > 0 
        ? counterObject.val.toLocaleString('pt-BR', { minimumFractionDigits: props.decimals, maximumFractionDigits: props.decimals })
        : Math.round(counterObject.val).toLocaleString('pt-BR')
    }
  })
}

onMounted(() => {
  animateNumber()
})

watch(() => props.value, () => {
  animateNumber()
})
</script>

<template>
  <span class="inline-flex items-baseline font-bold tabular-nums">
    <span v-if="prefix" class="mr-0.5">{{ prefix }}</span>
    <span>{{ displayValue }}</span>
    <span v-if="suffix" class="ml-0.5">{{ suffix }}</span>
  </span>
</template>
