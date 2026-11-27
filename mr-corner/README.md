# Dr. Corner (catalogue source)

A mobile-first cosmetics catalogue for the pharmacy inside the Three Corners Sea Beach Resort. React, Vite and TypeScript. Guests browse in seven languages (English, German, Polish, Czech, Dutch, French, Italian), build a list, and open a prepared WhatsApp message to the pharmacy. They send it themselves and pick up inside the resort. It is a request, not an order. There are no prices and no payment.

## Run it

You need Node.js 18 or newer.

```
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build      # makes the finished site in dist/
npm run preview    # serves dist/ locally to check the build
```

## Publish it

`npm run build` puts the whole site in the `dist/` folder: `index.html`, `favicon.svg` and `assets/`. Upload the **contents** of `dist/` to any static web host. Paths are relative, so it works at the root of a domain or in a sub-folder.

- **Netlify (simplest):** go to app.netlify.com/drop and drag the `dist` folder onto the page.
- **GitHub Pages:** put the contents of `dist/` in the branch or folder that Pages serves, or use a Pages workflow that runs `npm ci && npm run build` in this folder and uploads `dist/`.
- **Any other host or a hotel server:** copy the contents of `dist/` into the web folder.

Before going live:

- Check the WhatsApp number and the pharmacy name in `src/config.ts`. They are used everywhere from there.
- The site has no server, accounts, cookies, tracking or outside requests. The guest's list is saved only in their own browser.
- The prototype notes at the top of the page appear only in `npm run dev`. They are not in the published build.

## Where things are

- `src/config.ts` : pharmacy name and WhatsApp number (the only place to change them).
- `src/App.tsx` : the pages (shop, product, your list) and the WhatsApp message.
- `src/living/CleoHero.tsx` : the home page hero (Cleopatra's clip, the welcome line, the four steps). `text.ts` holds the four steps in seven languages.
- `src/landing/` : the long product landing pages (loaded only when a guest opens one). `ids.ts` says which products have one.
- `src/miswak/` : the Dabur Miswak page with its video in seven languages.
- `src/data.ts`, `src/packs.ts`, `src/facts.ts`, `src/extra.ts`, `src/dr-products.ts`, `src/eva-*.ts` : products, names and texts.
- `src/it-dict.ts` : Italian translations, looked up from the English text.
- `src/photos/` : all images used by the site. `src/media/` : the videos.
- `src/style.css` : main styling.
- `src/lib/local.tsx` : small helpers (saved list, copy button, photo viewer).
- `scripts/cleo-frames.mjs` : turns a Cleopatra clip into a frame sequence (`npm run cleo:frames -- clip.mp4`), for a future scroll-driven version.

## Notes

- Images of Cleopatra are illustrative and labelled "Illustrative image" in every language. AI-retouched product photos are labelled as such.
- Some hair and body products have their description in English only; the page says so to the guest. Italian has full translations.
