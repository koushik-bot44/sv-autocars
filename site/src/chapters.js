// ============================================================
// chapters.js — the scroll choreography. One continuous camera
// take: studio → dark transit → engine bay → back to the car →
// paint / shield / interior / stance → pull-back → CTA.
// Left script animates Figma-style in sync with every shot.
// ============================================================
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS, PAINTS, LEDGER, BRAND, CRAFT } from './data.js';
import { CAR_SPACING } from './fleet.js';

gsap.registerPlugin(ScrollTrigger);

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- the route: each chapter parks the camera at a different car ----------
// Poses are car-local (nose +Z); `car` maps them to that car's parking spot
// on the avenue. `car: null` = absolute world coordinates.
const BAY = { x: -90, y: 1.15, z: 0 };
// Reel-style framing: tight, low, detail-first — like 4K car reels.
const RAW_POSES = {
  hero:   { car: 0, pos: [2.6, 8.4, 3.6],   look: [0, 0, 0.35],      fov: 34 }, // SF90, top-down
  heroB:  { car: 0, pos: [3.6, 4.6, 4.4],   look: [0, 0.4, 0.2],     fov: 36 },
  heart:  { car: null, pos: [BAY.x + 1.1, BAY.y + 0.5, 2.5], look: [BAY.x, BAY.y, BAY.z], fov: 44 },
  paint:  { car: 1, pos: [3.1, 0.72, 2.3],  look: [0.5, 0.55, 0.95], fov: 30 }, // Pista, low fender rake
  shield: { car: 2, pos: [1.9, 0.78, 2.7],  look: [0.42, 0.6, 1.35], fov: 27 }, // One:1, headlight macro
  inside: { car: 5, pos: [1.25, 2.5, 1.05], look: [0, 0.72, -0.1],   fov: 41 }, // Artura, cockpit dive
  stance: { car: 3, pos: [-2.6, 0.9, -3.3], look: [-0.35, 0.82, -0.95], fov: 31 }, // Vulcan, wing close
  ledger: { car: 6, pos: [4.6, 4.4, 5.2],   look: [0, 0.75, 0],      fov: 38 }, // G63, high hero
  book:   { car: 4, pos: [2.9, 0.62, 3.7],  look: [0, 0.55, 0.35],   fov: 33 }, // 600LT, low front 3/4
};
// movie-credits layout: these chapters put text on the RIGHT, so their
// shots are mirrored (car composes to the left of frame)
const RIGHT_SIDE = new Set(['paint', 'inside']);
const POSES = Object.fromEntries(
  Object.entries(RAW_POSES).map(([k, p]) => {
    const flip = RIGHT_SIDE.has(k) ? -1 : 1;
    const dx = p.car != null ? p.car * CAR_SPACING : 0;
    return [k, {
      pos: [p.pos[0] * flip + dx, p.pos[1], p.pos[2]],
      look: [p.look[0] * flip + dx, p.look[1], p.look[2]],
      fov: p.fov,
    }];
  })
);

