import { DomicilioDTO } from "./domicilioDTO"

export interface ResponseDomicilioDTO{
    message: string,
    tipoError: string, 
    domicilios : DomicilioDTO[],
    cantTotal : number,
    isError: boolean

}