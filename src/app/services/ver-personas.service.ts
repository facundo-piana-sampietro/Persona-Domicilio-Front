import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { ResponsePersonaDTO } from '../responsePersonaDTO';
import { ResponseDTO } from '../responseDTO';

@Injectable({
  providedIn: 'root'
})
export class VerPersonasService {

  token = sessionStorage.getItem('token');
  private urlBase = environment.baseUrl;// URL to web api
  private urlDom = environment.baseUrl + '/domicilio/'; // URL to web api
  private urlPer =  environment.baseUrl + '/persona/'; // URL to web api
  url : string = '';

  httpOptions  : Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
                               'Accept': 'application/json',
                               'Access-Control-Allow-Origin' : '*',
                               'Authorization': this.token?this.token:"" })

  };

  constructor(private http: HttpClient) { }

    filtrarPersonasPorDomicilio(id : number, orden : number) : Observable<ResponsePersonaDTO>{
      this.url = this.urlDom + 'obtenerPersonas/' + id + '/' + orden;
      return this.http.get<ResponsePersonaDTO>(this.url , this.httpOptions);

    }

    
  desasociacion(idPersona : number, idDomicilio : number) : Observable<ResponseDTO>{
    this.url = this.urlBase + '/desasociacion/' + idPersona + '/' + idDomicilio;
    return this.http.get<ResponseDTO>(this.url,  this.httpOptions);

  }
   
}