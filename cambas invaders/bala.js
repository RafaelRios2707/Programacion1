export default class Bala {
  constructor(x, y, direccion, tipo) {
    this.x = x;
    this.y = y;
    this.direccion = direccion; // -1 para arriba
    this.tipo = tipo;
    this.velocidad = 5;
    this.width = 10;
    this.height = 20;
  }

  mover() {
    this.y += this.velocidad * this.direccion;
  }

  dibujar(ctx) {
    ctx.fillStyle = this.tipo === 'nave' ? '#0f0' : '#f00'; // verde para nave, rojo para alien
    ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log("Dibujando bala en:", this.x, this.y);
  }

  fueraDelCanvas(canvas) {
    return this.y < 0 || this.y > canvas.height;
  }
}
