class BalaEnemigo {
  constructor(x, y, direccion, tipo) {
    this.x = x;
    this.y = y;
    this.direccion = direccion;
    this.tipo = tipo;
    this.velocidad = 4;
    this.width = 20;
    this.height = 20;
  }

  mover() {
    this.y += this.velocidad * this.direccion;
  }

  dibujar(ctx) {
    const img = new Image();
    img.src = 'assets/icon2.png'; // bala con icon2
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  fueraDelCanvas(canvas) {
    return this.y < -this.height || this.y > canvas.height;
  }
}

export default class Enemigo {
  constructor(matriz, filas, columnas, celdaSize, balasAlien) {
    this.matriz = matriz;
    this.filas = filas;
    this.columnas = columnas;
    this.celdaSize = celdaSize;
    this.balasAlien = balasAlien;

    // colocar algunos aliens
    for (let k = 3; k > 0; k--) {
      const i = Math.floor(Math.random() * columnas);
      const j = Math.floor(Math.random() * (filas - 7));
      this.matriz.colocar(i, j, 'alien');
    }
  }

  disparar() {
    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        if (this.matriz.obtener(i, j) === 'alien' && Math.random() < 0.5) {
          const px = i * this.celdaSize + this.celdaSize / 2 - 10;
          const py = j * this.celdaSize + this.celdaSize;
          this.balasAlien.push(new BalaEnemigo(px, py, 1, 'alien'));
        }
      }
    }
  }

  // 🔄 Movimiento aleatorio lento
  mover() {
    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        if (this.matriz.obtener(i, j) === 'alien') {
          // probabilidad baja de moverse en cada frame
          if (Math.random() < 0.02) {
            const nuevaX = i + (Math.random() < 0.5 ? -1 : 1);
            const nuevaY = j + (Math.random() < 0.1 ? 1 : 0); // a veces baja

            if (this.matriz.enRango(nuevaX, nuevaY) && !this.matriz.obtener(nuevaX, nuevaY)) {
              this.matriz.colocar(i, j, null);
              this.matriz.colocar(nuevaX, nuevaY, 'alien');
            }
          }
        }
      }
    }
  }
}
