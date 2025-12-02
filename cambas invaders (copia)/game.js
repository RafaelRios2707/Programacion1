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

alienImg.onload = () => { alienCargado = true; verificarCarga(); };
fondoImg.onload = () => { fondoCargado = true; verificarCarga(); };

let matriz;
let balasNave = [];
let balasAlien = [];
let player;
let enemigo;

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
        }
      }
    }
  }
}

function iniciarJuego() {
  matriz = new Matriz(filas, columnas);
  player = new Player(matriz, columnas, filas, celdaSize, balasNave);
  enemigo = new Enemigo(matriz, filas, columnas, celdaSize, balasAlien);

  setInterval(() => enemigo.disparar(), 500);
  gameLoop();
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === ' ') {
    player.disparar();

    const carnet = prompt("Ingrese su carnet");
    if (carnet % 2 === 0) {
      console.log("El carnet es par");
    } else {
      console.log("El carnet es impar");
    }
  } else if (e.code === 'ArrowLeft') {
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

  balasNave.forEach(b => { b.mover(); b.dibujar(ctx); });
  balasAlien.forEach(b => { b.mover(); b.dibujar(ctx); });

  balasNave = balasNave.filter(b => !b.fueraDelCanvas(canvas));
  balasAlien = balasAlien.filter(b => !b.fueraDelCanvas(canvas));

  requestAnimationFrame(gameLoop);
}
