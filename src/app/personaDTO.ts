import {Domicilio} from './domicilio';

export interface PersonaDTO{
    id : number,
    nombre : string,
    apellido : string,
    dni: number,
    domicilios : Domicilio[]
}