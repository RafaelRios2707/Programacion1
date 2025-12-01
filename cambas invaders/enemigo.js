class Enemigo {
  constructor(matriz, filas, columnas, celdaSize, balasAlien) {
    this.matriz = matriz;
    this.filas = filas;
    this.columnas = columnas;
    this.celdaSize = celdaSize;
    this.balasAlien = balasAlien;

    for (let k = 3; k > 0; k--) {
      this.matriz.colocar(
        Math.floor(Math.random() * columnas),
        Math.floor(Math.random() * (filas - 7)),
        'alien'
      );
    }
  }

  disparar(Bala) {
    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        if (this.matriz.obtener(i, j) === 'alien' && Math.random() < 0.06) {
          const px = i * this.celdaSize + this.celdaSize / 2 - 3;
          const py = j * this.celdaSize + this.celdaSize;
          this.balasAlien.push(new Bala(px, py, 1, 'alien'));
        }
      }
    }
  }
}

export default Enemigo;

