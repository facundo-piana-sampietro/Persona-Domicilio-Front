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
export class PersonaService {

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

    filtrarTodos(orden : number) : Observable<ResponsePersonaDTO>{
      this.url = this.urlBase + 'filtrarTodos/' + orden;
      return this.http.get<ResponsePersonaDTO>(this.url , this.httpOptions);

    }

    filtrarPorNombre(nombre : string) : Observable<ResponsePersonaDTO>{
      this.url = this.urlBase + 'filtrarPorNombre/' + nombre;
      return this.http.get<ResponsePersonaDTO>(this.url, this.httpOptions);

    }

    filtrarPorId(id : number) : Observable<ResponsePersonaDTO>{
      this.url = this.urlBase + 'filtrarPorId/' + id;
      return this.http.get<ResponsePersonaDTO>(this.url, this.httpOptions);

    }

    eliminarPersona(id : number) : Observable<ResponsePersonaDTO>{
      this.url = this.urlBase + 'eliminar/' + id;
      return this.http.delete<ResponsePersonaDTO>(this.url, this.httpOptions);

    }

    personasSinDomicilio () : Observable<ResponsePersonaDTO>{
      this.url = this.urlBase + 'sinDomicilios';
      return this.http.get<ResponsePersonaDTO>(this.url, this.httpOptions);
    }
}
