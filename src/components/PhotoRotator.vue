<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SmartImage from './SmartImage.vue'

const props = defineProps({
  photos: { type: Array, required: true },
  interval: { type: Number, default: 3000 },
  offset: { type: Number, default: 0 } // desfase para que dos rotadores no cambien a la vez
})

const active = ref(0)
let start, timer

onMounted(() => {
  if (props.photos.length < 2) return
  start = setTimeout(() => {
    timer = setInterval(() => (active.value = (active.value + 1) % props.photos.length), props.interval)
  }, props.offset)
})
onBeforeUnmount(() => {
  clearTimeout(start)
  clearInterval(timer)
})
</script>

<template>
  <div class="rotator">
    <div
      v-for="(p, n) in photos"
      :key="p"
      class="slide"
      :class="{ on: n === active }"
      :style="{ '--bg': `url('${p}')` }"
    >
      <SmartImage :src="p" alt="" />
    </div>
    <div v-if="photos.length > 1" class="dots" aria-hidden="true">
      <i v-for="(p, n) in photos" :key="p" :class="{ on: n === active }"></i>
    </div>
  </div>
</template>

<style scoped>
.rotator {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--blue-deep);
}
.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.1s var(--ease);
}
.slide.on {
  opacity: 1;
}
/* Fondo desenfocado: la foto se ve completa, sin cortar caras */
.slide::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: var(--bg) center / cover;
  filter: blur(26px) brightness(0.55);
}
.slide :deep(.smart) {
  position: relative;
}
.slide :deep(img) {
  object-fit: contain;
  transform: scale(1.05);
  transition: transform 4.5s ease-out;
}
.slide.on :deep(img) {
  transform: scale(1);
}
.dots {
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  display: flex;
  gap: 5px;
}
.dots i {
  width: 14px;
  height: 2px;
  background: rgba(255, 255, 255, 0.4);
  transition: background 0.4s, width 0.4s var(--ease);
}
.dots i.on {
  width: 26px;
  background: var(--gold);
}
</style>
