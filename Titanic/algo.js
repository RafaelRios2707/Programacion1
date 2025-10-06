class pasajero{
    
    //atributos de clase
    nombre="";
    edad=0;
    genero="";
    clase="";

    //constructor
    constructor(paramNombre,paramEdad,paramGenero,paramClase){
        this.nombre=paramNombre
        this.edad=paramEdad
        this.genero=paramGenero
        this.clase=paramClase
    }
    //Setters
    setNombre(paramNombre) {this.nombre=paramNombre}
    setEdad(paramEdad) {this.edad=paramEdad}
    setGenero(paramGenero) {this.genero=paramGenero}
    setClase(paramClase) {this.clase=paramClase}
    //Getters
    getNombre(){return this.nombre;}
    getEdad(){return this.edad;}
    getGenero(){return this.genero;}
    getClase(){return this.clase;}

    //Mostrar
    ToString(){return "Pasajero: "+
        "Nombre: "+ this.getNombre()+
        "Edad: "+ this.getEdad()+
        "Genero: "+ this.getGenero()+
        "Clase: "+ this.getClase();
    }
}
class boteRescate{
    //atributos de clase
    capacidadMaxima=6;
    pasajeros=[];

    //metodos
    agregarPasajero(pasajero){
        if(this.pasajeros.length < this.capacidadMaxima){
            this.pasajeros.push(pasajero);
            return true;
        }else{
            return false;
        }
    }
    //mujeres y niños primero
    ordenarPasajeros(){
        this.pasajeros.sort((a,b)=>{
            if(a.getGenero() === "F" && b.getGenero() === "M"){
                return -1; // a va antes que b
            }else if(a.getGenero() === "M" && b.getGenero() === "F"){
                return 1; // b va antes que a
            }else{
                //mismo genero, ordenar por edad
                return b.getEdad() - a.getEdad(); //mayores primero
            }
        });
    }
    //mostrar pasajeros
    mostrarPasajeros(){
        this.ordenarPasajeros();
        this.pasajeros.forEach((pasajero, index)=>{
            console.log((index+1)+". "+ pasajero.ToString());
        });
    }
}
