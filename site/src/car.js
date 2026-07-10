// ============================================================
// car.js — load the Porsche, assign studio materials by the
// material names baked into the GLB, expose the paint API.
// ============================================================
import * as THREE from 'three';

// Materials keyed by the names found in the GLB (see pipeline/nodemap.py).
function buildMaterials(paintColor) {
  const paint = new THREE.MeshPhysicalMaterial({
    color: paintColor,
    metalness: 0.9,
    roughness: 0.42,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.0,
  });

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0c0e12,
    metalness: 0,
    roughness: 0.04,
    transparent: true,
    opacity: 0.5,
    envMapIntensity: 1.6,
  });

  const chrome = new THREE.MeshStandardMaterial({ color: 0xd8dade, metalness: 1, roughness: 0.08, envMapIntensity: 1.2 });
  const black = new THREE.MeshStandardMaterial({ color: 0x131316, metalness: 0.4, roughness: 0.6 });
  const carbon = new THREE.MeshStandardMaterial({ color: 0x17181c, metalness: 0.5, roughness: 0.35, envMapIntensity: 0.8 });
  const tyre = new THREE.MeshStandardMaterial({ color: 0x0e0e10, metalness: 0, roughness: 0.92 });
  const leather = new THREE.MeshStandardMaterial({ color: 0x241c15, metalness: 0, roughness: 0.85 });
  const disc = new THREE.MeshStandardMaterial({ color: 0x8f9296, metalness: 1, roughness: 0.42 });
  const caliper = new THREE.MeshStandardMaterial({ color: 0xa11220, metalness: 0.35, roughness: 0.45 });
  const lightSteel = new THREE.MeshStandardMaterial({ color: 0xcfd3d8, metalness: 1, roughness: 0.15, envMapIntensity: 1.3 });
  const tailRed = new THREE.MeshPhysicalMaterial({
    color: 0x5c060c, metalness: 0.2, roughness: 0.1,
    emissive: 0x30060a, emissiveIntensity: 0.7, clearcoat: 1,
  });
  const blinker = new THREE.MeshPhysicalMaterial({ color: 0x866a30, metalness: 0.3, roughness: 0.15, clearcoat: 1 });

  return {
    Body_color: paint,
    glass,
    chrome,
    mirrors: chrome,
    wipers_mateblack: black,
    carbon_fiber: carbon,
    tyre,
    leather,
    'BRAKE Disk': disc,
    caliper,
    headlight_steel: lightSteel,
    headlight_black: black,
    taillights: tailRed,
    blinkers: blinker,
    DefaultMaterial: black,
    _paint: paint, // handle for the paint API
  };
}

export async function loadCar(gltfLoader, scene, paints) {
  const url = matchMedia('(pointer: coarse), (max-width: 768px)').matches
    ? '/models/porsche-mobile.glb'
    : '/models/porsche.glb';

  const gltf = await gltfLoader.loadAsync(url);
  const root = gltf.scene;
  const mats = buildMaterials(paints[0].hex);

  const wheels = [];
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.frustumCulled = true;
    const matName = o.material?.name || '';
    if (matName === 'plate') {
      // baked plate texture is a bright yellow UK plate — kill it
      o.material = new THREE.MeshStandardMaterial({ color: 0x0c0c0e, metalness: 0.2, roughness: 0.55 });
    } else if (mats[matName]) {
      // keep textured details (seat badge / screen) on their baked material
      const keepBaked = ['GT4SEATBADGE', 'screen'].includes(matName);
      if (!keepBaked) o.material = mats[matName];
    }
    if (/^wheel\./i.test(o.name)) wheels.push(o);
  });

  // ---- Normalize: stand the car on y=0, center it at origin, face +X.
  root.updateMatrixWorld(true);
  let box = new THREE.Box3().setFromObject(root);
  let size = box.getSize(new THREE.Vector3());

  // The GLB from FBX may come in Z-up; rotate so height is Y.
  if (size.y > size.x && size.y > size.z) {
    root.rotation.x = -Math.PI / 2;
    root.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(root);
    size = box.getSize(new THREE.Vector3());
  }

  // Scale to a real Cayman-ish length of 4.4m along its longest axis.
  const length = Math.max(size.x, size.z);
  const s = 4.4 / length;
  root.scale.setScalar(s);
  root.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(root);

  const center = box.getCenter(new THREE.Vector3());
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= box.min.y;

  // Group wrapper so choreography can move/rotate the whole car cleanly.
  // Flip 180° — the model faces -X, we choreograph for +X.
  const group = new THREE.Group();
  group.name = 'CAR';
  group.rotation.y = Math.PI;
  group.add(root);
  scene.add(group);

  // ---- Wheel spin pivots: wrap each wheel in a group at its own center
  // (pivots in exports are rarely at the hub).
  root.updateMatrixWorld(true);
  const wheelPivots = wheels.map((w) => {
    const wb = new THREE.Box3().setFromObject(w);
    const wc = wb.getCenter(new THREE.Vector3());
    const parent = w.parent;
    const pivot = new THREE.Group();
    parent.add(pivot);
    pivot.position.copy(parent.worldToLocal(wc.clone()));
    pivot.attach(w); // keeps world transform
    return pivot;
  });

  // ---- Paint API (GSAP-tweenable)
  const paintTo = (hex) => mats._paint.color.set(hex);

  return { group, root, mats, wheelPivots, paintTo };
}
