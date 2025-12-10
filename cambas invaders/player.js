export default class Player {
  constructor(matriz, columnas, filas, celdaSize) {
    this.matriz = matriz;
    this.columnas = columnas;
    this.filas = filas;
    this.celdaSize = celdaSize;

    // colocar la nave en la parte inferior central
    this.matriz.colocar(6, 11, 'nave');
    this.imagenActual = 'assets/nave_derecha.png';

    console.log("Player inicializado");

    // disparo automático cada 2 segundos (puedes quitarlo si prefieres manual con Space)
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
      const nuevaY = pos.j - 1;
      if (this.matriz.enRango(pos.i, nuevaY) && this.matriz.obtener(pos.i, nuevaY) === null) {
        this.matriz.colocar(pos.i, nuevaY, 'balaNave');
        console.log("Jugador disparó bala matricial en:", pos.i, nuevaY);
      }
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









