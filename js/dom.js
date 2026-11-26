export const el = id => document.getElementById(id);

let toastTimer;
export function notify(text) {
  const toast = el('toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}