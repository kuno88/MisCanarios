export interface CanarioInterface {
    id?: string,
    usuario?: string|null|undefined,
    procedencia?: string,
    nAnillo?: string,
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
    fechaActualizacion?:Date
    //poner un ? en el atributo pepe?:string lo hace opcional
}