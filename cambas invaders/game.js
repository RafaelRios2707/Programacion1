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
  console.log("Alien cargado");
  verificarCarga();
};
fondoImg.onload = () => {
  fondoCargado = true;
  console.log("Fondo cargado");
  verificarCarga();
};

let matriz;
let balasNave = [];
let balasAlien = [];
let player;
let enemigo;

function verificarCarga() {
  console.log("Verificando carga...");
  if (alienCargado && fondoCargado) {
    console.log("Todo cargado, iniciando juego");
    iniciarJuego();
  }
}

class Matriz {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.grid = Array.from({ length: filas }, () => Array(columnas).fill(null));
    console.log("Matriz creada con", filas, "filas y", columnas, "columnas");
  }

  colocar(i, j, tipo) {
    if (this.enRango(i, j)) {
      this.grid[j][i] = tipo;
      console.log("Colocado", tipo, "en", i, j);
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
        }
      }
    }
  }
}

function iniciarJuego() {
  console.log("Iniciando juego...");
  matriz = new Matriz(filas, columnas);

  player = new Player(matriz, columnas, filas, celdaSize, balasNave);
  enemigo = new Enemigo(matriz, filas, columnas, celdaSize, balasAlien);

  setInterval(() => {
    enemigo.disparar();
    console.log("BalasAlien después del disparo:", balasAlien.length);
  }, 1000);

  gameLoop();
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    player.mover(-1);
  } else if (e.code === 'ArrowRight') {
    player.mover(1);
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fondoCargado) {
    ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height);
  }

  if (matriz) {
    matriz.dibujar(ctx);
  }

  // mover y dibujar balas
  for (let i = 0; i < balasNave.length; i++) {
    balasNave[i].mover();
    balasNave[i].dibujar(ctx);
  }

  for (let i = 0; i < balasAlien.length; i++) {
    balasAlien[i].mover();
    balasAlien[i].dibujar(ctx);
  }

  // eliminar balas fuera del canvas SIN romper referencia
  for (let i = balasNave.length - 1; i >= 0; i--) {
    if (balasNave[i].fueraDelCanvas(canvas)) {
      balasNave.splice(i, 1);
    }
  }

  for (let i = balasAlien.length - 1; i >= 0; i--) {
    if (balasAlien[i].fueraDelCanvas(canvas)) {
      balasAlien.splice(i, 1);
    }
  }

  console.log("Loop: balasNave =", balasNave.length, "balasAlien =", balasAlien.length);

  requestAnimationFrame(gameLoop);
}











