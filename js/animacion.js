import * as THREE from 'three';
import { world } from './escena.js';
import { state } from './estado.js';

const clock = new THREE.Clock();
const right = new THREE.Vector3();
const up = new THREE.Vector3();
let time = 0;
let frame = 0;

function moveIcons(t) {
  world.objects.forEach(sprite => {
    const d = sprite.userData;
    d.angle += d.speed;
    sprite.position.x = Math.cos(d.angle) * d.distance;
    sprite.position.z = Math.sin(d.angle) * d.distance;
    sprite.position.y = d.baseY + Math.sin(t * d.bob + d.angle) * 1.7;
    sprite.scale.setScalar(d.baseScale + Math.sin(t * 1.6 + d.angle) * 0.35);
    // Las estrellas ya descubiertas se apagan poco a poco
    sprite.material.opacity += ((d.found ? 0.28 : 1) - sprite.material.opacity) * 0.08;
  });
}

function twinkle(t) {
  const { camera, sparkles } = world;
  camera.updateMatrixWorld();
  right.setFromMatrixColumn(camera.matrixWorld, 0);
  up.setFromMatrixColumn(camera.matrixWorld, 1);

  sparkles.forEach(s => {
    const owner = s.owner;
    if (owner.userData.found) { s.sprite.visible = false; return; }
    const k = Math.pow(Math.max(0, Math.sin(t * s.speed + s.phase)), 3);
    const offset = owner.userData.baseScale * 0.5;
    s.sprite.position.copy(owner.position)
      .addScaledVector(right, s.ox * offset)
      .addScaledVector(up, s.oy * offset);
    s.sprite.scale.setScalar(s.size * (0.2 + k * 0.9));
    s.sprite.material.opacity = 0.1 + k * 0.9;
    s.sprite.material.rotation = t * 0.5 + s.phase;
  });
}

function tick() {
  frame = requestAnimationFrame(tick);
  const { renderer, controls, composer, camera, lensMesh, diskMaterial, photonRing, starField } = world;
  if (!renderer) return;

  const dt = Math.min(clock.getDelta(), 0.1);
  if (!state.paused) time += dt;

  controls.update();
  lensMesh.quaternion.copy(camera.quaternion); // el arco siempre mira a la cámara

  if (!state.paused) {
    starField.rotation.y = time * 0.0015;
    diskMaterial.uniforms.uTime.value = time;
    lensMesh.material.uniforms.uTime.value = time;
    photonRing.material.opacity = 0.68 + Math.sin(time * 1.3) * 0.1;
    moveIcons(time);
  }
  twinkle(time);
  composer.render();
}

export function startLoop() {
  cancelAnimationFrame(frame);
  tick();
}

export function stopLoop() {
  cancelAnimationFrame(frame);
}