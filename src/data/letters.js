// Las 4 cartas. Cada una tiene su carpeta de fotos en public/images/<carpeta>/
// Reemplaza `paragraphs` con el texto real y `photos` con los archivos que subas.
const img = (folder, file) => `${import.meta.env.BASE_URL}images/${folder}/${file}`

export const letters = [
  {
    slug: 'mama',
    folder: 'carta-mamita-carolina',
    role: 'Tu mamá',
    from: 'Mamá Diana',
    teaser: 'La primera que creyó en ti.',
    // Dos lados: cada grupo rota sus fotos cada 3 segundos
    photoGroups: [
      [img('carta-mamita-carolina', 'DD1.jpeg'), img('carta-mamita-carolina', 'DD3.jpeg')],
      [img('carta-mamita-carolina', 'DD2.jpeg'), img('carta-mamita-carolina', 'DD4.jpeg')]
    ],
    paragraphs: [
      'Mi Osito Hermoso',
      'Hoy quiero recordarte cómo comenzó este sueño tan bonito de ser futbolista. Todo empezó cuando ingresaste a una escuela de fútbol en Cedritos. Allí comenzamos a descubrir el talento tan especial que tenías. Después llegaste a la escuela de fútbol de tu colegio, donde cada día nos sorprendías más con tus habilidades, hasta llegar a la escuela de Millonarios, donde hoy continúas creciendo y luchando por tus sueños.',
      'Mi amor, cuando miro hacia atrás y recuerdo tus primeros entrenamientos, tus primeros goles y todo lo que has conseguido, mi corazón se llena de orgullo. Has ganado campeonatos, has sido goleador y nos has regalado momentos inolvidables, pero lo que más admiro es tu disciplina, tu esfuerzo y el amor que sientes por este deporte.',
      'Quiero decirte algo que nace de lo más profundo de mi corazón. Como mamá, tengo la certeza de que algún día serás una figura muy importante en el mundo del fútbol. No lo digo solamente por el talento y las habilidades que tienes, sino porque hay algo dentro de mí que me hace sentir que Dios tiene cosas maravillosas preparadas para ti. Cada mañana, cuando me levanto, le pido que guíe tus pasos, que proteja tus sueños y que te permita llegar tan lejos como siempre lo has soñado.',
      'Mi Osito hermoso, quiero que nunca olvides que, aunque sueño con verte convertido en una gran figura del fútbol, mi mayor orgullo siempre será la persona en la que te estás convirtiendo. No importa cuántos trofeos ganes ni hasta dónde llegues, porque para mí ya eres un campeón.',
      'Dios me dio el privilegio de ser tu mamá, de acompañarte en tus primeros pasos y de verte descubrir esa pasión tan bonita que hoy hace parte de tu vida. Nunca pierdas tu esencia, tu humildad y esa capacidad tan hermosa de soñar.',
      'Quiero que disfrutes cada etapa de este camino, cada entrenamiento, cada partido, cada triunfo y también cada dificultad, porque todo hace parte de tu historia. Nunca olvides dónde comenzaste ni pierdas esa ilusión que tenías cuando eras apenas un niño corriendo detrás de un balón.',
      'Y recuerda siempre que, sin importar cuántos títulos ganes o hasta dónde llegues, yo ya me siento inmensamente orgullosa de ti. No solamente por el futbolista que sueñas ser, sino por el ser humano maravilloso en el que te estás convirtiendo.',
      'Sigue soñando en grande, mi Osito. Yo siempre estaré aquí, creyendo en ti, acompañándote con mis oraciones y celebrando cada paso que des. Te amo infinitamente.',
      'Con todo mi amor,'
    ],
    sign: 'Mamá Diana'
  },
  {
    slug: 'abuela',
    folder: 'carta-abuelita-maria',
    role: 'Tu abuelita',
    from: 'Abuelita María',
    teaser: 'Un amor que no cabe en palabras.',
    // Dos lados: cada grupo rota sus fotos cada 3 segundos
    photoGroups: [
      [img('carta-abuelita-maria', 'MD1.jpg'), img('carta-abuelita-maria', 'MD3.jpg')],
      [img('carta-abuelita-maria', 'MD2.jpg')]
    ],
    dedication: 'Carta para mi querido Dominick ❤️⚽',
    paragraphs: [
      'Hola, hijo.',
      'Me siento muy orgullosa de ti por haber escogido el fútbol, ese deporte que tanto te gusta y que se ha convertido en una parte tan importante de tu vida. Nosotros nos sentimos muy felices de verte crecer, luchar por tus sueños y alcanzar cada una de tus metas. Cada logro que consigues es una alegría para toda la familia, porque sabemos el esfuerzo, la dedicación y el amor que le pones a lo que haces.',
      'Me llena de felicidad ver cómo poco a poco vas construyendo tu camino en el fútbol y cómo has ido alcanzando tantas cosas bonitas. Quiero que sepas que siempre estaremos orgullosos de ti, no solo por tus logros y tus triunfos, sino también por la persona que eres y por las ganas que tienes de salir adelante.',
      'Sigue luchando por tus sueños, hijo, nunca te rindas y recuerda que, con esfuerzo, disciplina, humildad y la bendición de DIOS, puedes llegar muy lejos. Deseo de todo corazón que sigas cosechando muchos éxitos y que algún día podamos verte cumplir ese gran sueño de jugar en las grandes ligas. Para nosotros, verte feliz haciendo lo que amas es uno de los regalos más bonitos que la vida nos puede dar.',
      'Que DIOS te acompañe siempre, te cuide en cada paso que des y te dé la fortaleza para superar cualquier dificultad que encuentres en el camino. Nunca olvides que tu familia estará aquí para apoyarte, celebrar tus triunfos y darte la mano cuando lo necesites.',
      'Te amo mucho, mi querido Dominick. Sigue adelante con ese amor tan grande por el fútbol y nunca dejes de creer en ti. Tu abuela siempre te desea lo mejor y le pide a DIOS que te permita cumplir todos tus sueños.',
      'Con todo mi amor,'
    ],
    sign: 'Abuelita María'
  },
  {
    slug: 'abuelo',
    folder: 'carta-abuelito-carlos',
    role: 'Tu abuelito',
    from: 'Abuelito Carlos',
    teaser: 'Siempre en la tribuna del corazón.',
    // Dos lados: cada grupo rota sus fotos cada 3 segundos
    photoGroups: [
      [img('carta-abuelito-carlos', 'CD1.jpg')],
      [img('carta-abuelito-carlos', 'CD2.jpg')]
    ],
    paragraphs: [
      'Dominick, desde que eras pequeño he visto en ti una pasión muy especial por el deporte y, especialmente, por el fútbol. Me llena de orgullo ver cómo has crecido y cómo, con el paso de los años, has demostrado el amor que sientes por este deporte y las ganas que tienes de salir adelante.',
      'A través de tu crecimiento, me he dado cuenta de que el fútbol ha sido tu deporte preferido, hasta el punto de entregarlo todo por él.',
      'Para ti es muy duro el día en que, por un motivo u otro, NO puedes jugar. Hemos visto que te deprimes, porque tu felicidad es el FÚTBOL.',
      'Me siento muy orgulloso de ti, porque sé que vas a llegar muy lejos, porque lo que te propones lo consigues y has convertido un sueño en realidad.',
      'Tus medallas y trofeos lo dicen todo, y son poquitos para todos los que vas a llegar a tener. Espero que DIOS me regale la salud necesaria, la felicidad y la alegría de verte en las grandes ligas.',
      'Te amo mucho, Dominick, y de corazón siempre te deseo lo mejor.'
    ],
    sign: 'Abuelito Carlos'
  },
  {
    slug: 'tio',
    folder: 'carta-tio-kevin',
    role: 'Tu tío',
    from: 'Tío Kevin',
    teaser: 'Tu hincha número uno, siempre.',
    // Dos lados: cada grupo rota sus fotos cada 3 segundos
    photoGroups: [
      [img('carta-tio-kevin', 'KD1.jpg'), img('carta-tio-kevin', 'KD2.jpg')],
      [img('carta-tio-kevin', 'KD4.jpeg'), img('carta-tio-kevin', 'KD5.jpeg')]
    ],
    dedication: 'Para mi bebé lindo, con todo mi corazón. 🤍⚽',
    // **texto** = negrita
    paragraphs: [
      'Hola, bebé lindo.',
      'Esto que te voy a decir nace de algo muy bonito que llevo en mi corazón: lo orgulloso que me siento de ti. Pues, a tu corta edad, has logrado cosas muy lindas, y no te imaginas lo feliz que me hace ver todo lo que estás consiguiendo. Me siento muy afortunado de poder acompañarte en este proceso y, sobre todo, de darme cuenta de ese avance tan hermoso que has tenido. Eres un campeón, goleador, eres un pequeño gigante. Pues sigues siendo el bebé de la familia, pero estás trabajando por tu sueño y dando pasos enormes para lograrlo.',
      'Pero, para esto, quisiera recordarte todas esas veces en las que, desde pequeño, jugábamos acá en la casa con globos o balones en la terraza, pues desde siempre te ha gustado el fútbol. Las veces que salimos al parque a jugar con los niños del barrio y todas esas tardes en las que jugábamos FIFA. Son recuerdos que llevo en mi corazón y espero que tú también guardes con mucho cariño, pues es hermoso ver cómo ese niño que llegó a nuestras vidas en el 2014 ha llenado nuestros días de cosas tan lindas, como tus sonrisas, tus logros y todo aquello tan bonito que nos brindas.',
      'De corazón, quiero decirte que me siento muy orgulloso de ti. La manera en la que estás haciendo las cosas te va a llevar a lugares muy grandes, y yo sé que, con el pasar del tiempo, te vamos a ver en las pantallas grandes, representando a este país, jugando en Europa y haciendo lo que más amas: **hacer magia con ese balón.** Y créeme, bebé, qué bonito sería ver cómo ese niño con el que jugaba en la terraza termina cumpliendo todos esos sueños por los que hoy está trabajando. No sabes la felicidad que me daría verte llegar tan lejos y recordar todos esos momentos en los que apenas comenzabas a soñar con todo esto.',
      'Aparte de eso, quiero felicitarte por todo, pues has hecho una labor increíble como futbolista, hijo, amigo y persona. Siempre que llegas a algún lugar, marcas la diferencia, y eso te hace único, te hace especial, tanto dentro como fuera de la cancha. Nunca dejes de ser ese niño que eres, con esa esencia tan bonita que te caracteriza, porque, más allá de todos los goles que puedas marcar o de todos los títulos que puedas ganar, lo más bonito será siempre la persona en la que te estás convirtiendo.',
      'Sigue detrás de tus sueños, que si DIOS te los puso en la mente, es porque puedes luchar por ellos y hacerlos realidad. Sigue trabajando con ese corazón tan bonito, con disciplina, humildad y amor por lo que haces. Tú encárgate de dar lo mejor de ti, que DIOS se encarga del resto: de ayudarte, cuidarte, acompañarte y guiarte en cada paso que des.',
      'Y recuerda siempre algo, mi niño: **no importa qué tan lejos llegues ni qué tan grandes sean las cosas que consigas, siempre vas a tener a alguien que te vio crecer, que recuerda con amor al pequeño que jugaba con globos y balones en la terraza, y que hoy se siente inmensamente orgulloso del futbolista y de la persona en la que te estás convirtiendo.** Nunca olvides de dónde vienes, todo lo que has luchado y todo el amor que hay detrás de cada uno de tus sueños.',
      'Te amo mucho, osito, y creo en ti, en tu talento y en ese sueño tan lindo que llevas en el corazón. Nunca dudes de lo que eres capaz de lograr. Sigue adelante, sigue luchando y sigue haciendo magia con ese balón, porque estoy seguro de que todavía te esperan cosas maravillosas.',
      '**Sigue así, mi niño. Estoy muy orgulloso de ti y siempre voy a desear verte cumplir cada uno de tus sueños. Te amo muchísimo, mi pequeño gigante. 🤍⚽**'
    ],
    sign: 'Tío Kevin'
  }
]
