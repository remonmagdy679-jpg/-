# Cleopatra frame sequence

Empty on purpose until the video clip of Cleopatra arrives.

`npm run cleo:frames -- path/to/cleo-clip.mp4` fills this folder:

- `m/f001.webp` ... frames for phones (600 x 800)
- `d/f001.webp` ... frames for wide screens (up to 900 x 1200)
- `poster-m.webp`, `poster-d.webp` : the first frame, shown at once while the rest loads
- `manifest.json` : frame count, sizes and framing

The site (`src/living/frames.ts`) picks these up at build time. If the folder has no frames, the still portrait is shown and the page says it is a placeholder.
