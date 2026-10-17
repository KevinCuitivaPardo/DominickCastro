<script setup>
import { ref } from 'vue'

defineProps({ src: String, alt: { type: String, default: '' }, pos: { type: String, default: '50% 50%' } })
const failed = ref(false)
</script>

<!-- Si la foto aún no existe muestra un marcador elegante en lugar de una imagen rota -->
<template>
  <div class="smart">
    <img v-if="!failed" :src="src" :alt="alt" :style="{ objectPosition: pos }" @error="failed = true" />
    <div v-else class="ph" aria-hidden="true">
      <span>FOTO</span>
    </div>
  </div>
</template>

<style scoped>
.smart,
img,
.ph {
  width: 100%;
  height: 100%;
}
img {
  object-fit: cover;
}
.ph {
  display: grid;
  place-items: center;
  background:
    repeating-linear-gradient(135deg, transparent 0 14px, rgba(201, 162, 75, 0.08) 14px 15px),
    linear-gradient(160deg, var(--blue), var(--blue-deep));
  color: var(--gold);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
}
</style>
