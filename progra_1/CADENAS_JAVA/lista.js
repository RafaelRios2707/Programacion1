let listaObjeto = [
  {
    nombre: "Francisco Javier Aguilera Urgel",
    edad: 19,
    correo: "francisco.aguilera@ucb.edu.bo",
    carrera: "Ingeniería de Sistemas",
    telefono: "77625626"
  },
  {
    nombre: "Francisco Javier Aguilera Urgel",
    edad: 19,
    correo: "francisco.aguilera@ucb.edu.bo",
    carrera: "Ingeniería de Sistemas",
    telefono: "77625626"
  },
  {
    nombre: "Francisco Javier Aguilera Urgel",
    edad: 19,
    correo: "francisco.aguilera@ucb.edu.bo",
    carrera: "Ingeniería de Sistemas",
    telefono: "77625626"
  },
  {
    nombre: "Francisco Javier Aguilera Urgel",
    edad: 19,
    correo: "francisco.aguilera@ucb.edu.bo",
    carrera: "Ingeniería de Sistemas",
    telefono: "77625626"
  },
  {
    nombre: "Francisco Javier Aguilera Urgel",
    edad: 19,
    correo: "francisco.aguilera@ucb.edu.bo",
    carrera: "Ingeniería de Sistemas",
    telefono: "77625626"
  }
];

function AddEstudiante() {
  const varName = document.getElementById("input_name").value;
  const varEdad = Number(document.getElementById("input_Edad").value);
  const varCorreo = document.getElementById("input_Correo").value;
  const varCarrera = document.getElementById("input_Carrera").value;
  const varPhone = document.getElementById("input_Phone").value;

  if (varName && varEdad && varCorreo && varCarrera && varPhone) {
    const estudiante = {
      nombre: varName,
      edad: varEdad,
      correo: varCorreo,
      carrera: varCarrera,
      telefono: varPhone
    };

    listaObjeto.push(estudiante);
    MostrarHabilitados();
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

function MostrarHabilitados() {
  const habilitados = listaObjeto.filter(e => e.edad >= 18);
  crearTabla(habilitados);
}

function crearTabla(datos) {
  let tabla = `
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Correo</th>
          <th>Carrera</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
  `;

  datos.forEach(estudiante => {
    tabla += `
      <tr>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.edad}</td>
        <td>${estudiante.correo}</td>
        <td>${estudiante.carrera || "—"}</td>
        <td>${estudiante.telefono}</td>
      </tr>
    `;
  });

  tabla += `
      </tbody>
    </table>
  `;

  document.getElementById("tabla-container").innerHTML = tabla;
}

// Mostrar tabla al cargar
MostrarHabilitados();
