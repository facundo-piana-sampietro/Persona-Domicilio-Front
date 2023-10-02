import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
token = sessionStorage.getItem('token');

  private helloUrl = environment.baseUrl + '/hello?name=';

  httpOptions  : Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
                               'Access-Control-Allow-Origin' : '*',
                               'Authorization': this.token?this.token:""}),
                               responseType: 'text'
  };

  constructor(private http: HttpClient) { }

  saludar(name :string) : Observable<any>{
    return this.http.get<any>(this.helloUrl + name, this.httpOptions);
  }

   /*private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }*/
}
