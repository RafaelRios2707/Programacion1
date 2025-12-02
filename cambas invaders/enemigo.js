import BalaEnemigo from "./balaenemigo.js";

export default class Enemigo {
  constructor(matriz, filas, columnas, celdaSize, balasAlien) {
    this.matriz = matriz;
    this.filas = filas;
    this.columnas = columnas;
    this.celdaSize = celdaSize;
    this.balasAlien = balasAlien; // NO reemplazar este array

    for (let k = 3; k > 0; k--) {
      const i = Math.floor(Math.random() * columnas);
      const j = Math.floor(Math.random() * (filas - 7));
      this.matriz.colocar(i, j, 'alien');
      console.log("Alien colocado en:", i, j);
    }
  }

  disparar() {
    let aliensDetectados = 0;

    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        if (this.matriz.obtener(i, j) === 'alien') {
          aliensDetectados++;
          if (Math.random() < 0.5) {
            const px = i * this.celdaSize + this.celdaSize / 2 - 5;
            const py = j * this.celdaSize + this.celdaSize;
            console.log("Alien disparó desde:", i, j);
            this.balasAlien.push(new BalaEnemigo(px, py, 1, 'alien'));
            console.log("BalasAlien después del push:", this.balasAlien.length);
          }
        }
      }
    }

    console.log("Aliens detectados en matriz:", aliensDetectados);
  }
}

