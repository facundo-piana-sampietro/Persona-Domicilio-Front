import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { PersonaDTO } from '../personaDTO';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponsePersonaDTO } from '../responsePersonaDTO';

@Injectable({
  providedIn: 'root'
})
export class ModificarPersonaService {

  token = sessionStorage.getItem('token');
  private urlBase = environment.baseUrl + '/persona/' // URL to web api
  url : string = '';

  httpOptions  : Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
                               'Accept': 'application/json',
                               'Access-Control-Allow-Origin' : '*',
                               'Authorization': this.token?this.token:"" })

  };

  constructor(private http: HttpClient) { }

  filtrarPorId(id : number) : Observable<ResponsePersonaDTO>{
    this.url = this.urlBase + 'filtrarPorId/' + id;
    return this.http.get<ResponsePersonaDTO>(this.url, this.httpOptions);

  }

  modificarPersona(ID : number, DNI : number, nombre : string, apellido : string) : Observable<ResponsePersonaDTO>{
    let body  = {'dni': DNI, 'nombre' : nombre, 'apellido' : apellido};
    this.url = this.urlBase + 'modificar/' + ID;
    return this.http.put<ResponsePersonaDTO>(this.url, body,  this.httpOptions);

  }

}
