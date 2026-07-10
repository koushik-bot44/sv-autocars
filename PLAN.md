# SV AUTO CARS — "THE BUILD" Master Plan (v2)

> One car. Every craft. The entire page is a single car being built in front of you — every service the studio offers is a stage of the build, narrated by a script that scrolls beside it.
> Client: SV Auto Cars, Hyderabad (@sv_autocars) · Builder: solo dev · Budget: ~₹0 · Goal: Awwwards-level craft → internship-winning portfolio piece.

---

## 0. What the business actually is (from their Instagram, verified 2026-07-10)

- **SV AUTOCARS** — "Complete Auto Care Solutions ⚙️ Mechanical Services" · 303 posts · 780 followers · Hyderabad
- Phones: **+91 97014 56388** and **+91 96034 56388** (both appear in captions — confirm the primary with the owner)
- Highlights: EXTRAS · SV AUTODOC · 9M CARE · SPECIALS
- Real services seen in posts, with real cars:
  | Service | Proof from their feed |
  |---|---|
  | PPF (full-body gloss, self-healing) | MG M9 EV |
  | Ceramic coating | Kia Sonet |
  | Teflon coating | BMW 520d, Fortuner Legender |
  | Full-body repaint + alloy refinish | Mercedes ML 320, Innova Crysta ×2, Maruti Celerio |
  | Interior refresh | BMW 520d |
  | Mechanical (Airmatic, AC kit, fuel pump, brakes, full service) | Mercedes GLS 350 / E-Class, Hyundai Elantra, Porsche Cayenne |

Premium Indian detailing studios brand themselves around "Black Studio" — the black photo-shoot aesthetic has direct local precedent and fits this Mercedes/BMW/Porsche clientele.

---

## 1. Design decision: BLACK, with white as a weapon

**Base the site on near-black. Use white for exactly one stage.**

Why black wins as the base:
1. **It matches the brand** — premium clientele, "Black Studio" precedent in India.
2. **Black hides AI seams** — rim lighting on black forgives imperfect AI footage; white exposes every soft edge across 150 frames.
3. **Black frames compress ~2–4× smaller** → fast site on free hosting.
4. **Paint colors pop on black** — the color stage reads twice as vivid.

The white McLaren-reel look you liked becomes **the PPF stage: the screen blows out to pure white** for that one chapter — clinical, clean, protective — then back to black. One inversion = maximum cinematic contrast, used with intention. White also lives on as floating **spec cards** (the firstdrive/dannyuxui style) over the black scene.

Design tokens (from the bklit.com teardown — verified in their source):
```
--bg:        #0a0a0c   (near-black, blue undertone — NOT pure #000)
--fg:        #f9fbfb
--muted:     #9aa0ab
--hairline:  #6f748033 (translucent border — what makes dark UI look expensive)
--accent:    shop-light amber #e0a33b (or brand color from their logo — confirm)
--flash:     #f5f4f1   (the PPF white stage)
Type: huge tight-tracked sans (Inter/Geist) display + tiny wide-tracked mono-caps labels
      ("STAGE 02 / ENGINE_" with blinking caret) — technical, precise
```

---

## 2. THE BUILD — the scroll script (v2)

### The concept

The car is the protagonist. It starts as a bare chassis floating in black studio space and **gets built stage by stage as you scroll** — engine drops in, suspension bolts up, body panels fly on, paint sweeps over, film wraps it, coating beads, interior comes alive, wheels bolt on — until the finished car stands in full studio light. Every stage = one service family. By the end, the visitor has watched the studio do *everything it can do* to one car.

### The layout — car + side script (your idea, and it's the right one)

Classic scrollytelling split, the strongest layout for this:

```
┌────────────────────────────────────────────┐
│  [SIDE SCRIPT — scrolls]   [THE CAR — pinned] │
│  STAGE 03 / SUSPENSION_    ┌──────────────┐ │
│  Air suspension rebuilt.   │              │ │
│  Brakes that bite like     │   (canvas —  │ │
│  day one.                  │   car builds │ │
│  · AIRMATIC REBUILD        │   in place)  │ │
│  · DISCS & PADS            │              │ │
│  · AC OVERHAUL             └──────────────┘ │
│  [real job photo chip]                      │
└────────────────────────────────────────────┘
```

- **The car lives in one pinned full-height canvas** (right ~60% on desktop). It never leaves; only its state changes. This is what makes the whole page feel like one unbroken take.
- **The side script** scrolls beside it: stage number + name in mono-caps, two punchy lines, the service list, a real-job proof chip. Text drives the build — as each script block passes, the car advances to that stage (scrub strictly ∝ scroll).
- Subtitle-style captions fade at the bottom of the canvas on stage changes (your movie-subtitles idea).
- **Mobile:** car canvas is a sticky background layer; script cards slide over the lower third. Shorter sequences, same story.

