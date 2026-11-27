# Cleopatra media

- `clip.mp4` : the generated clip played in the home page hero (muted, looping).
- `poster-m.webp` : its first frame, shown at once while the clip loads and when "reduce motion" is on.
- `m/` and `manifest.json` : the same clip cut into 96 frames. Not used by the site today; kept for a scroll-driven
  version. Rebuild them from a new clip with `npm run cleo:frames -- path/to/clip.mp4`.
