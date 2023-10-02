import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { ResponsePersonaDTO } from '../responsePersonaDTO';
import { ResponseDTO } from '../responseDTO';

@Injectable({
  providedIn: 'root'
})
export class AsociarPersonasService {

  token = sessionStorage.getItem('token');
  private urlBase = environment.baseUrl;// URL to web api
  private urlPer =  environment.baseUrl + '/persona/'; // URL to web api
  url : string = '';

  httpOptions  : Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
                               'Accept': 'application/json',
                               'Access-Control-Allow-Origin' : '*',
                               'Authorization': this.token?this.token:"" })

  };

  constructor(private http: HttpClient) { }

    filtrarTodos(orden : number) : Observable<ResponsePersonaDTO>{
      this.url = this.urlPer + 'filtrarTodos/' + orden;
      return this.http.get<ResponsePersonaDTO>(this.url , this.httpOptions);

    }

    
  asociacion(idPersona : number, idDomicilio : number) : Observable<ResponseDTO>{
    this.url = this.urlBase + '/asociacion/' + idPersona + '/' + idDomicilio;
    return this.http.get<ResponseDTO>(this.url,  this.httpOptions);

  }
   
}