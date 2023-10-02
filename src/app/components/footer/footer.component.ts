import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( 
    private app: AppComponent,
    private router: Router,) { }

  ngOnInit(): void {
  }

  validateUser(){
    if (this.app.getToken() == null) return false;
    else return true;
  }

  volver(){
    this.router.navigateByUrl('/home');
  }
}
