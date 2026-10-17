<script setup>
import TopBar from '../components/TopBar.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { memories } from '../data/memories'
import SmartImage from '../components/SmartImage.vue'

const router = useRouter()
const i = ref(0)
const dir = ref('next')
const total = memories.length
const isEnd = computed(() => i.value === total)
const current = computed(() => memories[i.value])
const pad = (n) => String(n).padStart(2, '0')

// Cada foto entra con su propia animación (4 variantes que se alternan)
const variant = computed(() => `v${i.value % 4}`)
const words = computed(() => current.value.phrase.split(' '))

// Polvo dorado flotando de fondo
const dust = Array.from({ length: 16 }, (_, n) => ({
  left: `${(n * 37 + 11) % 100}%`,
  size: `${2 + (n % 4)}px`,
  dur: `${9 + (n % 6) * 2}s`,
  delay: `${-(n * 1.3)}s`
}))

// Inclinación suave de la foto siguiendo el mouse
const tilt = ref({ x: 0, y: 0 })
function onMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  tilt.value = {
    x: ((e.clientX - r.left) / r.width - 0.5) * 2,
    y: ((e.clientY - r.top) / r.height - 0.5) * 2
  }
}
const onLeave = () => (tilt.value = { x: 0, y: 0 })

function go(n) {
  if (n < 0) return router.push('/')
  if (n > total) return
  dir.value = n > i.value ? 'next' : 'prev'
  i.value = n
}
const next = () => go(i.value + 1)
const prev = () => go(i.value - 1)

function onKey(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') next()
  if (e.key === 'ArrowLeft') prev()
}
let x0 = null
const touchStart = (e) => (x0 = e.touches[0].clientX)
const touchEnd = (e) => {
  if (x0 === null) return
  const dx = e.changedTouches[0].clientX - x0
  if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
  x0 = null
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <main class="pasillo" @touchstart.passive="touchStart" @touchend.passive="touchEnd">
    <TopBar>
      <template #left><RouterLink to="/" class="btn-ghost">← Inicio</RouterLink></template>
      <template #right><span class="label">Recuerdos</span></template>
    </TopBar>

    <div class="dust" aria-hidden="true">
      <i v-for="(d, n) in dust" :key="n" :style="{ left: d.left, width: d.size, height: d.size, animationDuration: d.dur, animationDelay: d.delay }"></i>
    </div>

    <div class="progress" aria-hidden="true">
      <i v-for="n in total + 1" :key="n" :class="{ done: n - 1 <= i }"></i>
    </div>

    <Transition :name="`slide-${dir}`" mode="out-in">
      <section v-if="!isEnd" :key="i" class="stage" :class="variant">
        <figure
          class="photo"
          :style="{ '--tx': tilt.x, '--ty': tilt.y }"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          <div class="tilt">
            <div class="frame" :style="{ '--bg': `url('${current.src}')` }"><SmartImage :src="current.src" :alt="current.phrase" :pos="current.pos" /></div>
            <span class="corner" aria-hidden="true"></span>
            <span class="shine" aria-hidden="true"></span>
          </div>
        </figure>
        <div class="copy">
          <span class="num"><span class="roll">{{ pad(i + 1) }}</span><small> / {{ pad(total) }}</small></span>
          <span class="label when">{{ current.year }}</span>
          <p class="phrase">
            <span v-for="(w, n) in words" :key="n" class="w" :style="{ '--n': n }">{{ w }}&nbsp;</span>
          </p>
        </div>
      </section>

      <section v-else key="end" class="end">
        <span class="label">Fin del pasillo</span>
        <h2>Pero la historia<br /><em>sigue contigo.</em></h2>
        <p>Hay personas que te aman con el alma y quieren decirte algo desde el corazón. Ven, te están esperando.</p>
        <RouterLink to="/cartas" class="btn">Leer las cartas <span class="arrow">→</span></RouterLink>
      </section>
    </Transition>

    <footer class="nav">
      <button class="btn-ghost" @click="prev">← Anterior</button>
      <button v-if="!isEnd" class="btn-ghost" @click="next">Siguiente →</button>
    </footer>
  </main>
</template>

<style scoped>
.pasillo {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 1.25rem;
  padding: clamp(1.25rem, 4vw, 3rem);
  background: linear-gradient(180deg, var(--black) 0%, var(--blue-deep) 100%);
  overflow: hidden;
}
.bar,
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress {
  display: flex;
  gap: 6px;
}
.progress i {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.18);
  position: relative;
  overflow: hidden;
}
.progress i::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s var(--ease);
}
.progress i.done::after {
  transform: scaleX(1);
}

.stage {
  width: 100%;
  max-width: 90rem;
  margin-inline: auto;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: clamp(1.5rem, 5vw, 5rem);
  align-items: center;
  min-height: 0;
}
.photo {
  position: relative;
  justify-self: center;
  width: min(100%, 38rem);
}
.frame {
  position: relative;
  height: min(68vh, 40rem);
  width: 100%;
  overflow: hidden;
  background: var(--blue-deep);
}
/* Fondo desenfocado de la misma foto: la foto se ve completa, sin cortar caras */
.frame::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: var(--bg) center / cover;
  filter: blur(28px) brightness(0.55);
}
.frame :deep(.smart) {
  position: relative;
}
.frame :deep(img) {
  object-fit: contain;
}

/* ── Animaciones por foto ── */
.pasillo {
  position: relative;
}
.dust {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.dust i {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  animation: float linear infinite;
}
@keyframes float {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 0.7; }
  100% { transform: translateY(-105vh) translateX(30px); opacity: 0; }
}

