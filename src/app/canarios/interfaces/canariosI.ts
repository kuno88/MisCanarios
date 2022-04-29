export interface CanarioInterface {
    id?: string,
    usuario?: string|null|undefined,
    procedencia?: string,
    nAnillo?: number,
    sinAnillo?: string,
    genero?: string,
    linea?: string,
    colorAnillo?: string,
    estado?:string,
    fechaEstado?:Date,
    observacionEstado?:string,
    idPadre?:string,
    idMadre?:string,
    observaciones?: string,
    disponibilidad:string;
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    year?:number,
    cria?:{
        postura:string,
        idCria:string
    }
    //poner un ? en el atributo pepe?:string lo hace opcional
}