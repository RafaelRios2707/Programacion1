export default class Player {
  constructor(matriz, columnas, filas, celdaSize) {
    this.matriz = matriz;
    this.columnas = columnas;
    this.filas = filas;
    this.celdaSize = celdaSize;

    // vida inicial del jugador
    this.vida = 6;

    // colocar la nave en la parte inferior central
    this.matriz.colocar(6, 11, 'nave');
    this.imagenActual = 'assets/nave_derecha.png';

    console.log("Player inicializado con vida:", this.vida);

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

  // nuevo método para recibir daño
recibirImpacto() {
  this.vida--;
  console.log("La nave recibió un impacto. Vida restante:", this.vida);

  const vidasElement = document.getElementById("vidas");
  if (vidasElement) {
    vidasElement.textContent = "Vidas: " + this.vida;
  }

  if (this.vida <= 0) {
    console.log("¡Game Over! La nave ha sido destruida.");
    const pos = this.encontrarNave();
    if (pos) {
      this.matriz.colocar(pos.i, pos.j, null);
    }
    window.location.href = "gameover.html";
  }
}












