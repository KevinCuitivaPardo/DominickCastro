# Un gran soñador

Web en Vue 3 + Vite. Estilo Clean & Swiss con los colores de Millonarios (azul, blanco, negro, dorado).

## Correr

```bash
npm install
npm run dev
```

## Dónde van las imágenes

Todo en `public/images/`:

| Carpeta | Contenido |
| --- | --- |
| `pasillo-de-los-recuerdos/` | Fotos de bebé del pasillo (`01.jpg`, `02.jpg`…) |
| `carta-mamita-carolina/` | Fotos de la carta de mamá |
| `carta-abuelita-maria/` | Fotos de la carta de la abuelita |
| `carta-abuelito-carlos/` | Fotos de la carta del abuelito |
| `carta-tio-kevin/` | Fotos de la carta del tío |

Frases y fotos del pasillo: `src/data/memories.js`. Textos y fotos de las cartas: `src/data/letters.js`.

## Collage final

Toda foto (jpg, jpeg, png, webp) que pongas en `src/assets/collage-final/` aparece sola en el collage, ordenada por nombre.

## Publicar en Vercel

1. Sube el proyecto a GitHub.
2. En Vercel: **Add New → Project**, elige el repositorio.
3. Vercel detecta Vite solo (build: `npm run build`, salida: `dist`). Pulsa **Deploy**.

La app usa rutas con `#`, así que no necesita configuración extra.
