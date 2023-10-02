import {Persona} from './persona';

export interface DomicilioDTO{
    id : number,
    calle : string,
    altura: string,
    personas: Persona[]
}