import { PHARMACY_WHATSAPP } from '../config';
import React, { useEffect, useRef } from 'react';
import { BODY } from './body';
import { T } from './strings';
import './landing.css';
import pack from '../photos/miswak-landing-pack.jpg';
import vEn from '../media/miswak-en.mp4';
import vDe from '../media/miswak-de.mp4';
import vPl from '../media/miswak-pl.mp4';
import vCs from '../media/miswak-cs.mp4';
import vNl from '../media/miswak-nl.mp4';
import vFr from '../media/miswak-fr.mp4';
import pEn from '../photos/miswak-poster-en.jpg';
import pDe from '../photos/miswak-poster-de.jpg';
import pPl from '../photos/miswak-poster-pl.jpg';
import pCs from '../photos/miswak-poster-cs.jpg';
import pNl from '../photos/miswak-poster-nl.jpg';
import vIt from '../media/miswak-it.mp4';
import pIt from '../photos/miswak-poster-it.jpg';
import pFr from '../photos/miswak-poster-fr.jpg';
const VID: Record<string, { v: string; p: string }> = { en: { v: vEn, p: pEn }, de: { v: vDe, p: pDe }, fr: { v: vFr, p: pFr }, nl: { v: vNl, p: pNl }, pl: { v: vPl, p: pPl }, cs: { v: vCs, p: pCs }, it: { v: vIt, p: pIt } };
const WA = PHARMACY_WHATSAPP;
const LN: Record<string, string> = { en: 'English', de: 'German', pl: 'Polish', cs: 'Czech', nl: 'Dutch', fr: 'French', it: 'Italian' };
const ERR: Record<string, string> = {
    en: 'Please add your name and WhatsApp number.',
    de: 'Bitte Name und WhatsApp-Nummer angeben.',
    pl: 'Podaj imię i numer WhatsApp.',
    cs: 'Doplňte prosím jméno a číslo WhatsApp.',
    nl: 'Vul je naam en WhatsApp-nummer in.',
    fr: 'Veuillez indiquer votre nom et votre numéro WhatsApp.',
    it: 'Inserisci il tuo nome e il numero WhatsApp.',
};
const HTML = BODY.replace('__PACK__', pack).replace('__POSTER__', pEn).replace('__VIDEO__', vEn);

export function MiswakLanding({ lang }: { lang: string }) {
    const l = T[lang] ? lang : 'en';
    const root = useRef<HTMLDivElement>(null);
    const val = (n: string) => (root.current!.querySelector(`[data-p=${n}]`) as HTMLInputElement).value.trim();
    const href = () => {
        const msg = ['Hello, I would like to request Dabur Miswak Original Herbal Toothpaste for pickup at the pharmacy (please confirm availability).', 'Name: ' + val('name'), 'WhatsApp: ' + val('wa'), val('when') ? 'Pickup time: ' + val('when') : '', 'Guest language: ' + LN[l]].filter(Boolean).join('\n');
        return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    };
    const refresh = () => {
        const r = root.current; if (!r) return;
        r.querySelectorAll<HTMLAnchorElement>('#cta,#bar').forEach((a) => { a.href = href(); });
    };
    useEffect(() => {
        const r = root.current!;
        r.querySelectorAll<HTMLElement>('[data-i]').forEach((e) => { e.textContent = T[l][e.dataset.i!]; });
        r.querySelectorAll<HTMLInputElement>('[data-p]').forEach((e) => { e.placeholder = T[l][e.dataset.p!]; });
        r.querySelectorAll<HTMLElement>('#lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === l)));
        const err = r.querySelector('#err') as HTMLElement;
        if (err.style.display !== 'none') err.textContent = ERR[l];
        const vid = r.querySelector('video') as HTMLVideoElement | null;
        if (vid && vid.dataset.l !== l) { vid.dataset.l = l; vid.pause(); vid.poster = VID[l].p; vid.src = VID[l].v; vid.load(); }
        r.setAttribute('lang', l);
        refresh();
    }, [l]);
    const onClick = (ev: React.MouseEvent) => {
        const t = ev.target as HTMLElement;
        const b = t.closest('#lang button') as HTMLElement | null;
        const a = t.closest('#cta,#bar') as HTMLAnchorElement | null;
        if (a) {
            const r = root.current!;
            const nm = r.querySelector('[data-p=name]') as HTMLInputElement, wa = r.querySelector('[data-p=wa]') as HTMLInputElement;
            const err = r.querySelector('#err') as HTMLElement;
            if (!nm.value.trim() || !wa.value.trim()) {
                ev.preventDefault();
                err.textContent = ERR[l]; err.style.display = 'block';
                (nm.value.trim() ? wa : nm).focus();
                r.querySelector('#rf')!.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else { err.style.display = 'none'; a.href = href(); }
        }
    };
    return <div className="mk" ref={root} onClick={onClick} onInput={refresh} onSubmit={(e) => e.preventDefault()} dangerouslySetInnerHTML={{ __html: HTML }} />;
}
