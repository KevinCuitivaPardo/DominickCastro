<script setup>
import { RouterLink } from 'vue-router'

const logo = `${import.meta.env.BASE_URL}images/LOGODC.png`
</script>

<!-- Barra superior: izquierda | logo al centro | derecha -->
<template>
  <header class="topbar">
    <div class="left"><slot name="left" /></div>
    <RouterLink to="/" class="logo" aria-label="Un gran soñador — inicio">
      <img :src="logo" alt="" width="40" height="40" />
    </RouterLink>
    <div class="right"><slot name="right" /></div>
  </header>
</template>

<style scoped>
.topbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.75rem;
}
.left {
  justify-self: start;
}
.right {
  justify-self: end;
  text-align: right;
}
.logo {
  display: block;
  line-height: 0;
  transition: transform 0.6s var(--ease), filter 0.4s;
  animation: drop 1s var(--ease) 0.2s both;
}
.logo img {
  height: 2.6rem;
  width: auto;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
}
.logo:hover {
  transform: scale(1.12) rotate(-4deg);
  filter: brightness(1.1);
}
@keyframes drop {
  from {
    opacity: 0;
    transform: translateY(-14px) scale(0.85);
  }
}
@media (max-width: 600px) {
  .logo img {
    height: 2.2rem;
  }
}
</style>
