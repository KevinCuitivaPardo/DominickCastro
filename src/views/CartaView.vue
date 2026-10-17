<script setup>
import TopBar from '../components/TopBar.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { letters } from '../data/letters'
import SmartImage from '../components/SmartImage.vue'
import PhotoRotator from '../components/PhotoRotator.vue'

const props = defineProps({ slug: String })

const idx = computed(() => letters.findIndex((l) => l.slug === props.slug))
const letter = computed(() => letters[idx.value])
const nextLetter = computed(() => letters[idx.value + 1])

// **texto** => negrita
const parts = (t) => t.split('**').map((s, i) => ({ s, b: i % 2 === 1 }))
</script>

<template>
  <main v-if="letter" class="carta">
    <TopBar>
      <template #left><RouterLink to="/cartas" class="btn-ghost">← Cartas</RouterLink></template>
      <template #right><span class="label">0{{ idx + 1 }} / 0{{ letters.length }}</span></template>
    </TopBar>

    <section class="head">
      <span class="label" v-reveal>{{ letter.role }}</span>
      <h1 v-reveal="100">{{ letter.from }}</h1>
    </section>

    <section class="body" :class="{ sided: letter.photoGroups }">
      <template v-if="letter.photoGroups">
        <aside class="side side-a" v-reveal>
          <PhotoRotator :photos="letter.photoGroups[0]" />
        </aside>
        <aside class="side side-b" v-reveal="150">
          <PhotoRotator :photos="letter.photoGroups[1]" :offset="1500" />
        </aside>
      </template>
      <aside v-else class="photos">
        <figure v-for="(p, n) in letter.photos" :key="p" v-reveal="n * 150" :class="{ offset: n % 2 }">
          <SmartImage :src="p" :alt="`Foto con ${letter.from}`" />
        </figure>
      </aside>

      <article class="paper">
        <div v-if="letter.dedication" class="dedication" v-reveal>{{ letter.dedication }}</div>
        <p v-for="(t, n) in letter.paragraphs" :key="n" v-reveal="Math.min(n, 3) * 80"
           :class="{ sign: !letter.sign && n === letter.paragraphs.length - 1 && n > 0, greet: n === 0 && t.length < 60 }">
          <template v-for="(seg, k) in parts(t)" :key="k"><strong v-if="seg.b">{{ seg.s }}</strong><template v-else>{{ seg.s }}</template></template>
        </p>
        <p v-if="letter.sign" class="sign" v-reveal>{{ letter.sign }}</p>
      </article>
    </section>

    <footer class="foot">
      <div class="rule"></div>
      <RouterLink v-if="nextLetter" :to="`/cartas/${nextLetter.slug}`" class="btn">
        Siguiente: {{ nextLetter.from }} <span class="arrow">→</span>
      </RouterLink>
      <RouterLink v-else to="/final" class="btn">Ver el collage final <span class="arrow">→</span></RouterLink>
      <RouterLink v-if="!nextLetter" to="/cartas" class="btn-ghost">Volver a las cartas</RouterLink>
    </footer>
  </main>
</template>

<style scoped>
.carta {
  min-height: 100vh;
  padding: clamp(1.25rem, 4vw, 3rem);
  background: linear-gradient(180deg, var(--blue) 0%, var(--blue-deep) 40%, var(--black) 100%);
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head {
  padding: clamp(3rem, 8vw, 6rem) 0 clamp(2rem, 4vw, 3rem);
  display: grid;
  gap: 1rem;
}
h1 {
  font-family: var(--display);
  font-weight: 300;
  font-style: italic;
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
}
.body {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: clamp(2rem, 6vw, 6rem);
  align-items: start;
}
.photos {
  display: grid;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
}
.photos figure {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-bottom: 3px solid var(--gold);
}
.photos figure.offset {
  width: 78%;
  justify-self: end;
  aspect-ratio: 1;
}
/* Dos lados: fotos a la izquierda, carta al centro, fotos a la derecha */
.body.sided {
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr) minmax(0, 1fr);
  grid-template-areas: 'a paper b';
  gap: clamp(1.25rem, 3vw, 3rem);
}
.sided .side-a { grid-area: a; }
.sided .side-b { grid-area: b; }
.sided .paper { grid-area: paper; }
.side {
  position: sticky;
  top: 2rem;
  aspect-ratio: 4 / 5;
  border-bottom: 3px solid var(--gold);
}
.side-b {
  border-bottom: 0;
  border-top: 3px solid var(--gold);
}
.paper {
  background: var(--white);
  color: var(--black);
  padding: clamp(1.75rem, 5vw, 4rem);
  display: grid;
  gap: 1.5rem;
  border-top: 6px solid var(--gold);
}
.paper p {
  font-family: var(--display);
  font-weight: 300;
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  line-height: 1.65;
}
.dedication {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--blue);
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(10, 42, 107, 0.2);
}
.paper strong {
  font-weight: 600;
  color: var(--blue);
}
.paper p.greet {
  font-style: italic;
  font-weight: 500;
  color: var(--blue);
}
.paper p.sign {
  font-style: italic;
  font-weight: 500;
  color: var(--blue);
  text-align: right;
}
.foot {
  display: grid;
  gap: 2rem;
  justify-items: start;
  padding: clamp(3rem, 8vw, 6rem) 0 1rem;
}
.foot .rule {
  width: 100%;
}

@media (max-width: 800px) {
  .body {
    grid-template-columns: 1fr;
  }
  .photos {
    position: static;
    grid-template-columns: 1fr 1fr;
  }
  .photos figure.offset {
    width: 100%;
    aspect-ratio: 4 / 5;
  }
}

/* Dos lados en pantallas medianas y celular: las dos fotos arriba, carta abajo */
@media (max-width: 1000px) {
  .body.sided {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'a b' 'paper paper';
  }
  .side {
    position: static;
  }
}
</style>
