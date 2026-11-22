import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import still from '../photos/cleo-hero.jpg';
import { CLEO, FrameSequence, hasCleoMotion, scrubToClip } from './frames';

export type CleoHandle = {
    // Show the frame that belongs to this point of the journey (0 = welcome, 1 = pick up).
    show: (progress: number) => void;
    // Start loading the frames (called once the first screen is up).
    load: () => void;
};

const isWide = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches;

// Cleopatra inside the arch. With a frame sequence in src/media/cleo she moves with the scroll (real motion,
// drawn on a canvas over a poster of the first frame). Without it she is the still portrait, shown as a still:
// no zoom, drift or wobble is added to pretend she moves.
export const CleoMotion = forwardRef<CleoHandle, { alt: string }>(function CleoMotion({ alt }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const seqRef = useRef<FrameSequence | null>(null);
    const want = useRef(0);
    const drawn = useRef(-1);
    const wide = useRef(isWide());
    const pos = CLEO.manifest?.pos || [0.5, 0.3];
    const poster = hasCleoMotion ? (wide.current ? CLEO.posterD : CLEO.posterM) || CLEO.posterM || still : still;

    const paint = () => {
        const c = canvasRef.current; const seq = seqRef.current;
        if (!c || !seq || !c.width) return;
        const i = seq.nearest(want.current);
        if (i < 0 || i === drawn.current) return;
        const img = seq.imgs[i]; const ctx = c.getContext('2d');
        if (!img || !ctx) return;
        const cw = c.width; const ch = c.height; const iw = img.naturalWidth; const ih = img.naturalHeight;
        const s = Math.max(cw / iw, ch / ih); const dw = iw * s; const dh = ih * s;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - dw) * pos[0], (ch - dh) * pos[1], dw, dh);
        drawn.current = i;
        c.dataset.frame = String(i);
    };

    useEffect(() => {
        if (!hasCleoMotion) return;
        const c = canvasRef.current; if (!c) return;
        const seq = new FrameSequence(wide.current ? CLEO.d : CLEO.m);
        seq.onLoad = paint;
        seqRef.current = seq;
        const fit = () => {
            const r = c.getBoundingClientRect(); if (!r.width || !r.height) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const set = CLEO.manifest?.sets[wide.current ? 'd' : 'm'];
            const w = Math.max(1, Math.min(Math.round(r.width * dpr), set ? set.w : 900));
            c.width = w; c.height = Math.round((w * r.height) / r.width);
            drawn.current = -1; paint();
        };
        fit();
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
        ro?.observe(c);
        return () => { seq.stop(); ro?.disconnect(); seqRef.current = null; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
        show(p: number) {
            const seq = seqRef.current; if (!seq) return;
            want.current = Math.round(scrubToClip(p) * (seq.urls.length - 1));
            paint();
        },
        load() { seqRef.current?.start(); },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    return <>
        <img className={hasCleoMotion ? 'lv-poster' : 'lv-poster is-still'} src={poster} alt={alt}
            style={hasCleoMotion ? { objectPosition: `${pos[0] * 100}% ${pos[1] * 100}%` } : undefined} />
        {hasCleoMotion && <canvas ref={canvasRef} className="lv-canvas" aria-hidden="true" />}
    </>;
});
