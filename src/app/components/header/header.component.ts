import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private app: AppComponent,
    private router: Router,) { }

  logOut(){
    this.app.removeUser();
    this.router.navigateByUrl('/login');
  }

  validateUser(){
    if (this.app.getToken() == null) return false;
    else return true;
  }

  personas(){
    this.router.navigateByUrl('/persona');
  }

  crearPersona(){
    this.router.navigateByUrl('/crearPersona');
  }

  domicilios(){
    this.router.navigateByUrl('/domicilios');
  }

  crearDomicilio(){
    this.router.navigateByUrl('/crearDomicilio');
  }




  ngOnInit(): void {
  }

}
