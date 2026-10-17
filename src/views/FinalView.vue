<script setup>
import TopBar from '../components/TopBar.vue'
import { RouterLink } from 'vue-router'

// Collage: toda foto que pongas en src/assets/collage-final/ aparece sola (jpg, jpeg, png, webp).
// Se ordenan por nombre de archivo.
const found = import.meta.glob('/src/assets/collage-final/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default'
})
const photos = Object.keys(found)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => found[k])

// Polvo dorado flotando de fondo
const dust = Array.from({ length: 18 }, (_, n) => ({
  left: `${(n * 41 + 7) % 100}%`,
  size: `${2 + (n % 4)}px`,
  dur: `${10 + (n % 6) * 2}s`,
  delay: `${-(n * 1.7)}s`
}))

// Mientras no haya fotos, se muestran recuadros de ejemplo
const heights = ['tall', 'wide', 'sq', 'tall', 'sq', 'wide', 'sq', 'tall', 'wide', 'sq', 'tall', 'sq']
</script>

<template>
  <main class="final">
    <div class="dust" aria-hidden="true">
      <i v-for="(d, n) in dust" :key="n" :style="{ left: d.left, width: d.size, height: d.size, animationDuration: d.dur, animationDelay: d.delay }"></i>
    </div>
    <TopBar>
      <template #left><RouterLink to="/cartas" class="btn-ghost">← Cartas</RouterLink></template>
      <template #right><span class="label">Para siempre</span></template>
    </TopBar>

    <section class="intro">
      <p class="label" v-reveal>Lo hermoso de tenerte</p>
      <h1 v-reveal="100">Cada foto,<br /><em>un instante contigo.</em></h1>
      <p class="lead" v-reveal="200">
        Cada foto es un instante que nos recuerda lo hermoso que es tenerte en nuestra vida.
      </p>
    </section>

    <section class="collage" aria-label="Collage de fotos">
      <template v-if="photos.length">
        <figure v-for="(p, n) in photos" :key="p" :class="`v${n % 4}`" v-reveal="(n % 3) * 120">
          <div class="card" :style="{ '--fd': `${-(n * 1.3)}s`, '--fs': `${5 + (n % 4)}s` }">
            <img :src="p" alt="Recuerdo de Dominick" loading="lazy" />
          </div>
        </figure>
      </template>
      <template v-else>
        <figure v-for="(h, n) in heights" :key="n" :class="`v${n % 4}`" v-reveal="(n % 3) * 120">
          <div class="card" :style="{ '--fd': `${-(n * 1.3)}s`, '--fs': `${5 + (n % 4)}s` }">
            <div class="ph" :class="h"><span>FOTO</span></div>
          </div>
        </figure>
      </template>
    </section>

    <section class="close">
      <div class="rule"></div>
      <h2 v-reveal>Gracias por hacernos<br /><em>tan felices, Dominick.</em></h2>
      <p v-reveal="150">Nunca olvides de dónde vienes, ni todo el amor que hay detrás de cada uno de tus sueños.</p>
      <div class="actions" v-reveal="250">
        <RouterLink to="/" class="btn">Volver al inicio <span class="arrow">→</span></RouterLink>
        <RouterLink to="/pasillo" class="btn-ghost">Ver los recuerdos otra vez</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.final {
  position: relative;
  min-height: 100vh;
  padding: clamp(1.25rem, 4vw, 3rem);
  background:
    radial-gradient(50rem 30rem at 100% 0%, rgba(31, 85, 214, 0.3), transparent 60%),
    linear-gradient(180deg, var(--black) 0%, var(--blue-deep) 35%, var(--blue) 100%);
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.intro {
  display: grid;
  gap: 1.25rem;
  padding: clamp(3rem, 9vw, 7rem) 0 clamp(2rem, 5vw, 4rem);
}
h1,
h2 {
  font-family: var(--display);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.03em;
}
h1 {
  font-size: clamp(2.8rem, 8vw, 6.5rem);
}
h1 em,
h2 em {
  color: var(--gold);
  font-weight: 500;
}
.lead {
  max-width: 32rem;
  line-height: 1.6;
  opacity: 0.75;
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
  15% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(30px); opacity: 0; }
}
.intro,
.collage,
.close,
.bar {
  position: relative;
}

/* Cada foto entra de una forma distinta y luego flota suavemente */
.collage figure.reveal:not(.in).v0 { transform: translateY(60px) scale(0.92); }
.collage figure.reveal:not(.in).v1 { transform: translateX(-50px) rotate(-4deg); }
.collage figure.reveal:not(.in).v2 { transform: translateX(50px) rotate(4deg); }
.collage figure.reveal:not(.in).v3 { transform: scale(0.8); }
.card {
  animation: bob var(--fs, 6s) ease-in-out var(--fd, 0s) infinite alternate;
  transition: transform 0.6s var(--ease);
}
@keyframes bob {
  from { transform: translateY(-5px) rotate(-0.4deg); }
  to { transform: translateY(5px) rotate(0.4deg); }
}
.collage figure:hover .card {
  animation-play-state: paused;
}

/* Collage tipo mosaico: cada foto conserva su proporción */
.collage {
  column-count: 4;
  column-gap: 1rem;
}
.collage figure {
  break-inside: avoid;
  margin: 0 0 1rem;
}
.card {
  position: relative;
  overflow: hidden;
  background: var(--blue-deep);
  box-shadow: 0 14px 30px -18px rgba(0, 0, 0, 0.7);
}
.collage img {
  width: 100%;
  height: auto;
  transition: transform 0.9s var(--ease), filter 0.6s;
  filter: saturate(0.95);
}
.card::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 3px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--ease);
}
.collage figure:hover img {
  transform: scale(1.06);
  filter: saturate(1.1);
}
.collage figure:hover .card::after {
  transform: scaleX(1);
}
.ph {
  display: grid;
  place-items: center;
  color: var(--gold);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  background:
    repeating-linear-gradient(135deg, transparent 0 14px, rgba(201, 162, 75, 0.08) 14px 15px),
    linear-gradient(160deg, var(--blue), var(--blue-deep));
}
.ph.tall { aspect-ratio: 3 / 4; }
.ph.wide { aspect-ratio: 4 / 3; }
.ph.sq { aspect-ratio: 1; }

.close {
  display: grid;
  gap: 1.5rem;
  justify-items: start;
  padding: clamp(4rem, 10vw, 8rem) 0 2rem;
}
.close .rule {
  width: 100%;
  margin-bottom: 1rem;
}
h2 {
  font-size: clamp(2.2rem, 6vw, 4.5rem);
}
.close p {
  max-width: 34rem;
  line-height: 1.65;
  opacity: 0.8;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

@media (max-width: 1100px) {
  .collage { column-count: 3; }
}
@media (max-width: 700px) {
  .collage {
    column-count: 2;
    column-gap: 0.6rem;
  }
  .collage figure {
    margin-bottom: 0.6rem;
  }
}
</style>
