// ============================================================
// fleet.js — THE SHOWROOM AVENUE. All seven cars parked in one
// long line; the camera drives car-to-car as the page scrolls.
// Each car is normalized (real length, wheels on y=0) and gets
// its own soft ground shadow.
// ============================================================
import * as THREE from 'three';
import { FLEET } from './data.js';

const BASE = import.meta.env.BASE_URL;
export const CAR_SPACING = 40; // far apart — every shot isolates ONE car

const isPaintMat = (name = '') =>
  /paint|coloured/i.test(name) && !/trim|carbon|calliper|caliper|gloss/i.test(name);

export function createShowroom(gltfLoader, scene) {
  const cars = []; // index-aligned with FLEET

  async function loadOne(spec, i, onProgress) {
    const gltf = await new Promise((res, rej) =>
      gltfLoader.load(BASE + spec.file, res, onProgress, rej)
    );
    const root = gltf.scene;

    // normalize: real length, wheels on y=0, centered
    root.updateMatrixWorld(true);
    let box = new THREE.Box3().setFromObject(root);
    let size = box.getSize(new THREE.Vector3());
    if (size.y > size.x && size.y > size.z) {
      root.rotation.x = -Math.PI / 2;
      root.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(root);
      size = box.getSize(new THREE.Vector3());
    }
    const s = spec.length / Math.max(size.x, size.z);
    root.scale.setScalar(s);
    if (spec.face) root.rotation.y = spec.face;
    root.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    root.position.x -= center.x;
    root.position.z -= center.z;
    root.position.y -= box.min.y;

    const paintMats = [];
    const seen = new Set();
    root.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (seen.has(m.uuid)) continue;
        seen.add(m.uuid);
        if (isPaintMat(m.name)) {
          m.metalness = Math.min(m.metalness ?? 0.7, 0.85);
          m.roughness = Math.min(m.roughness ?? 0.4, 0.35);
          m.envMapIntensity = 1.1;
          paintMats.push(m);
        } else if (/glass|window/i.test(m.name)) {
          m.envMapIntensity = 1.4;
        }
      }
    });

    // parking spot i, with its own ground shading
    const group = new THREE.Group();
    group.name = `CAR_${spec.id}`;
    group.position.x = i * CAR_SPACING;
    group.add(root);
    group.add(makeGroundShadow());
    scene.add(group);

    return { spec, group, root, paintMats, x: i * CAR_SPACING };
  }

  // sequential load — smooth preloader progress across the whole fleet
  async function loadAll(onProgress) {
    for (const [i, spec] of FLEET.entries()) {
      const prepared = await loadOne(spec, i, (ev) => {
        const f = ev.total ? ev.loaded / ev.total : 0;
        onProgress?.((i + f) / FLEET.length);
      });
      cars.push(prepared);
      onProgress?.((i + 1) / FLEET.length);
    }
    return cars;
  }

  function paintCar(idx, hex) {
    const car = cars[idx];
    if (!car) return;
    for (const m of car.paintMats) m.color?.set(hex);
  }

  return { cars, loadAll, paintCar };
}

function makeGroundShadow() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, 'rgba(25,25,28,0.32)');
  grad.addColorStop(0.55, 'rgba(25,25,28,0.12)');
  grad.addColorStop(1, 'rgba(25,25,28,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 5.2),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.006;
  return mesh;
}
