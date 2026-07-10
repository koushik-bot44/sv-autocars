# SV AUTO CARS — Asset Generation Playbook (v2 · THE BUILD)

Every prompt, command, and wiring snippet for the one-car build experience. Companion to [PLAN.md](./PLAN.md).

**The golden rule (from the ayzz.thedesigner McLaren reel):** generate ONE master still, approve it, then derive everything else from it. For video: *"the camera stays exactly the same, only X moves."* Never describe the car from scratch twice.

**The v2 rule (THE BUILD):** the whole site is one car assembled across ~9 stages. Consistency comes from a **locked camera** + a **backward edit chain**: un-build the finished car image step by step with an editing model, then bridge neighbor states with first-frame→last-frame video. Stills are cheap — approve the full chain before spending a single Veo credit.

---

## 1. Tool lineup (free tiers, verified July 2026 — re-check at build time)

| Tool | Free allowance | Use for |
|---|---|---|
| **Reve** (app.reve.com) | ~100 credits at signup, ~20 gen/day | The master still — best photoreal product shots, 4K on Reve 2.0 |
| **Gemini "Nano Banana" (Imagen)** | ~20 images/day | **The state-still chain** — it's an editing model: "same car, same camera, remove the body panels." The consistency workhorse |
| **Leonardo.ai** | 150 tokens/day | Volume filler, parallax layers |
| **Google Flow / Veo 3.1** | ~10 clips/mo free; AI Pro ≈ ₹1,650/mo ≈ 1000 credits (student/promo often free in India) | Bridge clips: **Frames-to-Video** (first frame = state N, last = state N+1), Extend, Ingredients |
| **Upscayl** (local, free, unlimited) | — | Upscale 720p Veo frames after extraction |
| **Freesound.org (CC0) / Pixabay** | — | Engine idle, rumble ambience, UI ticks, torque-wrench clicks |

---

## 2. Step 1 — The master still (Reve)

> A pristine dark grey luxury sedan photographed in a pitch-black photography studio, dramatic white rim lighting outlining the body lines, soft overhead softbox reflection stretched across the roof and hood, glossy black floor with a subtle mirror reflection, pure black background, ultra-detailed automotive advertising photography, 8k, shot on medium format, front three-quarter angle, entire car fully in frame with generous space around it.

Requirements before approving: full car in frame (parts must have room to fly in/out) · camera height ~chest level · nothing cropped. This one image is the anchor of the entire site — iterate until it's perfect.

## 2.5 Step 2 — The state-still chain (Nano Banana edits, run in this order)

Each edit uses the PREVIOUS output as input. Same car, same camera, one change per step. Save as `state-08.png` … `state-01.png`.

| State | Edit prompt (prefix each with: "Same exact car, same exact camera angle and studio lighting, change only this:") |
|---|---|
| 08 · final beauty | *(the approved master still — no edit)* |
| 07 · before coating | "make the paint slightly less glossy, remove the mirror-like reflections, a fine layer of dust on the lower panels" |
| 06 · before PPF/paint | "the car body is now unpainted primer grey, matte finish, panel lines visible" |
| 05 · panels loose | "the hood, front doors and fenders are detached and floating slightly away from the body, gaps showing the frame beneath" |
| 04 · body off | "remove all body panels — only the bare metal frame, engine bay with visible engine, and cabin skeleton remain" |
| 03 · running gear | "the rolling chassis: frame with engine, suspension struts, brake discs visible, no wheels, on a lift" |
| 02 · engine in | "bare chassis frame with only the engine block installed in the engine bay, nothing else attached" |
| 01 · bare skeleton | "only the bare chassis frame floating just above the glossy black floor, no engine, no panels, no wheels" |

Also derive (from state 08):
- **Paint variants (S5 color changer):** "Same exact car and studio, the body paint is now deep candy red / midnight blue / gunmetal grey / pearl white — everything else unchanged"
- **Wheels-off variant (S9):** "remove the wheels; the refinished alloy wheels lean against the floor beside the car, rim light catching the spokes"
- **Interior key still (S8):** "view through the open driver window into a luxurious leather interior, warm ambient lighting, stitched dashboard and steering wheel"

If a step drifts (different car/angle), re-run the edit — never accept drift; every later stage inherits it.

## 3. Step 3 — Bridge clips (Flow / Veo, Frames-to-Video)

Template — first frame = `state-0N`, last frame = `state-0N+1`:
> Black photography studio, camera completely locked off, no camera movement. [STAGE ACTION]. The parts move with smooth, precise, elegant motion like a luxury watch advertisement. No cuts, 8 seconds.

| Bridge | STAGE ACTION |
|---|---|
| S1→S2 (engine) | "Engine components float in from the darkness — pistons, crankshaft, valve covers — converge mid-air, assemble into a complete engine and lower into the chassis frame" |
| S2 idle loop | *(image-to-video from state-02, same image as first AND last frame)* "The installed engine runs in place: pistons cycle rhythmically, crankshaft rotating at constant speed, subtle vibration. Motion returns exactly to its starting position for a seamless loop" |
| S2→S3 (running gear) | "Suspension struts, brake discs and calipers glide in from the sides and bolt onto the chassis one by one" |
| S3→S4→S5 (body) | "Body panels — doors, hood, fenders — sweep in from the darkness and attach to the frame, forming a complete car body in primer grey" |
| S5 (paint sweep) | "Glossy deep grey paint flows across the primer body from front to rear like liquid, leaving a perfect mirror finish" |
| S6 (PPF — white) | Separate white-studio macro: "Clinical pure white studio: transparent protection film wraps over glossy paint panel by panel; a thin scratch appears, then slowly heals itself until flawless. Camera locked off, high-key lighting" |
| S7 (coating loop) | "Slow motion: water droplets bead and roll off the glossy coated fender, catching the rim light. Camera locked. Seamless loop" |
| S8 (interior dive) | *(one of only two camera moves)* "One continuous shot: the camera glides through the open driver window into the leather interior, warm light rising, settling on the stitched dashboard" |
| S9 (wheels) | "Four gleaming alloy wheels roll in from the darkness and mount onto the hubs one by one; the car settles onto its stance" |
| S10 (reveal) | *(second camera move; Extend if needed)* "Studio softbox lights switch on one by one with a soft bloom, fully revealing the finished car; the camera begins a slow elegant orbit around it" |

