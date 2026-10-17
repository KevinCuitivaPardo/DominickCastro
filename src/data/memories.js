// Pasillo de los recuerdos.
// Fotos en: public/images/pasillo-de-los-recuerdos/
// Cada recuerdo = foto + frase. `pos` (opcional) reencuadra la foto: "x% y%" (object-position).
const base = `${import.meta.env.BASE_URL}images/pasillo-de-los-recuerdos/`

export const memories = [
  {
    src: base + 'PR-1.jpg',
    year: 'Siempre contigo',
    phrase: 'Todos los que estamos en esta foto hemos creído en tu talento, en tu sueño y en tus ganas. Siempre. Y siempre lo haremos.'
  },
  {
    src: base + 'PR-2.png',
    year: 'La misma sonrisa',
    phrase: 'Lo más bonito de este camino es que conservas la misma sonrisa del primer día, esa que nos llena el alma y nos recarga el corazón cada vez que la vemos.'
  },
  {
    src: base + 'PR-2.1.png',
    year: 'Creciendo',
    phrase: 'Con esa sonrisa has ido creciendo: cada día más grande, cada día más tú, y cada día mejor para llegar a ser el mejor.'
  },
  {
    src: base + 'PR-2.2.png',
    year: 'Tus logros',
    phrase: 'Cada logro es el reflejo del esfuerzo y la entrega que le has puesto a este gran sueño.',
    pos: '50% 22%'
  },
  {
    src: base + 'PR-3.jpg',
    year: 'Donde empezó todo',
    phrase: 'Todo empezó con unos ojos enormes y una sonrisa que ya lo decía todo, la misma que hoy, después de tanto camino, sigues regalándonos.',
    pos: '50% 30%'
  },
  {
    src: base + 'PR-4.jpg',
    year: 'Primeros pasos',
    phrase: 'Antes de correr detrás de un balón, aprendiste a caminar. Y desde ese primer paso, nunca has dejado de avanzar.'
  },
  {
    src: base + 'PR-5.png',
    year: 'La camiseta',
    phrase: 'Azul y blanco desde el corazón, mucho antes de pisar la cancha. El sueño ya vivía en ti.',
    pos: '50% 18%'
  },
  {
    src: base + 'PR-6.png',
    year: 'Hoy',
    phrase: 'Esa pasión es la que te ha hecho crecer. Y lo mejor, campeón, es que esto apenas está empezando.'
  }
]