export function buildChoreography({ camera, lights, showroom, engine, lenis }) {
  // ---------- inject chapter DOM ----------
  injectScripts();
  injectCraft();
  injectLedger();
  injectRail();
  wireContacts();

  // ---------- camera proxy ----------
  const p0 = POSES.hero;
  const cam = {
    px: p0.pos[0], py: p0.pos[1], pz: p0.pos[2],
    lx: p0.look[0], ly: p0.look[1], lz: p0.look[2],
    fov: p0.fov,
  };
  const project = new THREE.Vector3();
  const applyCam = (t = 0) => {
    const drift = REDUCED ? 0 : 1;
    camera.position.set(
      cam.px + Math.sin(t * 0.31) * 0.045 * drift,
      cam.py + Math.sin(t * 0.43) * 0.028 * drift,
      cam.pz + Math.cos(t * 0.27) * 0.045 * drift
    );
    camera.lookAt(cam.lx, cam.ly, cam.lz);
    if (Math.abs(camera.fov - cam.fov) > 0.01) {
      camera.fov = cam.fov;
      camera.updateProjectionMatrix();
    }
  };
  applyCam(0);

  // ---------- one continuous take: chain pose→pose per section ----------
  // Between two cars the camera pulls wide and TRACKS along the avenue —
  // the current car rolls out of frame while the next rolls in (the oryzo
  // page-to-page travel). Off-avenue poses (engine bay) skip the tracking.
  const onAvenue = (p) => p.look[0] > -5;
  const chain = [
    ['#hero', POSES.hero, POSES.heroB],
    ['#heart', POSES.heroB, POSES.heart],
    ['#paint', POSES.heart, POSES.paint],
    ['#shield', POSES.paint, POSES.shield],
    ['#inside', POSES.shield, POSES.inside],
    ['#stance', POSES.inside, POSES.stance],
    ['#ledger', POSES.stance, POSES.ledger],
    ['#book', POSES.ledger, POSES.book],
  ];
  const poseVars = (p, extra = {}) => ({
    px: p.pos[0], py: p.pos[1], pz: p.pos[2],
    lx: p.look[0], ly: p.look[1], lz: p.look[2], fov: p.fov,
    ...extra,
  });
  for (const [sel, from, to] of chain) {
    const travel =
      onAvenue(from) && onAvenue(to) && Math.abs(to.look[0] - from.look[0]) > CAR_SPACING * 0.6;
    const st = {
      trigger: sel,
      start: 'top top',
      end: '+=60%',
      scrub: REDUCED ? true : 0.9,
    };
    if (travel) {
      const midX = (from.look[0] + to.look[0]) / 2;
      const mid = { pos: [midX, 1.7, 10.5], look: [midX, 0.6, 0], fov: 42 };
      gsap.timeline({ scrollTrigger: st })
        .set(cam, poseVars(from))
        .to(cam, poseVars(mid, { duration: 0.55, ease: 'power1.inOut' }))
        .to(cam, poseVars(to, { duration: 0.45, ease: 'power2.out' }));
    } else {
      gsap.fromTo(cam, poseVars(from), {
        ...poseVars(to),
        ease: 'power2.inOut',
        immediateRender: false,
        scrollTrigger: st,
      });
    }
  }

  // ---------- CH.01: engine assembly + power reveal ----------
  ScrollTrigger.create({
    trigger: '#heart',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      // 0–26%: camera still in transit, hold the exploded cloud
      if (p < 0.26) {
        engine.setAssembly(0);
        engine.state.running = 0;
      } else if (p < 0.74) {
        engine.setAssembly(gsap.utils.clamp(0, 1, (p - 0.26) / 0.48));
        engine.state.running = 0;
      } else {
        engine.setAssembly(1);
        engine.state.running = gsap.utils.clamp(0, 1, (p - 0.74) / 0.2);
      }
    },
  });
  // The birth of the amber accent — the whole site "switches on" here.
  ScrollTrigger.create({
    trigger: '#heart',
    start: '76% top',
    onEnter: () => ignite(true, lights),
    onLeaveBack: () => ignite(false, lights),
  });

  // ---------- background lines breathe with the scroll ----------
  gsap.to('#bg-lines', {
    yPercent: -7,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.4 },
  });

  // ---------- script block enter/exit (Figma smart-animate feel) ----------
  document.querySelectorAll('.script').forEach((block) => {
    const label = block.querySelector('.label');
    const words = block.querySelectorAll('h2 .w');
    const body = block.querySelector('.body');
    const items = block.querySelectorAll('.services li');
    const chip = block.querySelector('.chip');
    const targets = [body, chip].filter(Boolean);

    gsap.set(words, { yPercent: 120, opacity: 0 });
    gsap.set(targets, { y: 26, opacity: 0 });
    gsap.set(items, { x: -18, opacity: 0 });

    const chapterEl = block.closest('.chapter');
    const side = chapterEl.classList.contains('side-right') ? 'right' : 'left';
    ScrollTrigger.create({
      trigger: chapterEl,
      start: 'top 8%',
      end: 'bottom 60%',
      onEnter: () => { document.body.dataset.side = side; enterTl(); },
      onEnterBack: () => { document.body.dataset.side = side; enterTl(); },
      onLeave: () => exitTl(),
      onLeaveBack: () => exitTl(),
    });

    function enterTl() {
      if (label) scramble(label, label.dataset.text);
      gsap.timeline()
        .to(words, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: 'power4.out' }, 0.05)
        .to(targets, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.25)
        .to(items, { x: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 0.35);
    }
    function exitTl() {
      gsap.to([words, ...targets, ...items], {
        opacity: 0, y: -18, duration: 0.35, ease: 'power2.in', overwrite: 'auto',
        onComplete: () => gsap.set(words, { yPercent: 120, y: 0 }),
      });
    }
  });

  // ---------- ledger rows + craft cards reveal ----------
  gsap.set('.ledger-row', { opacity: 0, y: 24 });
  ScrollTrigger.batch('.ledger-row', {
    start: 'top 85%',
    onEnter: (rows) =>
      gsap.to(rows, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', overwrite: true }),
  });
  // oryzo-style sliding boxes — cards glide in from the side
  gsap.set('.craft-card', { opacity: 0, x: 140 });
  ScrollTrigger.batch('.craft-card', {
    start: 'top 88%',
    onEnter: (cards) =>
      gsap.to(cards, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', overwrite: true }),
  });

  // ---------- per-chapter fixed overlays: giant back-word, footnote, frame ----------
  const giant = document.getElementById('giant-back');
  const note = document.getElementById('footnote');
  const frame = document.getElementById('tech-frame');
  const OVERLAYS = [
    ['#hero',   { note: '* ACTUAL 3D MODEL — SPIN IT WITH YOUR SCROLL' }],
    ['#heart',  { note: '* REAL PARTS. REAL TORQUE SPECS.' }],
    ['#paint',  { giant: 'repaint.', note: '* LEVELED. POLISHED. CURED. REPEATED.' }],
    ['#shield', { frame: true, note: '* SELF-HEALING FILM. YES, REALLY.' }],
    ['#inside', { note: '* SMELLS LIKE NEW. THAT IS THE POINT.' }],
    ['#stance', { giant: 'planted.', note: '* TORQUED TO SPEC, NOT TO FEEL' }],
    ['#book',   { note: '* SITE BY SAI · CAR BY YOU' }],
  ];
  for (const [sel, cfg] of OVERLAYS) {
    ScrollTrigger.create({
      trigger: sel,
      start: 'top 40%',
      end: 'bottom 60%',
      onToggle: (self) => {
        if (self.isActive) {
          if (cfg.giant) giant.textContent = cfg.giant;
          gsap.to(giant, { opacity: cfg.giant ? 0.08 : 0, duration: 0.7 });
          if (cfg.note) note.textContent = cfg.note;
          gsap.to(note, { opacity: cfg.note ? 1 : 0, duration: 0.6 });
          gsap.to(frame, { opacity: cfg.frame ? 1 : 0, duration: 0.6 });
        }
      },
      onUpdate: (self) => {
        if (cfg.giant && self.isActive) {
          gsap.set(giant, { x: (self.progress - 0.5) * -120 });
        }
      },
    });
  }
  ScrollTrigger.create({
    trigger: '#ledger',
    start: 'top 60%',
    onEnter: () => {
      gsap.to([giant, note, frame], { opacity: 0, duration: 0.4 });
    },
  });

  // ---------- rail active state ----------
  const dots = [...document.querySelectorAll('#rail .dot')];
  chain.forEach(([sel], idx) => {
    ScrollTrigger.create({
      trigger: sel,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => self.isActive && dots.forEach((d, i) => d.classList.toggle('active', i === idx)),
    });
  });

  // ---------- nav anchors through lenis ----------
  document.querySelectorAll('#nav a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target && lenis) lenis.scrollTo(target, { duration: 1.6 });
      else target?.scrollIntoView();
    });
  });

  return { cam, applyCam };
}

