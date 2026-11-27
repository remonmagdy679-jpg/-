import { PHARMACY_WHATSAPP } from '../config';
import React, { useState } from 'react';
import { DATA } from './data';
import { SIZE_T, PACKX } from '../packs';
import './landing.css';
import evaPack from '../photos/eva-soft.jpg';
import naseemPack from '../photos/dr-naseem.jpg';
import honeyPack from '../photos/eva-honey.jpg';
import glycPack from '../photos/eva-glyc.jpg';
import yogPack from '../photos/eva-yog.jpg';
import wisalPack from '../photos/dr-wisal.jpg';
import lafliPack from '../photos/dr-lafli.jpg';
import escapePack from '../photos/dr-escape.jpg';
import floraPack from '../photos/dr-flora.jpg';
import dofPack from '../photos/dr-dof.jpg';
import kalimatPack from '../photos/dr-kalimat.jpg';
import shrutiPack from '../photos/dr-shruti.jpg';
import moonPack from '../photos/dr-moon.jpg';
import lotMocha from '../photos/lot-mocha.jpg';
import lotCoco from '../photos/lot-coco.jpg';
import lotBerry from '../photos/eva-berries-enhanced.jpg';
import lotPeach from '../photos/lot-peach.jpg';
import lotPassion from '../photos/eva-passion-ai.jpg';
import or_cyl from '../photos/orga-cyl.jpg';
import or_yel from '../photos/orga-yel.jpg';
import or_gold from '../photos/orga-gold.jpg';
import or_rsa from '../photos/orga-rsa.jpg';
import or_shea from '../photos/orga-shea.jpg';
import or_char from '../photos/orga-char.jpg';
import or_algae from '../photos/orga-algae.jpg';
import el_musk from '../photos/dr-musk.jpg';
import el_fantasy from '../photos/dr-fantasy.jpg';
import el_golden from '../photos/dr-golden.jpg';
import el_mixed from '../photos/dr-mixed.jpg';
import el_oudf from '../photos/dr-oud_blue.jpg';
import el_spirit from '../photos/dr-oud_spirit.jpg';
import el_khaligy from '../photos/dr-oud_khaligy.jpg';
import vatPack from '../photos/vatika-cream.jpg';

const WA = PHARMACY_WHATSAPP;
const LANGS = ['en', 'de', 'pl', 'cs', 'nl', 'fr', 'it'] as const;
type L = (typeof LANGS)[number];
const PACKS: Record<string, string | null> = { vatika: vatPack, musk: el_musk, fantasy: el_fantasy, golden: el_golden, mixed: el_mixed, oudf: el_oudf, spirit: el_spirit, khaligy: el_khaligy, secret: or_cyl, hyal: or_yel, gold: or_gold, algae: or_rsa, shea: or_shea, charcoal: or_char, redsea: or_algae, mocha: lotMocha, coconut: lotCoco, berries: lotBerry, peach: lotPeach, passion: lotPassion, eva: evaPack, naseem: naseemPack, trichup: null, honey: honeyPack, glyc: glycPack, yog: yogPack, wisal: wisalPack, lafli: lafliPack, escape: escapePack, flora: floraPack, dof: dofPack, kalimat: kalimatPack, shruti: shrutiPack, moon: moonPack };
const NAMES: Record<string, string> = { eva: 'Eva Soft Cream', naseem: 'Naseem Malaki', trichup: 'Trichup Black Seed' };
const ART: Record<string, string> = {
    eva: '<circle cx="86" cy="52" r="24" fill="none"/><path d="M40 108 Q70 92 100 108 T160 108 T220 108 T280 108" fill="none"/><path d="M40 126 Q70 110 100 126 T160 126 T220 126 T280 126" fill="none"/>',
    naseem: '<rect x="96" y="44" width="108" height="76" rx="10" fill="none"/><path d="M130 44 V30 H170 V44 M96 74 H204" fill="none"/>',
    trichup: '<circle cx="224" cy="48" r="22" fill="none"/><path d="M40 98 Q70 82 100 98 T160 98 T220 98 T280 98" fill="none"/><path d="M40 118 Q70 102 100 118 T160 118 T220 118 T280 118" fill="none"/>',
};
const ST: Record<string, string> = { a: '#a2562e' };
const FT = ['f1', 'f2', 'f3', 'f4'];
const ERR: Record<string, string> = {
    en: 'Please add your name and WhatsApp number.', de: 'Bitte Name und WhatsApp-Nummer angeben.', pl: 'Podaj imię i numer WhatsApp.',
    cs: 'Doplňte prosím jméno a číslo WhatsApp.', nl: 'Vul je naam en WhatsApp-nummer in.', fr: 'Veuillez indiquer votre nom et votre numéro WhatsApp.', it: 'Inserisci il tuo nome e il numero WhatsApp.',
};