Timed segments work for multi-beat shots: `[00:00-00:03] lights flick on … [00:03-00:08] slow orbit`.
**Watermark:** Veo's SynthID mark — don't crop it (ToS risk); compose with black bleed so it falls outside the visible area.

---

## 4. ffmpeg pipeline (video → scroll-scrubbable frames)

```bash
# 1) Extract frames: 8s bridge → 120 frames @ 15fps, desktop tier (1600w)
ffmpeg -i bridge.mp4 -vf "fps=15,scale=1600:-2" -c:v libwebp -q:v 75 desktop/s2_%03d.webp

# 2) Mobile tier (960w) — served to matchMedia('(max-width: 768px)')
ffmpeg -i bridge.mp4 -vf "fps=15,scale=960:-2"  -c:v libwebp -q:v 72 mobile/s2_%03d.webp

# 3) Upscale path: mp4 → PNGs → Upscayl batch → step 1 on upscaled frames
ffmpeg -i bridge.mp4 raw/f_%04d.png

# 4) Loops that stay as <video> (water, engine idle): all-intra = glitch-free seeking/looping
ffmpeg -i loop.mp4 -an -c:v libx264 -pix_fmt yuv420p -crf 20 -preset veryslow \
  -g 1 -keyint_min 1 -movflags +faststart loop_scrub.mp4
```

Budgets: 120–150 frames/bridge · first sequence ≤4–8MB desktop, ≤2MB mobile · only current+next stage in memory (sliding `createImageBitmap` window) · everything else lazy-loads one stage ahead.

**Continuity check before shipping any bridge:** last frame of bridge N must be pixel-close to first frame of bridge N+1 (they share a state still, so drift means a generation went wrong — regenerate, don't patch).

---

## 5. Free 3D models (v2 upgrades — download and archive NOW, Sketchfab is migrating to Fab)

- **Animated Engine V8 (meeww)** — CC-BY, separated parts + piston/crank animation: https://sketchfab.com/3d-models/animated-engine-v8-b0dbf778b81e4afba4edf11336e2a099
- **V8 Engine Internals** — crank/rods/pistons/valves as discrete parts (ideal exploded view): https://sketchfab.com/3d-models/v8-engine-internals-f8d41716b0a641dda9151c84c7159a24
- **three.js ferrari.glb** (in the three.js repo, CC-BY, body/rim/glass pre-split) — fastest path to a real paint configurator (`webgl_materials_car` example).
- Car paint: `MeshPhysicalMaterial { metalness:.9, roughness:.45, clearcoat:1, clearcoatRoughness:.05 }` + dark RoomEnvironment via PMREM (background stays black) + contact shadow. Deluxe flakes: github.com/Faraz-Portfolio/demo-2025-car-paint.
- Compress with **gltfpack/meshopt** (decodes 25–39× faster than Draco). ≤300k tris mobile.

---

## 6. Audio (muted by default + visible sound toggle — first tap unlocks)

- freesound.org (CC0): "engine idle loop", "deep rumble", "ratchet/torque wrench click" (stage-completion tick) · pixabay.com: UI whooshes.
- Rumble volume tied to engine-assembly progress; a soft mechanical click as each stage completes; tick on color-chip select. Subtle > loud.

---

## 7. The butter recipe (exact wiring)

```js
// ONE rAF loop to rule them all (two loops = the #1 cause of jitter)
const lenis = new Lenis({ lerp: 0.09, autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// THE BUILD structure: one pinned canvas, one master timeline
// - ScrollTrigger pins the car canvas for the whole build (end: "+=9000" or so)
// - each side-script block is a labeled segment; its scroll range scrubs that stage's frames
// - frame scrub per stage: tween {frame} ease:"none", scrub:0.7, snap round; skip redraw if unchanged
// - decode ahead: when stage N hits 50%, start decoding stage N+1's frames; free N-1 (bitmap.close())
// - drawImage with cover-math; canvas sized to clientWidth * min(devicePixelRatio, 2)
// - NEVER set img.src or draw inside a scroll event
```

anime.js v4 garnish (text + micro-interactions only): `splitText()` per-char headline converge, `scrambleText()` for mono-caps stage labels, `createSpring()` hover states. Its Three.js adapter gotchas (the page you linked): it never calls `renderer.render()` (drive from a `createTimer`), rotations are **degrees**, opacity needs `material.transparent = true`, shared materials affect every mesh (clone per mesh), Groups have no material — target descendant meshes.

Guardrails: scrub strictly ∝ scroll · no auto-advance · stage anchors in nav (`#engine`, `#paint`, `#ppf`…) · `prefers-reduced-motion` → state stills + fades · mobile tier chosen before preload · test on a real budget Android + iPhone.
