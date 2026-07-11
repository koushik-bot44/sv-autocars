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

  // WHITE SHOWROOM: premium light studio — the CSS layer behind the
  // transparent canvas provides the white + red-lines backdrop.
  // tight fog: neighboring cars vanish into the white — one car per shot
  const FOG = 0xf5f5f3;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(FOG, 22, 58);

  const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.08, 200);
  camera.position.set(6.5, 1.6, 7.5);

  // Soft studio reflections (background stays black — env only feeds materials).
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.8;

  // ---- Studio lighting: cool key upper-left, cool rim behind-right,
  // ---- amber accent (dead until CH.01 ignition — "birth of the accent").
  // clean neutral studio light — bright, soft, showroom-grade
  const key = new THREE.DirectionalLight(0xffffff, 2.0);
  key.position.set(-6, 9, 6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xf2f5ff, 1.3);
  rim.position.set(7, 5, -7);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0xe8e8e6, 0.65);
  fill.position.set(0, 4, -10);
  scene.add(fill);

  // Warm-red rim from behind-right — born at CH.01 ignition, garnish not takeover.
  const amber = new THREE.SpotLight(0xff5b3a, 0, 40, Math.PI / 7, 0.7, 1.4);
  amber.position.set(6, 3.5, -6);
  amber.target.position.set(0, 0.7, -1);
  scene.add(amber);
  scene.add(amber.target);

  // ---- Glossy black floor disc + soft light pool under the car.
  // one long showroom floor under the whole avenue of cars
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(760, 160),
    new THREE.MeshStandardMaterial({
      color: 0xeaeae7,
      roughness: 0.55,
      metalness: 0.05,
      envMapIntensity: 0.35,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(120, 0, 0);
  scene.add(floor);

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
