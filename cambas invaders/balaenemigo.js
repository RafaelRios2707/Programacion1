export default class BalaEnemigo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direccion = 1; // siempre hacia abajo
    this.tipo = 'alien';
    this.velocidad = 6;
    this.width = 6;
    this.height = 12;
  }

  mover() {
    this.y += this.velocidad * this.direccion;
  }

  dibujar(ctx) {
    ctx.fillStyle = '#880808';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  fueraDelCanvas(canvas) {
    return this.y > canvas.height;
  }
}
