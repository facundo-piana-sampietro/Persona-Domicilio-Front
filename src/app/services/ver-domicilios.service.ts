import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { ResponseDomicilioDTO } from '../responseDomicilioDTO';
import { ResponseDTO } from '../responseDTO';

@Injectable({
  providedIn: 'root'
})
export class VerDomiciliosService {

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

    filtrarDomiciliosPorPersona(id : number, orden : number) : Observable<ResponseDomicilioDTO>{
      this.url = this.urlPer + 'obtenerDomicilios/' + id + '/' + orden;
      return this.http.get<ResponseDomicilioDTO>(this.url , this.httpOptions);

    }

    
  desasociacion(idPersona : number, idDomicilio : number) : Observable<ResponseDTO>{
    this.url = this.urlBase + '/desasociacion/' + idPersona + '/' + idDomicilio;
    return this.http.get<ResponseDTO>(this.url,  this.httpOptions);

  }
   
}