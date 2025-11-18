const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const filas = 12;
const columnas = 12;
const celdaSize = 50;

const naveImg = new Image();
const alienImg = new Image();
const fondoImg = new Image();

let naveCargada = false;
let alienCargado = false;
let fondoCargado = false;

naveImg.src = 'assets/nave.png';
alienImg.src = 'assets/alien.png';
fondoImg.src = 'assets/fondo.png';

naveImg.onload = () => { naveCargada = true; verificarCarga(); };
alienImg.onload = () => { alienCargado = true; verificarCarga(); };
fondoImg.onload = () => { fondoCargado = true; verificarCarga(); };

function verificarCarga() {
  if (naveCargada && alienCargado && fondoCargado) {
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

        if (tipo === 'nave' && naveCargada) {
          ctx.drawImage(naveImg, px, py, celdaSize, celdaSize);
        } else if (tipo === 'alien' && alienCargado) {
          ctx.drawImage(alienImg, px, py, celdaSize, celdaSize);
        }
      }
    }
  }
}

class Bala {
  constructor(x, y, direccion, tipo) {
    this.x = x;
    this.y = y;
    this.direccion = direccion; // -1 arriba, +1 abajo
    this.tipo = tipo; // 'nave' o 'alien'
    this.velocidad = 6;
    this.width = 6;
    this.height = 12;
  }

  mover() { this.y += this.velocidad * this.direccion; }

  dibujar(ctx) {
    ctx.fillStyle = this.tipo === 'nave' ? '#fff' : '#880808';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  fueraDelCanvas() { return this.y < 0 || this.y > canvas.height; }
}

let matriz;
let balasNave = [];
let balasAlien = [];

function iniciarJuego() {
  matriz = new Matriz(filas, columnas);
  matriz.colocar(6, 11, 'nave');
  for (let k = 3; k > 0; k--) {
    matriz.colocar(Math.floor(Math.random() * columnas), Math.floor(Math.random() * (filas - 7)), 'alien');
  }
  // define el disparo de aliens y arráncalo
  setInterval(disparoAlien, 500);
  gameLoop();
}

// dispara aleatoriamente desde aliens existentes hacia abajo
function disparoAlien() {
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      if (matriz.obtener(i, j) === 'alien' && Math.random() < 0.06) {
        const px = i * celdaSize + celdaSize / 2 - 3;
        const py = j * celdaSize + celdaSize;
        balasAlien.push(new Bala(px, py, 1, 'alien'));
      }
    }
  }
}

// (opcional) disparo de la nave con ESPACIO
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    const pos = encontrarNave();
    if (pos) {
      const px = pos.i * celdaSize + celdaSize / 2 - 3;
      const py = pos.j * celdaSize;
      balasNave.push(new Bala(px, py, -1, 'nave'));
    }
  }
});

function encontrarNave() {
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      if (matriz.obtener(i, j) === 'nave') {
        return { i, j };
      }
    }
  }
  return null;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fondoCargado) {
    ctx.drawImage(fondoImg, 0, 0, canvas.width, canvas.height);
  }

  if (matriz) {
    matriz.dibujar(ctx);
  }

  // mover y dibujar balas
  balasNave.forEach(b => { b.mover(); b.dibujar(ctx); });
  balasAlien.forEach(b => { b.mover(); b.dibujar(ctx); });

  // limpiar balas fuera de pantalla
  balasNave = balasNave.filter(b => !b.fueraDelCanvas());
  balasAlien = balasAlien.filter(b => !b.fueraDelCanvas());

  requestAnimationFrame(gameLoop);
}
