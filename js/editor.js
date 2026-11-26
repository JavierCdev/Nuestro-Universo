import { world } from './escena.js';
import { messages, icons, rawMessages, emojis, colors, defaultMessage, STORE_KEY } from './frases.js';
import { makeEmojiTexture } from './texturas.js';
import { el, notify } from './dom.js';

// Editor de frases: solo aparece si la página se abre con #editar al final del link
const editor = el('editor');
const list = el('editor-list');
const exportBox = el('export-box');

function syncEditMode() {
  document.body.classList.toggle('edit-mode', location.hash === '#editar');
}

function buildRows() {
  list.innerHTML = '';
  messages.forEach((m, i) => {
    const row = document.createElement('div');
    row.className = 'erow';
    row.innerHTML =
      '<div class="num">' + (i + 1) + '</div>' +
      '<input class="emo" maxlength="8" aria-label="Emoji">' +
      '<div class="fields"><input class="ttl" aria-label="Título"><textarea class="txt" aria-label="Mensaje"></textarea></div>';
    row.querySelector('.emo').value = icons[i];
    row.querySelector('.ttl').value = m[0];
    row.querySelector('.txt').value = m[1];
    list.appendChild(row);
  });
}

function readRows() {
  return [...list.children].map(r => ({
    emoji: r.querySelector('.emo').value.trim(),
    title: r.querySelector('.ttl').value.trim(),
    text: r.querySelector('.txt').value.trim(),
  }));
}

function applyEntries(entries, persist) {
  entries.forEach((e, i) => {
    if (!messages[i]) return;
    const title = e.title || messages[i][0];
    messages[i] = [title, e.text || defaultMessage(title)];

    if (e.emoji && e.emoji !== icons[i]) {
      icons[i] = e.emoji;
      const sprite = world.objects[i];
      if (sprite) {
        const previous = sprite.material.map;
        sprite.material.map = makeEmojiTexture(e.emoji, colors[i % colors.length]);
        sprite.material.needsUpdate = true;
        if (previous) previous.dispose();
      }
    }
  });
  if (persist) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(entries)); } catch (err) {}
  }
}

// Genera el bloque que se pega en js/frases.js
function exportCode(entries) {
  const rows = entries.map((e, i) => {
    const title = e.title || rawMessages[i][0];
    const customText = e.text && e.text !== defaultMessage(title);
    const customIcon = e.emoji && e.emoji !== emojis[i % emojis.length];
    const parts = [JSON.stringify(title)];
    if (customText || customIcon) parts.push(JSON.stringify(customText ? e.text : ''));
    if (customIcon) parts.push(JSON.stringify(e.emoji));
    return '  [' + parts.join(', ') + ']';
  });
  return 'export const rawMessages = [\n' + rows.join(',\n') + '\n];';
}

function openEditor() {
  buildRows();
  exportBox.style.display = 'none';
  el('editor-search').value = '';
  editor.classList.add('open');
}

function closeEditor() {
  editor.classList.remove('open');
}

export function initEditor() {
  syncEditMode();
  addEventListener('hashchange', syncEditMode);

  el('edit-fab').addEventListener('click', openEditor);
  el('editor-close').addEventListener('click', closeEditor);

  el('editor-save').addEventListener('click', () => {
    applyEntries(readRows(), true);
    closeEditor();
    notify('Frases guardadas ✦');
  });

  el('editor-copy').addEventListener('click', async () => {
    const code = exportCode(readRows());
    try {
      await navigator.clipboard.writeText(code);
      notify('Código copiado ✦');
    } catch (err) {
      exportBox.value = code;
      exportBox.style.display = 'block';
      exportBox.select();
      notify('Copia el texto de abajo');
    }
  });

  el('editor-reset').addEventListener('click', () => {
    if (!confirm('¿Volver a las frases originales del archivo?')) return;
    try { localStorage.removeItem(STORE_KEY); } catch (err) {}
    location.reload();
  });

  el('editor-search').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    [...list.children].forEach(row => {
      const text = (row.querySelector('.ttl').value + ' ' + row.querySelector('.txt').value).toLowerCase();
      row.classList.toggle('hide', Boolean(q) && !text.includes(q));
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && editor.classList.contains('open')) closeEditor();
  });
}