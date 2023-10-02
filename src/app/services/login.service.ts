import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl = environment.baseUrl + '/user' // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
                               'Access-Control-Allow-Origin' : '*'})
  };

  constructor(private http: HttpClient) { }

  login(username:string , password: string) : Observable<User>{
    let body  = {'user': username, 'pwd' : password};
    return this.http.post<User>(this.loginUrl, body , this.httpOptions);
  }

 
}