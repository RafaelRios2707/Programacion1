console.log("game.js cargado correctamente");

import Player from "./player.js";
import Enemigo from "./enemigo.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const filas = 12;
const columnas = 12;
const celdaSize = 50;

const alienImg = new Image();
const fondoImg = new Image();

let alienCargado = false;
let fondoCargado = false;

alienImg.src = 'assets/alien.png';
fondoImg.src = 'assets/fondo.png';

alienImg.onload = () => {
  alienCargado = true;
  verificarCarga();
};
fondoImg.onload = () => {
  fondoCargado = true;
  verificarCarga();
};

let matriz;
let player;
let enemigo;

// contador de frames para controlar velocidad de balas
let frameCount = 0;

function verificarCarga() {
  if (alienCargado && fondoCargado) {
    iniciarJuego();
  }
}

class Matriz {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.grid = Array.from({ length: filas }, () => Array(columnas).fill(null));
  }

  colocar(i, j, tipo) {
    if (this.enRango(i, j)) {
      this.grid[j][i] = tipo;
    }
  }

  obtener(i, j) {
    return this.enRango(i, j) ? this.grid[j][i] : null;
  }

  enRango(i, j) {
    return i >= 0 && i < this.columnas && j >= 0 && j < this.filas;
  }

  dibujar(ctx) {
    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        const tipo = this.grid[j][i];
        const px = i * celdaSize;
        const py = j * celdaSize;

        if (tipo === 'nave') {
          const naveImg = new Image();
          naveImg.src = player.imagenActual;
          ctx.drawImage(naveImg, px, py, celdaSize, celdaSize);
        } else if (tipo === 'alien' && alienCargado) {
          ctx.drawImage(alienImg, px, py, celdaSize, celdaSize);
        } else if (tipo === 'balaNave') {
          ctx.fillStyle = "white";
          ctx.fillRect(px + celdaSize/2 - 5, py + 10, 10, 20);
        } else if (tipo === 'balaAlien') {
          ctx.fillStyle = "red";
          ctx.fillRect(px + celdaSize/2 - 5, py + 10, 10, 20);
        }
      }
    }
  }
}

function iniciarJuego() {
  matriz = new Matriz(filas, columnas);

  player = new Player(matriz, columnas, filas, celdaSize);
  enemigo = new Enemigo(matriz, filas, columnas, celdaSize);

  // disparo cada 5 segundos
  setInterval(() => {
    enemigo.disparar();
  }, 5000);

  gameLoop();
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    player.mover(-1);
  } else if (e.code === 'ArrowRight') {
    player.mover(1);
  } else if (e.code === 'Space') {
    player.disparar();
  }
});

function moverBalas(tipo, direccion) {
  const movimientos = [];

  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      if (matriz.obtener(i, j) === tipo) {
        const nuevaY = j + direccion;

        if (!matriz.enRango(i, nuevaY)) {
          matriz.colocar(i, j, null);
          continue;
        }

        const destino = matriz.obtener(i, nuevaY);

        if (tipo === 'balaNave' && destino === 'alien') {
          matriz.colocar(i, j, null);
          matriz.colocar(i, nuevaY, null);
          continue;
        }
        if (tipo === 'balaAlien' && destino === 'nave') {
          matriz.colocar(i, j, null);
          matriz.colocar(i, nuevaY, null);
          console.log("¡La nave fue impactada!");
          continue;
        }

        if (destino === null) {
          movimientos.push({ fromX: i, fromY: j, toX: i, toY: nuevaY, tipo });
        } else if (destino === 'balaNave' || destino === 'balaAlien') {
          matriz.colocar(i, j, null);
          matriz.colocar(i, nuevaY, null);
        }
      }
    }
  }

  for (const m of movimientos) {
    matriz.colocar(m.fromX, m.fromY, null);
    matriz.colocar(m.toX, m.toY, m.tipo);
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fondoCargado) {
    ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height);
  }

  if (matriz) {
    matriz.dibujar(ctx);
  }

  enemigo.mover();

  // mover balas cada 3 frames para que sean más lentas
  if (frameCount % 3 === 0) {
    moverBalas('balaNave', -1);
    moverBalas('balaAlien', 1);
  }

  frameCount++;

  requestAnimationFrame(gameLoop);
}





