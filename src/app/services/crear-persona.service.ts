import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { ResponseDTO } from '../responseDTO'

@Injectable({
  providedIn: 'root'
})

export class CrearPersonaService {
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

  crearPersona(DNI : number, nombre : string, apellido : string) : Observable<ResponseDTO>{
    let body  = {'dni': DNI, 'nombre' : nombre, 'apellido' : apellido};
    this.url = this.urlBase + 'create';
    return this.http.post<ResponseDTO>(this.url, body,  this.httpOptions);

  }
  
}
