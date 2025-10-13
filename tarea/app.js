const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 40;
const rows = 10;
const cols = 10;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let matriz = new Matrix(rows, cols, 0);

function dibujarCero(x, y) {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(x, y, cellSize, cellSize);
}

function dibujarUno(x, y) {
  ctx.fillStyle = '#00bcd4';
  ctx.fillRect(x, y, cellSize, cellSize);
}

function dibujarDos(x, y) {
  ctx.fillStyle = '#ff7043';
  ctx.fillRect(x, y, cellSize, cellSize);
}

function dibujarBorde(x, y) {
  ctx.strokeStyle = '#000';
  ctx.strokeRect(x, y, cellSize, cellSize);
}

function dibujarMatriz() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const valor = matriz.getValue(i, j);
      const x = j * cellSize;
      const y = i * cellSize;
      if (valor === 0) dibujarCero(x, y);
      else if (valor === 1) dibujarUno(x, y);
      else dibujarDos(x, y);
      dibujarBorde(x, y);
    }
  }
}

function ejercicio1() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, 1);
  dibujarMatriz();
}

function ejercicio2() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) ? 0 : 1);
  dibujarMatriz();
}

function ejercicio3() {
  const mid1 = Math.floor(rows / 2) - 1;
  const mid2 = Math.floor(rows / 2);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, (i === mid1 || i === mid2 || j === mid1 || j === mid2) ? 1 : 0);
  dibujarMatriz();
}

function ejercicio4() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      const esDiagonal = (i === j) || (i + j === rows - 1);
      const esBorde = (i === 0 || i === rows - 1 || j === 0 || j === cols - 1);
      matriz.setValue(i, j, esDiagonal ? 2 : esBorde ? 1 : 0);
    }
  dibujarMatriz();
}

function ejercicio5() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, i <= 3 ? 1 : i <= 6 ? 2 : 0);
  dibujarMatriz();
}

function ejercicio6() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, i % 2);
  dibujarMatriz();
}

function ejercicio7() {
  matriz = new Matrix(rows, cols, 0);
  let col = 0;
  for (let i = 0; i < rows; i++) {
    matriz.setValue(i, col, 1);
    col++;
    if (col >= cols) col = cols - 1;
  }
  dibujarMatriz();
}

function ejercicio8() {
  matriz = new Matrix(rows, cols, 0);
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) matriz.setValue(top, j, 1);
    top++;
    for (let i = top; i <= bottom; i++) matriz.setValue(i, right, 1);
    right--;
    if (top <= bottom) for (let j = right; j >= left; j--) matriz.setValue(bottom, j, 1);
    bottom--;
    if (left <= right) for (let i = bottom; i >= top; i--) matriz.setValue(i, left, 1);
    left++;
  }
  dibujarMatriz();
}

function ejercicio9() {
  matriz = new Matrix(rows, cols, 0);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, j <= i ? 1 : 0);
  dibujarMatriz();
}

function ejercicio10() {
  matriz = new Matrix(rows, cols, 0);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, j >= i ? 1 : 0);
  dibujarMatriz();
}

function ejercicio11() {
  matriz = new Matrix(rows, cols, 0);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      matriz.setValue(i, j, (i + j) % 2 === 0 ? 1 : 0);
  dibujarMatriz();
}

const fillBtn = document.getElementById('fillBtn');
const clearBtn = document.getElementById('clearBtn');
const incrementBtn = document.getElementById('incrementBtn');

const botones = [
  {text:'Cruces', fn:ejercicio3},
  {text:'Bordes y Diagonales', fn:ejercicio4},
  {text:'Bandera', fn:ejercicio5},
  {text:'Relleno Alterno', fn:ejercicio6},
  {text:'Zig-Zag Horizontal', fn:ejercicio7},
  {text:'Relleno en Espiral', fn:ejercicio8},
  {text:'Triángulo Superior Izquierdo', fn:ejercicio9},
  {text:'Triángulo Inferior Derecho', fn:ejercicio10},
  {text:'Cuadrícula', fn:ejercicio11}
];

botones.forEach(b => {
  const btn = document.createElement('button');
  btn.textContent = b.text;
  document.querySelector('.sidebar').appendChild(btn);
  btn.addEventListener('click', b.fn);
});

fillBtn.addEventListener('click', ejercicio1);
incrementBtn.addEventListener('click', ejercicio2);
incrementBtn.disabled = false;
clearBtn.addEventListener('click', ()=>{matriz = new Matrix(rows, cols, 0); dibujarMatriz();});

dibujarMatriz();
