# Prompt for Claude Code: bring the Mr. Corner catalog to life

Paste everything below the line into Claude Code, opened inside this project folder.

---

You are working on "Mr. Corner", a mobile-first cosmetics catalog for the pharmacy inside the Three Corners Sea Beach Resort. It is a React + Vite + TypeScript project. Run it with `npm install` then `npm run dev`. Read `src/App.tsx`, `src/data.ts`, `src/packs.ts` and `src/style.css` first. The site works today and looks calm, ivory and gold, with a Cleopatra hero. Your job is to transform it into a living, scroll-driven, immersive site, without breaking anything it already does.

## The outcome I want

When a guest opens the site on a phone, it should feel alive and expensive, like the best 3D scroll-driven sites: one strong hero element that keeps moving and reacting as you scroll, depth (things in front of and behind the text, parallax, floating items), the background mood changing smoothly from section to section, and large elegant type that moves with the scroll. The layout stays calm and minimal, with lots of air.

Everything that moves must belong to this brand. The star of the site is Cleopatra, the host, and the real products from the pharmacy. The animation must grow out of the Cleopatra hero and the product packs, not out of decoration that has nothing to do with them. No generic abstract shapes, no stock effects dropped in the middle of the page, no scene that could belong to any other website. If you cannot tell why an element is there, it should not be there.

## Cleopatra must really move

Cleopatra is the guide. She welcomes the guest in the hero and leads them through the journey: 1. Browse the range in your own language. 2. Send your list on WhatsApp (nothing is paid or ordered online). 3. The pharmacy confirms on WhatsApp and prepares the items. 4. Pick up at the pharmacy inside the resort. The scroll should carry the guest through those four steps, with Cleopatra present and moving.

Moving means real character motion: she turns her head, looks toward the guest, comes closer, with hair, collar and jewellery moving. A slow zoom, a parallax drift or a wobble on the still portrait in `src/photos/cleo-hero.jpg` does NOT count. Do not warp, stretch or bend her face or body. She must stay the same woman as the portrait.

Get real motion in whichever way truly works:
- a short continuous video or frame sequence of her (a generated image-to-video clip made from the portrait, 5 to 15 seconds, one shot, plain background, same face), scrubbed by scroll or looped; or
- a properly layered, rigged or 3D version of her that can really move.

I do not have that asset yet. Check whether the project already contains something usable. If not, say so plainly at the very start of your answer, say exactly what you need from me (for example the clip or the layers, with the format, length and resolution you want), and build everything else so it plugs in the moment the asset arrives (a clearly named file path and a poster frame). Never quietly swap in a still image, a subtle effect or an unrelated shape and call the job done. Be explicit about what is real motion and what is a placeholder.

Every banner or section image must show Cleopatra or another famous woman of ancient Egypt, and keep its small "Illustrative image" label.

## Use these references for the feeling (mood and motion language, not content)

- https://www.youtube.com/shorts/2gysSSBSLRY : a hero character that comes alive. I have not confirmed whether it is scroll-driven.
- https://www.youtube.com/shorts/zNJeSYRH1oc : a prompt library, then a landing page with a large hero subject and small cards.
- https://www.youtube.com/shorts/gVxN-F22N6o : one central 3D object that keeps morphing as you scroll, on a soft ground.
- https://www.youtube.com/shorts/Se3BTi2TMgY : a 3D product with floating items, the background switching colour between sections, giant words behind it.
- A tutorial for the frame-sequence character technique: https://www.scrolltide.co/academy/300-frame-scroll-character-site-claude-code

Propose the best way to give this site the same alive, scroll-led feeling using Cleopatra and the real product packs as the stars. Explain your idea in a few lines before you build it.

## What must keep working (do not break, do not remove)

- Browse by category and search. A product page with the pack photo and neutral details. Add to list, change quantity, remove. The list is saved on the device.
- The "Your list" page and its WhatsApp button, which opens WhatsApp to the pharmacy number with the list already typed in. The wording must stay clear that this only OPENS a prepared message and the guest still has to press Send, and that it is a request, not an order. The pharmacy number is in `src/App.tsx` (`PHARMACY_WHATSAPP`), in one place.
- Six languages (English, German, Polish, Czech, Dutch, French) with all text fitting on a 320 px screen.
- The pharmacy is "inside the resort". Never say near, outside or in town.
- The "Illustrative image" label and the "AI-retouched" label on the Passion item.

## Hard rules

- Product photos are shown exactly as they are in `src/photos`. Never crop, tilt, skew, stretch, cut out, redraw or recolour a pack. Show each whole pack, upright. Floating packs are allowed only if they follow this rule. Do not change the existing product photo behavior.
- Back-of-pack photos are information only and are never displayed anywhere: no gallery, thumbnail, zoom or second image. Show only the front pack photo. Do not add back photos, even if you find one referenced.
- No prices, payment, checkout, confirmed orders, stock claims, ratings, reviews, promotions, or comparisons. No medicines and no personal-hygiene items either. No health, treatment, safety, or results claims. No claims about heritage or origin of products. No guest health data. Do not invent products.
- Do not publish, deploy, add accounts or spend money. Work only inside this folder.
- Do not add tracking or external requests at runtime. Fonts and assets must be local.

## Mobile, speed, accessibility

- Phones first. It must be smooth on a mid-range phone on resort Wi-Fi: lazy-load heavy motion after the first screen, pause animation when it is off screen, cap pixel density, keep the added weight small, provide a still poster while motion loads.
- Scroll-driven motion must work on phones. If you add autoplay anywhere, say where and why.
- Respect `prefers-reduced-motion` with a calm static version where all four journey steps are readable.
- Text is never covered by a moving element, and the page never shows a blank or half-faded screen.
- You may add libraries (for example GSAP, Three.js or Framer Motion) if they help. Keep the bundle sensible.

## How to check your work before you answer

1. `npm run build` passes with no errors.
2. Open it at 320, 390 and 1280 px wide and scroll the whole page. Take screenshots.
3. Cleopatra really moves (or you have said plainly that the asset is missing and what you need).
4. The four journey steps appear in order and the words match above.
5. Add to list, quantity, remove, language switch, and the WhatsApp links all still work.
6. No pack photo is altered. No back-of-pack photo is shown. No price, payment, medicine, personal-hygiene item or health claim appears anywhere.
7. Tell me honestly what is real, what is a placeholder, and what you still need from me.
