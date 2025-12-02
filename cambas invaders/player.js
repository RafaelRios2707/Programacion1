import Bala from "./bala.js";

export default class Player {
  constructor(matriz, columnas, filas, celdaSize, balasNave) {
    this.matriz = matriz;
    this.columnas = columnas;
    this.filas = filas;
    this.celdaSize = celdaSize;
    this.balasNave = balasNave; // NO reemplazar este array

    this.matriz.colocar(6, 11, 'nave');
    this.imagenActual = 'assets/nave_derecha.png';

    console.log("Player inicializado");

    setInterval(() => {
      console.log("Jugador intenta disparar");
      this.disparar();
    }, 2000);
  }

  encontrarNave() {
    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        if (this.matriz.obtener(i, j) === 'nave') {
          return { i, j };
        }
      }
    }
    return null;
  }

  disparar() {
    const pos = this.encontrarNave();
    if (pos) {
      const px = pos.i * this.celdaSize + this.celdaSize / 2 - 5;
      const py = pos.j * this.celdaSize;
      console.log("Jugador disparó bala en:", px, py);
      this.balasNave.push(new Bala(px, py, -1, 'nave'));
      console.log("BalasNave después del push:", this.balasNave.length);
    }
  }

  mover(direccion) {
    const pos = this.encontrarNave();
    if (pos) {
      const nuevaX = pos.i + direccion;
      const j = pos.j;

      if (nuevaX >= 0 && nuevaX < this.columnas) {
        this.matriz.colocar(pos.i, j, null);
        this.matriz.colocar(nuevaX, j, 'nave');

        this.imagenActual = direccion === -1
          ? 'assets/nave_izquierda.png'
          : 'assets/nave_derecha.png';
      }
    }
  }
}
