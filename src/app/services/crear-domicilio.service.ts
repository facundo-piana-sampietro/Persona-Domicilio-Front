import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/enviroment';
import { Observable, of } from 'rxjs';
import { ResponseDTO } from '../responseDTO'

@Injectable({
  providedIn: 'root'
})

export class CrearDomicilioService {
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

  crearDomicilio(calle: string, altura: string) : Observable<ResponseDTO>{
    console.log(this.token);
    let body  = {'calle': calle, 'altura' : altura};
    this.url = this.urlBase + 'create';
    return this.http.post<ResponseDTO>(this.url, body,  this.httpOptions);

  }
  
}