.photo {
  perspective: 900px;
}
.tilt {
  position: relative;
  transform: rotateY(calc(var(--tx, 0) * 5deg)) rotateX(calc(var(--ty, 0) * -4deg));
  transition: transform 0.4s var(--ease);
  transform-style: preserve-3d;
}

/* La foto se revela con un barrido distinto según el número */
.frame {
  animation-duration: 1.4s;
  animation-timing-function: var(--ease);
  animation-fill-mode: both;
}
.v0 .frame { animation-name: wipeLeft; }
.v1 .frame { animation-name: wipeUp; }
.v2 .frame { animation-name: wipeRight; }
.v3 .frame { animation-name: wipeCenter; }
@keyframes wipeLeft { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }
@keyframes wipeRight { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0); } }
@keyframes wipeUp { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0); } }
@keyframes wipeCenter { from { clip-path: inset(50% 50% 50% 50%); } to { clip-path: inset(0); } }

/* Movimiento lento de cámara, también distinto por foto */
.frame :deep(img) {
  animation-duration: 14s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}
.v0 .frame :deep(img) { animation-name: kbIn; }
.v1 .frame :deep(img) { animation-name: kbPanL; }
.v2 .frame :deep(img) { animation-name: kbOut; }
.v3 .frame :deep(img) { animation-name: kbPanR; }
@keyframes kbIn { from { transform: scale(1); } to { transform: scale(1.08); } }
@keyframes kbOut { from { transform: scale(1.1); } to { transform: scale(1); } }
@keyframes kbPanL { from { transform: scale(1.06) translateX(2%); } to { transform: scale(1.06) translateX(-2%); } }
@keyframes kbPanR { from { transform: scale(1.06) translateX(-2%); } to { transform: scale(1.06) translateX(2%); } }

/* Destello dorado que cruza la foto al entrar */
.shine {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.shine::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 30%;
  left: -40%;
  background: linear-gradient(100deg, transparent, rgba(228, 201, 135, 0.35), transparent);
  transform: skewX(-12deg);
  animation: shine 1.6s var(--ease) 1.1s both;
}
@keyframes shine { to { left: 130%; } }

/* El marco dorado se dibuja después de la foto */
.corner {
  animation: draw 1s var(--ease) 1s both;
}
@keyframes draw {
  from { width: 0; height: 0; opacity: 0; }
}

/* Número que rueda, etiqueta que entra, frase palabra por palabra */
.num {
  overflow: hidden;
}
.roll {
  display: inline-block;
  animation: roll 0.9s var(--ease) 0.2s both;
}
@keyframes roll {
  from { transform: translateY(100%); }
}
.w {
  display: inline-block;
  animation: word 0.8s var(--ease) both;
  animation-delay: calc(0.7s + var(--n) * 70ms);
}
@keyframes word {
  from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
}
.corner {
  position: absolute;
  right: -12px;
  bottom: -12px;
  width: 45%;
  height: 45%;
  border-right: 2px solid var(--gold);
  border-bottom: 2px solid var(--gold);
  pointer-events: none;
}
.copy {
  display: grid;
  gap: 1rem;
  align-content: center;
}
.num {
  font-family: var(--display);
  font-size: clamp(3.5rem, 9vw, 7rem);
  font-weight: 300;
  line-height: 1;
  color: var(--gold);
  letter-spacing: -0.03em;
}
.num small {
  font-size: 0.3em;
  color: var(--white);
  opacity: 0.4;
  letter-spacing: 0;
}
.when {
  opacity: 0.9;
}
.phrase {
  font-family: var(--display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.25rem, 2.3vw, 2rem);
  line-height: 1.3;
  max-width: 28ch;
  border-left: 2px solid var(--gold);
  padding-left: 1.25rem;
}
.copy .when {
  animation: fadeUp 0.9s var(--ease) 0.15s both;
}

.end {
  align-self: center;
  display: grid;
  gap: 1.5rem;
  justify-items: start;
  max-width: 44rem;
}
.end h2 {
  font-family: var(--display);
  font-weight: 300;
  font-size: clamp(2.8rem, 8vw, 6rem);
  line-height: 1;
  letter-spacing: -0.03em;
}
.end em {
  color: var(--gold);
  font-weight: 500;
}
.end p {
  opacity: 0.75;
  max-width: 28rem;
  line-height: 1.6;
}

/* transiciones entre fotos */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.slide-next-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

@keyframes kenburns {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@media (max-width: 800px) {
  .pasillo {
    height: 100vh;
    height: 100svh;
    min-height: 0;
    gap: 0.9rem;
  }
  .stage {
    grid-template-columns: 1fr;
    gap: 1.1rem;
    align-content: start;
  }
  .photo {
    width: 100%;
  }
  .frame {
    height: clamp(15rem, 38svh, 30rem);
  }
  .corner {
    right: -6px;
    bottom: -6px;
  }
  .copy {
    gap: 0.6rem;
  }
  .num {
    font-size: 3rem;
  }
  .phrase {
    max-width: none;
    font-size: clamp(1.1rem, 4.6vw, 1.5rem);
    padding-left: 1rem;
  }
  .end h2 {
    font-size: clamp(2.4rem, 11vw, 4rem);
  }
}

/* Pantallas bajas (celular horizontal / laptops chicas) */
@media (max-height: 560px) and (min-width: 801px) {
  .frame {
    height: 56vh;
  }
  .num {
    font-size: 3.5rem;
  }
}
</style>
