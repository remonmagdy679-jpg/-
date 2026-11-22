// Cleopatra's real motion: a frame sequence cut from the generated video clip.
//
// The clip is turned into frames by `npm run cleo:frames -- path/to/clip.mp4` (see scripts/cleo-frames.mjs).
// That writes into src/media/cleo/:
//   m/f001.webp ...   small portrait frames for phones
//   d/f001.webp ...   larger portrait frames for wide screens
//   poster-m.webp, poster-d.webp   the first frame, shown at once while the frames load
//   manifest.json     frame count, sizes, framing
//
// Until those files exist, the site shows the still portrait (src/photos/cleo-hero.jpg) and says so in the
// prototype note at the top of the page. Nothing here fakes motion on the still portrait.

export type CleoManifest = {
    frames: number;
    sets: { m: { w: number; h: number }; d: { w: number; h: number } };
    // Where to anchor the frame inside the arch when it has to be cropped (0..1, like CSS object-position).
    pos?: [number, number];
    // Optional scroll-to-clip map: [scroll progress 0..1, clip position 0..1] pairs. Default: straight line.
    scrub?: [number, number][];
    source?: string;
};

type Urls = Record<string, string>;
const mFiles = import.meta.glob('../media/cleo/m/*.webp', { eager: true, query: '?url', import: 'default' }) as Urls;
const dFiles = import.meta.glob('../media/cleo/d/*.webp', { eager: true, query: '?url', import: 'default' }) as Urls;
const posters = import.meta.glob('../media/cleo/poster-*.webp', { eager: true, query: '?url', import: 'default' }) as Urls;
const manifests = import.meta.glob('../media/cleo/manifest.json', { eager: true, import: 'default' }) as Record<string, CleoManifest>;

const ordered = (o: Urls) => Object.keys(o).sort().map((k) => o[k]);
const posterOf = (name: string) => Object.entries(posters).find(([k]) => k.endsWith(name))?.[1] || '';

export const CLEO = {
    m: ordered(mFiles),
    d: ordered(dFiles),
    posterM: posterOf('poster-m.webp'),
    posterD: posterOf('poster-d.webp'),
    manifest: (Object.values(manifests)[0] || null) as CleoManifest | null,
};

// True only when a real frame sequence of Cleopatra is in the project.
export const hasCleoMotion = CLEO.m.length > 1 && CLEO.d.length > 1 && CLEO.m.length === CLEO.d.length;

// Scroll progress (0..1) to clip position (0..1).
export function scrubToClip(p: number): number {
    const map = CLEO.manifest?.scrub;
    const x = Math.min(1, Math.max(0, p));
    if (!map || map.length < 2) return x;
    for (let i = 1; i < map.length; i++) {
        const [p0, c0] = map[i - 1]; const [p1, c1] = map[i];
        if (x <= p1) return p1 === p0 ? c1 : c0 + ((x - p0) / (p1 - p0)) * (c1 - c0);
    }
    return map[map.length - 1][1];
}

// Loads frames in passes (every 8th, then every 4th, 2nd, all), so motion works early and gets smoother.
// On "save data" connections only every 4th frame is loaded.
export class FrameSequence {
    readonly urls: string[];
    readonly imgs: (HTMLImageElement | null)[];
    private started = false;
    private stopped = false;
    onLoad: (() => void) | null = null;

    constructor(urls: string[]) { this.urls = urls; this.imgs = urls.map(() => null); }

    start() {
        if (this.started) return;
        this.started = true;
        const n = this.urls.length;
        const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        const strides = conn && conn.saveData ? [8, 4] : [8, 4, 2, 1];
        const order: number[] = [];
        const seen = new Set<number>();
        for (const s of strides) for (let i = 0; i < n; i += s) if (!seen.has(i)) { seen.add(i); order.push(i); }
        if (!seen.has(n - 1)) order.push(n - 1);
        let next = 0;
        const worker = async () => {
            while (!this.stopped && next < order.length) {
                const i = order[next++];
                const img = new Image();
                img.decoding = 'async';
                img.src = this.urls[i];
                try { await img.decode(); this.imgs[i] = img; this.onLoad?.(); } catch { /* skip a frame that fails */ }
            }
        };
        for (let w = 0; w < 4; w++) void worker();
    }

    stop() { this.stopped = true; }

    // The loaded frame closest to index i.
    nearest(i: number): number {
        if (this.imgs[i]) return i;
        for (let d = 1; d < this.imgs.length; d++) {
            if (i - d >= 0 && this.imgs[i - d]) return i - d;
            if (i + d < this.imgs.length && this.imgs[i + d]) return i + d;
        }
        return -1;
    }
}
