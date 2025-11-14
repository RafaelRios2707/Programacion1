// Utils/matriz.js
export const CELDA = {
  VACIO: 0,
  ALIEN: 1,
  JUGADOR: 2,
  PROYECTIL: 3,
  PROYECTIL_ENEMIGO: 4
};

export class MatrizJuego {
  constructor(filas, columnas, filasAliens = 4) {
    this.filas = filas;
    this.columnas = columnas;
    this.matriz = this._crearMatriz(filas, columnas, filasAliens);
    this.jugadorPos = { fila: filas - 1, col: Math.floor(columnas / 2) };
  }

  _crearMatriz(filas, columnas, filasAliens) {
    const m = Array.from({ length: filas }, () =>
      Array.from({ length: columnas }, () => CELDA.VACIO)
    );

    // Aliens en las primeras filas
    for (let f = 0; f < filasAliens; f++) {
      for (let c = 0; c < columnas; c++) {
        m[f][c] = CELDA.ALIEN;
      }
    }

    // Jugador en el centro de la última fila
    const centro = Math.floor(columnas / 2);
    m[filas - 1][centro] = CELDA.JUGADOR;

    return m;
  }

  moverJugador(direccion) {
    const { fila, col } = this.jugadorPos;
    this.matriz[fila][col] = CELDA.VACIO;

    if (direccion === 'izquierda' && col > 0) {
      this.jugadorPos.col -= 1;
    }
    if (direccion === 'derecha' && col < this.columnas - 1) {
      this.jugadorPos.col += 1;
    }

    this.matriz[fila][this.jugadorPos.col] = CELDA.JUGADOR;
  }

  obtenerAliens() {
    const aliens = [];
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.matriz[f][c] === CELDA.ALIEN) {
          aliens.push({ fila: f, col: c });
        }
      }
    }
    return aliens;
  }

  resetNivel(filasAliens) {
    this.matriz = this._crearMatriz(this.filas, this.columnas, filasAliens);
    this.jugadorPos = { fila: this.filas - 1, col: Math.floor(this.columnas / 2) };
  }
}