### The stages

| # | Stage | What the car does | Side script sells (full studio catalog) |
|---|---|---|---|
| S0 | **Redline preloader** | Tach arc fills with real decode progress, needle sweeps | — |
| S1 | **The skeleton** | Bare chassis drifts in from black, settles on the studio floor | The promise: "Every car that enters leaves rebuilt." |
| S2 | **The heart** ★ | Engine parts converge mid-air (watch-ad moment), assembled engine **drops into the chassis and starts running — pistons cycling**, low rumble (muted default + sound toggle) | Engine diagnostics · overhaul · timing/turbo work · oil & fluids · fuel systems |
| S3 | **Running gear** | Struts, discs, calipers, AC lines fly in and bolt to the chassis | Suspension incl. **Airmatic** · brakes · steering · AC overhaul · electrical & battery · transmission service · periodic maintenance · insurance-claim repairs |
| S4 | **The body** | Door shells, hood, fenders sweep in and attach — car now in bare primer grey | Dent & panel repair · panel replacement · bodyshop prep |
| S5 | **Paint** ★ | Color sweeps over the primer body; **color chips appear — tap to repaint the car live** | Full-body repaint · custom colors · paint correction · showroom finish |
| S6 | **The shield — WHITE FLASH** | Screen inverts to white; transparent film wraps panel by panel; a scratch appears and **heals itself**. Interactive: drag-to-scratch, release, it heals | Full/partial PPF · self-healing gloss & matte film |
| S7 | **The coat** | Back to black; water beads roll off the fender in slow-mo | Ceramic · Teflon · underbody anti-rust · headlight restoration (confirm graphene) |
| S8 | **Inside** | Camera dives through the window — the one big camera move; warm light; seats/dash come alive | Interior deep clean · upholstery & leather · dashboard refresh · detailing |
| S9 | **On its feet** | Refinished alloys roll in and bolt on; car drops off the lift stance | Alloy refinishing · wheel care · alignment & balancing (confirm) |
| S10 | **The reveal** | Full studio lights flick on one by one — finished car in rim light, slow beauty orbit. "SV AUTO CARS" converges letter-by-letter | The brand moment — this is also the hero if someone deep-links |
| S11 | **The wall** | Horizontal gallery of **their real Instagram photos** — Porsche Cayenne, Mercedes GLS/E/ML, BMW 520d, Fortuner, MG M9 | Proof. **Honesty rule: AI builds the story; only real photos claim real work.** |
| S12 | **Book the studio** | Conic rev-ring CTA · **WhatsApp deep link** + click-to-call + map + hours; floating WhatsApp from S2 onward | Zero-backend booking, the Indian standard |

Catalog notes: confirm with the owner which items they actually offer before printing (wraps, audio, tires, graphene). **Skip window tinting/sun film** — effectively banned in India; don't advertise it.

### How one continuous AI car is actually possible (the production trick)

AI consistency across 9 stages is the real enemy. The chain that beats it:

1. **One master still** (Reve): the finished car, locked camera angle, black studio.
2. **Work backward with Nano Banana edits** to create ~8 **state stills** — same car, same camera, progressively un-built: final beauty → wheels off → interior dark → matte/no coating → primer body → panels off → chassis+engine → bare chassis. Editing one image backward keeps every stage pixel-consistent; the locked camera makes it trivial.
3. **Bridge neighbor stills with Veo Frames-to-Video**: first frame = state N, last frame = state N+1, prompt "parts fly in and attach, camera locked." Each bridge = one 8s clip.
4. **ffmpeg each bridge → WebP frames.** Boundary frames are shared between sequences, so scrolling the whole page = one unbroken build. (Exact prompts + commands: ASSET-PLAYBOOK §2–4.)

v2 upgrade path: replace stages S2 (engine) and S5 (paint) with real Three.js — exploded CC-BY V8 glTF with drag-to-orbit, and clearcoat `MeshPhysicalMaterial` paint on the pre-split ferrari.glb. The frame pipeline stays as fallback and mobile tier.

### Guardrails (from NN/g scrolljacking research)

Scrub strictly proportional to scroll — never auto-advance, never hijack. Stage anchors in the nav for people in a hurry. Every animation *explains* a service (assembly = "we rebuild engines"), never decoration-only. `prefers-reduced-motion` → state stills with simple fades.

---

