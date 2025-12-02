export default class BalaEnemigo {
  constructor(x, y, direccion, tipo) {
    this.x = x;
    this.y = y;
    this.direccion = direccion; // +1 para abajo
    this.tipo = tipo;
    this.velocidad = 4;
    this.width = 10;
    this.height = 20;
  }

  mover() {
    this.y += this.velocidad * this.direccion;
  }

  dibujar(ctx) {
    ctx.fillStyle = '#f00'; // rojo para enemigo
    ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log("Dibujando bala alien en:", this.x, this.y);
  }

  fueraDelCanvas(canvas) {
    return this.y < 0 || this.y > canvas.height;
  }
}
