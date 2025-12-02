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
    img.src = 'assets/icon2.png';
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

    this.lastShot = 0;
    this.shotCooldown = 1000; // milisegundos

    // colocar algunos aliens iniciales
    for (let k = 5; k > 0; k--) {
      const i = Math.floor(Math.random() * columnas);
      const j = Math.floor(Math.random() * (filas - 7));
      if (!this.matriz.obtener(i, j)) {
        this.matriz.colocar(i, j, 'alien');
      }
    }
  }

  disparar() {
    const now = Date.now();
    if (now - this.lastShot < this.shotCooldown) return;
    this.lastShot = now;

    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        if (this.matriz.obtener(i, j) === 'alien' && Math.random() < 0.25) {
          const px = i * this.celdaSize + this.celdaSize / 2 - 10;
          const py = j * this.celdaSize + this.celdaSize;
          this.balasAlien.push(new BalaEnemigo(px, py, 1, 'alien'));
        }
      }
    }
  }

  mover() {
    const snapshot = [];
    for (let j = 0; j < this.filas; j++) {
      snapshot[j] = [];
      for (let i = 0; i < this.columnas; i++) {
        snapshot[j][i] = this.matriz.obtener(i, j);
      }
    }

    const movimientos = [];
    const limiteY = Math.floor(this.filas * 2 / 3);

    for (let j = this.filas - 1; j >= 0; j--) {
      for (let i = 0; i < this.columnas; i++) {
        if (snapshot[j][i] === 'alien') {
          if (Math.random() < 0.01) {
            const dx = Math.random() < 0.4 ? -1 : 1;
            const dy = Math.random() < 0.01 ? 1 : 0;
            const nuevaX = i + dx;
            const nuevaY = j + dy;

            if (
              nuevaX >= 0 && nuevaX < this.columnas &&
              nuevaY >= 0 && nuevaY <= limiteY &&
              snapshot[nuevaY][nuevaX] === null &&
              this.matriz.obtener(nuevaX, nuevaY) === null
            ) {
              movimientos.push({ fromX: i, fromY: j, toX: nuevaX, toY: nuevaY });
            }
          }
        }
      }
    }

    for (const m of movimientos) {
      this.matriz.colocar(m.fromX, m.fromY, null);
      this.matriz.colocar(m.toX, m.toY, 'alien');
    }
  }
}



