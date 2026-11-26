import { el } from './dom.js';
import { createScene, resize } from './escena.js';
import { startLoop, stopLoop } from './animacion.js';
import { bindInteraction, updateCounter } from './interaccion.js';
import { initEditor } from './editor.js';

try {
  createScene(el('universe'));
  updateCounter();

  const loading = el('loading');
  loading.classList.add('active');
  setTimeout(() => loading.classList.remove('active'), 900);

  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => (document.hidden ? stopLoop() : startLoop()));
  startLoop();
} catch (error) {
  console.error('No se pudo iniciar la escena 3D:', error);
  el('fallback').style.display = 'block';
}

bindInteraction();
initEditor();