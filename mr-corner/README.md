# Mr. Corner (catalog source)

A mobile-first cosmetics catalog for the pharmacy inside the Three Corners Sea Beach Resort. React, Vite and TypeScript. Guests browse, build a list, and open a prepared WhatsApp message to the pharmacy. They send it themselves and pick up inside the resort. It is a request, not an order. There are no prices and no payment.

## Run it

You need Node.js 18 or newer.

```
npm install
npm run dev        # opens a local dev server, usually http://localhost:5173
npm run build      # makes the static site in dist/
npm run preview    # serves dist/ locally to check the build
```

## Where things are

- `src/App.tsx` : the pages (shop, product, your list) and the WhatsApp message. The pharmacy number is `PHARMACY_WHATSAPP` near the top.
- `src/data.ts`, `src/packs.ts`, `src/facts.ts`, `src/extra.ts` : products, names in six languages, texts.
- `src/photos/` : all images used by the site.
- `src/style.css` : all styling.
- `src/lib/local.tsx` : small helpers (saved list, copy button, photo viewer).
- `src/living/` : the scroll journey at the top of the home page (Cleopatra in the arch, the four steps, the floating packs). `text.ts` holds the four step texts in six languages.
- `src/media/cleo/` : where Cleopatra's frame sequence goes (empty until the clip arrives).
- `scripts/cleo-frames.mjs` : turns her video clip into that frame sequence.
- `PROMPT.md` : the prompt to give Claude Code to turn this into the living, scroll-driven site.

## The scroll journey and the Cleopatra clip

The home page opens with a pinned stage: Cleopatra in a temple arch, the pharmacy's own pack photos floating around her, a large word gliding behind her and a background that changes colour step by step. The text cards scroll over it: welcome, then 1 Browse, 2 Send, 3 Prepare, 4 Pick up. With "reduce motion" switched on in the phone settings, the same content is shown still and in order.

**What moves today:** the packs, the colours, the large word. **What does not move yet:** Cleopatra herself. Her video clip is not in the project, so the portrait `src/photos/cleo-hero.jpg` is shown as a still. The prototype note at the top of the page says so.

To make her move:

1. Make the clip from `src/photos/cleo-hero.jpg` with an image-to-video tool: one shot, 8 to 10 s, MP4, at least 1280 x 720 (1920 x 1080 is best), same face, camera locked.
2. Put it in the project, for example `cleo-source/cleo-clip.mp4`.
3. Run `npm run cleo:frames -- cleo-source/cleo-clip.mp4` (needs ffmpeg). It writes the frames to `src/media/cleo/`.
4. Run `npm run build`. The site finds the frames by itself, plays them with the scroll, and the placeholder note disappears.

Options: `--frames 96` (fewer = lighter page), `--focus 0.72` (where she stands across the video, 0 = left, 1 = right).

## Notes

- This is a prototype. It is not launched and not shared with guests.
- Images are the pharmacy's own pack photos and an illustrative Cleopatra image, labelled "Illustrative image" on the site.
