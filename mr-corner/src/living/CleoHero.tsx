import React, { useEffect, useRef, useState } from 'react';
import { HOME, type Lang } from '../data';
import { LIVE } from './text';
import clipUrl from '../media/cleo/clip.mp4';
import posterUrl from '../media/cleo/poster-m.webp';
import './cj.css';

const PLAY: Record<Lang, string> = {
    en: 'Tap to play', de: 'Zum Abspielen tippen', pl: 'Dotknij, aby odtworzyć', cs: 'Klepnutím přehrajete',
    nl: 'Tik om af te spelen', fr: 'Touchez pour lire', it: 'Tocca per avviare',
};

// Home page hero. Cleopatra's generated clip plays muted and inline as soon as the page opens (autoplay: it is the
// welcome), loops, and pauses while it is scrolled out of view. With "reduce motion" switched on it does not start by
// itself: the first frame is shown and the guest can tap to play. Below it: the welcome line, the four steps and the
// button to the catalogue.
export function CleoJourney({ L, brand, onCta }: { L: Lang; brand: string; onCta: () => void }) {
    const v = useRef<HTMLVideoElement>(null);
    const [still] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
    const [playing, setPlaying] = useState(!still);
    const autoPaused = useRef(false);

    useEffect(() => {
        const el = v.current; if (!el) return;
        el.muted = true;
        if (still) { el.pause(); return; }
        const start = () => { const p = el.play(); if (p && p.catch) p.catch(() => setPlaying(false)); };
        start();
        if (typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting && !el.paused) { autoPaused.current = true; el.pause(); }
            else if (e.isIntersecting && autoPaused.current) { autoPaused.current = false; start(); }
        }, { threshold: 0.15 });
        io.observe(el);
        return () => io.disconnect();
    }, [still]);

    const tap = () => { const el = v.current; if (!el) return; autoPaused.current = false; el.play().catch(() => setPlaying(false)); };

    return <section className="cj-hero" aria-label={HOME.heroTitle[L]}>
        <div className="cj-media">
            <video ref={v} className="cj-hero-vid" src={clipUrl} poster={posterUrl} muted loop playsInline autoPlay={!still} preload={still ? 'metadata' : 'auto'}
                aria-label={HOME.bannerAlt[L]}
                onPlaying={() => setPlaying(true)} onPause={() => { if (!autoPaused.current) setPlaying(false); }} />
            <span className="cj-hero-tag">{HOME.illus[L]}</span>
            {!playing && <button type="button" className="cj-playbtn" onClick={tap}>{PLAY[L]}</button>}
            <div className="cj-hero-txt"><h1>{brand}</h1></div>
        </div>
        <div className="cj-intro">
            <p className="cj-kicker">{HOME.heroKicker[L]}</p>
            <p className="cj-title">{HOME.heroTitle[L]}</p>
            <h2 className="cj-steps-h">{LIVE.stepsH[L]}</h2>
            <ol className="cj-steps">
                {LIVE.steps.map((s, i) => <li key={i}><span aria-hidden="true">{i + 1}</span><div><b>{s.word[L]}</b><p>{s.body[L]}</p></div></li>)}
            </ol>
            <a className="cj-start" href="#ph-all" onClick={(e) => { e.preventDefault(); onCta(); }}>{HOME.heroCta[L]}</a>
        </div>
    </section>;
}
