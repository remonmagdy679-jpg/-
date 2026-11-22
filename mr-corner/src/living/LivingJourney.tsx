import React, { memo, useEffect, useRef, useState } from 'react';
import { HOME, REAL, type Lang } from '../data';
import { PACKS } from '../packs';
import { LIVE } from './text';
import { CleoMotion, type CleoHandle } from './CleoMotion';
import './living.css';

// The home page opening: Cleopatra welcomes the guest and the scroll carries them through the four steps.
// Chapter 0 is the welcome, chapters 1 to 4 are the steps. The stage (arch, Cleopatra, packs, large word) is pinned
// while the text cards scroll over it. Cards always sit on top, so nothing that moves ever covers text.

// Pack positions per chapter, in arch units: x and y are 0..1 across the arch (outside = beside it),
// w is the pack's width as a share of the arch width. Packs only move and scale evenly: never tilted,
// cropped or stretched. Each photo is the pharmacy's own front-of-pack photo, shown whole.
type At = [number, number, number];
type Fly = { id: string; layer: 'back' | 'front'; first?: boolean; at: [At, At, At, At, At] };
const DN = 2.4; // below the stage (waiting to come in)
const UP = -1.4; // above the stage (gone)
const FLY: Fly[] = [
    // back layer: behind the arch
    { id: 'vatika-olive', layer: 'back', first: true, at: [[-0.04, 0.22, 0.26], [-0.3, 0.12, 0.26], [-0.3, UP, 0.26], [-0.3, UP, 0.26], [-0.3, UP, 0.26]] },
    { id: 'face-23', layer: 'back', at: [[1.28, DN, 0.26], [1.28, 0.12, 0.26], [1.28, UP, 0.26], [1.28, UP, 0.26], [1.28, UP, 0.26]] },
    { id: 'face-18', layer: 'back', at: [[1.3, DN, 0.26], [1.3, 0.46, 0.26], [1.3, UP, 0.26], [1.3, UP, 0.26], [1.3, UP, 0.26]] },
    // front layer: in front of the arch, never over Cleopatra's face
    { id: 'body-10', layer: 'front', at: [[-0.22, DN, 0.32], [-0.22, 0.84, 0.32], [-0.22, UP, 0.32], [-0.22, UP, 0.32], [-0.22, UP, 0.32]] },
    { id: 'body-12', layer: 'front', at: [[-0.3, DN, 0.28], [-0.3, 0.48, 0.28], [-0.3, UP, 0.28], [-0.3, UP, 0.28], [-0.3, UP, 0.28]] },
    // the three packs that become "your list": browsed, sent as a list, prepared on the counter, handed over
    { id: 'body-06', layer: 'front', first: true, at: [[-0.1, 0.8, 0.36], [0.2, 0.93, 0.3], [1.16, 0.15, 0.28], [0.18, 0.86, 0.28], [0.13, 0.84, 0.4]] },
    { id: 'body-13', layer: 'front', at: [[0.8, DN, 0.3], [0.8, 0.93, 0.3], [1.16, 0.85, 0.28], [0.82, 0.86, 0.28], [0.87, 0.84, 0.4]] },
    { id: 'face-16', layer: 'front', first: true, at: [[1.1, 0.64, 0.32], [1.22, 0.8, 0.32], [1.16, 0.5, 0.28], [0.5, 0.86, 0.28], [0.5, 0.9, 0.46]] },
];
const BASE = 0.3; // pack element width (share of arch width) before scaling
const LIST_ROW: At = [0.5, 0.86, 0.28]; // chapter 3 row, used to place the counter line under it

