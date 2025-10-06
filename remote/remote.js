class pasajero{
    
    //atributos de clase
    nombre="";
    edad=0;
    genero="";
    tipoBoleto="";

    //constructor
    constructor(paramNombre,paramEdad,paramGenero,paramBoleto){
        this.nombre=paramNombre
        this.edad=paramEdad
        this.genero=paramGenero
        this.tipoBoleto=paramBoleto
    }
    //Setters
    setNombre(paramNombre) {this.nombre=paramNombre}
    setEdad(paramEdad) {this.edad=paramEdad}
    setGenero(paramGenero) {this.genero=paramGenero}
    setboleto(paramBoleto) {this.tipoBoleto=paramBoleto}
    //Getters
    getNombre(){return this.nombre;}
    getEdad(){return this.edad;}
    getGenero(){return this.genero;}
    getboleto(){return this.tipoBoleto;}

    //Mostrar
    ToString(){return "Pasajero: "+
        "Nombre: "+ this.getNombre()+
        "Edad: "+ this.getEdad()+
        "Genero: "+ this.getGenero()+
        "Tipo de boleto: "+ this.getBoleto();
    }
}
