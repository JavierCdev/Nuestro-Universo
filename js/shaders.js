export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Disco principal. Las capas giran como un bloque (sin enrollarse con el tiempo).
export const diskFragment = `
uniform float uTime;
uniform vec3 uPink;
uniform vec3 uLilac;
varying vec2 vUv;
void main() {
  vec2 p = (vUv - .5) * 2.0;
  float r = length(p);
  float a = atan(p.y, p.x);
  if (r < .2 || r > .99) discard;

  float s1 = mod(uTime * .5, 6.2831853);
  float s2 = mod(uTime * .85, 6.2831853);
  float swirl = sin(a * 3.0 - r * 14.0 + s1) * .5 + .5;
  float streaks = sin(a * 11.0 + r * 6.0 + s2) * .5 + .5;
  float clumps = pow(swirl * .65 + streaks * .35, 1.6);

  float inner = smoothstep(.2, .3, r);
  float outer = 1.0 - smoothstep(.45, .99, r);
  float heat = 1.0 - smoothstep(.2, .55, r);
  vec3 col = mix(uLilac, uPink, smoothstep(.95, .3, r));
  col = mix(col, vec3(1.0, .93, .97), heat * heat * .6);

  float alpha = inner * outer * (.2 + clumps * .7);
  gl_FragColor = vec4(col * (1.0 + heat * .9), alpha);
}`;

// Arco de luz que rodea la sombra por arriba y por abajo
export const lensFragment = `
uniform float uTime;
uniform vec3 uPink;
uniform vec3 uLilac;
varying vec2 vUv;
void main() {
  vec2 p = (vUv - .5) * 2.0;
  float r = length(p);
  if (r < .40 || r > .98) discard;
  float a = atan(p.y, p.x);

  float s1 = mod(uTime * .45, 6.2831853);
  float s2 = mod(uTime * .8, 6.2831853);
  float swirl = sin(a * 3.0 - r * 16.0 + s1) * .5 + .5;
  float streaks = sin(a * 13.0 + r * 7.0 + s2) * .5 + .5;
  float clumps = pow(swirl * .6 + streaks * .4, 1.5);

  float prof = smoothstep(.40, .47, r) * (1.0 - smoothstep(.47, .95, r));
  float vert = pow(abs(p.y) / max(r, .001), 1.6);
  float heat = 1.0 - smoothstep(.40, .66, r);
  vec3 col = mix(uLilac, uPink, smoothstep(.9, .45, r));
  col = mix(col, vec3(1.0, .93, .97), heat * .6);

  float alpha = prof * (.2 + clumps * .8) * (.15 + .85 * vert) * .75;
  gl_FragColor = vec4(col * (1.0 + heat * .8), alpha);
}`;