<script setup>
import TopBar from '../components/TopBar.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import SmartImage from '../components/SmartImage.vue'

// Fotos del inicio: se alternan cada 3 segundos
const base = import.meta.env.BASE_URL
const heroes = [
  { src: `${base}images/INC.jpeg`, pos: '50% 22%' },
  { src: `${base}images/INC2.jpeg`, pos: '50% 38%' }
]
const active = ref(0)
let timer
onMounted(() => (timer = setInterval(() => (active.value = (active.value + 1) % heroes.length), 3000)))
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <main class="home">
    <TopBar>
      <template #left><span class="label">Millonarios F.C.</span></template>
      <template #right><span class="label muted">Para Dominick</span></template>
    </TopBar>

    <section class="hero">
      <div class="copy">
        <p class="label kicker">Donde empezó el sueño</p>
        <h1><span class="mask"><span>Dominick</span><span class="dot">.</span></span></h1>
        <div class="gold-rule"></div>
        <p class="lead">
          Un lugar para recordar de dónde vienes y para dónde vas, y para que nunca olvides lo orgullosos que estamos de ti.
        </p>
        <RouterLink to="/pasillo" class="btn">Iniciar el viaje <span class="arrow">→</span></RouterLink>
      </div>

      <figure class="portrait" aria-hidden="true">
        <div class="img">
          <div v-for="(h, n) in heroes" :key="h.src" class="slide" :class="{ on: n === active }">
            <SmartImage :src="h.src" alt="" :pos="h.pos" />
          </div>
        </div>
        <span class="tag">Pequeño gran jugador</span>
        <span class="corner"></span>
      </figure>
    </section>

    <footer class="bottom">
      <div class="rule"></div>
      <div class="row">
        <span class="label muted">01 — Pasillo de los recuerdos</span>
        <span class="label muted">02 — Cartas</span>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  padding: clamp(1.25rem, 3.5vw, 2.75rem);
  background:
    radial-gradient(55rem 38rem at 85% 20%, rgba(31, 85, 214, 0.38), transparent 60%),
    linear-gradient(180deg, var(--blue) 0%, var(--blue-deep) 100%);
  overflow: hidden;
}
.top,
.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.muted {
  color: var(--white);
  opacity: 0.55;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(1.5rem, 5vw, 5rem);
  align-items: center;
  min-height: 0;
}
.copy {
  display: grid;
  gap: 1.5rem;
  justify-items: start;
}
.kicker {
  animation: fade 1s var(--ease) 0.1s both;
}
h1 {
  font-family: var(--display);
  font-weight: 300;
  font-size: clamp(3.4rem, 10.5vw, 9.5rem);
  line-height: 1;
  letter-spacing: -0.045em;
}
.mask {
  display: inline-block;
  overflow: hidden;
  padding: 0 0.04em 0.12em 0;
}
.mask > span {
  display: inline-block;
  animation: rise 1.2s var(--ease) 0.15s both;
}
.dot {
  font-style: italic;
  font-weight: 500;
  color: var(--gold);
}
.gold-rule {
  width: 5rem;
  height: 3px;
  background: var(--gold);
  transform-origin: left;
  animation: grow 1s var(--ease) 0.6s both;
}
.lead {
  max-width: 28rem;
  font-size: 1.1rem;
  line-height: 1.65;
  opacity: 0.85;
  animation: fade 1s var(--ease) 0.7s both;
}
.copy .btn {
  margin-top: 0.5rem;
  animation: fade 1s var(--ease) 0.9s both;
}

/* Retrato */
.portrait {
  position: relative;
  justify-self: center;
  width: min(100%, 26rem);
  height: min(62vh, 34rem);
}
.img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--blue-deep);
  animation: wipe 1.5s var(--ease) 0.3s both;
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
.slide :deep(img) {
  transform: scale(1.1);
  transition: transform 4.5s ease-out;
}
.slide.on :deep(img) {
  transform: scale(1);
}
.img {
  position: relative;
}
.tag {
  position: absolute;
  left: -1px;
  bottom: 0;
  padding: 0.55rem 0.9rem;
  background: var(--gold);
  color: var(--black);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  animation: fade 0.8s var(--ease) 1.5s both;
}
.corner {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 40%;
  height: 40%;
  border-top: 2px solid var(--gold);
  border-right: 2px solid var(--gold);
  animation: draw 1s var(--ease) 1.2s both;
}
.bottom .rule {
  margin-bottom: 0.9rem;
}

@keyframes rise {
  from { transform: translateY(110%); }
}
@keyframes fade {
  from { opacity: 0; transform: translateY(14px); }
}
@keyframes grow {
  from { transform: scaleX(0); }
}
@keyframes wipe {
  from { clip-path: inset(100% 0 0 0); }
  to { clip-path: inset(0); }
}
@keyframes kb {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}
@keyframes draw {
  from { width: 0; height: 0; opacity: 0; }
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    align-content: center;
  }
  .portrait {
    order: -1;
    width: min(100%, 17rem);
    height: 30vh;
    justify-self: start;
  }
  .row {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
