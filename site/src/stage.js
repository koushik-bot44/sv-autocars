// ============================================================
// stage.js — renderer, scene, studio lighting, floor.
// One canvas, one renderer, one rAF (driven from main.js).
// ============================================================
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const IS_MOBILE = matchMedia('(pointer: coarse), (max-width: 768px)').matches;

export function createStage(canvas) {
  // alpha canvas — DOM layers can live BEHIND the 3D car (giant text trick)
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !IS_MOBILE,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, IS_MOBILE ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  // ORYZO palette: warm coffee-brown studio dark, cream light.
  // No scene.background — the CSS gradient behind the canvas shows through.
  const FOG = 0x1a120b;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(FOG, 26, 60);

  const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.08, 200);
  camera.position.set(6.5, 1.6, 7.5);

  // Soft studio reflections (background stays black — env only feeds materials).
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  // ---- Studio lighting: cool key upper-left, cool rim behind-right,
  // ---- amber accent (dead until CH.01 ignition — "birth of the accent").
  // warm tungsten studio light — oryzo's coffee-glow look
  const key = new THREE.DirectionalLight(0xffe9c4, 2.3);
  key.position.set(-6, 9, 6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xffd9a8, 1.5);
  rim.position.set(7, 5, -7);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x8a7358, 0.5);
  fill.position.set(0, 4, -10);
  scene.add(fill);

  // Warm rim from behind-right — born at CH.01 ignition, garnish not takeover.
  const amber = new THREE.SpotLight(0xe0a33b, 0, 40, Math.PI / 7, 0.7, 1.4);
  amber.position.set(6, 3.5, -6);
  amber.target.position.set(0, 0.7, -1);
  scene.add(amber);
  scene.add(amber.target);

  // ---- Glossy black floor disc + soft light pool under the car.
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(30, 64),
    new THREE.MeshStandardMaterial({
      color: 0x17100a,
      roughness: 0.55,
      metalness: 0.25,
      envMapIntensity: 0.12,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);

  // Radial "pool of light" texture under the car (cheap contact glow).
  const poolTex = makeRadialTexture('rgba(255,208,150,0.17)', 'rgba(26,18,11,0)');
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 11),
    new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.005;
  scene.add(pool);

  // Contact shadow blob (dark radial under the body).
  const shadowTex = makeRadialTexture('rgba(0,0,0,0.85)', 'rgba(0,0,0,0)');
  const contactShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.2, 3.2),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.012;
  scene.add(contactShadow);

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  return { renderer, scene, camera, lights: { key, rim, fill, amber } };
}

function makeRadialTexture(inner, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 8, 128, 128, 128);
  grad.addColorStop(0, inner);
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
