import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { CopyButton, PhotoViewer, useLocalState } from './lib/local';
import beachBanner from './photos/banner-lifestyle.jpg';
import { CATEGORIES, DETAIL, EXP, HOME, FLOW, JOURNEY, LANGS, MOM, VALUE, PDP, REAL, UI, MAKER, type Lang } from './data';
import { FACTS } from './facts';
import { PACKS, PACKX, ALIAS, LEGACY, GET, FAM, SIZE_T } from './packs';
import { SETS, MEDS, POINTS, VISIT } from './extra';
import { CleoJourney } from './living/CleoHero';
import { EVA_BERRIES } from './eva-berries';
import { LANDING_IDS } from './landing/ids';
// The long product landing pages load only when a guest opens one, so the first screen stays light.
const MiswakLanding = lazy(() => import('./miswak/Landing').then((m) => ({ default: m.MiswakLanding })));
const Landing = lazy(() => import('./landing/Landing').then((m) => ({ default: m.Landing })));
import { EVA_COCONUT } from './eva-coconut';
import { DR, DR_PHOTO_NEW } from './dr-products';
import { itDeep } from './it-dict';
import { PHARMACY_NAME, PHARMACY_WHATSAPP } from './config';
const DR_IT: typeof DR = itDeep(DR);
const EVAC_IT: typeof EVA_COCONUT = itDeep(EVA_COCONUT);
const EVAB_IT: typeof EVA_BERRIES = itDeep(EVA_BERRIES);
const LI: Record<Lang, number> = { en: 0, de: 1, pl: 2, cs: 3, nl: 4, fr: 5, it: 6 };
const SELECT_BTN: Record<Lang, string> = { en: 'ADD TO MY SELECTION', de: 'ZU MEINER AUSWAHL', pl: 'DODAJ DO MOJEGO WYBORU', cs: 'PŘIDAT DO MÉHO VÝBĚRU', nl: 'TOEVOEGEN AAN MIJN SELECTIE', fr: 'AJOUTER À MA SÉLECTION', it: 'AGGIUNGI ALLA MIA SELEZIONE' };


const products = CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, cat: c.id }))).sort((x, y) => (REAL[y.id] ? 2 : PACKS[y.id] ? 1 : 0) - (REAL[x.id] ? 2 : PACKS[x.id] ? 1 : 0));
const monoOf = (id: string) => { const p = products.find((x) => x.id === id); const w = (p ? p.en : '').replace(/^[\d.]+\s*g?\s*/i, '').replace(/^(the|dabur)\s+/i, '').trim(); return w ? w[0].toUpperCase() : '\u2022'; };
type View = { kind: 'shop' } | { kind: 'item'; id: string } | { kind: 'list' };


