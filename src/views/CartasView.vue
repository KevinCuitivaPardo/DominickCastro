<script setup>
import TopBar from '../components/TopBar.vue'
import { RouterLink } from 'vue-router'
import { letters } from '../data/letters'
</script>

<template>
  <main class="cartas">
    <TopBar>
      <template #left><RouterLink to="/pasillo" class="btn-ghost">← Pasillo</RouterLink></template>
      <template #right><span class="label">Cartas</span></template>
    </TopBar>

    <section class="intro">
      <h1 v-reveal>
        Cuatro cartas,<br /><em>un mismo orgullo.</em>
      </h1>
      <p v-reveal="150">Elige una para empezar. Léelas con calma: están escritas con todo el amor para ti.</p>
    </section>

    <ul class="grid">
      <li v-for="(l, n) in letters" :key="l.slug" v-reveal="n * 120">
        <RouterLink :to="`/cartas/${l.slug}`" class="card">
          <span class="idx">0{{ n + 1 }}</span>
          <span class="role label">{{ l.role }}</span>
          <strong>{{ l.from }}</strong>
          <span class="teaser">{{ l.teaser }}</span>
          <span class="open">Abrir <b>→</b></span>
        </RouterLink>
      </li>
    </ul>

    <footer class="end" v-reveal>
      <p>Cuando termines de leerlas, hay un último lugar esperándote.</p>
      <RouterLink to="/final" class="btn">Ir al collage final <span class="arrow">→</span></RouterLink>
    </footer>
  </main>
</template>

<style scoped>
.cartas {
  min-height: 100vh;
  padding: clamp(1.25rem, 4vw, 3rem);
  background:
    radial-gradient(50rem 30rem at 0% 100%, rgba(31, 85, 214, 0.3), transparent 60%),
    linear-gradient(180deg, var(--blue-deep), var(--black));
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.intro {
  padding: clamp(3rem, 9vw, 7rem) 0 clamp(2rem, 5vw, 4rem);
}
h1 {
  font-family: var(--display);
  font-weight: 300;
  font-size: clamp(2.8rem, 8vw, 6.5rem);
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}
h1 em {
  color: var(--gold);
  font-weight: 500;
}
.intro p {
  opacity: 0.7;
}
.grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.card {
  position: relative;
  display: grid;
  gap: 0.6rem;
  align-content: start;
  min-height: 19rem;
  padding: 1.75rem;
  background: var(--blue-deep);
  overflow: hidden;
  isolation: isolate;
  transition: color 0.5s var(--ease);
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: translateY(101%);
  transition: transform 0.6s var(--ease);
  z-index: -1;
}
.card:hover {
  color: var(--black);
}
.card:hover::before {
  transform: translateY(0);
}
.card:hover .label {
  color: var(--black);
}
.idx {
  font-family: var(--display);
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1;
  color: var(--gold);
  transition: color 0.5s var(--ease);
}
.card:hover .idx {
  color: var(--blue-deep);
}
.role {
  margin-top: 2rem;
}
strong {
  font-family: var(--display);
  font-size: 1.9rem;
  font-weight: 500;
  line-height: 1.1;
}
.teaser {
  font-size: 0.95rem;
  opacity: 0.7;
}
.open {
  align-self: end;
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.open b {
  display: inline-block;
  transition: transform 0.45s var(--ease);
}
.card:hover .open b {
  transform: translateX(8px);
}

.end {
  display: grid;
  gap: 1.5rem;
  justify-items: start;
  padding: clamp(3rem, 8vw, 5rem) 0 1rem;
}
.end p {
  opacity: 0.7;
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .card {
    min-height: 14.5rem;
    padding: 1.1rem;
    gap: 0.4rem;
  }
  .idx {
    font-size: 2.4rem;
  }
  .role {
    margin-top: 0.8rem;
  }
  strong {
    font-size: 1.3rem;
  }
  .teaser {
    font-size: 0.82rem;
  }
}
</style>
