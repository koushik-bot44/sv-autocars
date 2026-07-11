// ============================================================
// engine3d.js — the V8 in its own dark bay, 90m to the left.
// Exposes: setAssembly(0..1) exploded→assembled, idle firing.
// Model: "Animated Engine V8" © meeww, CC-BY (credit in footer).
// ============================================================
import * as THREE from 'three';

export const ENGINE_POS = new THREE.Vector3(-90, 1.15, 0);

export async function loadEngine(gltfLoader, scene) {
  const gltf = await gltfLoader.loadAsync('/models/engine.glb');
  const root = gltf.scene;

  // Normalize scale: fit the engine into ~1.6m height, sit at ENGINE_POS.
  root.updateMatrixWorld(true);
  let box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const s = 1.6 / Math.max(size.x, size.y, size.z);
  root.scale.setScalar(s);
  root.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());

  const group = new THREE.Group();
  group.name = 'ENGINE';
  group.position.copy(ENGINE_POS);
  scene.add(group);
  group.add(root);
  root.position.sub(center); // engine centered on group origin

  // Sai's V6 ships one flat material across 184 parts — grade each part
  // by its size into realistic workshop metals. Small internals become the
  // "power" group: chrome that glows amber with every firing beat.
  const noise = makeNoiseTexture();
  const shellMats = [];
  const powerMats = [];
  const meshInfo = [];
  root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const size = new THREE.Box3().setFromObject(o).getSize(new THREE.Vector3()).length();
    meshInfo.push({ mesh: o, size });
  });
  const sizesSorted = meshInfo.map((m) => m.size).sort((a, b) => a - b);
  const q = (f) => sizesSorted[Math.floor(f * (sizesSorted.length - 1))];
  const qBig = q(0.86);
  const qSmall = q(0.5);
  for (const { mesh, size } of meshInfo) {
    const m = (mesh.material = mesh.material.clone());
    m.envMapIntensity = 1.1;
    if (size >= qBig) {
      // big castings — dark cast block, grainy
      m.color?.set(0x33363d); m.metalness = 0.85; m.roughness = 0.52;
      m.bumpMap = noise; m.bumpScale = 0.9;
      shellMats.push(m);
    } else if (size >= qSmall) {
      // mid components — machined alloy
      m.color?.set(0x8d9298); m.metalness = 1.0; m.roughness = 0.36;
      m.roughnessMap = noise;
      shellMats.push(m);
    } else {
      // small internals — polished steel, amber-glow capable
      m.color?.set(0xc9ced6); m.metalness = 1.0; m.roughness = 0.16;
      m.emissive = new THREE.Color(0xe0a33b);
      m.emissiveIntensity = 0;
      powerMats.push(m);
    }
  }

  // ---- Explode vectors: every mesh flies out along (center → mesh center),
  // with deterministic per-part jitter so the cloud looks organic.
  group.updateMatrixWorld(true);
  const parts = [];
  let i = 0;
  root.traverse((o) => {
    if (!o.isMesh) return;
    const pb = new THREE.Box3().setFromObject(o);
    const pc = pb.getCenter(new THREE.Vector3());
    const dirWorld = pc.clone().sub(group.getWorldPosition(new THREE.Vector3()));
    if (dirWorld.lengthSq() < 1e-6) dirWorld.set(0, 1, 0);
    dirWorld.normalize();
    // deterministic jitter from index (no Math.random — stable between loads)
    const j = (n) => Math.sin(i * 12.9898 + n * 78.233) * 0.6;
    dirWorld.x += j(1) * 0.5 + 0.4; // rightward bias — keep the cloud clear of the script column
    dirWorld.y += j(2) * 0.35 + 0.15; // slight upward bias — parts hang in air
    dirWorld.z += j(3) * 0.5;
    dirWorld.normalize();

    // convert world direction into the mesh's parent space
    const parentQuat = o.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
    const dirLocal = dirWorld.clone().applyQuaternion(parentQuat);
    const pScale = o.parent.getWorldScale(new THREE.Vector3()).x || 1;
    // big parts anchor the composition, small parts fly — like the reference:
    // block stays near center, satellites hover around it
    const partSize = pb.getSize(new THREE.Vector3()).length();
    const sizeFactor = THREE.MathUtils.clamp(1.5 - partSize, 0.12, 1.5);
    const dist = ((0.55 + Math.abs(j(4)) * 1.1) * sizeFactor) / pScale;

    parts.push({
      mesh: o,
      rest: o.position.clone(),
      dir: dirLocal,
      dist,
      restRot: o.rotation.clone(),
      spin: { x: j(5) * 0.7, y: j(6) * 0.7, z: j(7) * 0.7 },
      isPiston: /piston|rod/i.test(o.name),
      pumpAmp: 0.06 / pScale,
      phase: Math.abs(j(8)) * Math.PI * 2,
    });
    i++;
  });

  // ---- Engine bay lighting — high-contrast rim-lit, like the reference shot.
  const bayKey = new THREE.SpotLight(0xdfe8ff, 260, 30, Math.PI / 4.5, 0.55, 1.9);
  bayKey.position.set(ENGINE_POS.x - 4, ENGINE_POS.y + 5.2, ENGINE_POS.z + 3.6);
  bayKey.target.position.copy(ENGINE_POS);
  scene.add(bayKey, bayKey.target);

  const bayRim = new THREE.SpotLight(0xcfd9ee, 380, 30, Math.PI / 4, 0.6, 1.8);
  bayRim.position.set(ENGINE_POS.x + 3.4, ENGINE_POS.y + 2.6, ENGINE_POS.z - 4.2);
  bayRim.target.position.copy(ENGINE_POS);
  scene.add(bayRim, bayRim.target);

  // combustion glow — tight radius so it kisses the internals, not the room
  const fire = new THREE.PointLight(0xe0a33b, 0, 4.5, 2);
  fire.position.copy(ENGINE_POS).add(new THREE.Vector3(0, 0.3, 0.35));
  scene.add(fire);

  // ---- Public API ------------------------------------------------------
  const state = { assembly: 0, running: 0 }; // 0 = exploded, 1 = assembled

  function setAssembly(p) {
    state.assembly = p;
    const e = 1 - p; // explosion factor
    for (const part of parts) {
      part.mesh.position.copy(part.rest).addScaledVector(part.dir, e * part.dist);
      part.mesh.rotation.set(
        part.restRot.x + e * part.spin.x,
        part.restRot.y + e * part.spin.y,
        part.restRot.z + e * part.spin.z
      );
    }
  }

  // Idle firing loop — called every frame with elapsed time.
  // While running: the shell turns X-ray glass, pistons pump, amber
  // combustion pulses glow from inside — "the power made visible".
  let lastR = -1;
  function tick(t) {
    const r = state.running;
    if (r <= 0.01) {
      fire.intensity = 0;
      if (lastR !== 0) {
        for (const m of shellMats) { m.opacity = 1; m.transparent = false; m.depthWrite = true; }
        for (const m of powerMats) m.emissiveIntensity = 0;
        lastR = 0;
      }
      return;
    }
    lastR = r;
    // four-beat firing rhythm
    const pulse = Math.max(0, Math.sin(t * 14)) ** 6;
    fire.intensity = r * (55 + pulse * 220);
    // shell → x-ray ghost so the internals read through it (keeps its form)
    const ghost = 1 - r * 0.6;
    for (const m of shellMats) {
      m.transparent = true;
      m.opacity = ghost;
      m.depthWrite = r < 0.45;
    }
    // internals glow with each firing beat
    for (const m of powerMats) m.emissiveIntensity = r * (0.22 + pulse * 1.35);
    // subtle contained vibration
    group.position.x = ENGINE_POS.x + Math.sin(t * 41) * 0.004 * r;
    group.position.y = ENGINE_POS.y + Math.sin(t * 53) * 0.003 * r;
    // pistons pump (amplitude converted to model-local units)
    for (const part of parts) {
      if (!part.isPiston) continue;
      part.mesh.position.copy(part.rest);
      part.mesh.position.y = part.rest.y + Math.sin(t * 14 + part.phase) * part.pumpAmp * r;
    }
  }

  setAssembly(0);
  return { group, parts, state, setAssembly, tick, fire, bayKey };
}

// Small tileable grayscale noise — shared bump/roughness for cast metal.
function makeNoiseTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const img = g.createImageData(size, size);
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 118 + rand() * 68;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}
