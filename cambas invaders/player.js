import Bala from "./bala.js";

export default class Player {
  constructor(matriz, columnas, filas, celdaSize, balasNave) {
    this.matriz = matriz;
    this.columnas = columnas;
    this.filas = filas;
    this.celdaSize = celdaSize;
    this.balasNave = balasNave;

    this.matriz.colocar(6, 11, 'nave');
    this.imagenActual = 'assets/nave_derecha.png';

    setInterval(() => this.disparar(), 2000);
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
      const px = pos.i * this.celdaSize + this.celdaSize / 2 - 3;
      const py = pos.j * this.celdaSize;
      this.balasNave.push(new Bala(px, py, -1, 'nave'));
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

        if (direccion === -1) {
          this.imagenActual = 'assets/nave_izquierda.png';
        } else {
          this.imagenActual = 'assets/nave_derecha.png';
        }
      }
    }
  }
}



  
