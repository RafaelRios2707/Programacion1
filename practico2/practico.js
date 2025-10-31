class Matrix {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.datos = [];

    for (let i = 0; i < filas; i++) {
      let fila = [];
      for (let j = 0; j < columnas; j++) {
        fila.push(0);
      }
      this.datos.push(fila);
    }
  }

  llenarAleatorio(min, max) {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.datos[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
  }
}

function mostrar(titulo, matriz, extra = "") {
  const resultado = document.getElementById("resultado");
  let html = `<h3>${titulo}</h3><table>`;

  for (let i = 0; i < matriz.length; i++) {
    html += "<tr>";
    for (let j = 0; j < matriz[i].length; j++) {
      html += `<td>${matriz[i][j]}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";

  if (extra) {
    html += `<p>${extra}</p>`;
  }

  resultado.innerHTML = html;
}

function mostrarVariasMatrices(titulo, matriz1, matriz2, textoExtra = "") {
  const resultado = document.getElementById("resultado");
  let html = `<h3>${titulo}</h3>`;

  html += "<h4>Matriz 1</h4><table>";
  for (let i = 0; i < matriz1.length; i++) {
    html += "<tr>";
    for (let j = 0; j < matriz1[i].length; j++) {
      html += `<td>${matriz1[i][j]}</td>`;
    }
    html += "</tr>";
  }
  html += "</table><br>";

  html += "<h4>Matriz 2</h4><table>";
  for (let i = 0; i < matriz2.length; i++) {
    html += "<tr>";
    for (let j = 0; j < matriz2[i].length; j++) {
      html += `<td>${matriz2[i][j]}</td>`;
    }
    html += "</tr>";
  }
  html += "</table><br>";

  if (textoExtra) {
    html += `<p>${textoExtra}</p>`;
  }

  resultado.innerHTML = html;
}

// Ejercicio 1
function ejercicio1() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 100);
  let suma = 0;
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) suma += m.datos[i][j];
  mostrar("Ejercicio 1", m.datos, "Suma total: " + suma);
}

// Ejercicio 2
function ejercicio2() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 100);
  let mayor = m.datos[0][0];
  let menor = m.datos[0][0];
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    let valor = m.datos[i][j];
    if (valor > mayor) mayor = valor;
    if (valor < menor) menor = valor;
  }
  mostrar("Ejercicio 2", m.datos, `Mayor: ${mayor} - Menor: ${menor}`);
}

// Ejercicio 3
function ejercicio3() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 100);
  let suma = 0;
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) suma += m.datos[i][j];
  let promedio = suma / 100;
  mostrar("Ejercicio 3", m.datos, "Promedio: " + promedio.toFixed(2));
}

// Ejercicio 4
function ejercicio4() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 5);
  let buscar = 3;
  let contar = 0;
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    if (m.datos[i][j] === buscar) contar++;
  }
  mostrar("Ejercicio 4", m.datos, `El número ${buscar} aparece ${contar} veces`);
}

// Ejercicio 5
function ejercicio5() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 10);
  let original = JSON.parse(JSON.stringify(m.datos));
  for (let i = 0; i < 10; i++) m.datos[i].reverse();
  mostrarVariasMatrices("Ejercicio 5", original, m.datos, "Filas invertidas");
}

// Ejercicio 6
function ejercicio6() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 9);
  let rotada = new Matrix(10, 10);
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    rotada.datos[j][9 - i] = m.datos[i][j];
  }
  mostrarVariasMatrices("Ejercicio 6", m.datos, rotada.datos, "Rotada 90°");
}

// Ejercicio 7
function ejercicio7() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 9);
  let transpuesta = new Matrix(10, 10);
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    transpuesta.datos[j][i] = m.datos[i][j];
  }
  mostrarVariasMatrices("Ejercicio 7", m.datos, transpuesta.datos, "Transpuesta");
}

// Ejercicio 8
function ejercicio8() {
  let a = new Matrix(10, 10);
  let b = new Matrix(10, 10);
  a.llenarAleatorio(1, 5);
  b.llenarAleatorio(1, 5);
  let r = new Matrix(10, 10);
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    let suma = 0;
    for (let k = 0; k < 10; k++) suma += a.datos[i][k] * b.datos[k][j];
    r.datos[i][j] = suma;
  }

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  mostrarVariasMatrices("Ejercicio 8", a.datos, b.datos, "Producto de A × B:");
  let html = resultado.innerHTML;
  html += "<h4>Resultado</h4><table>";
  for (let i = 0; i < r.datos.length; i++) {
    html += "<tr>";
    for (let j = 0; j < r.datos[i].length; j++) {
      html += `<td>${r.datos[i][j]}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  resultado.innerHTML = html;
}

// Ejercicio 9
function ejercicio9() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 9);
  let diagonal = [];
  for (let i = 0; i < 10; i++) diagonal.push(m.datos[i][i]);
  mostrar("Ejercicio 9", m.datos, "Diagonal principal: [" + diagonal.join(", ") + "]");
}

// Ejercicio 10
function ejercicio10() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 9);
  let diagonal = [];
  for (let i = 0; i < 10; i++) diagonal.push(m.datos[i][9 - i]);
  mostrar("Ejercicio 10", m.datos, "Diagonal secundaria: [" + diagonal.join(", ") + "]");
}
function ejercicio11() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 10);
  let sumas = [];

  for (let i = 0; i < 10; i++) {
    let suma = 0;
    for (let j = 0; j < 10; j++) {
      suma += m.datos[i][j];
    }
    sumas.push(suma);
  }

  mostrar("Ejercicio 11", m.datos, "Suma por fila: [" + sumas.join(", ") + "]");
}
function ejercicio12() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 10);
  let sumas = Array(10).fill(0);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      sumas[j] += m.datos[i][j];
    }
  }

  mostrar("Ejercicio 12", m.datos, "Suma por columna: [" + sumas.join(", ") + "]");
}
function ejercicio13() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 9);
  let original = JSON.parse(JSON.stringify(m.datos));

  for (let i = 0; i < 10; i++) {
    for (let j = i + 1; j < 10; j++) {
      let temp = m.datos[i][j];
      m.datos[i][j] = m.datos[j][i];
      m.datos[j][i] = temp;
    }
  }

  mostrarVariasMatrices("Ejercicio 13", original, m.datos, "Transpuesta en el mismo lugar");
}
function ejercicio14() {
  let m = new Matrix(10, 10);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      m.datos[i][j] = (i === j) ? 1 : 0;
    }
  }

  mostrar("Ejercicio 14", m.datos, "Matriz identidad (1 en la diagonal principal)");
}
function ejercicio15() {
  let m = new Matrix(10, 10);
  m.llenarAleatorio(1, 5);
  let simetrica = true;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (m.datos[i][j] !== m.datos[j][i]) {
        simetrica = false;
      }
    }
  }

  let mensaje = simetrica ? "Sí es simétrica" : "No es simétrica";
  mostrar("Ejercicio 15", m.datos, mensaje);
}


console.log("Práctico de Matrices en JavaScript cargado.");
