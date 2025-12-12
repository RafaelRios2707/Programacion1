console.log("game.js cargado correctamente");

import Player from "./player.js";
import Enemigo from "./enemigo.js";
import { niveles } from "./niveles.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const filas = 12;
const columnas = 12;
const celdaSize = 50;

// detectar nivel actual desde la URL
const urlParams = new URLSearchParams(window.location.search);
let nivelActual = parseInt(urlParams.get("nivel")) || 1;
const config = niveles[nivelActual];

const alienImg = new Image();
const fondoImg = new Image();

// imagen de bala del jugador
const balaJugadorImg = new Image();
let balaJugadorCargada = false;
balaJugadorImg.src = "assets/icon2.png";
balaJugadorImg.onload = () => { balaJugadorCargada = true; };

const balaEnemigaImg = new Image();
let balaEnemigaCargada = false;
balaEnemigaImg.src = "assets/coca.png";
balaEnemigaImg.onload = () => { balaEnemigaCargada = true; };

// audios

const vasoAudio = new Audio("assets/vaso.mp3");

const musicaFondo = new Audio("assets/fondo.mp3");
musicaFondo.loop = true;
musicaFondo.volume = 0.5;

let alienCargado = false;
let fondoCargado = false;

alienImg.src = config.alien;
fondoImg.src = config.fondo;

alienImg.onload = () => { alienCargado = true; verificarCarga(); };
fondoImg.onload = () => { fondoCargado = true; verificarCarga(); };

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
          ctx.drawImage(player.imagenActual, px, py, celdaSize, celdaSize);
        } else if (tipo === 'alien' && alienCargado) {
          ctx.drawImage(alienImg, px, py, celdaSize, celdaSize);
        } else if (tipo === 'balaNave' && balaJugadorCargada) {
          ctx.drawImage(balaJugadorImg, px + celdaSize / 2 - 10, py + 5, 20, 20);
        } else if (tipo === 'balaAlien' && balaEnemigaCargada) {
          ctx.drawImage(balaEnemigaImg, px + celdaSize / 2 - 10, py + 5, 20, 20);
        }
      }
    }
  }
}

function iniciarJuego() {
  matriz = new Matriz(filas, columnas);

  player = new Player(matriz, columnas, filas, celdaSize);
  enemigo = new Enemigo(matriz, filas, columnas, celdaSize, config.cantidadAliens);

  musicaFondo.currentTime = 0;
  musicaFondo.play().catch(err => console.log("Autoplay bloqueado:", err));

  // disparo cada 2.5 segundos
  setInterval(() => {
    enemigo.disparar();
  }, 2500);

  gameLoop();
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    player.mover(-1);
  } else if (e.code === 'ArrowRight') {
    player.mover(1);
    // reproducir somo.mp3 al mover a la derecha
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
          player.recibirImpacto();
          // reproducir vaso.mp3 al recibir daño
          vasoAudio.currentTime = 0;
          vasoAudio.play().catch(err => console.log("Autoplay bloqueado:", err));
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

const secuenciaNiveles = [1, 2, 4];

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fondoCargado) ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height);
  if (matriz) matriz.dibujar(ctx);

  enemigo.mover();

  if (frameCount % config.velocidadBalas === 0) {
    moverBalas('balaNave', -1);
    moverBalas('balaAlien', 1);
  }

  frameCount++;

  // comprobar si quedan aliens
  let quedanAliens = false;
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      if (matriz.obtener(i, j) === 'alien') {
        quedanAliens = true;
        break;
      }
    }
    if (quedanAliens) break;
  }

  // avanzar nivel de forma simple
  if (!quedanAliens) {
    const siguienteNivel = secuenciaNiveles.find(n => n > nivelActual);
    if (siguienteNivel) {
      window.location.href = `game.html?nivel=${siguienteNivel}`;
    } else {
      window.location.href = "gamewin.html";
    }
    return;
  }

  requestAnimationFrame(gameLoop);
}












