export default class Enemigo {
  constructor(matriz, filas, columnas, celdaSize, balasAlien) {
    this.matriz = matriz;
    this.filas = filas;
    this.columnas = columnas;
    this.celdaSize = celdaSize;
    this.balasAlien = balasAlien;

    this.enemigos = []; // lista de enemigos con coordenadas

    // colocar algunos aliens
    for (let k = 3; k > 0; k--) {
      const i = Math.floor(Math.random() * columnas);
      const j = Math.floor(Math.random() * (filas - 7));
      this.matriz.colocar(i, j, 'alien');

      this.enemigos.push({
        x: i * celdaSize,
        y: j * celdaSize,
        width: celdaSize,
        height: celdaSize,
        dx: Math.random() < 0.5 ? 0.5 : -0.5, // movimiento lento horizontal
        dy: 0 // opcional: movimiento vertical
      });
    }
  }

  disparar() {
    for (let e of this.enemigos) {
      if (Math.random() < 0.01) { // baja probabilidad de disparo
        const px = e.x + e.width / 2 - 10;
        const py = e.y + e.height;
        this.balasAlien.push(new BalaEnemigo(px, py, 1, 'alien'));
      }
    }
  }

  mover() {
    for (let e of this.enemigos) {
      e.x += e.dx;
      e.y += e.dy;

      // rebote en bordes
      if (e.x <= 0 || e.x + e.width >= this.columnas * this.celdaSize) {
        e.dx *= -1;
      }
    }
  }

  dibujar(ctx, alienImg) {
    for (let e of this.enemigos) {
      ctx.drawImage(alienImg, e.x, e.y, e.width, e.height);
    }
  }
}
