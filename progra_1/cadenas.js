 // Funcion contar palabras
function contarVocales(palabra) {
	var contarVocales=0;
    palabra.split('').forEach(element => {
        console.log(element);   
        if(element=='a'|| element=='A'){
        	contarVocales++;
            }
        if(element=='e'|| element=='E'){
        	contarVocales++;
            }
        if(element=='i'|| element=='I'){
        	contarVocales++;
            }
        if(element=='o'|| element=='O'){
        	contarVocales++;
            }
        if(element=='u'|| element=='U'){
        	contarVocales++;
            }
    });
    console.log('numero de vocales:',contarVocales);
}
var palabra="Hola Mundo"
contarVocales(palabra);

function contarPalabras(texto){
	var contar=0;
    texto.split(' ').forEach (element=>{
    	contar++;
    });
    console.log('palabras:',contar);
}
var texto="Presta atencion Rafael"
contarPalabras(texto)

function contarCaracteres(texto){
	var resultado=0;
    texto.split('').forEach(element=>{
    	resultado++;
    });
    console.log('caracteres:',resultado);
}
var texto="Hola Mundo"
contarCaracteres(texto)

