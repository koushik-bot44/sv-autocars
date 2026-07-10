# ENGINE SHOT LIST — generate in this exact order

Scene S2 on the site = **[black nothing → parts emerge (scrub)] → [parts assemble (scrub)] → [IGNITION: pistons fire, amber light is born] → [running loop] → scroll continues**. That needs 2 stills + 3 videos. Every asset derives from E1.

**The creative thread — "the engine powers the site":** before ignition, the page has NO amber anywhere (cold black/white only). The first combustion flash is where the site's amber accent color is born; from then on every amber glow on the page is "powered" by the running engine.

**File names:** save to `~/sv-autocars/assets/raw/engine/` as `E1-master.png` ✓, `E2-exploded.png`, `V0-emergence.mp4`, `V1-assembly.mp4`, `V2-fire-loop.mp4`. A pure black first frame is pre-made: `black-frame.png` ✓.

---

## THE ENVIRONMENT LOCK (copy this block verbatim into EVERY prompt — never retype it)

> Environment (must be exact): pitch-black photography studio, pure black seamless background with no visible walls, glossy black floor with a faint mirror reflection, one cool white rim light from the upper left outlining every metal edge, one subtle warm amber accent light from the right edge, no other light sources, no smoke, no haze, no dust particles, no text, no logos, no people. The only colors in the image are black, grey, chrome silver, and the faint warm amber highlight.

Any generation where the background, lighting direction, or color palette differs → **reject and regenerate. Never accept drift.**

---

## E1 — ✅ DONE (2026-07-10). Locked master: `assets/raw/engine/E1-master.png` (4928×2772, 16:9 crop of the floating three-quarter candidate). Original 3:2 archived beside it. **From now on every prompt uses this image as the reference/input — words only describe the CHANGE, never the engine or the environment.**

## E1 — original prompt (kept for the record)

> Studio product photograph of a V8 engine cutaway displayed on a low matte-black metal stand, perfectly centered in frame. The near half of the engine block is cut away, revealing four chrome pistons on polished connecting rods attached to a forged steel crankshaft. The pistons are frozen at different heights of their stroke, the front-most piston exactly at the top of its travel. Above them a polished camshaft and valve springs are visible. The far side of the engine keeps its closed dark gunmetal-grey cast-metal exterior with a black ribbed valve cover.
>
> Camera (must be exact): front three-quarter view from chest height, 85mm lens look, engine centered horizontally, engine occupies about 55% of the frame height, generous empty black space on the left, right and top of the engine.
>
> Materials: dark gunmetal grey engine block, chrome and machined aluminium internals, black hoses. Ultra-detailed automotive advertising photography, razor sharp, 8k.
>
> [ + ENVIRONMENT LOCK block ]

**Accept only if ALL true:** background is 100% black with no wall/horizon visible · pistons clearly visible in the cutaway · front piston at top of stroke · engine centered with empty space around it (parts must have room to fly in) · reflection on floor is subtle, not a second engine · no text/watermark artifacts · 16:9.

## E2 — EXPLODED STILL (edit of `E1-master.png`, never from scratch)

Try **Reve Edit first** (open E1 in Reve → Edit mode with reference image, mode "Literal" — keeps resolution and you already have credits there). Fallback: Nano Banana (Gemini) — upload E1-master.png. Either way, this exact instruction:

> Keep this exact image: same engine, same camera angle, same framing, same lighting, same dark studio background, same soft floor reflection. Change only this: the engine is exploded into many separated components dramatically scattered in mid-air across the whole frame. The central engine block stays exactly where it is, dimly lit by the rim light. Around it, spread wide toward the edges of the frame: the four chrome pistons with connecting rods, the crankshaft, the two camshafts, the black intake cover, the grey cast exhaust headers, the belt pulleys, the alternator, plus valve springs, piston rings, and a few small bolts and washers as tiny accents. Parts nearest the frame edges are half-swallowed by the darkness, only their rim-lit edges visible, as if arriving out of nowhere. Parts float at different depths — some slightly closer to the camera and larger, some further and smaller. Every part keeps its exact material, style and detail from the original image, razor sharp where lit. No part touches another. No new invented parts, no duplicates of the block, no color changes, no camera change, no background change.

**Story note:** on the site this section fades in from a pure black screen, so the sequence literally starts "from nowhere": black → rim-lit glints → parts converge → engine → pistons run.

**Accept only if (compare side-by-side with E1):** the block did NOT move or scale · every floating part matches E1's material/style · part count sane (4 pistons, 1 crank, 2 cams, 1 intake cover, 1 header set — no extras, no duplicates) · background/lighting/reflection identical. If the edit comes back low-res, upscale with Upscayl before using it in Flow.

