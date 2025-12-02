export default class Bala {
  constructor(x, y, direccion, tipo) {
    this.x = x;
    this.y = y;
    this.direccion = direccion; // -1 arriba, +1 abajo
    this.tipo = tipo; // 'nave'
    this.velocidad = 6;
    this.width = 12;  // ajusta según el tamaño visual deseado
    this.height = 24;

    this.imagen = new Image();
    this.imagen.src = 'assets/icon2.png';
  }

  mover() {
    this.y += this.velocidad * this.direccion;
  }

  dibujar(ctx) {
    ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
  }

  fueraDelCanvas(canvas) {
    return this.y < 0 || this.y > canvas.height;
  }
}