// ============================================================
// helpers
// ============================================================
function ignite(on, lights) {
  document.body.dataset.ignited = on ? '1' : '0';
  gsap.to(lights.amber, { intensity: on ? 130 : 0, duration: 1.4, ease: 'power2.out' });
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/·';
function scramble(el, finalText, dur = 0.7) {
  const proxy = { p: 0 };
  gsap.to(proxy, {
    p: 1, duration: dur, ease: 'none',
    onUpdate: () => {
      const n = finalText.length;
      const reveal = Math.floor(proxy.p * n);
      let out = finalText.slice(0, reveal);
      for (let i = reveal; i < n; i++) {
        const c = finalText[i];
        out += c === ' ' ? ' ' : GLYPHS[(i * 7 + Math.floor(proxy.p * 40) * 3) % GLYPHS.length];
      }
      el.textContent = out;
    },
  });
}

function injectScripts() {
  const RIGHT = new Set(['paint', 'inside']);
  for (const [i, ch] of CHAPTERS.entries()) {
    const section = document.getElementById(ch.id);
    if (!section) continue;
    if (RIGHT.has(ch.id)) section.classList.add('side-right');
    const wordList = ch.headline.split(' ');
    const words = wordList
      .map((w, wi) => {
        // CH.01: the last word stays blurred until the engine ignites
        const blur = ch.id === 'heart' && wi === wordList.length - 1 ? ' w-blur' : '';
        return `<span class="w${blur}">${w}</span>`;
      })
      .join(' ');
    section.insertAdjacentHTML(
      'afterbegin',
      `<div class="script">
         <div class="label mono" data-text="${ch.label}">${ch.label}</div>
         <h2>${words}</h2>
         <p class="body">${ch.body}</p>
         <ul class="services">${ch.services.map((s) => `<li>${s}</li>`).join('')}</ul>
         <div class="chip">${ch.proof}</div>
       </div>
       <div class="watermark" aria-hidden="true">0${i + 1}</div>`
    );
  }
}

function injectCraft() {
  const grid = document.querySelector('.craft-grid');
  grid.innerHTML = CRAFT.map(
    (c) => `<article class="craft-card">
      <div class="craft-media">
        ${c.img ? `<img src="${c.img}" alt="${c.title}" loading="lazy" />` : `<span class="drop-hint">PHOTO SLOT — ${c.tag}</span>`}
      </div>
      <div class="craft-body">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <span class="tag">${c.tag}</span>
      </div>
    </article>`
  ).join('');
}

function injectLedger() {
  const wrap = document.querySelector('.ledger-rows');
  wrap.innerHTML = LEDGER.map(
    (r) => `<div class="ledger-row">
      <div class="ledger-car">${r.car}</div>
      <div class="ledger-job">${r.job}</div>
      <div class="ledger-tag">${r.tag}</div>
    </div>`
  ).join('');
}

function injectPaintChips(showroom) {
  const PAINT_CAR = 1; // CH.02 paints the 488 Pista
  const wrap = document.querySelector('.paint-chips');
  wrap.innerHTML = PAINTS.map(
    (p) =>
      `<button class="paint-chip" style="background:${p.ui}" aria-label="Paint: ${p.name}">
         <span class="tip">${p.name}</span>
       </button>`
  ).join('');
  const chips = [...wrap.querySelectorAll('.paint-chip')];
  chips.forEach((chip, i) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const target = new THREE.Color(PAINTS[i].hex);
      const car = showroom.cars[PAINT_CAR];
      if (!car) return;
      for (const m of car.paintMats) {
        gsap.to(m.color, {
          r: target.r, g: target.g, b: target.b,
          duration: 0.9, ease: 'power2.inOut',
        });
      }
    });
  });
}

function injectRail() {
  const rail = document.getElementById('rail');
  rail.innerHTML = Array.from({ length: 8 }, () => '<div class="dot"></div>').join('');
}

function wireContacts() {
  document.getElementById('wa-link').href = BRAND.whatsapp;
  document.getElementById('call-link').href = `tel:${BRAND.phonePrimary}`;
}