// Background mood per chapter: night gold, ivory, sand, Red Sea teal, evening glow.
// Blended in the OKLab colour space so the change between two moods stays warm and clean (no grey dip).
type RGB = [number, number, number];
const MOOD_RGB: RGB[] = [[38, 30, 24], [241, 231, 214], [226, 199, 147], [31, 71, 68], [239, 211, 181]];
const lin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const gam = (c: number) => Math.round(255 * Math.min(1, Math.max(0, c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)));
const toLab = ([R, G, B]: RGB): RGB => {
    const r = lin(R); const g = lin(G); const b = lin(B);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
};
const toRgb = ([L, A, B]: RGB): string => {
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3; const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3; const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    return `rgb(${gam(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)},${gam(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)},${gam(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)})`;
};
const MOOD = MOOD_RGB.map(toLab);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const hold = (t: number, a: number, b: number) => smooth(clamp((t - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (f: number): [number, number] => { const k = Math.min(3, Math.max(0, Math.floor(f))); return [k, clamp(f - k)]; };

function photoOf(id: string) {
    const r = REAL[id]; if (r) return { src: r.photo, alt: r.alt };
    const p = PACKS[id]; return p && p.kind !== 'ai' ? { src: p.photo, alt: p.name } : null;
}

type Props = { L: Lang; brand: string; onOpen: (id: string) => void; onCta: () => void };

function LivingJourneyImpl({ L, brand, onOpen, onCta }: Props) {
    const secRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const archRef = useRef<HTMLElement>(null);
    const ribbonRef = useRef<HTMLDivElement>(null);
    const shelfRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const packRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const cleoRef = useRef<CleoHandle>(null);
    const cb = useRef({ onOpen, onCta }); cb.current = { onOpen, onCta };
    const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [warm, setWarm] = useState(still);

    useEffect(() => {
        const sec = secRef.current; const stage = stageRef.current; const arch = archRef.current;
        const ribbon = ribbonRef.current; const track = trackRef.current; const shelf = shelfRef.current;
        if (!sec || !stage || !arch || !ribbon || !track || !shelf) return;
        const g = { ax: 0, ay: 0, aw: 1, ah: 1, sw: 1, k: 1, top: 64, anchors: [0, 1, 2, 3, 4], words: [0, 0, 0, 0, 0] };
        const measure = () => {
            const st = stage.getBoundingClientRect(); const ar = arch.getBoundingClientRect();
            g.ax = ar.left - st.left; g.ay = ar.top - st.top; g.aw = ar.width || 1; g.ah = ar.height || 1; g.sw = st.width;
            const margin = (g.sw - g.aw) / 2 / g.aw; // free room beside the arch, in arch widths
            g.k = clamp((0.5 + margin - 0.14) / 0.8, 0.55, 1);
            g.top = parseFloat(getComputedStyle(stage).top) || 0;
            const blocks = Array.from(track.querySelectorAll<HTMLElement>('[data-ch]'));
            if (blocks.length === 5) g.anchors = blocks.map((b) => b.offsetTop);
            const spans = Array.from(ribbon.children) as HTMLElement[];
            if (spans.length === 5) g.words = spans.map((s) => s.offsetLeft + s.offsetWidth / 2);
            stage.style.setProperty('--pw', `${(BASE * g.aw).toFixed(1)}px`);
        };
        const progress = () => {
            const s = g.top - sec.getBoundingClientRect().top; const a = g.anchors;
            if (s <= a[0]) return 0;
            for (let i = 1; i < a.length; i++) if (s < a[i]) return i - 1 + (s - a[i - 1]) / Math.max(1, a[i] - a[i - 1]);
            return 4;
        };
        const apply = (f: number, packF = f) => {
            const [k, t] = seg(f);
            // background mood, holding still while a step is being read
            const c = hold(t, 0.32, 0.68); const m0 = MOOD[k]; const m1 = MOOD[k + 1];
            stage.style.backgroundColor = toRgb([lerp(m0[0], m1[0], c), lerp(m0[1], m1[1], c), lerp(m0[2], m1[2], c)]);
            // the large word behind Cleopatra glides from one chapter's word to the next
            const wx = lerp(g.words[k], g.words[k + 1], t);
            ribbon.style.transform = `translate3d(${(g.ax + g.aw / 2 - wx).toFixed(1)}px,0,0)`;
            // packs
            const [pk, pt] = seg(packF);
            FLY.forEach((p, i) => {
                const el = packRefs.current[i]; if (!el) return;
                const e = hold(pt, 0.12 + i * 0.025, 0.78 + i * 0.02);
                const A = p.at[pk]; const B = p.at[pk + 1];
                const x = lerp(A[0], B[0], e); const y = lerp(A[1], B[1], e); const w = lerp(A[2], B[2], e);
                const cx = g.ax + (0.5 + (x - 0.5) * g.k) * g.aw; const cy = g.ay + y * g.ah;
                el.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%) scale(${(w / BASE).toFixed(3)})`;
            });
            // the counter line under the prepared items (step 3)
            const on = clamp(1 - Math.abs(packF - 3) / 0.7);
            const sy = g.ay + LIST_ROW[1] * g.ah + 0.625 * LIST_ROW[2] * g.aw + 4;
            shelf.style.transform = `translate3d(${(g.ax - 0.12 * g.aw).toFixed(1)}px,${sy.toFixed(1)}px,0) scaleX(${smooth(on).toFixed(3)})`;
            shelf.style.width = `${(1.24 * g.aw).toFixed(1)}px`;
            cleoRef.current?.show(f / 4);
        };

        if (still) { measure(); apply(0, 1); const ro = new ResizeObserver(() => { measure(); apply(0, 1); }); ro.observe(stage); return () => ro.disconnect(); }

        let target = 0; let cur = 0; let raf = 0; let live = false; let loadAsked = false;
        const tick = () => {
            raf = 0;
            cur += (target - cur) * 0.22;
            if (Math.abs(target - cur) < 0.0008) cur = target;
            apply(cur);
            if (cur !== target) raf = requestAnimationFrame(tick);
        };
        const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
        const onScroll = () => { if (!live) return; target = progress(); if (target > 0.02) setWarm(true); kick(); };
        const askLoad = () => {
            if (loadAsked) return; loadAsked = true;
            const go = () => { const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }; if (w.requestIdleCallback) w.requestIdleCallback(() => cleoRef.current?.load(), { timeout: 1500 }); else setTimeout(() => cleoRef.current?.load(), 600); };
            if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
        };
        const io = new IntersectionObserver(([e]) => {
            live = e.isIntersecting;
            sec.classList.toggle('is-live', live);
            if (live) { askLoad(); onScroll(); }
        }, { rootMargin: '100px 0px' });
        const ro = new ResizeObserver(() => { measure(); target = progress(); cur = target; apply(cur); });
        measure(); target = cur = progress(); apply(cur);
        io.observe(sec); ro.observe(stage); ro.observe(track); ro.observe(ribbon);
        window.addEventListener('scroll', onScroll, { passive: true });
        document.fonts?.ready.then(() => { measure(); apply(cur); });
        const warmTimer = window.setTimeout(() => setWarm(true), 2500);
        return () => { io.disconnect(); ro.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); clearTimeout(warmTimer); };
    }, [still]);

    const words = [brand, ...LIVE.steps.map((s) => s.word[L])];
    const packs = FLY.map((p, i) => {
        const ph = photoOf(p.id); if (!ph) return null;
        return <button key={p.id} ref={(el) => { packRefs.current[i] = el; }} type="button" className={`lv-pack is-${p.layer}`} tabIndex={-1} aria-hidden="true" onClick={() => cb.current.onOpen(p.id)}>
            <span className="lv-bob" style={{ animationDelay: `${-i * 0.9}s`, animationDuration: `${6 + (i % 3)}s` }}>
                {(p.first || warm) && <img src={ph.src} alt="" decoding="async" draggable={false} />}
            </span>
        </button>;
    });

    return <section ref={secRef} className={still ? 'lv is-static' : 'lv'} aria-label={HOME.heroTitle[L]}>
        <div ref={stageRef} className="lv-stage">
            <div ref={ribbonRef} className="lv-ribbon" aria-hidden="true">{words.map((w, i) => <span key={i}>{w}</span>)}</div>
            {packs.filter((_, i) => FLY[i].layer === 'back')}
            <figure ref={archRef} className="lv-arch">
                <div className="lv-win"><CleoMotion ref={cleoRef} alt={HOME.bannerAlt[L]} /></div>
                <figcaption className="lv-cap">{HOME.illus[L]}</figcaption>
            </figure>
            <div ref={shelfRef} className="lv-shelf" aria-hidden="true" />
            {packs.filter((_, i) => FLY[i].layer === 'front')}
        </div>
        <div ref={trackRef} className="lv-track">
            <div className="lv-ch is-hero" data-ch="0">
                <div className="lv-card is-dark">
                    <p className="lv-kicker">{HOME.heroKicker[L]}</p>
                    <h1 className="lv-title">{HOME.heroTitle[L]}</h1>
                    <p className="lv-sub">{HOME.heroSub[L]}</p>
                    <a className="lv-cta" href="#ph-all" onClick={(e) => { e.preventDefault(); cb.current.onCta(); }}>{HOME.heroCta[L]}</a>
                </div>
            </div>
            <h2 className="lv-sr">{LIVE.stepsH[L]}</h2>
            <ol className="lv-steps">
                {LIVE.steps.map((s, i) => <li key={i} className="lv-ch" data-ch={i + 1}>
                    <div className="lv-card">
                        <div className="lv-head"><span className="lv-num" aria-hidden="true">{i + 1}</span><h3 className="lv-word">{s.word[L]}</h3></div>
                        <p className="lv-body">{s.body[L]}</p>
                    </div>
                </li>)}
            </ol>
        </div>
    </section>;
}

export const LivingJourney = memo(LivingJourneyImpl, (a, b) => a.L === b.L && a.brand === b.brand);
