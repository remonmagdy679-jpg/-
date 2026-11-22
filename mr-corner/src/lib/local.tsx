import React, { useCallback, useEffect, useState } from 'react';

// Small local replacements for what the site needs: saved choices, a copy button and a photo viewer.

export function useLocalState<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void, { ready: boolean; saved: boolean }] {
    const [value, setValue] = useState<T>(() => {
        try { const raw = window.localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : initial; } catch { return initial; }
    });
    const [saved, setSaved] = useState(true);
    const set = useCallback((v: T | ((p: T) => T)) => {
        setValue((prev) => {
            const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
            try { window.localStorage.setItem(key, JSON.stringify(next)); setSaved(true); } catch { setSaved(false); }
            return next;
        });
    }, [key]);
    return [value, set, { ready: true, saved }];
}

export function CopyButton({ text, label, variant }: { text: string; label: string; variant?: 'secondary' }) {
    const [done, setDone] = useState(false);
    const copy = async () => {
        try { await navigator.clipboard.writeText(text); }
        catch {
            const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch { /* ignore */ }
            document.body.removeChild(ta);
        }
        setDone(true); window.setTimeout(() => setDone(false), 1800);
    };
    return <button type="button" className={`ph-copy${variant === 'secondary' ? ' is-secondary' : ''}`} onClick={copy}>{done ? '✓' : label}</button>;
}

export function PhotoViewer({ photos, start, title, onClose }: { photos: { src: string; alt: string }[]; start: number; title: string; onClose: () => void }) {
    const [i, setI] = useState(Math.min(start, photos.length - 1));
    useEffect(() => {
        const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setI((n) => Math.min(photos.length - 1, n + 1)); if (e.key === 'ArrowLeft') setI((n) => Math.max(0, n - 1)); };
        window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
    }, [onClose, photos.length]);
    const p = photos[i];
    return <div className="pv-back" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
        <button type="button" className="pv-close" aria-label="Close" onClick={onClose}>×</button>
        <img className="pv-img" src={p.src} alt={p.alt} onClick={(e) => e.stopPropagation()} />
        {photos.length > 1 && <div className="pv-nav" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Previous" disabled={i === 0} onClick={() => setI(i - 1)}>‹</button>
            <span>{i + 1} / {photos.length}</span>
            <button type="button" aria-label="Next" disabled={i === photos.length - 1} onClick={() => setI(i + 1)}>›</button>
        </div>}
    </div>;
}