export function Landing({ pid, lang: lang0, famTitle, sizes }: { pid: string; lang: string; famTitle?: string; sizes?: { g: string; id: string }[] }) {
    const [size, setSize] = useState('');
    const lang = (LANGS.includes(lang0 as L) ? lang0 : 'en') as L;
    const [name, setName] = useState('');
    const [wa, setWa] = useState('');
    const [when, setWhen] = useState('');
    const p = DATA.products[pid as 'eva'];
    const C = DATA.common[lang] as Record<string, string>;
    const T = { ...C, ...(p.T[lang] as Record<string, string>) };
    const msg = [`Hello, I would like to request ${sizes ? famTitle + ' ' + size.replace(' ', '') : p.req} for pickup at the pharmacy (please confirm availability).`, 'Name: ' + name.trim(), 'WhatsApp: ' + wa.trim(), when.trim() ? 'Pickup: ' + when.trim() : '', 'Guest language: ' + lang.toUpperCase()].filter(Boolean).join('\n');
    const href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    const pack = PACKS[pid];
    const old = p.v2 ? '' : pid;
    const [bad, setBad] = useState(false);
    const go = (e: React.MouseEvent) => { if (!name.trim() || !wa.trim() || (sizes && !size)) { e.preventDefault(); setBad(true); } else { setBad(false); } };
    return <div className="ld" lang={lang}>
        <div className="logo2">DR. CORNER</div>
        {old === 'eva' && <>
            <div className="ev-hero"><div className="ev-clock">21<span>:</span>40</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ev-intro">{T.intro}</div>
            <div className="ev-tl">{[['17:30', 1], ['19:00', 2], ['21:40', 3]].map(([t, n]) => <div className="ev-row" key={n}><div className="ev-t">{t}</div><div className="ev-b"><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="ev-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="ev-pack">{pack && <img src={pack} alt={T.prod} />}</div><p className="ev-d">{T.d}</p>
                <div className="ev-grid">{FT.map((f) => <div key={f}><b>{T[f + 't']}</b><span>{T[f + 'b']}</span></div>)}</div></div>
            <div className="ev-rit"><h3>{T.rit}</h3><div className="ev-cols">{[1, 2, 3].map((n) => <div key={n}><em>{n}</em><b>{T['r' + n + 't']}</b><span>{T['r' + n + 'b']}</span></div>)}</div></div>
        </>}
        {old === 'naseem' && <>
            <div className="nm-hero"><div className="nm-string" /><div className="nm-tag"><div className="nm-hole" /><div className="nm-k">DR. CORNER &middot; EGYPT</div><h1>{T.h1a}<i>{T.h1b}</i></h1></div>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="nm-list"><div className="nm-lt">{T.intro}</div>{[1, 2, 3].map((n) => <div className="nm-li" key={n}><div className="nm-box">{'\u2715'}</div><div><b>{T['p' + n]}</b><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="nm-rev"><div className="nm-photo">{pack && <img src={pack} alt={T.prod} />}</div><div className="nm-q"><em>{T.qt}</em><small>{T.qn}</small></div><div className="k">{T.meet}</div><h2>{T.prod}</h2><p className="nm-d">{T.d}</p>
                <div className="nm-pts">{FT.map((f) => <div key={f}><b>{T[f + 't']}</b><i /><span>{T[f + 'b']}</span></div>)}</div>
                <div className="nm-cmp"><h3>{T.cmpt}</h3><div className="nm-c2"><div className="a"><b>{T.cA}</b><span>{T.a1}</span><span>{T.a2}</span><span>{T.a3}</span></div><div className="b"><b>{T.cB}</b><span>{T.b1x}</span><span>{T.b2x}</span><span>{T.b3x}</span></div></div></div></div>
        </>}
        {old === 'trichup' && <>
            <div className="tr-hero"><div className="tr-q">Q.</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="tr-chat"><div className="tr-it">{T.intro}</div>{[1, 2, 3].map((n) => <div key={n}><div className="tr-me">{T['p' + n]}</div><div className="tr-us">{T['q' + n]}</div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="tr-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2>
                <div className="tr-card">{pack ? <img src={pack} alt={T.prod} /> : <div className="nopack"><b>Trichup</b><span>{T.desc}</span><small>{C.nop}</small></div>}</div>
                <div className="tr-chips"><span>{T.ch1}</span><span>{T.ch2}</span><span>{T.ch3}</span></div><p className="tr-d">{T.d}</p>
                <div className="tr-claim"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="tr-note">{T.f2t}: {T.f2b}</div></div>
            <div className="tr-rit"><h3>{T.rit}</h3>{[1, 2, 3].map((n) => <div className="tr-st" key={n}><em>{n}</em><div><b>{T['r' + n + 't']}</b><span>{T['r' + n + 'b']}</span></div></div>)}</div>
            <div className="tr-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'honey' && <>
            <div className="hn-hero"><div className="hn-hex" /><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="hn-intro">{T.intro}</div>
            <div className="hn-car">{[1, 2, 3].map((n) => <div className="hn-sc" key={n}><span>{T['tg' + n]}</span><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="hn-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="hn-disc">{pack && <img src={pack} alt={T.prod} />}</div><div className="hn-badge">{T.bd}</div><p className="hn-d">{T.d}</p>
                {[1, 2, 3, 4].map((n) => <div className="hn-pt" key={n}><i /><div><b>{T['f' + n + 't']}</b><span>{T['f' + n + 'b']}</span></div></div>)}</div>
            <div className="hn-rit"><h3>{T.rit}</h3><div>{[1, 2, 3].map((n) => <span key={n}><b>{T['r' + n + 't']}</b>{T['r' + n + 'b']}</span>)}</div></div>
        </>}
        {old === 'glyc' && <>
            <div className="gl-hero"><svg viewBox="0 0 60 80" width="64" height="86"><path d="M30 4 C30 4 8 34 8 52 a22 22 0 0 0 44 0 C52 34 30 4 30 4z" fill="none" stroke="#a2562e" strokeWidth="3" strokeLinejoin="round" /><path d="M20 54 a10 10 0 0 0 10 10" fill="none" stroke="#a2562e" strokeWidth="3" strokeLinecap="round" /></svg><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="gl-diary"><div className="gl-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'gl-pg g' + n} key={n}><div className="gl-day">{T['tg' + n]}</div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="gl-rev"><div className="gl-img">{pack && <img src={pack} alt={T.prod} />}<span>{T.bd}</span></div><div className="k">{T.meet}</div><h2>{T.prod}</h2><p className="gl-d">{T.d}</p>
                <div className="gl-grid">{[1, 2, 3, 4].map((n) => <div key={n}><b>{T['f' + n + 't']}</b><span>{T['f' + n + 'b']}</span></div>)}</div></div>
            <div className="gl-faq"><h3>{T.fq}</h3>{[1, 2, 3].map((n) => <details key={n}><summary>{T['fa' + n + 'q']}</summary><p>{T['fa' + n + 'a']}</p></details>)}</div>
        </>}
        {old === 'yog' && <>
            <div className="yg-hero"><div className="yg-bar"><i /></div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="yg-quiz"><div className="yg-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="yg-q" key={n}><div className="yg-chk">{'\u2713'}</div><div><b>{T['p' + n]}</b><p>{T['q' + n]}</p><em>{T.tg}</em></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="yg-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2>
                <div className="yg-split"><div className="a"><b>{T.yo}</b><span>{T.yob}</span></div><div className="yg-ph">{pack && <img src={pack} alt={T.prod} />}</div><div className="b"><b>{T.cu}</b><span>{T.cub}</span></div></div>
                <div className="yg-badge">{T.bd}</div><p className="yg-d">{T.d}</p>
                <div className="yg-pills">{[1, 2, 3, 4].map((n) => <div key={n}><b>{T['f' + n + 't']}</b><span>{T['f' + n + 'b']}</span></div>)}</div></div>
        </>}

        {old === 'wisal' && <>
            <div className="ws-hero"><div className="ws-ribbon" /><div className="ws-tag"><small>DR. CORNER</small><h1>{T.h1a}<i>{T.h1b}</i></h1></div>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ws-list"><div className="ws-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="ws-card" key={n}><span>{T['tg' + n]}</span><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="ws-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="ws-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="ws-d">{T.d}</p>
                <div className="ws-split"><div><b>{T.gv}</b><span>{T.gvb}</span></div><div><b>{T.kp}</b><span>{T.kpb}</span></div></div>
                <div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n === 1 ? 1 : n === 2 ? 2 : 4) + 't']}</b><span>{T['f' + (n === 1 ? 1 : n === 2 ? 2 : 4) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'lafli' && <>
            <div className="ln-hero"><div className="ln-num"><s>3</s><b>1</b></div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ln-list"><div className="ln-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="ln-st" key={n}><div className="ln-x">{'\u2715'}</div><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="ln-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="ln-ring"><div className="ln-ph">{pack && <img src={pack} alt={T.prod} />}</div><span>{T.one}</span></div><p className="ln-d">{T.d}</p>
                <div className="kh-pts ln-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div><div className="ln-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'escape' && <>
            <div className="es-hero"><div className="es-card"><div className="es-stamp"><span>{T.pm}</span></div><div className="es-k">{T.intro}</div><h1>{T.h1a}<i>{T.h1b}</i></h1><div className="es-lines"><i /><i /><i /></div></div>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="es-list">{[1, 2, 3].map((n) => <div className="es-it" key={n}><em>{n}</em><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="es-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="es-ph">{pack && <img src={pack} alt={T.prod} />}<i>{T.pm}</i></div><p className="es-d">{T.d}</p>
                <div className="es-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'flora' && <>
            <div className="fl-hero"><svg viewBox="0 0 320 60" width="100%" height="48"><path d="M0 30 Q40 6 80 30 T160 30 T240 30 T320 30" fill="none" stroke="#1f4d33" strokeWidth="2"/><path d="M0 46 Q40 22 80 46 T160 46 T240 46 T320 46" fill="none" stroke="#c9a24a" strokeWidth="2"/></svg><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="fl-steps"><div className="fl-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'fl-s s' + n} key={n}><div className="fl-dot">{n}</div><div><span>{T['tg' + n]}</span><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="fl-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="fl-ring">{pack && <img src={pack} alt={T.prod} />}</div><p className="fl-d">{T.d}</p><div className="fl-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div>
                <div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}

        {old === 'dof' && <>
            <div className="df-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="df-list"><div className="df-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="df-row" key={n}><div className="df-chk"><b>{'\u2713'}</b><span>{T.ok}</span></div><div><em>{T['tg' + n]}</em><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="df-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="df-ph">{pack && <img src={pack} alt={T.prod} />}<div className="df-rule"><i /><b>40 g</b><i /></div></div><p className="df-d">{T.d}</p>
                <div className="df-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'kalimat' && <>
            <div className="kl-hero"><div className="kl-ar" lang="ar" dir="rtl">{'\u0643\u0644\u0645\u0627\u062a'}</div><div className="kl-w">kalimat</div><div className="kl-t">{T.pos}</div><div className="kl-df">{'\u2014 '}{T.df}</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="kl-list"><div className="kl-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="kl-card" key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="kl-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="kl-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="kl-d">{T.d}</p>
                <div className="kl-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'shruti' && <>
            <div className="sr-hero"><div className="sr-mir"><h1>{T.h1a}<i>{T.h1b}</i></h1></div>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="sr-cmp"><div className="sr-it">{T.intro}</div><div className="sr-cols"><div className="sr-a"><b>{T.c1}</b><span>{T.a1}</span><span>{T.a2}</span><span>{T.a3}</span></div><div className="sr-b"><b>{T.c2}</b><span>{T.b1x}</span><span>{T.b2x}</span><span>{T.b3x}</span></div></div><div className="sr-p"><h3>{T.p1}</h3><p>{T.q1}</p></div></div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="sr-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="sr-shelf">{pack && <img src={pack} alt={T.prod} />}</div><p className="sr-d">{T.d}</p>
                <div className="sr-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'moon' && <>
            <div className="mn-hero"><div className="mn-moon" /><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="mn-list"><div className="mn-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="mn-ph" key={n}><div className={'mn-c c' + n} /><div><span>{T['tg' + n]}</span><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="mn-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="mn-halo">{pack && <img src={pack} alt={T.prod} />}</div><p className="mn-d">{T.d}</p>
                <div className="mn-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}

        {old === 'mocha' && <>
            <div className="lm-hero"><small>CAFÉ DR. CORNER</small><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="lm-menu"><h3>{T.intro}</h3>{[1, 2, 3].map((n) => <div className={'lm-it' + (n === 3 ? ' pick' : '')} key={n}><div className="lm-l"><b>{T['p' + n]}</b><i /></div><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev lm-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="lm-ph">{pack && <img src={pack} alt={T.prod} />}<span>{T.sc}</span></div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'coconut' && <>
            <div className="lc-hero"><div className="lc-tag">{T.pr}</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="lc-list"><div className="lc-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="lc-row" key={n}><span>{'\u25CB'}</span><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev lc-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="lc-ph">{pack && <img src={pack} alt={T.prod} />}</div><div className="lc-ticks"><div>{'\u2713'} {T.vg}</div><div>{'\u2713'} {T.f2t}</div></div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'berries' && <>
            <div className="lb-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="lb-plan"><div className="lb-it">{T.intro}</div><div className="lb-grid">{[1, 2, 3].map((n) => <div className={'lb-t t' + n} key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div></div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev lb-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="lb-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'peach' && <>
            <div className="lp-hero"><div className="lp-sun" /><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="lp-list"><div className="lp-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="lp-row" key={n}><em>{n}</em><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev lp-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="lp-ph">{pack && <img src={pack} alt={T.prod} />}<div className="lp-chips"><span>{T.f1t}</span><span>{T.f1b}</span></div></div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'passion' && <>
            <div className="lt-hero"><div className="lt-tube"><i /></div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="lt-list"><div className="lt-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="lt-row" key={n}><b>{n}</b><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev lt-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="lt-ph">{pack && <img src={pack} alt={T.prod} />}</div><div className="lt-ai"><span>{PACKX.pillAi[lang]}</span></div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'secret' && <>
            <div className="os-hero"><div className="os-seal">?</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="os-list"><div className="os-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="os-clue" key={n}><b>{n}</b><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev os-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'hyal' && <>
            <div className="oh-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="oh-list"><div className="oh-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'oh-bar b' + n} key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev oh-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'gold' && <>
            <div className="og-hero"><div className="og-frame"><small>24K</small><h1>{T.h1a}<i>{T.h1b}</i></h1></div>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="og-list"><div className="og-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="og-row" key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev og-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'algae' && <>
            <div className="oa-hero"><svg viewBox="0 0 320 50" width="100%" height="40"><path d="M0 25 Q40 5 80 25 T160 25 T240 25 T320 25" fill="none" stroke="#f6efe0" strokeWidth="2"/><path d="M0 40 Q40 20 80 40 T160 40 T240 40 T320 40" fill="none" stroke="#9fd3d6" strokeWidth="2"/></svg><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="oa-list"><div className="oa-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="oa-row" key={n}><span>{'\u223F'}</span><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev oa-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'shea' && <>
            <div className="oe-hero"><div className="oe-moon" /><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="oe-list"><div className="oe-it">{T.intro}</div><div className="oe-tl">{[1, 2, 3].map((n) => <div className="oe-row" key={n}><i /><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div></div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev oe-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'charcoal' && <>
            <div className="oc-hero"><div className="oc-dial"><b>10</b><span>{'\u2013'}15</span><small>min</small></div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="oc-list"><div className="oc-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="oc-row" key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev oc-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'redsea' && <>
            <div className="or-hero"><div className="or-strip">{[1, 2, 3, 4, 5].map((n) => <i key={n} />)}</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="or-list"><div className="or-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="or-row" key={n}><em>{n}</em><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev or-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {p.v2 && <>
            <div className={'v2-hero th' + p.v2}><div className="v2-mark" /><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className={'v2-cases th' + p.v2}><div className="v2-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'v2-case c' + n} key={n}><span>{T['c' + n + 'k']}</span><h3>{T['c' + n + 't']}</h3>{T['c' + n + 'c'] ? <p>{T['c' + n + 'c']}</p> : null}</div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev v2-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="v2-ph">{pack && <img src={pack} alt={T.prod} />}</div>{T.ai && <div className="lt-ai"><span>{PACKX.pillAi[lang]}</span></div>}<p className="lo-d">{T.d}</p>
                <div className="v2-why">{[1, 2, 3].map((n) => T['w' + n + 't'] ? <div key={n}><b>{T['w' + n + 't']}</b><span>{T['w' + n + 'b']}</span></div> : null)}</div></div>
            <div className="v2-gift"><b>{T.gt}</b><p>{T.gb}</p><em>{T.urg}</em></div>
            <div className="kh-faq"><h3>{T.fq}</h3>{[['u1q', 'u1a'], ['u2q', 'u2a'], ['hq', 'ha']].map(([q, a]) => T[q] ? <div key={q}><b>{T[q]}</b><span>{T[a]}</span></div> : null)}</div>
        </>}
        {old === 'vatika' && <>
            <div className="vk-hero"><div className="vk-dots"><i /><i /><i /></div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="vk-list"><div className="vk-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'vk-card c' + n} key={n}><span>{n}</span><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev vk-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><div className="lt-ai"><span>{PACKX.pillAi[lang]}</span></div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[2, 3, 4].map((n) => <div key={n}><b>{T['f' + n + 't']}</b><span>{T['f' + n + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'musk' && <>
            <div className="ek-hero"><div className="ek-sun" /><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ek-list"><div className="ek-it">{T.intro}</div><div className="ek-tl">{[1, 2, 3].map((n) => <div className="ek-row" key={n}><i /><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div></div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev musk-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'fantasy' && <>
            <div className="ef-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ef-list"><div className="ef-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'ef-card c' + n} key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev fantasy-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'golden' && <>
            <div className="eg-hero"><div className="eg-clock">18<span>:</span>30</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="eg-list"><div className="eg-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="eg-row" key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev golden-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'mixed' && <>
            <div className="em-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="em-list"><div className="em-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className={'em-row r' + n} key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev mixed-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'oudf' && <>
            <div className="eo-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="eo-list"><div className="eo-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="eo-row" key={n}><b>{n}</b><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev oudf-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'spirit' && <>
            <div className="ep-hero"><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ep-list"><div className="ep-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="ep-row" key={n}><span>{['\u25A0', '\u25A0', '\u25A0'][n - 1]}</span><div><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev spirit-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        {old === 'khaligy' && <>
            <div className="ek2-hero"><div className="ek2-ar" lang="ar" dir="rtl">{'\u062E\u0644\u064A\u062C\u064A'}</div><h1>{T.h1a}<i>{T.h1b}</i></h1>{T.sub ? <p className="sub">{T.sub}</p> : null}</div>
            <div className="ek2-list"><div className="ek2-it">{T.intro}</div>{[1, 2, 3].map((n) => <div className="ek2-row" key={n}><h3>{T['p' + n]}</h3><p>{T['q' + n]}</p></div>)}</div>
            <div className="bridge">{T.b1}<u>{T.b2}</u></div>
            <div className="lo-rev khaligy-rev"><div className="k">{T.meet}</div><h2>{T.prod}</h2><div className="or-ph">{pack && <img src={pack} alt={T.prod} />}</div><p className="lo-d">{T.d}</p>
                <div className="lo-fw"><b>{T.f1t}</b><span>{T.f1b}</span></div><div className="kh-pts">{[1, 2, 3].map((n) => <div key={n}><b>{T['f' + (n + 1) + 't']}</b><span>{T['f' + (n + 1) + 'b']}</span></div>)}</div></div>
            <div className="kh-faq"><h3>{T.fq}</h3><div><b>{T.fa1q}</b><span>{T.fa1a}</span></div><div><b>{T.fa2q}</b><span>{T.fa2a}</span></div></div>
        </>}
        <div className="how"><h3>{T.how}</h3>{[1, 2, 3].map((n) => <div className="st" key={n}><div className="n">{n}</div><div><b>{T['s' + n + 't']}</b><span>{T['s' + n + 'b']}</span></div></div>)}</div>
        <div className="trust">{T.trust}<small>{T.small}</small></div>
        <div className="act"><h2>{T.want}</h2><div className="form">
            {sizes && <div className="szs" role="group" aria-label={SIZE_T.sizes[lang as 'en']}><span>{SIZE_T.sizes[lang as 'en']}</span>{sizes.map((z) => <button key={z.id} type="button" aria-pressed={size === z.g} onClick={() => setSize(z.g)}>{z.g}</button>)}</div>}
            <input className="fld" type="text" placeholder={T.name} value={name} onChange={(e) => setName(e.target.value)} />
            <input className="fld" type="tel" placeholder={T.wa} value={wa} onChange={(e) => setWa(e.target.value)} />
            <input className="fld" type="text" placeholder={T.when} value={when} onChange={(e) => setWhen(e.target.value)} />
            <a className="cta" href={href} target="_blank" rel="noreferrer" onClick={go} style={{ display: 'block', textDecoration: 'none' }}>{T.btn}</a>
            {bad && <p role="alert" style={{ color: '#e5c26c', font: '600 13px Helvetica', marginTop: 10 }}>{sizes && !size ? SIZE_T.pick[lang as 'en'] : ERR[lang]}</p>}
            <p className="note">{T.note}</p></div></div>
        <div className="endlogo">DR. CORNER</div>
        <a className="bar" href={href} target="_blank" rel="noreferrer" onClick={go} style={{ display: 'block', textDecoration: 'none' }}>{T.btn}</a>
    </div>;
}

export { LANDING_IDS } from './ids';
