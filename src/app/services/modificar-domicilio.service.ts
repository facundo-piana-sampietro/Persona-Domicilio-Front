import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { DomicilioDTO } from '../domicilioDTO';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseDomicilioDTO } from '../responseDomicilioDTO';

@Injectable({
  providedIn: 'root'
})
export class ModificarDomicilioService {

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

  filtrarPorId(id : number) : Observable<ResponseDomicilioDTO>{
    this.url = this.urlBase + 'filtrarPorId/' + id;
    return this.http.get<ResponseDomicilioDTO>(this.url, this.httpOptions);

  }

  modificarDomicilio(ID : number, calle : string, altura : string) : Observable<ResponseDomicilioDTO>{
    let body  = {'calle' : calle, 'altura' : altura};
    this.url = this.urlBase + 'modificar/' + ID;
    return this.http.put<ResponseDomicilioDTO>(this.url, body,  this.httpOptions);

  }

}