## V0 — EMERGENCE FROM NOTHING (Flow → Frames to Video: FIRST frame = `black-frame.png`, LAST frame = E2)

> Camera completely locked off, no camera movement, no cuts. The frame begins in total darkness — pure black, completely empty. Then faint rim-lit glints appear as engine components drift slowly out of the darkness one after another — chrome pistons, a crankshaft, camshafts, pulleys, small bolts — each catching a cool white edge light as it emerges, until many parts hang scattered in mid-air around a dimly lit engine block. Slow, silent, weightless motion, like objects surfacing from deep black water. Luxury watch advertisement style, 8 seconds.

If Flow rejects the pure black first frame, fall back: image-to-video from E2 with "the parts drift backward into darkness and vanish" — then **reverse the frame order in ffmpeg** (a backward clip played in reverse = emergence).

## V1 — ASSEMBLY BRIDGE (Flow → "Frames to Video": FIRST frame = E2, LAST frame = E1)

> Camera completely locked off, no camera movement, no zoom, no cuts. Engine components emerge one after another out of the surrounding darkness and glide smoothly toward the dim engine block at the center — crankshaft first, then the chrome pistons sliding into the cylinders, camshafts settling on top, intake cover and exhaust headers attaching to the sides, pulleys and belt last. As the engine completes, the rim lighting brightens to full. Every part keeps its exact appearance the whole time. The black studio and the floor reflection never change. Elegant, slow, precise constant motion like a luxury watch advertisement, 8 seconds.

**This clip becomes the scroll-scrub sequence** (frames extracted below). If Flow's plan doesn't expose Frames-to-Video: fall back to image-to-video from E2 with this same prompt — then take the clip's actual LAST frame and **adopt it as the new canonical E1** so the loop and all later stages stay pixel-consistent.

## V2 — FIRE LOOP (Flow → Frames to Video: FIRST frame = E1, LAST frame = E1 — same image both ends)

> Camera completely locked off, no camera movement, no zoom, no cuts. The assembled cutaway engine runs continuously with power: the crankshaft rotates at constant speed and the exposed chrome pistons cycle up and down. Each time a piston reaches the top of its stroke, a burst of orange-amber combustion fire ignites inside that open cylinder — a brief, bright flash of energy that casts a warm glow on the surrounding metal, then fades — the four cylinders firing one after another in a steady rhythm. A faint warm glow pulses along the grey exhaust headers with each firing. The engine vibrates subtly with contained power. The black studio background, the floor reflection and the engine's position never change. The motion and the firing rhythm are perfectly periodic and return exactly to the starting position at the end. Seamless loop, 8 seconds.

**Accept only if:** engine stays anchored (no sliding/scaling) · combustion flashes stay INSIDE the cylinders (no explosion engulfing the engine, no smoke filling the frame) · fire color is orange-amber (matches the site accent) · first and last second look identical.

**Site wiring for the fire:** the ignition flashes in the video are mirrored in code — each flash triggers a soft amber pulse on the section's text/CTA (`ignition = the birth of the site's accent color`). Rumble audio thumps in sync, muted by default.

---

## After generation — the pipeline (run on your Mac)

```bash
cd ~/sv-autocars/assets
# V1 → scrub frames (desktop + mobile tiers)
ffmpeg -i raw/engine/V1-assembly.mp4 -vf "fps=15,scale=1600:-2" -c:v libwebp -q:v 75 engine/desktop/e_%03d.webp
ffmpeg -i raw/engine/V1-assembly.mp4 -vf "fps=15,scale=960:-2"  -c:v libwebp -q:v 72 engine/mobile/e_%03d.webp

# V2 → all-intra loop (glitch-free looping/seeking)
ffmpeg -i raw/engine/V2-idle-loop.mp4 -an -c:v libx264 -pix_fmt yuv420p -crf 20 -preset veryslow \
  -g 1 -keyint_min 1 -movflags +faststart engine/idle-loop.mp4
```

**Continuity check before calling it done:** open `e_120.webp` (last scrub frame) next to the first frame of `idle-loop.mp4` — they must look like the same photo. If they don't, V2 was generated from the wrong still.

## Scroll wiring reminder (what these map to)

1. Section pins → scrolling scrubs `e_001 → e_120` on the canvas (exploded → assembled), strictly proportional to scroll.
2. At 100%: canvas hands off to `idle-loop.mp4` (autoplay, muted, loop) — pistons cycling. Rumble audio optional, muted by default.
3. User keeps scrolling → next stage. Scroll + video → scroll. Exactly the structure you described.
