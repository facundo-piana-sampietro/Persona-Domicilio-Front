import {PersonaDTO} from "./personaDTO"

export interface ResponsePersonaDTO{
    message: string,
    tipoError: string, 
    personas : PersonaDTO[],
    cantTotal : number,
    isError: boolean

}