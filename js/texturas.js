import * as THREE from 'three';

function newCanvas(size) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  return [canvas, canvas.getContext('2d')];
}

function toTexture(canvas) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Punto suave para las estrellas y el polvo
export function makeStarTexture() {
  const [canvas, ctx] = newCanvas(64);
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
  g.addColorStop(0, 'rgba(255,245,255,1)');
  g.addColorStop(0.16, 'rgba(255,235,255,.85)');
  g.addColorStop(0.48, 'rgba(205,160,255,.24)');
  g.addColorStop(1, 'rgba(180,120,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return toTexture(canvas);
}

// Destello de cuatro puntas que acompaña a cada icono
export function makeSparkleTexture() {
  const [canvas, ctx] = newCanvas(128);
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 40);
  g.addColorStop(0, 'rgba(255,255,255,.9)');
  g.addColorStop(0.25, 'rgba(255,210,240,.35)');
  g.addColorStop(1, 'rgba(255,180,230,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);

  ctx.translate(64, 64);
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#ffb7e6';
  ctx.shadowBlur = 10;
  const R = 60, k = 5;
  ctx.beginPath();
  ctx.moveTo(0, -R);
  ctx.quadraticCurveTo(k, -k, R, 0);
  ctx.quadraticCurveTo(k, k, 0, R);
  ctx.quadraticCurveTo(-k, k, -R, 0);
  ctx.quadraticCurveTo(-k, -k, 0, -R);
  ctx.fill();
  return toTexture(canvas);
}

// Emoji con un halo suave del color indicado
export function makeEmojiTexture(emoji, color) {
  const [canvas, ctx] = newCanvas(256);
  const hex = '#' + color.toString(16).padStart(6, '0');
  const g = ctx.createRadialGradient(128, 128, 2, 128, 128, 124);
  g.addColorStop(0, hex + 'a6');
  g.addColorStop(0.16, hex + '6e');
  g.addColorStop(0.3, hex + '2e');
  g.addColorStop(0.42, hex + '0a');
  g.addColorStop(1, hex + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);

  ctx.font = '132px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = hex;
  ctx.shadowBlur = 14;
  ctx.fillStyle = '#fff';
  ctx.fillText(emoji, 128, 138);
  return toTexture(canvas);
}

// Anillo de luz alrededor del agujero negro
export function makeRingTexture() {
  const [canvas, ctx] = newCanvas(256);
  const g = ctx.createRadialGradient(128, 128, 96, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.38, 'rgba(255,236,246,.95)');
  g.addColorStop(0.52, 'rgba(255,150,205,.55)');
  g.addColorStop(1, 'rgba(255,120,200,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return toTexture(canvas);
}