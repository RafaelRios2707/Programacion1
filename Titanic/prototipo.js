class Pasajero {
  constructor(nombre, edad, genero, clase) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.clase = clase;
  }

  toString() {
    return `Nombre: ${this.nombre}, Edad: ${this.edad}, Género: ${this.genero}, Clase: ${this.clase}`;
  }
}

class BoteRescate {
  constructor(capacidadMaxima = 6) {
    this.capacidadMaxima = capacidadMaxima;
    this.pasajeros = [];
  }

  agregarPasajero(pasajero) {
    if (this.pasajeros.length < this.capacidadMaxima) {
      this.pasajeros.push(pasajero);
      return true;
    }
    return false;
  }

  mostrarPasajeros() {
    console.log("Pasajeros en el bote:");
    this.pasajeros.forEach((p, i) => {
      console.log(`${i + 1}. ${p.toString()}`);
    });
  }
}

// Generar 20 pasajeros aleatorios
const clases = ["Primera", "Turista"];
const generos = ["F", "M"];
const pasajeros = [];

for (let i = 1; i <= 20; i++) {
  const nombre = `Pasajero${i}`;
  const edad = Math.floor(Math.random() * 60) + 1; // edad entre 1 y 60
  const genero = generos[Math.floor(Math.random() * generos.length)];
  const clase = clases[Math.floor(Math.random() * clases.length)];
  pasajeros.push(new Pasajero(nombre, edad, genero, clase));
}

// Ordenar por prioridad: mujeres y hombres <18, luego por clase
pasajeros.sort((a, b) => {
  const prioridad = (p) => {
    if (p.genero === "F") return 3;
    if (p.genero === "M" && p.edad < 18) return 2;
    return 1;
  };

  const claseValor = (p) => (p.clase === "Primera" ? 1 : 0);

  const prioA = prioridad(a);
  const prioB = prioridad(b);

  if (prioA !== prioB) return prioB - prioA;
  return claseValor(b) - claseValor(a); // Prioridad a primera clase
});

// Crear botes y distribuir pasajeros
const botes = [];
let boteActual = new BoteRescate();

pasajeros.forEach((pasajero) => {
  if (!boteActual.agregarPasajero(pasajero)) {
    botes.push(boteActual);
    boteActual = new BoteRescate();
    boteActual.agregarPasajero(pasajero);
  }
});
botes.push(boteActual); // agregar el último bote

// Mostrar resultados
botes.forEach((bote, index) => {
  console.log(`\n🛶 Bote ${index + 1}`);
  bote.mostrarPasajeros();
});
