#!/usr/bin/env node
// Turns the Cleopatra video clip into the frame sequence the home page plays as you scroll.
//
//   npm run cleo:frames -- path/to/cleo-clip.mp4
//   npm run cleo:frames -- path/to/cleo-clip.mp4 --frames 120 --focus 0.72 --focus-y 0.35
//
// --frames   how many frames to keep (default 96; fewer = lighter page, more = smoother)
// --focus    where Cleopatra is across the video, 0 = left edge, 1 = right edge (default 0.72, as in cleo-hero.jpg)
// --focus-y  where her face is from the top, 0..1 (default 0.35)
//
// Needs ffmpeg and ffprobe on the computer. Writes src/media/cleo/ (frames for phones and wide screens,
// a poster of the first frame, and manifest.json). Then run `npm run build`: the site picks the frames up by itself.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const input = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const FRAMES = Math.max(24, Math.min(300, parseInt(flag('frames', '96'), 10) || 96));
const FX = Math.min(1, Math.max(0, parseFloat(flag('focus', '0.72'))));
const FY = Math.min(1, Math.max(0, parseFloat(flag('focus-y', '0.35'))));
const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'src', 'media', 'cleo');

const fail = (msg) => { console.error(`\n  ${msg}\n`); process.exit(1); };
if (!input) fail('Give the clip: npm run cleo:frames -- path/to/cleo-clip.mp4');
if (!fs.existsSync(input)) fail(`Clip not found: ${input}`);
const run = (cmd, a) => spawnSync(cmd, a, { encoding: 'utf8' });
if (run('ffmpeg', ['-version']).status !== 0 || run('ffprobe', ['-version']).status !== 0) fail('ffmpeg and ffprobe are needed. Install ffmpeg, then run this again.');

const probe = run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', input]);
if (probe.status !== 0) fail(`Could not read the clip: ${probe.stderr}`);
const info = JSON.parse(probe.stdout);
const W = info.streams?.[0]?.width; const H = info.streams?.[0]?.height; const dur = parseFloat(info.format?.duration);
if (!W || !H || !dur) fail('Could not read the size or length of the clip.');
if (dur < 4 || dur > 20) console.warn(`  Note: the clip is ${dur.toFixed(1)} s long; 5 to 15 s works best.`);

// A 3:4 portrait window around Cleopatra (the arch is portrait on every screen).
const even = (n) => Math.max(2, Math.floor(n / 2) * 2);
let cw, ch;
if (W / H > 0.75) { ch = even(H); cw = even(H * 0.75); } else { cw = even(W); ch = even(W / 0.75); }
const cx = Math.min(W - cw, Math.max(0, Math.round(FX * W - cw / 2)));
const cy = Math.min(H - ch, Math.max(0, Math.round(FY * H - ch / 2)));
const fps = FRAMES / dur;

fs.mkdirSync(OUT, { recursive: true });
const sets = {};
for (const [name, maxW, quality] of [['m', 600, 62], ['d', 900, 70]]) {
    const w = even(Math.min(maxW, cw)); const h = even((w * 4) / 3);
    const dir = path.join(OUT, name);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const vf = `fps=${fps.toFixed(6)},crop=${cw}:${ch}:${cx}:${cy},scale=${w}:${h}:flags=lanczos`;
    const r = run('ffmpeg', ['-v', 'error', '-y', '-i', input, '-vf', vf, '-frames:v', String(FRAMES), '-an', '-c:v', 'libwebp', '-quality', String(quality), '-compression_level', '5', '-preset', 'photo', path.join(dir, 'f%03d.webp')]);
    if (r.status !== 0) fail(`ffmpeg failed: ${r.stderr}`);
    fs.copyFileSync(path.join(dir, 'f001.webp'), path.join(OUT, `poster-${name}.webp`));
    sets[name] = { w, h, count: fs.readdirSync(dir).filter((f) => f.endsWith('.webp')).length };
}
const frames = Math.min(sets.m.count, sets.d.count);
const manifest = { frames, sets: { m: { w: sets.m.w, h: sets.m.h }, d: { w: sets.d.w, h: sets.d.h } }, pos: [0.5, 0.3], source: path.basename(input), focus: [FX, FY], made: new Date().toISOString().slice(0, 10) };
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const size = (d) => fs.readdirSync(d).reduce((t, f) => t + fs.statSync(path.join(d, f)).size, 0);
const mb = (b) => `${(b / 1048576).toFixed(1)} MB`;
console.log(`\n  Cleopatra frames ready: ${frames} frames from ${path.basename(input)} (${W}x${H}, ${dur.toFixed(1)} s)`);
console.log(`  phones: ${sets.m.w}x${sets.m.h}, ${mb(size(path.join(OUT, 'm')))}   wide screens: ${sets.d.w}x${sets.d.h}, ${mb(size(path.join(OUT, 'd')))}`);
console.log('  Each visitor loads only one of the two sets. Next: npm run build\n');