export function App() {
    const [lang, setLang, langSaved] = useLocalState<Lang>('ph-lang.v1', 'en');
    const [picked, setPicked, pickSaved] = useLocalState<string[]>('ph-picked.v1', []);
    const [view, setViewRaw] = useState<View>({ kind: 'shop' });
    const [cat, setCat] = useState('all');
    const [q, setQ] = useState('');
    const [guest, setGuest] = useState('');
    const [when, setWhen] = useState('');
    const [zoom, setZoom] = useState<{ photos: { src: string; alt: string }[]; start: number } | null>(null);
    const [gi, setGi] = useState(0);
    const [opened, setOpened] = useState(false);
    const [lim, setLim] = useState(24);
    const [who, setWho] = useState<'' | 'me' | 'gift'>('');
    const [famSel, setFamSel] = useState<Record<string, string>>({});
    const openItem = (id: string) => { const f = FAM[id]; if (f) { setFamSel((s) => ({ ...s, [f.rep]: id })); setView({ kind: 'item', id: f.rep }); } else setView({ kind: 'item', id }); };
    const L = lang;
    useEffect(() => { document.documentElement.lang = L; }, [L]);
    const DRx: typeof DR = L === 'it' ? DR_IT : DR;
    const EVAC = L === 'it' ? EVAC_IT : EVA_COCONUT;
    const EVAB = L === 'it' ? EVAB_IT : EVA_BERRIES;
    // Navigation history: every move between list, product and request list is a browser history entry,
    // so Back (and the on-page back link) returns to the same list place: category, search, "show more" and scroll.
    const keepLim = useRef(false);
    const pendingY = useRef(0);
    const pendingAnchor = useRef('');
    const anchorRef = useRef('');
    const snapRef = useRef({ view, cat, q, lim });
    snapRef.current = { view, cat, q, lim };
    const idxRef = useRef(0);
    const stateNow = () => ({ ...snapRef.current, y: 0, a: anchorRef.current, idx: idxRef.current, from: (window.history.state && window.history.state.from) || '' });
    const go = (v: View) => {
        const cur = snapRef.current.view;
        if (cur.kind === v.kind && (cur as { id?: string }).id === (v as { id?: string }).id) return;
        try {
            window.history.replaceState(stateNow(), '');
            idxRef.current += 1;
            window.history.pushState({ ...snapRef.current, view: v, y: 0, a: '', idx: idxRef.current, from: cur.kind }, '');
        } catch { /* history unavailable: fall back to plain state change */ }
        pendingY.current = 0; pendingAnchor.current = '';
        setViewRaw(v);
    };
    const setView = go;
    const backToShop = () => {
        const st = window.history.state;
        if (st && st.from === 'shop' && idxRef.current > 0) window.history.back(); else go({ kind: 'shop' });
    };
    useEffect(() => {
        try { window.history.scrollRestoration = 'manual'; window.history.replaceState({ ...snapRef.current, y: 0, a: anchorRef.current, idx: 0, from: '' }, ''); } catch { /* ignore */ }
        const onPop = (e: PopStateEvent) => {
            const st = e.state;
            if (!st || !st.view) { pendingY.current = 0; pendingAnchor.current = ''; setViewRaw({ kind: 'shop' }); return; }
            idxRef.current = st.idx || 0;
            if (st.cat !== snapRef.current.cat || st.q !== snapRef.current.q) keepLim.current = true;
            pendingY.current = 0; pendingAnchor.current = st.a || '';
            setCat(st.cat); setQ(st.q); setLim(st.lim || 24); setViewRaw(st.view);
        };
        window.addEventListener('popstate', onPop);
        return () => { window.removeEventListener('popstate', onPop); };
    }, []);
    // Remember which product card is at the top of the screen, so Back returns to that same place.
    useEffect(() => {
        if (view.kind !== 'shop' || typeof IntersectionObserver === 'undefined') return;
        const vis = new Map<string, number>();
        const io = new IntersectionObserver((es) => {
            es.forEach((e) => { const id = (e.target as HTMLElement).dataset.pid || ''; if (e.isIntersecting) vis.set(id, e.boundingClientRect.top); else vis.delete(id); });
            let best = ''; let bt = Infinity;
            vis.forEach((t, id) => { if (t < bt) { bt = t; best = id; } });
            if (vis.size) { anchorRef.current = best; try { window.history.replaceState(stateNow(), ''); } catch { /* ignore */ } }
        }, { threshold: 0.3 });
        document.querySelectorAll('[data-pid]').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [view.kind, lim, cat, q]);
    useEffect(() => { try { window.history.replaceState(stateNow(), ''); } catch { /* ignore */ } }, [cat, q, lim, view]);
    useEffect(() => { if (keepLim.current) { keepLim.current = false; return; } setLim(24); }, [cat, q]);
    useEffect(() => {
        setGi(0);
        const a = pendingAnchor.current; pendingAnchor.current = '';
        const place = () => {
            const el = a ? document.querySelector(`[data-pid="${a}"]`) : null;
            if (el) el.scrollIntoView({ block: 'start' });
            else { window.scrollTo(0, 0); document.querySelector('.ph-proto')?.scrollIntoView({ block: 'start' }); }
        };
        place();
        if (a) { requestAnimationFrame(place); setTimeout(place, 150); setTimeout(place, 450); }
    }, [view.kind, (view as { id?: string }).id]);
    // Latest list, updated synchronously so two quick taps never overwrite each other.
    const pickedRef = useRef<string[]>(picked);
    pickedRef.current = picked;
    const update = (fn: (cur: string[]) => string[]) => { if (!pickSaved.ready) return; const next = fn(pickedRef.current); pickedRef.current = next; setPicked(next); };
    const toggle = (id: string) => { setOpened(false); update((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])); };
    useEffect(() => {
        if (!pickSaved.ready) return;
        const mapped = Array.from(new Set(picked.map((i) => ALIAS[i] || i)));
        if (mapped.length !== picked.length || mapped.some((v, k) => v !== picked[k])) update(() => mapped);
    }, [pickSaved.ready, picked]);
    const chosen = products.filter((i) => picked.includes(i.id));
    const lines = ['Hello, I would like to request these items for pickup at the pharmacy (please confirm availability):', ...chosen.map((i) => `- ${i.en}`)];
    lines.push(`Guest language: ${LANGS.find((x) => x.code === L)!.label}`);
    if (who) lines.push(`For: ${who === 'gift' ? 'a gift' : 'myself'}`);
    if (guest.trim()) lines.push(`Name: ${guest.trim()}`);
    if (when.trim()) lines.push(`Pickup time: ${when.trim()}`);
    const message = lines.join('\n');
    const href = PHARMACY_WHATSAPP ? `https://wa.me/${PHARMACY_WHATSAPP}?text=${encodeURIComponent(message)}` : '';
    const needle = q.trim().toLowerCase();
    const matches = (p: (typeof products)[number]) => p.names[L].toLowerCase().includes(needle) || p.en.toLowerCase().includes(needle) || (LEGACY[p.id] || []).some((n) => n.toLowerCase().includes(needle));
    const shown = products.filter((p) => (cat === 'all' || p.cat === cat || (cat === 'eve' && ['face', 'body', 'hair'].includes(p.cat))) && (!FAM[p.id] || FAM[p.id].rep === p.id) && (!needle || (FAM[p.id] ? FAM[p.id].sizes.some((s) => matches(products.find((x) => x.id === s.id)!)) : matches(p))));

    const AddBtn = ({ id, block }: { id: string; block?: boolean }) => {
        const on = picked.includes(id);
        return <button type="button" className={`ph-add${block ? ' is-block' : ''}`} aria-pressed={on} onClick={() => toggle(id)}>{on ? `✓ ${UI.added[L]}` : (id === 'body-12' || id === 'body-13' || DRx[id]) ? SELECT_BTN[L] : `+ ${UI.add[L]}`}</button>;
    };
    const Pic = ({ id, big }: { id: string; big?: boolean }) => {
        const real = REAL[id];
        const pk = PACKS[id];
        return pk && !real
            ? <img className={(big ? 'ph-img is-big' : 'ph-img') + ((pk.kind === 'ai' || DR_PHOTO_NEW.has(id)) ? ' is-native' : '')} src={pk.photo} alt={DRx[id] ? `${DRx[id].title}, ${DRx[id].brand} pack` : id === 'body-12' ? 'Eva Hydrating Body Lotion, Berries Scent, full upright bottle' : `${pk.name} · ${pk.kind === 'ai' ? PACKX.pillAi[L] : PACKX.pillRep[L]}`} />
            : real
            ? <img className={big ? 'ph-img is-big' : 'ph-img'} src={real.photo} alt={real.alt} />
            : <div className={big ? 'ph-img ph-ph ph-mono is-big' : 'ph-img ph-ph ph-mono'} role="img" aria-label={DETAIL.photo[L] + ': ' + DETAIL.soon[L]}><b aria-hidden="true">{monoOf(id)}</b>{big && <span>{DETAIL.photo[L]} · {DETAIL.soon[L]}</span>}</div>;
    };

    const header = <>
        {import.meta.env.DEV && <div className="ph-proto" dir="ltr">
            {L === 'it' ? <><strong>PROTOTIPO</strong> · Layout di prova. Gli articoli Vatika, Eva, Orgakera, Eloud Elmalky e Khamriyah Al Malika mostrano foto dei prodotti, alcune ritoccate con l'IA (indicato sulla scheda). Gli altri articoli sono nomi dell'elenco della farmacia, foto in arrivo. Non visibile agli ospiti.</> : <><strong>PROTOTYPE</strong> · Prototype layout. Vatika, Eva, Orgakera, Eloud Elmalky and Khamriyah Al Malika items show product photos, some retouched with AI (marked on the card). Other items are names from the pharmacy's own list, photos pending. Not live for guests.</>}
            <div dir="rtl" lang="ar">نموذج تجريبي: أصناف فاتيكا وإيفا وأورجاكيرا وعود الملكي وخمرية الملكة عليها صور المنتجات، وبعضها معدّل بالذكاء الاصطناعي (مكتوب على الكارت). باقي الأصناف أسماء من قايمة الصيدلية والصور لسه. غير منشور للضيوف.</div>
            <div>{L === 'it' ? <><strong>Bozza del percorso.</strong> Cleopatra è un video generato che parte all'apertura della pagina. Le confezioni non si muovono. Immagine illustrativa.</> : <><strong>Journey draft.</strong> Cleopatra is a generated video clip that plays when the page opens. The packs do not move. Illustrative image.</>}</div>
            <div dir="rtl" lang="ar">مسودة الرحلة: كليوباترا مقطع فيديو مولّد بيشتغل لوحده أول ما الصفحة تفتح. العبوات مش بتتحرك. صورة توضيحية.</div>
            <div><strong>Development view only.</strong> This note is not shown on the published site.</div>
        </div>}
        <div className="ph-strip" dir="ltr"><span>{HOME.strip1[L]}</span><span className="ph-strip-wide">{HOME.strip2[L]}</span><span>{HOME.strip3[L]}</span></div>
        <div className="ph-bar">
            <button type="button" className="ph-logo" onClick={() => { setView({ kind: 'shop' }); setCat('all'); setQ(''); }} aria-label={PHARMACY_NAME}><svg className="ph-mark" viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="#c9a86a" strokeWidth="1.6" /><path d="M5.5 20 Q20 7.5 34.5 20 Q20 32.5 5.5 20 Z" fill="none" stroke="#c9a86a" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="20" cy="20" r="6" fill="#c9a86a" /><path d="M20 16.8 V23.2 M16.8 20 H23.2" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" /><path d="M34.5 20 L37 25" stroke="#c9a86a" strokeWidth="1.6" strokeLinecap="round" /></svg><span>{PHARMACY_NAME}</span></button>
            <input className="ph-hsearch" type="search" placeholder={DETAIL.search[L]} aria-label={DETAIL.search[L]} value={q} onChange={(e) => { setQ(e.target.value); setView({ kind: 'shop' }); }} />
            {PHARMACY_WHATSAPP && <a className="ph-wa" href={`https://wa.me/${PHARMACY_WHATSAPP}`} target="_blank" rel="noreferrer" aria-label={JOURNEY.askCta[L]} title={JOURNEY.askCta[L]}>WhatsApp</a>}
            <button type="button" className="ph-basket" onClick={() => setView({ kind: 'list' })}>{UI.list[L]} <span className="ph-badge">{picked.length}</span></button>
        </div>
        <div className="ph-langbar" role="group" aria-label="Language">
            {LANGS.map((x) => <button key={x.code} type="button" aria-pressed={L === x.code} onClick={() => { if (langSaved.ready) setLang(x.code); }}>{x.label}</button>)}
        </div>
    </>;

    let body: React.ReactNode;
    if (view.kind === 'item') {
        const p = products.find((x) => x.id === (FAM[view.id] ? FAM[view.id].rep : view.id))!;
        const fam = FAM[p.id];
        const sid = fam ? (famSel[fam.rep] || fam.sizes.find((s) => picked.includes(s.id))?.id || '') : p.id;
        const sprod = products.find((x) => x.id === sid);
        const real = REAL[p.id];
        const pk = PACKS[sid || p.id];
        body = p.id === 'oral-01' ? <div className="ph-wrap">
            <button type="button" className="ph-backlink" onClick={backToShop}>← {DETAIL.back[L]}</button>
            <Suspense fallback={<p className="ph-loading" role="status">…</p>}><MiswakLanding lang={L} /></Suspense>
        </div> : LANDING_IDS[p.id] ? <div className="ph-wrap">
            <button type="button" className="ph-backlink" onClick={backToShop}>← {DETAIL.back[L]}</button>
            <Suspense fallback={<p className="ph-loading" role="status">…</p>}><Landing pid={LANDING_IDS[p.id]} lang={L} famTitle={fam ? fam.title : undefined} sizes={fam ? fam.sizes : undefined} /></Suspense>
        </div> : <div className="ph-wrap">
            <p className="ph-crumbs"><button type="button" onClick={() => { setCat('all'); setView({ kind: 'shop' }); }}>{UI.title[L]}</button> / <button type="button" onClick={() => { setCat(p.cat); setView({ kind: 'shop' }); }}>{CATEGORIES.find((c) => c.id === p.cat)!.name[L]}</button></p>
            <button type="button" className="ph-backlink" onClick={backToShop}>← {DETAIL.back[L]}</button>
            <div className="ph-pdp">
                <div className="ph-pdp-img">
                    {real ? <>
                        <button type="button" className="ph-stage" onClick={() => setZoom({ photos: [{ src: real.photo, alt: real.alt }], start: 0 })} aria-label={DETAIL.zoom[L]}>
                            <img className="ph-img is-big" src={real.photo} alt={real.alt} />
                            <span className="ph-zoomhint">{DETAIL.zoom[L]}</span>
                        </button>
                    </> : <Pic id={p.id} big />}
                </div>
                <div className="ph-pdp-info">
                    {DRx[p.id] ? <>
                        {L !== 'en' && L !== 'it' && <p className="ph-fine" lang="en">Product description in English, as supplied. No translation has been added.</p>}
                        <div lang={L === 'it' ? 'it' : 'en'}>
                            <p className="ph-brand">{DRx[p.id].brand}</p>
                            <h1 className="ph-h1">{DRx[p.id].title}</h1>
                            <h2 className="ph-h2">{DRx[p.id].headline}</h2>
                            <p className="ph-desc">{DRx[p.id].intro}</p>
                            
                            {DRx[p.id].story.map((t) => <p className="ph-desc" key={t}>{t}</p>)}
                            <h2 className="ph-h2">{DRx[p.id].whatHeading}</h2>
                            <ul className="ph-eva-details">{DRx[p.id].what.map((d) => <li key={d}>{d}</li>)}</ul>
                            <h2 className="ph-h2">{DRx[p.id].homeHeading}</h2>
                            <p className="ph-desc">{DRx[p.id].home}</p>
                            <h2 className="ph-h2">{DRx[p.id].faqHeading}</h2>
                            {DRx[p.id].faq.map(([q, a]) => <div key={q}><p className="ph-desc"><b>{q}</b></p><p className="ph-desc">{a}</p></div>)}
                            <h2 className="ph-h2">{DRx[p.id].selectionHeading}</h2>
                            <p className="ph-desc">{DRx[p.id].selection}</p>
                        </div>
                        <AddBtn id={p.id} block />
                        <p className="ph-status" role="status">{picked.includes(p.id) ? GET.on[L] : GET.off[L]}</p>
                        {picked.includes(p.id) && <button type="button" className="ph-add is-block ph-review" onClick={() => setView({ kind: 'list' })}>{GET.review[L]}</button>}
                        <div className="ph-getbox"><p className="ph-getbox-h">{GET.h[L]}</p><p><b>1</b>{GET.s1[L]}</p><p><b>2</b>{GET.s2[L]}</p><p><b>3</b>{GET.s3[L]}</p></div>
                    </> : p.id === 'body-13' ? <>
                        {L !== 'en' && L !== 'it' && <p className="ph-fine" lang="en">Product description in English, as supplied. No translation has been added.</p>}
                        <div lang={L === 'it' ? 'it' : 'en'}>
                            <p className="ph-brand">{EVAC.brand}</p>
                            <h1 className="ph-h1">{EVAC.title}</h1>
                            <h2 className="ph-h2">{EVAC.headline}</h2>
                            <p className="ph-desc">{EVAC.intro}</p>
                            {EVAC.story.map((t) => <p className="ph-desc" key={t}>{t}</p>)}
                            <h2 className="ph-h2">{EVAC.whatHeading}</h2>
                            <ul className="ph-eva-details">{EVAC.what.map((d) => <li key={d}>{d}</li>)}</ul>
                            <h2 className="ph-h2">{EVAC.homeHeading}</h2>
                            <p className="ph-desc">{EVAC.home}</p>
                            <h2 className="ph-h2">{EVAC.faqHeading}</h2>
                            {EVAC.faq.map(([q, a]) => <div key={q}><p className="ph-desc"><b>{q}</b></p><p className="ph-desc">{a}</p></div>)}
                            <h2 className="ph-h2">{EVAC.selectionHeading}</h2>
                            <p className="ph-desc">{EVAC.selection}</p>
                        </div>
                        <AddBtn id={p.id} block />
                        <p className="ph-status" role="status">{picked.includes(p.id) ? GET.on[L] : GET.off[L]}</p>
                        {picked.includes(p.id) && <button type="button" className="ph-add is-block ph-review" onClick={() => setView({ kind: 'list' })}>{GET.review[L]}</button>}
                        <div className="ph-getbox"><p className="ph-getbox-h">{GET.h[L]}</p><p><b>1</b>{GET.s1[L]}</p><p><b>2</b>{GET.s2[L]}</p><p><b>3</b>{GET.s3[L]}</p></div>
                    </> : p.id === 'body-12' ? <>
                        {L !== 'en' && L !== 'it' && <p className="ph-fine" lang="en">Product description in English, as supplied. No translation has been added.</p>}
                        <div lang={L === 'it' ? 'it' : 'en'}>
                            <p className="ph-brand">{EVAB.brand}</p>
                            <h1 className="ph-h1">{EVAB.title}</h1>
                            <h2 className="ph-h2">{EVAB.headline}</h2>
                            <p className="ph-desc">{EVAB.intro}</p>
                            <p className="ph-desc">{EVAB.body}</p>
                            <h2 className="ph-h2">{EVAB.detailsHeading}</h2>
                            <ul className="ph-eva-details">{EVAB.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                            <h2 className="ph-h2">{EVAB.selectionHeading}</h2>
                            <p className="ph-desc">{EVAB.selection}</p>
                        </div>
                        <AddBtn id={p.id} block />
                        <p className="ph-status" role="status">{picked.includes(p.id) ? GET.on[L] : GET.off[L]}</p>
                        {picked.includes(p.id) && <button type="button" className="ph-add is-block ph-review" onClick={() => setView({ kind: 'list' })}>{GET.review[L]}</button>}
                        <div className="ph-getbox"><p className="ph-getbox-h">{GET.h[L]}</p><p><b>1</b>{GET.s1[L]}</p><p><b>2</b>{GET.s2[L]}</p><p><b>3</b>{GET.s3[L]}</p></div>
                    </> : <>
                    <p className="ph-brand">{real ? real.brand : UI.title[L]}</p>
                    <h1 className="ph-h1">{fam ? fam.title : p.names[L]}</h1>
                    {real && <p className="ph-desc">{real.desc[L]}</p>}
                    {!real && !pk && <p className="ph-desc"><span className="ph-pill">{DETAIL.pending[L]}</span></p>}
                    {p.id === 'vatika-olive' && <p className="ph-desc"><span className="ph-pill">{PACKX.pillAi[L]}</span></p>}
                    {!real && pk && <p className="ph-desc"><span className="ph-pill">{pk.kind === 'ai' ? PACKX.pillAi[L] : (pk.kind === 'own' || pk.kind === 'pk') ? PACKX.pill[L] : PACKX.pillRep[L]}</span> {pk.kind === 'ai' ? PACKX.ai[L] : (pk.kind === 'own' || pk.kind === 'pk') ? (/\d\s?(g|gm|ml|l|kg|mg|oz)\b/i.test((sprod || p).en) ? PACKX[pk.kind][L] : '') : PACKX[pk.kind][L]}</p>}
                    {pk && FACTS[fam ? sid : p.id] && <p className="ph-purpose">{FACTS[fam ? sid : p.id].t[LI[L]]}</p>}
                    {real && <ul className="ph-chips">{PDP.chips.map((c, n) => <li key={n}>{c[L]}</li>)}</ul>}
                    {fam && <div className="ph-sizes" role="group" aria-label={SIZE_T.sizes[L]}><span className="ph-sizes-h">{SIZE_T.sizes[L]}</span><div>{fam.sizes.map((s) => <button key={s.id} type="button" aria-pressed={sid === s.id} onClick={() => setFamSel((m) => ({ ...m, [fam.rep]: s.id }))}>{s.g}{picked.includes(s.id) ? ' \u2713' : ''}</button>)}</div></div>}
                    {fam && !sid ? <button type="button" className="ph-add is-block" disabled>{SIZE_T.pick[L]}</button> : <AddBtn id={sid || p.id} block />}
                    <p className="ph-status" role="status">{fam && !sid ? SIZE_T.need[L] : picked.includes(sid || p.id) ? GET.on[L] : GET.off[L]}</p>
                    {fam && sprod && <p className="ph-fine">{SIZE_T.chosen[L]}: {sprod.names[L]}</p>}
                    {picked.includes(sid || p.id) && <button type="button" className="ph-add is-block ph-review" onClick={() => setView({ kind: 'list' })}>{GET.review[L]}</button>}
                    <div className="ph-getbox"><p className="ph-getbox-h">{GET.h[L]}</p><p><b>1</b>{GET.s1[L]}</p><p><b>2</b>{GET.s2[L]}</p><p><b>3</b>{GET.s3[L]}</p></div>
                    <dl className="ph-dl">
                        {real ? <>
                            <div><dt>{DETAIL.about[L]}</dt><dd>{real.about[L]}</dd></div>
                            <div><dt>{DETAIL.fromLabel[L]}</dt><dd><ul>{real.benefitsList.map((b, n) => <li key={n}>{b[L]}</li>)}</ul></dd></div>
                            {real.use[L] && <div><dt>{DETAIL.use[L]}</dt><dd>{real.use[L]}</dd></div>}
                            {real.warnings[L] && <div><dt>{DETAIL.warnings[L]}</dt><dd>{real.warnings[L]}</dd></div>}
                            <div><dt>{DETAIL.size[L]}</dt><dd>{real.size}</dd></div>
                            <div><dt>{DETAIL.ingredients[L]}</dt><dd>{DETAIL.ingNote[L]}</dd></div>
                        </> : <>
                        {pk && <div><dt>{PACKX.front[L]}</dt><dd dir="ltr">{pk.front}</dd></div>}
                        {pk?.lbl?.named && <div><dt>{PACKX.named[L]}</dt><dd dir="ltr">{pk.lbl.named}</dd></div>}
                        {pk?.lbl?.ing && <div><dt>{DETAIL.ingredients[L]}</dt><dd dir="ltr">{pk.lbl.ing}</dd></div>}
                        {pk?.lbl?.use && <div><dt>{DETAIL.use[L]}</dt><dd>{pk.lbl.use[L]}</dd></div>}
                        {pk?.lbl?.caution && <div><dt>{DETAIL.warnings[L]}</dt><dd>{pk.lbl.caution[L]}</dd></div>}
                        {FACTS[fam ? sid : p.id] ? <>
                            <div><dt>{MAKER.h[L]}</dt><dd>{FACTS[fam ? sid : p.id].t[LI[L]]}</dd></div>
                            <div><dt /><dd className="ph-soft">{FACTS[fam ? sid : p.id].m === 'exact' ? MAKER.note[L] : MAKER.rangeNote[L]}</dd></div>
                            {!pk && <div><dt>{DETAIL.photo[L]}</dt><dd className="ph-soft">{DETAIL.soon[L]}</dd></div>}
                        </> : (pk ? null : <div><dd className="ph-soft">{GET.more[L]}</dd></div>)}
                        </>}
                    </dl>
                    {real && <section className="ph-faq"><h2>{PDP.faqH[L]}</h2>{PDP.faq.map((f, n) => <details key={n}><summary>{f.q[L]}</summary><p>{f.a[L]}</p></details>)}</section>}
                    </>}
                </div>
            </div>
            <button type="button" className="ph-backlink ph-backlink-end" onClick={backToShop}>← {DETAIL.back[L]}</button>
        </div>;
    } else if (view.kind === 'list') {
        body = <div className="ph-wrap ph-narrow">
            <button type="button" className="ph-backlink" onClick={backToShop}>← {DETAIL.back[L]}</button>
            <h1 className="ph-h1">{UI.list[L]} <span className="ph-soft">{picked.length} {L === 'it' && picked.length === 1 ? 'prodotto' : UI.items[L]}</span></h1>
            {chosen.length === 0 ? <><p className="ph-soft">{UI.empty[L]}</p><button type="button" className="ph-sec" onClick={backToShop}>{DETAIL.back[L]}</button></> : <ul className="ph-lines">
                {chosen.map((i) => <li key={i.id}><div className="ph-linepic"><Pic id={i.id} /></div><button type="button" className="ph-linename" onClick={() => openItem(i.id)}>{i.names[L]}</button><button type="button" className="ph-remove" onClick={() => toggle(i.id)}>{UI.remove[L]}</button></li>)}
            </ul>}
            <label className="ph-field"><span>{UI.name[L]}</span><input value={guest} onChange={(e) => setGuest(e.target.value)} maxLength={60} /></label>
            <label className="ph-field"><span>{UI.time[L]}</span><input value={when} onChange={(e) => setWhen(e.target.value)} maxLength={40} /></label>
            <div className="ph-who" role="group" aria-label={EXP.who[L]}>
                <span>{EXP.who[L]}</span>
                <div>{(['me', 'gift'] as const).map((k) => <button key={k} type="button" aria-pressed={who === k} onClick={() => { setOpened(false); setWho(who === k ? '' : k); }}>{k === 'me' ? EXP.forMe[L] : EXP.forGift[L]}</button>)}</div>
            </div>
            <p className="ph-fine">{UI.privacy[L]}</p>
            <ol className="ph-flow">{FLOW.steps.map((s, n) => <li key={n}><span aria-hidden="true">{n + 1}</span>{s[L]}</li>)}</ol>
            <div className="ph-actions">
                {href && chosen.length > 0 ? <a className="ph-send" href={href} target="_blank" rel="noreferrer" onClick={() => setOpened(true)}>{UI.send[L]}</a> : <button type="button" className="ph-send" disabled>{UI.send[L]}</button>}
                {chosen.length > 0 && <CopyButton text={message} label={UI.copy[L]} variant="secondary" />}
            </div>
            <p className="ph-fine ph-note">{FLOW.note[L]}</p>
            {opened && chosen.length > 0 && <section className="ph-after" role="status">
                <h2>{FLOW.afterH[L]}</h2>
                <p>{FLOW.afterP[L]}</p>
                <div className="ph-actions">
                    {href && <a className="ph-send" href={href} target="_blank" rel="noreferrer">{FLOW.again[L]}</a>}
                    <button type="button" className="ph-sec" onClick={() => { setOpened(false); setView({ kind: 'shop' }); }}>{FLOW.browse[L]}</button>
                </div>
            </section>}
            <p className="ph-fine">{UI.msgOnly[L]}</p>
            <button type="button" className="ph-backlink ph-backlink-end" onClick={backToShop}>← {DETAIL.back[L]}</button>
        </div>;
    } else {
        body = <>
            <CleoJourney L={L} brand={PHARMACY_NAME} onCta={() => document.getElementById('ph-all')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} />
            <div className="ph-wrap">
            <ul className="ph-value">{POINTS.map((v, n) => <li key={n}><strong>{v.title[L]}</strong><span>{v.body[L]}</span></li>)}</ul>
            <section className="ph-sets" aria-label={SETS.h[L]}>
                <h2 className="ph-h2">{SETS.h[L]}</h2>
                <p className="ph-soft">{SETS.sub[L]}</p>
                <ul>{SETS.items.map((st) => { const all = st.ids.every((i) => picked.includes(i)); return <li key={st.id}><strong>{st.title[L]}</strong><span>{st.line[L]}</span><ul className="ph-setitems">{st.ids.map((i) => <li key={i}>{products.find((x) => x.id === i)!.names[L]}</li>)}</ul><button type="button" className="ph-sec" disabled={all} onClick={() => { setOpened(false); update((cur) => [...cur, ...st.ids.filter((i) => !cur.includes(i))]); }}>{all ? SETS.added[L] : SETS.add[L]}</button></li>; })}</ul>
            </section>
            <h2 className="ph-h2" id="ph-all">{HOME.find[L]}</h2>
            <div className="ph-cats" role="group">
                <button type="button" aria-pressed={cat === 'all'} onClick={() => { setCat('all'); setQ(''); }}>{DETAIL.all[L]}</button>
                {CATEGORIES.map((c) => <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => { setCat(c.id); setQ(''); }}>{c.name[L]}</button>)}
            </div>
            {shown.length === 0 ? <p className="ph-soft">{DETAIL.none[L]}</p> : <ul className="ph-grid">
                {shown.slice(0, lim).map((p) => {
                    const real = REAL[p.id];
                    return <li key={p.id} data-pid={p.id} className="ph-card">
                        <button type="button" className="ph-cardbtn" onClick={() => setView({ kind: 'item', id: p.id })}>
                            <Pic id={p.id} />
                            <span className={real ? 'ph-pill is-real' : 'ph-pill'}>{p.id === 'body-12' ? DETAIL.photo[L] : real ? (p.id === 'vatika-olive' ? PACKX.pillAi[L] : HOME.realTag[L]) : PACKS[p.id] ? ((PACKS[p.id].kind === 'ai' || DR_PHOTO_NEW.has(p.id)) ? PACKX.pillAi[L] : (PACKS[p.id].kind === 'own' || PACKS[p.id].kind === 'pk') ? PACKX.pill[L] : PACKX.pillRep[L]) : DETAIL.pending[L]}</span>
                            <span className="ph-brand">{real ? real.brand : CATEGORIES.find((c) => c.id === p.cat)!.name[L]}</span>
                            <span className="ph-cname">{FAM[p.id] ? FAM[p.id].title : p.names[L]}</span>
                            {FAM[p.id] && <span className="ph-cdesc">{SIZE_T.sizes[L]}: {FAM[p.id].sizes.map((s) => s.g).join(", ")}</span>}
                            {real && <span className="ph-cdesc">{real.desc[L]}</span>}
                        </button>
                        {FAM[p.id] ? <button type="button" className="ph-add" onClick={() => setView({ kind: 'item', id: p.id })}>{SIZE_T.pick[L]}</button> : <AddBtn id={p.id} />}
                    </li>;
                })}
            </ul>}
            {shown.length > lim && <button type="button" className="ph-sec ph-more" onClick={() => setLim(lim + 24)}>{HOME.more[L]} ({shown.length - lim})</button>}
            <section className="ph-howto">
                <figure className="ph-band">
                    <img src={beachBanner} alt="" loading="lazy" />
                    <figcaption><span>{JOURNEY.h[L]}</span><em>{HOME.illus[L]}</em></figcaption>
                </figure>
            </section>
            <section className="ph-ask">
                <h2>{JOURNEY.askH[L]}</h2>
                <p>{JOURNEY.askP[L]}</p>
                <p>{VISIT[L]}</p>
                <p>{MEDS[L]}</p>
                {PHARMACY_WHATSAPP && <a className="ph-hero-cta" href={`https://wa.me/${PHARMACY_WHATSAPP}`} target="_blank" rel="noreferrer">{JOURNEY.askCta[L]}</a>}
            </section>
            </div>
        </>;
    }
    return <div className="ph-root">{header}{body}{zoom && <PhotoViewer photos={zoom.photos} start={zoom.start} title={zoom.photos[0].alt} onClose={() => setZoom(null)} />}</div>;
}
