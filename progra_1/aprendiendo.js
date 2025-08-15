
//SIN RETURN
function mi_primer_algoritmo(){
    var mensaje = "Hola Mundo";
    alert(mensaje);
}

//CON RETURN
function binarioADecimal(binario) {
  let decimal = 0;
  for (let i = 0; i < binario.length; i++) {
    let digitoBinario = binario[i];
    decimal = decimal * 2 + (digitoBinario === "1" ? 1 : 0);
  }
  return decimal;
}

// Ejemplo de uso:
let resultado = binarioADecimal("1010");


let resultado2 = binarioADecimal("1101");