## 3. Tech stack (researched + verified, all free)

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite + vanilla TS** | Zero framework tax; one page of choreography |
| Scroll engine | **GSAP 3.13 + ScrollTrigger + SplitText — 100% free now** (Webflow freed all Club plugins, Apr 2025) | `pin` + `scrub` are the backbone of the pinned-car layout; **anime.js ScrollObserver has no pin** — decisive |
| Smooth scroll | **Lenis** | The Awwwards butter. One rAF loop only: `lenis.on('scroll', ScrollTrigger.update)`, drive Lenis from `gsap.ticker`, `lagSmoothing(0)` |
| anime.js v4 | Garnish: `splitText`/`scrambleText`, spring micro-interactions | You linked it; it decorates, GSAP drives |
| 3D (v2) | **Three.js** — one shared renderer, one canvas | meshopt-compressed glTF (25–39× faster decode than Draco), ≤300k tris mobile, DPR ≤2 |
| Sequences | WebP frames on `<canvas>`, GSAP `imageSequenceScrub` pattern | Frames beat `video.currentTime` for reverse scrub; iOS Low Power Mode blocks programmatic video — canvas is bulletproof |
| Hosting | **Cloudflare Pages** | Unlimited free bandwidth (Netlify/Vercel cap at 100GB — frames would blow it) |
| Analytics | GA4 | Conversion = WhatsApp taps + calls |

### Performance budget (hard limits)
- Whole build ≈ 8–9 bridge sequences × 120–150 frames. **Only 2 sequences live in memory at once** (current + next, sliding window of `createImageBitmap` + `.close()`); everything else lazy-loads one stage ahead via IntersectionObserver.
- Hero/first sequence ≤ 4–8 MB desktop / ≤ 2 MB mobile; first load ≤ 10 MB.
- Desktop 1600px frames, mobile 750–960px — tier chosen via `matchMedia` **before** preloading.
- ONE reused canvas. Never draw in the scroll event. Only animate `transform / opacity / filter / clip-path`.
- Real budget-Android + iPhone-Safari testing — their Instagram traffic is mobile-first, so mobile IS the primary audience.

### SEO for a local garage
All side-script copy is real HTML text (the canvas sits beside/behind it — free SEO). `schema.org/AutoRepair` JSON-LD (name, phones, address, hours, full service list). Title/meta/OG image + link from Google Business Profile and Instagram bio. Stage anchors = crawlable service sections (`#engine`, `#paint`, `#ppf`…).

---

## 4. Build phases (each one shippable)

**Phase 0 — Art direction + the state-still chain (Week 1)**
Lock tokens/type. Generate the master still → the 8 backward state stills (Nano Banana) → approve the chain **before** spending any Veo credits → generate bridge clips → ffmpeg pipeline → WebP tiers. Collect their 20 best real IG photos. Output: `/assets` + a one-page style tile.

**Phase 1 — The premium static shell (Week 2)**
Vite site, final typography/tokens, all stages as static sections using the state stills, real gallery, WhatsApp/call CTAs, schema.org, GA4, live on Cloudflare Pages. Already looks expensive with zero animation — and it's the safety net if animation slips.

**Phase 2 — The cinematic layer (Week 3)**
Lenis + GSAP wiring. Pinned car canvas + side-script scroll sync. Preloader. First three bridges scrubbing (S1→S4). Split-text choreography + subtitle captions.

**Phase 3 — The full build + toys (Week 4)**
All bridges wired. Color-chip repaint (WebP swap v1). White-flash inversion + scratch-heal toy. Water loop. Engine rumble (muted default). Footer particles.

**Phase 4 — Polish + proof (Week 5)**
Real-device QA, Lighthouse ≥ 90 mobile, reduced-motion pass, OG images, 404, favicon. Optional v2: Three.js engine orbit + physical paint. Record the screen-capture showreel — that video is what wins the internship.

---

## 5. Risks & honest notes

- **Veo free tier is thin** (~10 clips/mo; AI Pro ≈ ₹1,650/mo — student/promo often free in India). The state-still chain means every clip is planned before generating; approve stills first, clips second. Don't crop the SynthID watermark (ToS risk) — compose with black bleed.
- **Consistency lives and dies by the locked camera.** Any stage that changes angle multiplies AI drift; only S8 (interior dive) and S10 (reveal orbit) earn camera moves.
- **Two phone numbers** in their captions — confirm the primary before printing it everywhere.
- **Verify free-tier numbers at build time**; Sketchfab is migrating into Fab — download and archive the .glb files NOW.
- **Never present an AI car as their work.** The build is storytelling; the wall (S11) is proof, 100% real photos.

---

## 6. What's next (when you say go)

1. Phase 0: generate the master still → I guide the backward state-still chain one image at a time (your accounts, my prompts).
2. I build the ffmpeg pipeline script + Vite scaffold in this folder.
3. Ship Phase 1 within days, iterate in public.

Companion file: **[ASSET-PLAYBOOK.md](./ASSET-PLAYBOOK.md)** — every prompt (master still, 8 state stills, bridge clips), ffmpeg commands, GSAP/Lenis wiring, model links.
