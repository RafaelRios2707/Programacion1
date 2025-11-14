// Utils/logic.js

// Tipos de celda para la matriz lógica
export const CELDA = {
  VACIO: 0,
  ALIEN: 1,
  JUGADOR: 2,
  PROYECTIL: 3,
  PROYECTIL_ENEMIGO: 4
};

// Clase base para entidades visuales
export class Entity {
  constructor(x, y, width, height, imageSrc) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
    this.alive = true;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx) {
    if (!this.alive) return;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

// Clase MatrizJuego para manejar niveles
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

    if (direccion === 'izquierda' && col > 0) this.jugadorPos.col--;
    if (direccion === 'derecha' && col < this.columnas - 1) this.jugadorPos.col++;

    this.matriz[fila][this.jugadorPos.col] = CELDA.JUGADOR;
  }

  obtenerAliens() {
    const aliens = [];
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        if (this.matriz[f][c] === CELDA.ALIEN) aliens.push({ fila: f, col: c });
      }
    }
    return aliens;
  }

  resetNivel(filasAliens) {
    this.matriz = this._crearMatriz(this.filas, this.columnas, filasAliens);
    this.jugadorPos = { fila: this.filas - 1, col: Math.floor(this.columnas / 2) };
  }
}

// Mapeo celda -> sprite y tamaño
export const SPRITES = {
  [CELDA.ALIEN]: { src: 'Assets/alien.png', w: 50, h: 50 },
  [CELDA.JUGADOR]: { src: 'Assets/nave.png', w: 60, h: 60 },
  [CELDA.PROYECTIL]: { src: 'Assets/bullet.png', w: 10, h: 22 },
  [CELDA.PROYECTIL_ENEMIGO]: { src: 'Assets/alien_bullet.png', w: 10, h: 22 }
};

