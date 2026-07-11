// ============================================================
// main.js — boot: preloader with real decode progress, Lenis +
// GSAP single-rAF wiring (ASSET-PLAYBOOK §7), then choreography.
// ============================================================
import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createStage, IS_MOBILE } from './stage.js';
import { createShowroom } from './fleet.js';
import { loadEngine } from './engine3d.js';
import { buildChoreography } from './chapters.js';

gsap.registerPlugin(ScrollTrigger);
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// always start the experience at the top — no browser scroll restoration
history.scrollRestoration = 'manual';
scrollTo(0, 0);

const canvas = document.getElementById('stage');
const { renderer, scene, camera, lights } = createStage(canvas);

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);

// ---------- preloader with real byte progress ----------
const pctEl = document.querySelector('.pre-pct');
const arc = document.querySelector('.tach-fill');
const ARC_LEN = 227;
const progress = { car: 0, engine: 0 };
function updatePreloader() {
  const p = progress.car * 0.78 + progress.engine * 0.22;
  pctEl.textContent = `${Math.round(p * 100)}%`;
  arc.style.strokeDashoffset = String(ARC_LEN * (1 - p));
}

function withProgress(promiseFactory, key) {
  return promiseFactory((ev) => {
    if (ev.total) progress[key] = ev.loaded / ev.total;
    else progress[key] = Math.min(progress[key] + 0.06, 0.95);
    updatePreloader();
  }).then((r) => {
    progress[key] = 1;
    updatePreloader();
    return r;
  });
}

// BASE_URL is '/' in dev, '/sv-autocars/' on GitHub Pages
const BASE = import.meta.env.BASE_URL;
const showroom = createShowroom(loader, scene);

Promise.all([
  withProgress(
    (cb) => showroom.loadAll((f) => cb({ loaded: f, total: 1 })),
    'car'
  ),
  withProgress(
    (cb) => new Promise((res, rej) => loader.load(BASE + 'models/engine-v6.glb', res, cb, rej)),
    'engine'
  ),
])
  .then(async ([, engineGltf]) => {
    const engine = await loadEngine({ loadAsync: async () => engineGltf }, scene);
    start(showroom, engine);
  })
  .catch((err) => {
    console.error('[SV] asset load failed', err);
    pctEl.textContent = 'LOAD ERROR — CHECK CONSOLE';
  });

// ---------- boot after load ----------
function start(showroom, engine) {
  // Lenis + GSAP: ONE rAF loop (two loops = the #1 cause of jitter).
  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({ lerp: 0.09, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
  }

  const choreo = buildChoreography({ camera, lights, showroom, engine, lenis });

  gsap.ticker.add((time) => {
    if (lenis) lenis.raf(time * 1000);
    engine.tick(time);
    choreo.applyCam(time);
    renderer.render(scene, camera);
  });
  gsap.ticker.lagSmoothing(0);

  // preloader exit → hero entrance
  const pre = document.getElementById('preloader');
  gsap
    .timeline({ delay: 0.25 })
    .to(arc, { strokeDashoffset: 0, duration: 0.35, ease: 'power1.in' })
    .to(pre, { opacity: 0, duration: 0.8, ease: 'power2.inOut' })
    .set(pre, { display: 'none' })
    .from('.kicker', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
    .from('.hero-title .line', { yPercent: 110, duration: 0.9, stagger: 0.09, ease: 'power4.out' }, '-=0.45')
    .from('.hero-sub, .hero-card, .scroll-cue', { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, '-=0.4')
    .from('#nav, .side-tab', { opacity: 0, y: -12, duration: 0.5 }, '-=0.5');

  ScrollTrigger.refresh();

  // ---------- debug hooks (only with ?debug) ----------
  if (location.search.includes('debug')) {
    window.__three = { scene, camera, showroom, choreo, gsap, ScrollTrigger };
    window.__cam = (px, py, pz, lx, ly, lz, fov) => {
      Object.assign(choreo.cam, { px, py, pz, lx, ly, lz, ...(fov ? { fov } : {}) });
    };
  }
}
