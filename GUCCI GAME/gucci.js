// gucci.js
import { MatrizJuego, CELDA, Entity, SPRITES } from './Utils/logic.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajuste responsivo del canvas
function ajustarCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width);
  canvas.height = Math.floor(rect.height);
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

// Crear nivel inicial
const nivel = new MatrizJuego(10, 12, 4);

// Estado del juego
const state = {
  bullets: [],
  alienBullets: [],
  jugadorVivo: true,
  aliensRestantes: nivel.obtenerAliens().length
};

// Helpers de coordenadas celda->canvas
function computeCellSize() {
  const padding = 20;
  const usableW = canvas.width - padding * 2;
  const usableH = canvas.height - padding * 2;
  const cellW = Math.floor(usableW / nivel.columnas);
  const cellH = Math.floor(usableH / nivel.filas);
  const size = Math.min(cellW, cellH);
  return { size, offsetX: padding, offsetY: padding };
}

function celdaToXY(fila, col, size, offsetX, offsetY) {
  const x = offsetX + col * size;
  const y = offsetY + fila * size;
  return { x, y };
}

// Render de la matriz
function renderMatriz() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { size, offsetX, offsetY } = computeCellSize();

  for (let f = 0; f < nivel.filas; f++) {
    for (let c = 0; c < nivel.columnas; c++) {
      const celda = nivel.matriz[f][c];
      if (celda === CELDA.VACIO) continue;
      const sprite = SPRITES[celda];
      const { x, y } = celdaToXY(f, c, size, offsetX, offsetY);
      const ent = new Entity(
        x + (size - sprite.w) / 2,
        y + (size - sprite.h) / 2,
        sprite.w,
        sprite.h,
        sprite.src
      );
      ent.draw(ctx);
    }
  }

  // Render proyectiles
  state.bullets.forEach(b => b.draw(ctx));
  state.alienBullets.forEach(b => b.draw(ctx));
}

// Input
document.addEventListener('keydown', e => {
  if (!state.jugadorVivo) return;
  if (e.key === 'ArrowLeft') nivel.moverJugador('izquierda');
  if (e.key === 'ArrowRight') nivel.moverJugador('derecha');
  if (e.key === ' ' || e.key === 'Spacebar') {
    const { size, offsetX, offsetY } = computeCellSize();
    const { fila, col } = nivel.jugadorPos;
    const { x, y } = celdaToXY(fila, col, size, offsetX, offsetY);
    const sprite = SPRITES[CELDA.PROYECTIL];
    const bullet = new Entity(
      x + (size - sprite.w) / 2,
      y + (size - sprite.h) / 2,
      sprite.w, sprite.h,
      sprite.src
    );
    bullet.vy = -8;
    state.bullets.push(bullet);
  }
});

// Update loop (abierto a colisiones y movimiento)
function update() {
  // Actualizar proyectiles del jugador
  state.bullets.forEach(b => {
    b.update();
    if (b.y + b.height < 0) b.alive = false;
  });
  state.bullets = state.bullets.filter(b => b.alive);

  // TODO: movimiento grupal de aliens
  // TODO: disparos enemigos
  // TODO: colisiones entre proyectiles y aliens/jugador
  // TODO: condiciones de victoria/derrota
}

// Render loop
function loop() {
  update();
  renderMatriz();
  requestAnimationFrame(loop);
}
loop();



