let tiempoInicio = Date.now(); // guardar cuando inicia el juego

function calcularPuntaje() {
  const tiempoFinal = Date.now();
  const segundos = Math.floor((tiempoFinal - tiempoInicio) / 1000);
  const puntaje = Math.max(1000 - segundos * 5, 0); // penaliza 5 puntos por segundo
  return puntaje;
}

function guardarPuntaje(nombre, puntaje) {
  const clasificaciones = JSON.parse(localStorage.getItem("clasificaciones")) || [];
  clasificaciones.push({ nombre, puntaje });
  clasificaciones.sort((a, b) => b.puntaje - a.puntaje); // orden descendente
  localStorage.setItem("clasificaciones", JSON.stringify(clasificaciones));
}

function mostrarClasificaciones() {
  const tabla = document.getElementById("tabla-clasificaciones");
  const clasificaciones = JSON.parse(localStorage.getItem("clasificaciones")) || [];

  tabla.innerHTML = "<tr><th>Jugador</th><th>Puntaje</th></tr>";
  clasificaciones.forEach(({ nombre, puntaje }) => {
    tabla.innerHTML += `<tr><td>${nombre}</td><td>${puntaje}</td></tr>`;
  });
}

window.addEventListener("load", () => {
  const form = document.getElementById("form-puntaje");
  if (form) {
    const puntaje = calcularPuntaje();
    document.getElementById("puntaje-final").textContent = puntaje;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre-jugador").value.trim();
      if (nombre) {
        guardarPuntaje(nombre, puntaje);
        mostrarClasificaciones();
        form.style.display = "none";
      }
    });

    mostrarClasificaciones();
  }
});
