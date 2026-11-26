import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { isSmall, state } from './estado.js';
import { messages, icons, colors } from './frases.js';
import { makeStarTexture, makeSparkleTexture, makeEmojiTexture, makeRingTexture } from './texturas.js';
import { vertexShader, diskFragment, lensFragment } from './shaders.js';

const BACKGROUND = 0x080612;
const DISK_TILT = -Math.PI / 2.5;

// Objetos de la escena que usan los demás módulos
export const world = {
  scene: null, camera: null, renderer: null, composer: null, controls: null,
  objects: [],   // un sprite por frase
  sparkles: [],  // destellos de cada sprite
  lensMesh: null, photonRing: null, diskMaterial: null, starField: null,
};

function shaderMaterial(fragmentShader) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPink: { value: new THREE.Color(0xff9bd2) },
      uLilac: { value: new THREE.Color(0xa987ff) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function addBlackHole(scene) {
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(10, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  scene.add(core);

  const ring = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeRingTexture(), transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0.95,
  }));
  ring.scale.setScalar(31);
  scene.add(ring);
  world.photonRing = ring;

  const lens = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), shaderMaterial(lensFragment));
  scene.add(lens);
  world.lensMesh = lens;
}

function addDisk(scene) {
  const material = shaderMaterial(diskFragment);
  const disk = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);
  disk.rotation.x = DISK_TILT;
  disk.position.y = -1.2;
  scene.add(disk);
  world.diskMaterial = material;
}

function addDust(scene) {
  const count = isSmall ? 4200 : 10500;
  const positions = new Float32Array(count * 3);
  const colorData = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 11 + Math.pow(Math.random(), 0.72) * (isSmall ? 21 : 28);
    const thickness = (Math.random() - 0.5) * (1.1 + Math.random() * 2.5);
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius * 0.48;
    positions[i * 3 + 2] = thickness;

    const tone = Math.random();
    colorData[i * 3] = 1.0;
    colorData[i * 3 + 1] = 0.48 + tone * 0.46;
    colorData[i * 3 + 2] = 0.78 + tone * 0.22;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colorData, 3));
  const material = new THREE.PointsMaterial({
    size: isSmall ? 0.7 : 1.0, vertexColors: true, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    map: makeStarTexture(), alphaTest: 0.025,
  });
  const dust = new THREE.Points(geometry, material);
  dust.rotation.x = DISK_TILT;
  dust.position.y = -1.15;
  scene.add(dust);
}

function addStarfield(scene) {
  const count = isSmall ? 4500 : 11500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 35 + Math.random() * 250;
    const theta = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 170;
    positions[i * 3 + 2] = Math.sin(theta) * radius;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const map = makeStarTexture();

  const stars = new THREE.Points(geometry, new THREE.PointsMaterial({
    map, alphaTest: 0.03, color: 0xe9dcff, size: isSmall ? 0.58 : 0.72,
    transparent: true, opacity: 0.82, sizeAttenuation: true, depthWrite: false,
  }));
  scene.add(stars);
  world.starField = stars;

  // Capa difusa violeta que da profundidad al fondo
  const haze = new THREE.Points(geometry.clone(), new THREE.PointsMaterial({
    map, alphaTest: 0.02, color: 0x9e6bda, size: isSmall ? 1.7 : 2.1,
    transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending,
    sizeAttenuation: true, depthWrite: false,
  }));
  scene.add(haze);
}

function addIcons(scene) {
  const sparkleTexture = makeSparkleTexture();
  const baseScale = isSmall ? 8 : 10;

  messages.forEach((_, i) => {
    const material = new THREE.SpriteMaterial({
      map: makeEmojiTexture(icons[i], colors[i % colors.length]),
      transparent: true, depthWrite: false,
      color: new THREE.Color(1.28, 1.28, 1.28),
    });
    const sprite = new THREE.Sprite(material);

    const angle = i / messages.length * Math.PI * 2 * 2.15 + Math.random() * 0.35;
    const distance = 25 + (i % 10) * 3.4 + Math.random() * 6;
    const baseY = (Math.random() - 0.5) * (isSmall ? 34 : 48);
    sprite.position.set(Math.cos(angle) * distance, baseY, Math.sin(angle) * distance);
    sprite.scale.setScalar(baseScale);
    sprite.userData = {
      index: i, angle, distance, baseY, baseScale, found: false,
      speed: 0.0008 + Math.random() * 0.00065,
      bob: 0.45 + Math.random() * 0.55,
    };
    scene.add(sprite);
    world.objects.push(sprite);

    // Dos destellos por icono, en esquinas opuestas
    [0, 1].forEach(k => {
      const sparkle = new THREE.Sprite(new THREE.SpriteMaterial({
        map: sparkleTexture, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, color: k ? 0xffd7f0 : 0xffffff,
      }));
      scene.add(sparkle);
      world.sparkles.push({
        sprite: sparkle, owner: sprite,
        phase: Math.random() * 6.28, speed: 1.2 + Math.random() * 1.5,
        ox: k ? -0.62 : 0.6, oy: k ? -0.5 : 0.62, size: k ? 2.6 : 3.8,
      });
    });
  });
}

function buildComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight), isSmall ? 0.4 : 0.5, 0.5, 0.46
  ));
  composer.addPass(new OutputPass());
  return composer;
}

export function createScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND);
  scene.fog = new THREE.FogExp2(BACKGROUND, 0.0018);

  const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(0, 26, isSmall ? 110 : 96);

  const renderer = new THREE.WebGLRenderer({
    antialias: !isSmall, alpha: false, powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isSmall ? 1.35 : 1.8));
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;
  controls.enablePan = false;
  controls.minDistance = 34;
  controls.maxDistance = 210;
  controls.autoRotate = !state.paused;
  controls.autoRotateSpeed = 0.16;
  controls.target.set(0, 0, 0);

  Object.assign(world, { scene, camera, renderer, controls });

  addBlackHole(scene);
  addDisk(scene);
  addDust(scene);
  addStarfield(scene);
  addIcons(scene);
  world.composer = buildComposer(renderer, scene, camera);
}

export function resize() {
  const { renderer, camera, composer } = world;
  if (!renderer) return;
  const w = innerWidth, h = innerHeight;
  camera.aspect = w / h;
  camera.fov = w < 600 ? 58 : 52;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio, w < 700 ? 1.35 : 1.8));
  renderer.setSize(w, h);
  composer.setSize(w, h);
}