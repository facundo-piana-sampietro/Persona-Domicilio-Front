import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { ResponseDomicilioDTO } from '../responseDomicilioDTO';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  token = sessionStorage.getItem('token');
  private urlBase = environment.baseUrl + '/domicilio/' // URL to web api
  url : string = '';

  httpOptions  : Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
                               'Accept': 'application/json',
                               'Access-Control-Allow-Origin' : '*',
                               'Authorization': this.token?this.token:"" })

  };

  constructor(private http: HttpClient) { }

    filtrarTodos(orden : number) : Observable<ResponseDomicilioDTO>{
      this.url = this.urlBase + 'filtrarTodos/' + orden;
      return this.http.get<ResponseDomicilioDTO>(this.url , this.httpOptions);

    }

    filtrarPorId(id : number) : Observable<ResponseDomicilioDTO>{
      this.url = this.urlBase + 'filtrarPorId/' + id;
      return this.http.get<ResponseDomicilioDTO>(this.url, this.httpOptions);

    }

    filtrarPorCalleYAltura(calle: string, altura: string) : Observable<ResponseDomicilioDTO>{
      this.url = this.urlBase + 'filtrarPorCalleYAltura/' + calle + '/' + altura;
      return this.http.get<ResponseDomicilioDTO>(this.url, this.httpOptions);

    }

    eliminarDomicilio(id : number) : Observable<ResponseDomicilioDTO>{
      this.url = this.urlBase + 'eliminar/' + id;
      return this.http.delete<ResponseDomicilioDTO>(this.url, this.httpOptions);

    }

    domiciliosSinPersonas () : Observable<ResponseDomicilioDTO>{
      this.url = this.urlBase + 'sinPersonas';
      return this.http.get<ResponseDomicilioDTO>(this.url, this.httpOptions);
    }
}