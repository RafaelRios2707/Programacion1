class Bala {
  constructor(x, y, direccion, tipo) {
    this.x = x;
    this.y = y;
    this.direccion = direccion; // -1 arriba, +1 abajo
    this.tipo = tipo; // 'nave'
    this.velocidad = 6;
    this.width = 6;
    this.height = 12;
  }

  mover() {
    this.y += this.velocidad * this.direccion;
  }

  dibujar(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  fueraDelCanvas(canvas) {
    return this.y < 0 || this.y > canvas.height;
  }
}
export default Bala;
