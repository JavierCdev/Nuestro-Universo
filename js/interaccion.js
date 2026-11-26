import * as THREE from 'three';
import { world } from './escena.js';
import { state } from './estado.js';
import { messages, icons } from './frases.js';
import { el, notify } from './dom.js';

const modal = el('modal');
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downPos = null;

export function updateCounter() {
  el('found-count').textContent = String(state.found.size).padStart(2, '0');
  el('total-count').textContent = String(messages.length).padStart(2, '0');
}

function setAutoRotate(on) {
  if (world.controls) world.controls.autoRotate = on;
}

// Devuelve el icono bajo el puntero (ignorando los ya descubiertos)
function pickIcon(e) {
  const rect = world.renderer.domElement.getBoundingClientRect();
  pointer.set(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1
  );
  raycaster.setFromCamera(pointer, world.camera);
  const hits = raycaster.intersectObjects(world.objects.filter(o => !o.userData.found), false);
  return hits.length ? hits[0].object : null;
}

function showMessage(index) {
  const item = messages[index];
  if (!item) return;
  state.lastFocused = document.activeElement;
  state.found.add(index);
  world.objects[index].userData.found = true;
  updateCounter();

  el('message-icon').textContent = icons[index];
  el('message-title').textContent = item[0];
  el('message-body').textContent = item[1];
  modal.dataset.index = index;
  modal.classList.add('open');
  el('close-button').focus({ preventScroll: true });
  setAutoRotate(false);
}

function closeMessage() {
  modal.classList.remove('open');
  if (state.found.size >= messages.length) notify('Descubriste todo nuestro universo ♡');
  if (state.lastFocused && state.lastFocused.focus) state.lastFocused.focus({ preventScroll: true });
  if (!state.paused) setAutoRotate(true);
}

function enterUniverse() {
  state.entered = true;
  document.body.classList.add('entered');
  el('intro').classList.add('hidden');
  setAutoRotate(!state.paused);
}

function bindCanvas() {
  const canvas = world.renderer.domElement;

  canvas.addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse') canvas.style.cursor = pickIcon(e) ? 'pointer' : 'grab';
  }, { passive: true });

  canvas.addEventListener('pointerleave', () => { canvas.style.cursor = 'grab'; });

  canvas.addEventListener('pointerdown', e => { downPos = { x: e.clientX, y: e.clientY }; });

  canvas.addEventListener('pointerup', e => {
    if (!state.entered || modal.classList.contains('open') || !downPos) return;
    const moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
    downPos = null;
    if (moved > 8) return; // fue un arrastre para girar, no un toque
    const icon = pickIcon(e);
    if (icon) showMessage(icon.userData.index);
  });
}

export function bindInteraction() {
  if (world.renderer) bindCanvas();

  el('enter-button').addEventListener('click', enterUniverse);
  el('close-button').addEventListener('click', closeMessage);
  modal.addEventListener('click', e => { if (e.target === modal) closeMessage(); });

  el('another-button').addEventListener('click', () => {
    const pending = messages.map((_, i) => i).filter(i => !world.objects[i].userData.found);
    if (!pending.length) { closeMessage(); return; }
    const next = pending[Math.floor(Math.random() * pending.length)];
    closeMessage();
    showMessage(next);
  });

  el('share-button').addEventListener('click', async () => {
    const item = messages[Number(modal.dataset.index) || 0];
    const text = `${item[0]} — ${item[1]}`;
    try {
      await navigator.clipboard.writeText(text);
      notify('Mensaje copiado ✦');
    } catch {
      notify(text);
    }
  });

  el('help-button').addEventListener('click', () => {
    notify('Arrastra para girar · pellizca para acercar · toca una estrella para leerla');
  });

  const toggle = el('motion-toggle');
  toggle.addEventListener('click', () => {
    state.paused = !state.paused;
    setAutoRotate(!state.paused && !modal.classList.contains('open'));
    const label = state.paused ? 'Reanudar animaciones' : 'Pausar animaciones';
    toggle.textContent = state.paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeMessage();
    if (e.key === 'Enter' && !state.entered && document.activeElement === document.body) enterUniverse();
  });
}